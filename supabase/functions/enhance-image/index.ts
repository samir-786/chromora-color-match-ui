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
    
    // Use Deep AI's colorizer for color-grading, waifu2x for quality enhancement
    let apiEndpoint = 'https://api.deepai.org/api/colorizer'
    if (preset.description.includes('quality') || preset.description.includes('enhancer')) {
      apiEndpoint = 'https://api.deepai.org/api/waifu2x'
    }

    console.log(`Using Deep AI endpoint: ${apiEndpoint}`)

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'api-key': deepAIApiKey,
      },
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Deep AI API error: ${response.status} ${response.statusText}`, errorText)
      throw new Error(`Deep AI API request failed: ${response.status}`)
    }

    const result = await response.json()
    console.log('Deep AI response:', result)
    
    // Download the enhanced image and convert to base64
    if (result.output_url) {
      console.log('Downloading enhanced image from:', result.output_url)
      const imageResponse = await fetch(result.output_url)
      
      if (!imageResponse.ok) {
        throw new Error('Failed to download enhanced image')
      }
      
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
    console.log('Starting image enhancement request...')
    
    // Check if Deep AI API key is configured
    const deepAIApiKey = Deno.env.get('DEEP_AI_API_KEY')
    if (!deepAIApiKey) {
      console.error('Deep AI API key not found in environment variables')
      return new Response(
        JSON.stringify({ error: 'Deep AI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    const formData = await req.formData()
    const imageFile = formData.get('image') as File
    const presetId = formData.get('preset') as string

    console.log(`Received request with preset: ${presetId}`)
    console.log(`Image file size: ${imageFile?.size} bytes`)

    if (!imageFile || !presetId) {
      console.error('Missing image or preset in request')
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
      console.error(`Invalid preset: ${presetId}`)
      return new Response(
        JSON.stringify({ error: 'Invalid preset' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Converting image to base64...')
    // Convert image to base64
    const arrayBuffer = await imageFile.arrayBuffer()
    const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    console.log(`Image converted to base64, length: ${imageBase64.length}`)

    // Use Deep AI to enhance the image
    console.log('Calling Deep AI API...')
    const enhancedImage = await enhanceImageWithDeepAI(imageBase64, preset)
    console.log('Deep AI processing completed successfully')

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
    console.error('Error details:', error.message)
    console.error('Error stack:', error.stack)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to enhance image',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})