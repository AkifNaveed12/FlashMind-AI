const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Sends a chat completion request to the Groq API.
 * Uses the Llama 3.3 70B Versatile model.
 */
export async function chatWithGroq(messages: GroqMessage[]): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API Key is missing. Please check your environment configuration.');
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `Groq API responded with status ${response.status}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response structure received from Groq API');
    }

    return content;
  } catch (error) {
    console.error('Groq client request failed:', error);
    throw error;
  }
}
