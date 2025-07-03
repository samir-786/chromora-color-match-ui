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
    const prompt = `You are a professional color grading AI. Please enhance this image with the following color grading settings: ${preset.description}. 
    
    Apply these adjustments:
    - Temperature: ${preset.temperature > 0 ? 'warmer' : preset.temperature < 0 ? 'cooler' : 'neutral'}
    - Saturation: ${preset.saturation > 1 ? 'increased' : 'decreased'} by ${Math.abs((preset.saturation - 1) * 100)}%
    - Contrast: ${preset.contrast > 1 ? 'increased' : 'decreased'} by ${Math.abs((preset.contrast - 1) * 100)}%
    - Brightness: ${preset.brightness > 0 ? 'increased' : preset.brightness < 0 ? 'decreased' : 'unchanged'}
    
    Return only the enhanced image in the same format and dimensions. Focus on professional color grading that enhances the visual appeal while maintaining natural skin tones where applicable.`

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
          maxOutputTokens: 4096,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const result = await response.json()
    
    // Since Gemini Pro Vision can't generate images, we'll simulate enhancement
    // In a real implementation, you'd use a different service or apply actual image processing
    return imageBase64 // For now, return the original image
    
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
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

    // For demo purposes, we'll apply a simple enhancement simulation
    // In production, you'd integrate with actual image processing APIs
    const enhancedImage = await simulateEnhancement(imageBase64, preset)

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