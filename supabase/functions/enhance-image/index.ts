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
  "color-grading": {
    temperature: 0.2,
    saturation: 1.3,
    contrast: 1.2,
    brightness: 0.1,
    description: "professional color enhancement"
  },
  "quality-enhancer": {
    temperature: 0,
    saturation: 1.1,
    contrast: 1.1,
    brightness: 0.05,
    description: "AI-powered image upscaling and quality enhancer"
  }
}

async function enhanceImageWithDeepAI(imageBase64: string, preset: PresetConfig): Promise<string> {
  const deepAIApiKey = Deno.env.get('DEEP_AI_API_KEY')
  
  if (!deepAIApiKey) {
    throw new Error('Deep AI API key not configured')
  }

  try {
    // Convert base64 to blob for Deep AI API
    const imageBuffer = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0))
    
    const formData = new FormData()
    formData.append('image', new Blob([imageBuffer], { type: 'image/jpeg' }))
    
    // Use Deep AI's colorizer or enhancer based on preset
    let apiEndpoint = 'https://api.deepai.org/api/colorizer'
    
    // Map presets to Deep AI endpoints
    if (preset.description.includes('quality') || preset.description.includes('enhancer')) {
      apiEndpoint = 'https://api.deepai.org/api/waifu2x'
    } else {
      apiEndpoint = 'https://api.deepai.org/api/colorizer'
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Api-Key': deepAIApiKey,
      },
      body: formData
    })

    if (!response.ok) {
      console.error(`Deep AI API error: ${response.statusText}`)
      throw new Error('Deep AI API request failed')
    }

    const result = await response.json()
    console.log('Deep AI response:', result)
    
    // Download the enhanced image and convert to base64
    if (result.output_url) {
      const imageResponse = await fetch(result.output_url)
      const imageArrayBuffer = await imageResponse.arrayBuffer()
      const enhancedBase64 = btoa(String.fromCharCode(...new Uint8Array(imageArrayBuffer)))
      return enhancedBase64
    }
    
    throw new Error('No output URL from Deep AI')
    
  } catch (error) {
    console.error('Deep AI API error:', error)
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

    // Use Deep AI to enhance the image
    const enhancedImage = await enhanceImageWithDeepAI(imageBase64, preset)

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