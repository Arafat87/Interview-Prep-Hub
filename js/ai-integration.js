// AI Integration Module for Answer Generation

class AIIntegration {
    constructor() {
        this.openaiKey = localStorage.getItem('openai_api_key') || '';
        this.anthropicKey = localStorage.getItem('anthropic_api_key') || '';
        this.geminiKey = localStorage.getItem('gemini_api_key') || '';
        this.huggingfaceKey = localStorage.getItem('huggingface_api_key') || '';
        this.groqKey = localStorage.getItem('groq_api_key') || '';
        this.ollamaUrl = localStorage.getItem('ollama_url') || 'http://localhost:11434';
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

    setGeminiKey(key) {
        this.geminiKey = key;
        localStorage.setItem('gemini_api_key', key);
    }

    setHuggingFaceKey(key) {
        this.huggingfaceKey = key;
        localStorage.setItem('huggingface_api_key', key);
    }

    setGroqKey(key) {
        this.groqKey = key;
        localStorage.setItem('groq_api_key', key);
    }

    setOllamaUrl(url) {
        this.ollamaUrl = url;
        localStorage.setItem('ollama_url', url);
    }

    // Get API Keys
    getOpenAIKey() {
        return this.openaiKey;
    }

    getAnthropicKey() {
        return this.anthropicKey;
    }

    getGeminiKey() {
        return this.geminiKey;
    }

    getHuggingFaceKey() {
        return this.huggingfaceKey;
    }

    getGroqKey() {
        return this.groqKey;
    }

    getOllamaUrl() {
        return this.ollamaUrl;
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

    hasGeminiKey() {
        return this.geminiKey && this.geminiKey.length > 0;
    }

    hasHuggingFaceKey() {
        return this.huggingfaceKey && this.huggingfaceKey.length > 0;
    }

    hasGroqKey() {
        return this.groqKey && this.groqKey.length > 0;
    }

    // Clear API keys
    clearKeys() {
        this.openaiKey = '';
        this.anthropicKey = '';
        this.geminiKey = '';
        this.huggingfaceKey = '';
        this.groqKey = '';
        localStorage.removeItem('openai_api_key');
        localStorage.removeItem('anthropic_api_key');
        localStorage.removeItem('gemini_api_key');
        localStorage.removeItem('huggingface_api_key');
        localStorage.removeItem('groq_api_key');
    }

    // ===== FLASHCARD GENERATOR METHODS =====

    // Extract text from uploaded file
    async extractTextFromFile(file) {
        const fileType = file.name.split('.').pop().toLowerCase();
        
        try {
            switch (fileType) {
                case 'txt':
                    return await this.extractTextFromTXT(file);
                case 'pdf':
                    return await this.extractTextFromPDF(file);
                case 'docx':
                    return await this.extractTextFromDOCX(file);
                default:
                    throw new Error('Unsupported file type. Please use TXT, PDF, or DOCX files.');
            }
        } catch (error) {
            console.error('File extraction error:', error);
            throw error;
        }
    }

    // Extract text from TXT file
    async extractTextFromTXT(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read TXT file'));
            reader.readAsText(file);
        });
    }

    // Extract text from PDF file
    async extractTextFromPDF(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const typedArray = new Uint8Array(e.target.result);
                    
                    // Set worker source for PDF.js
                    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                    
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    let fullText = '';
                    
                    // Extract text from each page
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + '\n\n';
                    }
                    
