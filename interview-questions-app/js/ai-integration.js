// AI Integration Module for Answer Generation

class AIIntegration {
    constructor() {
        this.openaiKey = localStorage.getItem('openai_api_key') || '';
        this.anthropicKey = localStorage.getItem('anthropic_api_key') || '';
    }

    // Set API Keys
    setOpenAIKey(key) {
        this.openaiKey = key;
        localStorage.setItem('openai_api_key', key);
    }

    setAnthropicKey(key) {
        this.anthropicKey = key;
        localStorage.setItem('anthropic_api_key', key);
    }

    // Get API Keys
    getOpenAIKey() {
        return this.openaiKey;
    }

    getAnthropicKey() {
        return this.anthropicKey;
    }

    // Generate answer using OpenAI ChatGPT
    async generateWithChatGPT(question, category, type, difficulty) {
        if (!this.openaiKey) {
            throw new Error('OpenAI API key not configured. Please add it in Settings.');
        }

        const prompt = this.buildPrompt(question, category, type, difficulty);

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.openaiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an expert interview coach helping candidates prepare for technical and behavioral interviews. Provide comprehensive, well-structured answers that demonstrate deep understanding and practical experience.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1500
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Failed to generate answer with ChatGPT');
            }

            const data = await response.json();
            return this.formatAnswer(data.choices[0].message.content);
        } catch (error) {
            console.error('ChatGPT Error:', error);
            throw error;
        }
    }

    // Generate answer using Anthropic Claude
    async generateWithClaude(question, category, type, difficulty) {
        if (!this.anthropicKey) {
            throw new Error('Anthropic API key not configured. Please add it in Settings.');
        }

        const prompt = this.buildPrompt(question, category, type, difficulty);

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.anthropicKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-5-sonnet-20241022',
                    max_tokens: 1500,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    system: 'You are an expert interview coach helping candidates prepare for technical and behavioral interviews. Provide comprehensive, well-structured answers that demonstrate deep understanding and practical experience.'
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Failed to generate answer with Claude');
            }

            const data = await response.json();
            return this.formatAnswer(data.content[0].text);
        } catch (error) {
            console.error('Claude Error:', error);
            throw error;
        }
    }

    // Build prompt for AI
    buildPrompt(question, category, type, difficulty) {
        let prompt = `Interview Question Context:
- Job Role: ${category}
- Question Type: ${type}
- Difficulty Level: ${difficulty}

Question: ${question}

Please provide a comprehensive answer that:`;

        if (type === 'Technical') {
            prompt += `
1. Explains the concept clearly with technical accuracy
2. Includes practical examples or code snippets where relevant
3. Discusses edge cases or important considerations
4. Mentions best practices and common pitfalls
5. Is structured in a way that's easy to understand and remember

Format the answer in a clear, professional manner suitable for an interview response.`;
        } else {
            prompt += `
1. Follows the STAR method (Situation, Task, Action, Result) where applicable
2. Demonstrates relevant skills and competencies
3. Shows self-awareness and learning
4. Includes specific examples and measurable outcomes
5. Is authentic and professional

Format the answer in a clear, conversational manner suitable for an interview response.`;
        }

        return prompt;
    }

    // Format the AI response
    formatAnswer(rawAnswer) {
        // Clean up the answer
        let formatted = rawAnswer.trim();

        // Add proper spacing for better readability
        formatted = formatted.replace(/\n{3,}/g, '\n\n');

        // Format code blocks if present
        formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            return `\n<pre><code class="language-${lang || 'plaintext'}">${code.trim()}</code></pre>\n`;
        });

        // Format inline code
        formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Format bold text
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // Format bullet points
        formatted = formatted.replace(/^- (.+)$/gm, '• $1');

        // Convert line breaks to HTML
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    // Check if API keys are configured
    hasOpenAIKey() {
        return this.openaiKey && this.openaiKey.length > 0;
    }

    hasAnthropicKey() {
        return this.anthropicKey && this.anthropicKey.length > 0;
    }

    // Clear API keys
    clearKeys() {
        this.openaiKey = '';
        this.anthropicKey = '';
        localStorage.removeItem('openai_api_key');
        localStorage.removeItem('anthropic_api_key');
    }
}

// Create global instance
const aiIntegration = new AIIntegration();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIIntegration, aiIntegration };
}
