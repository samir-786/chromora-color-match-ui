import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIRequest {
  provider: 'gemini' | 'openai' | 'claude' | 'anthropic';
  endpoint: string;
  payload: any;
  config: {
    apiKey?: string;
    model?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider, endpoint, payload, config }: AIRequest = await req.json();

    let response;
    let apiKey = config.apiKey;

    // Use Supabase secrets if API key not provided in config
    if (!apiKey) {
      switch (provider) {
        case 'gemini':
          apiKey = Deno.env.get('GOOGLE_GEMINI_API_KEY');
          break;
        case 'openai':
          apiKey = Deno.env.get('OPENAI_API_KEY');
          break;
        case 'claude':
        case 'anthropic':
          apiKey = Deno.env.get('ANTHROPIC_API_KEY');
          break;
      }
    }

    if (!apiKey) {
      throw new Error(`API key not found for provider: ${provider}`);
    }

    // Route to appropriate AI provider
    switch (provider) {
      case 'gemini':
        response = await handleGeminiRequest(endpoint, payload, apiKey, config.model);
        break;
      case 'openai':
        response = await handleOpenAIRequest(endpoint, payload, apiKey, config.model);
        break;
      case 'claude':
      case 'anthropic':
        response = await handleAnthropicRequest(endpoint, payload, apiKey, config.model);
        break;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-gateway function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function handleGeminiRequest(endpoint: string, payload: any, apiKey: string, model = 'gemini-pro') {
  switch (endpoint) {
    case 'generate':
    case 'generate-text':
      return await callGeminiGenerate(payload.prompt, apiKey, model);
    case 'enhance-image':
      return await callGeminiVision(payload, apiKey);
    default:
      throw new Error(`Unsupported Gemini endpoint: ${endpoint}`);
  }
}

async function handleOpenAIRequest(endpoint: string, payload: any, apiKey: string, model = 'gpt-4o-mini') {
  switch (endpoint) {
    case 'generate':
    case 'generate-text':
      return await callOpenAIChat(payload.prompt, apiKey, model);
    case 'enhance-image':
      return await callOpenAIVision(payload, apiKey, model);
    default:
      throw new Error(`Unsupported OpenAI endpoint: ${endpoint}`);
  }
}

async function handleAnthropicRequest(endpoint: string, payload: any, apiKey: string, model = 'claude-3-sonnet-20240229') {
  switch (endpoint) {
    case 'generate':
    case 'generate-text':
      return await callClaudeChat(payload.prompt, apiKey, model);
    default:
      throw new Error(`Unsupported Anthropic endpoint: ${endpoint}`);
  }
}

async function callGeminiGenerate(prompt: string, apiKey: string, model: string) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    }),
  });

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callGeminiVision(payload: any, apiKey: string) {
  // For image enhancement, use the existing enhance-image function
  // This is a placeholder for future Gemini vision integration
  const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/enhance-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
}

async function callOpenAIChat(prompt: string, apiKey: string, model: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'user', content: prompt }
      ],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callOpenAIVision(payload: any, apiKey: string, model: string) {
  // Implementation for OpenAI vision/image processing
  throw new Error('OpenAI vision not yet implemented');
}

async function callClaudeChat(prompt: string, apiKey: string, model: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      messages: [
        { role: 'user', content: prompt }
      ],
    }),
  });

  const data = await response.json();
  return data.content?.[0]?.text || '';
}