                    resolve(fullText.trim());
                } catch (error) {
                    reject(new Error('Failed to extract text from PDF: ' + error.message));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read PDF file'));
            reader.readAsArrayBuffer(file);
        });
    }

    // Extract text from DOCX file
    async extractTextFromDOCX(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    resolve(result.value);
                } catch (error) {
                    reject(new Error('Failed to extract text from DOCX: ' + error.message));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read DOCX file'));
            reader.readAsArrayBuffer(file);
        });
    }

    // Chunk large content for processing
    chunkContent(content, maxChunkSize = 3000) {
        const words = content.split(/\s+/);
        const chunks = [];
        let currentChunk = [];
        let currentSize = 0;

        for (const word of words) {
            if (currentSize + word.length > maxChunkSize && currentChunk.length > 0) {
                chunks.push(currentChunk.join(' '));
                currentChunk = [word];
                currentSize = word.length;
            } else {
                currentChunk.push(word);
                currentSize += word.length + 1;
            }
        }

        if (currentChunk.length > 0) {
            chunks.push(currentChunk.join(' '));
        }

        return chunks;
    }

    // Generate flashcards from content using AI
    async generateFlashcardsFromContent(content, config) {
        const { count, category, type, difficulty, aiProvider } = config;

        // Validate content
        if (!content || content.trim().length < 100) {
            throw new Error('Content is too short. Please provide at least 100 characters of content.');
        }

        // Check if content needs chunking
        const chunks = content.length > 4000 ? this.chunkContent(content, 3500) : [content];
        
        // Build prompt for AI
        const prompt = this.buildFlashcardPrompt(chunks[0], count, category, type, difficulty);

        try {
            let response;
            
            switch(aiProvider) {
                case 'claude':
                    if (!this.hasAnthropicKey()) {
                        throw new Error('Anthropic API key not configured. Please add it in Settings.');
                    }
                    response = await this.generateFlashcardsWithClaude(prompt);
                    break;
                    
                case 'gpt':
                    if (!this.hasOpenAIKey()) {
                        throw new Error('OpenAI API key not configured. Please add it in Settings.');
                    }
                    response = await this.generateFlashcardsWithChatGPT(prompt);
                    break;
                    
                case 'gemini':
                    if (!this.hasGeminiKey()) {
                        throw new Error('Google Gemini API key not configured. Please add it in Settings.');
                    }
                    response = await this.generateFlashcardsWithGemini(prompt);
                    break;
                    
                case 'huggingface':
                    if (!this.hasHuggingFaceKey()) {
                        throw new Error('Hugging Face API key not configured. Please add it in Settings.');
                    }
                    response = await this.generateFlashcardsWithHuggingFace(prompt);
                    break;
                    
                case 'groq':
                    if (!this.hasGroqKey()) {
                        throw new Error('Groq API key not configured. Please add it in Settings.');
                    }
                    response = await this.generateFlashcardsWithGroq(prompt);
                    break;
                    
                case 'ollama':
                    response = await this.generateFlashcardsWithOllama(prompt);
                    break;
                    
                default:
                    throw new Error('Invalid AI provider selected');
            }

            // Parse the response into flashcard objects
            return this.parseFlashcardResponse(response, category, type, difficulty);
        } catch (error) {
            console.error('Flashcard generation error:', error);
            throw error;
        }
    }

    // Build prompt for flashcard generation
    buildFlashcardPrompt(content, count, category, type, difficulty) {
        let prompt = `You are an expert educator creating interview preparation flashcards.

Content to analyze:
${content}

Task: Generate exactly ${count} high-quality interview questions and answers based on the content above.

Requirements:
- Job Role: ${category}
- Question Type: ${type === 'Mixed' ? 'Mix of Technical and Behavioral questions' : type}
- Difficulty Level: ${difficulty === 'Mixed' ? 'Mix of Easy, Medium, and Hard questions' : difficulty}
- Each question should be clear, specific, and relevant to ${category} interviews
- Each answer should be comprehensive, well-structured, and interview-ready
- Questions should test understanding of key concepts from the content
- Answers should demonstrate expertise and practical knowledge

Format your response as a JSON array with this exact structure:
[
  {
    "question": "The interview question here",
    "answer": "The comprehensive answer here",
    "type": "Technical" or "Behavioral",
    "difficulty": "Easy", "Medium", or "Hard",
    "tags": ["tag1", "tag2", "tag3"]
  }
]

Important:
- Return ONLY the JSON array, no additional text
- Generate exactly ${count} flashcards
- Ensure questions are diverse and cover different aspects of the content
- Make answers detailed enough to be useful for interview preparation
- Include 2-4 relevant tags for each flashcard`;

        return prompt;
    }

    // Generate flashcards with Claude
    async generateFlashcardsWithClaude(prompt) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.anthropicKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4000,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to generate flashcards with Claude');
        }

        const data = await response.json();
        return data.content[0].text;
    }

    // Generate flashcards with ChatGPT
    async generateFlashcardsWithChatGPT(prompt) {
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
                        content: 'You are an expert educator creating interview preparation flashcards. Always respond with valid JSON only.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 3000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to generate flashcards with ChatGPT');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Generate flashcards with Google Gemini (FREE)
    async generateFlashcardsWithGemini(prompt) {
        // Try gemini-1.5-flash-latest first, fallback to gemini-pro
        const models = ['gemini-1.5-flash-latest', 'gemini-pro'];
        let lastError = null;

        for (const model of models) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.geminiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 3000
                        }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.candidates[0].content.parts[0].text;
                }

                const error = await response.json();
                lastError = error;
            } catch (error) {
                lastError = error;
                continue;
            }
        }

        throw new Error(lastError?.error?.message || 'Failed to generate flashcards with Gemini. Please verify your API key is correct and try Groq as an alternative.');
    }

    // Generate flashcards with Hugging Face (FREE)
    async generateFlashcardsWithHuggingFace(prompt) {
        // Using Mistral-7B-Instruct model (free)
        const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.huggingfaceKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 3000,
                    temperature: 0.7,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate flashcards with Hugging Face');
        }

        const data = await response.json();
        return data[0].generated_text;
    }

    // Generate flashcards with Groq (FREE with high limits)
    async generateFlashcardsWithGroq(prompt) {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.groqKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile', // Current supported model - fast and free
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert educator creating interview preparation flashcards. Always respond with valid JSON only.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 3000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to generate flashcards with Groq');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Generate flashcards with Ollama (LOCAL - 100% FREE)
    async generateFlashcardsWithOllama(prompt) {
        try {
            const response = await fetch(`${this.ollamaUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama2', // or 'mistral', 'codellama', etc.
                    prompt: prompt,
                    stream: false,
                    options: {
                        temperature: 0.7,
                        num_predict: 3000
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Failed to connect to Ollama. Make sure Ollama is running locally.');
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            throw new Error('Ollama error: ' + error.message + '. Install Ollama from https://ollama.ai and run "ollama serve"');
        }
    }

    // Parse AI response into flashcard objects
    parseFlashcardResponse(response, defaultCategory, defaultType, defaultDifficulty) {
        try {
            // Try to extract JSON from response
            let jsonStr = response.trim();
            
            // Remove markdown code blocks if present
            jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            // Find JSON array in the response
            const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                jsonStr = jsonMatch[0];
            }

            const flashcards = JSON.parse(jsonStr);

            if (!Array.isArray(flashcards)) {
                throw new Error('Response is not an array');
            }

            // Process and validate each flashcard
            return flashcards.map((card, index) => {
                // Handle mixed difficulty
                let difficulty = card.difficulty || defaultDifficulty;
                if (defaultDifficulty === 'Mixed') {
                    const difficulties = ['Easy', 'Medium', 'Hard'];
                    difficulty = difficulties[index % 3];
                }

                // Handle mixed type
                let type = card.type || defaultType;
                if (defaultType === 'Mixed') {
                    type = index % 2 === 0 ? 'Technical' : 'Behavioral';
                }

                return {
                    id: Date.now() + index,
                    category: defaultCategory,
                    type: type,
                    difficulty: difficulty,
                    question: card.question || 'Question not provided',
                    answer: card.answer || 'Answer not provided',
                    tags: Array.isArray(card.tags) ? card.tags : [],
                    favorite: false,
                    answered: true // Mark as answered since AI generated the answer
                };
            });
        } catch (error) {
            console.error('Parse error:', error);
            throw new Error('Failed to parse AI response. Please try again.');
        }
    }

    // ===== CASE STUDY METHODS =====

    // Generate complete case study with questions and follow-ups
    async generateCompleteCaseStudy(config) {
        const { topic, category, complexity, questionCount, followUpTypes, aiProvider, existingScenario } = config;

        try {
            let scenario = existingScenario;

            // Step 1: Generate or use existing scenario
            if (!existingScenario) {
                scenario = await this.generateCaseStudyScenario(topic, category, complexity, aiProvider);
            }

            // Step 2: Generate main questions from scenario
            const mainQuestions = await this.generateCaseStudyQuestions(scenario, category, questionCount, aiProvider);

            // Step 3: Generate follow-up questions for each main question
            const questionsWithFollowUps = await this.generateAllFollowUps(mainQuestions, followUpTypes, category, aiProvider);

            return {
                scenario,
                questions: questionsWithFollowUps
            };
        } catch (error) {
            console.error('Case study generation error:', error);
            throw error;
        }
    }

    // Generate case study scenario
    async generateCaseStudyScenario(topic, category, complexity, aiProvider) {
        const prompt = `You are an expert interview coach creating realistic case study scenarios for ${category} interviews.

Topic: ${topic}
Complexity: ${complexity}

Create a detailed, realistic case study scenario that:
1. Presents a real-world business problem or technical challenge
2. Includes relevant context (company size, industry, constraints, etc.)
3. Is appropriate for ${category} role interviews
4. Matches ${complexity} complexity level
5. Provides enough detail for meaningful interview discussion
6. Is 300-500 words long

Return ONLY the case study scenario text, no additional formatting or JSON.`;

        let response;
        switch(aiProvider) {
            case 'claude':
                response = await this.generateWithClaudeRaw(prompt);
                break;
            case 'gpt':
                response = await this.generateWithChatGPTRaw(prompt);
                break;
            case 'gemini':
                response = await this.generateFlashcardsWithGemini(prompt);
                break;
            case 'groq':
                response = await this.generateWithGroqRaw(prompt);
                break;
            case 'huggingface':
                response = await this.generateFlashcardsWithHuggingFace(prompt);
                break;
            case 'ollama':
                response = await this.generateFlashcardsWithOllama(prompt);
                break;
            default:
                throw new Error('Invalid AI provider');
        }

        return response.trim();
    }

    // Generate main questions from case study
    async generateCaseStudyQuestions(scenario, category, count, aiProvider) {
        const prompt = `You are an expert interview coach creating interview questions based on a case study.

Case Study Scenario:
${scenario}

Job Role: ${category}

Generate exactly ${count} high-quality interview questions that:
1. Test the candidate's ability to analyze and solve the problem
2. Are specific to the case study scenario
3. Cover different aspects (technical approach, trade-offs, implementation, etc.)
4. Are appropriate for ${category} interviews
5. Require thoughtful, detailed answers

Format your response as a JSON array:
[
  {
    "question": "The interview question here",
    "answer": "Comprehensive answer demonstrating expertise"
  }
]

Return ONLY the JSON array, no additional text.`;

        let response;
        switch(aiProvider) {
            case 'claude':
                response = await this.generateWithClaudeRaw(prompt);
                break;
            case 'gpt':
                response = await this.generateWithChatGPTRaw(prompt);
                break;
            case 'gemini':
                response = await this.generateFlashcardsWithGemini(prompt);
                break;
            case 'groq':
                response = await this.generateWithGroqRaw(prompt);
                break;
            case 'huggingface':
                response = await this.generateFlashcardsWithHuggingFace(prompt);
                break;
            case 'ollama':
                response = await this.generateFlashcardsWithOllama(prompt);
                break;
            default:
                throw new Error('Invalid AI provider');
        }

        return this.parseJSONResponse(response);
    }

    // Generate follow-up questions for all main questions
    async generateAllFollowUps(mainQuestions, followUpTypes, category, aiProvider) {
        const questionsWithFollowUps = [];

        for (let i = 0; i < mainQuestions.length; i++) {
            const mainQ = mainQuestions[i];
            const followUps = await this.generateFollowUpQuestions(
                mainQ.question,
                mainQ.answer,
                followUpTypes,
                category,
                aiProvider
            );

            questionsWithFollowUps.push({
                ...mainQ,
                id: Date.now() + i,
                followUps: followUps
            });

            // Small delay to avoid rate limiting
            if (i < mainQuestions.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        return questionsWithFollowUps;
    }

    // Generate follow-up questions for a single main question
    async generateFollowUpQuestions(mainQuestion, mainAnswer, followUpTypes, category, aiProvider) {
        const types = [];
        if (followUpTypes.why) types.push('Why');
        if (followUpTypes.what) types.push('What');
        if (followUpTypes.how) types.push('How');
        if (followUpTypes.issues) types.push('Issues/Challenges');

        if (types.length === 0) return [];

        const prompt = `You are an expert interview coach creating follow-up questions for ${category} interviews.

Main Question: ${mainQuestion}
Main Answer: ${mainAnswer}

Generate follow-up questions for the following types: ${types.join(', ')}

For each type, create ONE insightful follow-up question that:
- Digs deeper into the main answer
- Tests understanding of underlying concepts
- Explores edge cases, trade-offs, or alternatives
- Is specific and relevant to ${category} role

Format your response as a JSON array:
[
  {
    "type": "Why" | "What" | "How" | "Issues",
    "question": "The follow-up question",
    "answer": "Comprehensive answer"
  }
]

Return ONLY the JSON array with exactly ${types.length} follow-up questions.`;

        let response;
        switch(aiProvider) {
            case 'claude':
                response = await this.generateWithClaudeRaw(prompt);
                break;
            case 'gpt':
                response = await this.generateWithChatGPTRaw(prompt);
                break;
            case 'gemini':
                response = await this.generateFlashcardsWithGemini(prompt);
                break;
            case 'groq':
                response = await this.generateWithGroqRaw(prompt);
                break;
            case 'huggingface':
                response = await this.generateFlashcardsWithHuggingFace(prompt);
                break;
            case 'ollama':
                response = await this.generateFlashcardsWithOllama(prompt);
                break;
            default:
                throw new Error('Invalid AI provider');
        }

        return this.parseJSONResponse(response);
    }

    // Helper methods for raw text generation
    async generateWithClaudeRaw(prompt) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.anthropicKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4000,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed with Claude');
        }

        const data = await response.json();
        return data.content[0].text;
    }

    async generateWithChatGPTRaw(prompt) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.openaiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are an expert interview coach. Always respond with valid JSON when requested.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 3000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed with ChatGPT');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async generateWithGroqRaw(prompt) {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.groqKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: 'You are an expert interview coach. Always respond with valid JSON when requested.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 3000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed with Groq');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Parse JSON from AI response
    parseJSONResponse(response) {
        try {
            let jsonStr = response.trim();
            jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                jsonStr = jsonMatch[0];
            }

            return JSON.parse(jsonStr);
        } catch (error) {
            console.error('JSON parse error:', error);
            throw new Error('Failed to parse AI response as JSON');
        }
    }
}

// Create global instance
const aiIntegration = new AIIntegration();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIIntegration, aiIntegration };
}
