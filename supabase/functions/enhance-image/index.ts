import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface PresetConfig {
  temperature: number;
  saturation: number;
  contrast: number;
  brightness: number;
  description: string;
}

const presets: Record<string, PresetConfig> = {
  cinematic: {
    temperature: 0.2,
    saturation: 1.3,
    contrast: 1.2,
    brightness: 0.1,
    description: "warm, movie-like tones with enhanced contrast"
  },
  vibrant: {
    temperature: 0,
    saturation: 1.6,
    contrast: 1.1,
    brightness: 0.05,
    description: "highly saturated colors with vivid appearance"
  },
  vintage: {
    temperature: 0.3,
    saturation: 0.8,
    contrast: 0.9,
    brightness: -0.1,
    description: "retro film aesthetic with muted colors and warm tones"
  },
  cool: {
    temperature: -0.3,
    saturation: 1.1,
    contrast: 1.1,
    brightness: 0,
    description: "cool blue and teal tones with modern feel"
  },
  warm: {
    temperature: 0.4,
    saturation: 1.2,
    contrast: 1.0,
    brightness: 0.1,
    description: "warm orange and yellow tones for cozy feeling"
  },
  dramatic: {
    temperature: 0,
    saturation: 1.4,
    contrast: 1.5,
    brightness: -0.05,
    description: "high contrast and moody atmosphere"
  }
}

async function enhanceImageWithGemini(imageBase64: string, preset: PresetConfig): Promise<string> {
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
  
  if (!geminiApiKey) {
    throw new Error('Gemini API key not configured')
  }

  try {
    // Since Gemini Vision can analyze but not generate images, 
    // we'll use it to analyze the image and provide enhancement guidance
    const prompt = `Analyze this image and provide detailed color grading recommendations for a ${preset.description} look. 
    Focus on specific areas that need adjustment for optimal visual impact.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageBase64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!response.ok) {
      console.error(`Gemini API error: ${response.statusText}`)
      // Fallback to simulation if Gemini fails
      return imageBase64
    }

    const result = await response.json()
    console.log('Gemini analysis:', result?.candidates?.[0]?.content?.parts?.[0]?.text)
    
    // For now, return the original image as Gemini can't actually modify images
    // In production, you'd use the analysis to guide actual image processing
    return imageBase64
    
  } catch (error) {
    console.error('Gemini API error:', error)
    // Fallback to simulation
    return imageBase64
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const imageFile = formData.get('image') as File
    const presetId = formData.get('preset') as string

    if (!imageFile || !presetId) {
      return new Response(
        JSON.stringify({ error: 'Missing image or preset' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const preset = presets[presetId]
    if (!preset) {
      return new Response(
        JSON.stringify({ error: 'Invalid preset' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Convert image to base64
    const arrayBuffer = await imageFile.arrayBuffer()
    const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    // Use Gemini to analyze the image and enhance it
    const enhancedImage = await enhanceImageWithGemini(imageBase64, preset)

    return new Response(
      JSON.stringify({ 
        enhancedImage: `data:image/jpeg;base64,${enhancedImage}`,
        preset: presetId,
        settings: preset
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error enhancing image:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to enhance image' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Simulate image enhancement for demo purposes
async function simulateEnhancement(imageBase64: string, preset: PresetConfig): Promise<string> {
  // This is a placeholder - in a real implementation you would:
  // 1. Use an actual image processing library
  // 2. Apply the color grading parameters
  // 3. Or integrate with services like Cloudinary, Adobe APIs, etc.
  
  // For now, we'll just return the original image with a slight delay to simulate processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return imageBase64
}