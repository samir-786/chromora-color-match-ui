/**
 * AI Service - Centralized AI API management
 * Supports multiple AI providers: Gemini, OpenAI, Claude, etc.
 */

export type AIProvider = 'gemini' | 'openai' | 'claude' | 'anthropic';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
}

export interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class AIService {
  private configs: Map<AIProvider, AIConfig> = new Map();

  /**
   * Configure AI provider
   */
  configure(provider: AIProvider, config: Omit<AIConfig, 'provider'>) {
    this.configs.set(provider, { provider, ...config });
  }

  /**
   * Get configuration for a provider
   */
  getConfig(provider: AIProvider): AIConfig | null {
    return this.configs.get(provider) || null;
  }

  /**
   * Check if provider is configured
   */
  isConfigured(provider: AIProvider): boolean {
    const config = this.configs.get(provider);
    return !!(config && config.apiKey);
  }

  /**
   * Make authenticated request to AI provider
   */
  async makeRequest(
    provider: AIProvider, 
    endpoint: string, 
    payload: any
  ): Promise<AIResponse> {
    const config = this.getConfig(provider);
    
    if (!config || !config.apiKey) {
      return {
        success: false,
        error: `${provider} is not configured. Please add API key.`
      };
    }

    try {
      // For now, use Supabase Edge Functions to make secure API calls
      const { data, error } = await supabase.functions.invoke('ai-gateway', {
        body: {
          provider,
          endpoint,
          payload,
          config
        }
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Gemini-specific methods
   */
  async generateWithGemini(prompt: string, options?: any): Promise<AIResponse> {
    return this.makeRequest('gemini', 'generate', {
      prompt,
      ...options
    });
  }

  /**
   * Image processing with AI
   */
  async enhanceImage(
    provider: AIProvider,
    imageData: string,
    enhancementType: string
  ): Promise<AIResponse> {
    return this.makeRequest(provider, 'enhance-image', {
      image: imageData,
      enhancement_type: enhancementType
    });
  }

  /**
   * Text generation
   */
  async generateText(
    provider: AIProvider,
    prompt: string,
    options?: any
  ): Promise<AIResponse> {
    return this.makeRequest(provider, 'generate-text', {
      prompt,
      ...options
    });
  }
}

// Import supabase after the class definition to avoid circular imports
import { supabase } from '@/integrations/supabase/client';

export const aiService = new AIService();

// Configure default providers (you can add API keys later)
aiService.configure('gemini', {
  model: 'gemini-pro'
});

aiService.configure('openai', {
  model: 'gpt-4o-mini'
});