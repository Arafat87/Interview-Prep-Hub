# Free AI Setup Guide for Flashcard Generator

This guide explains how to use **100% FREE** AI models for generating flashcards, so you don't have to pay for API usage!

## 🆓 Free Options Available

### 1. **Google Gemini** (RECOMMENDED - Best Free Option)
- ✅ **Completely FREE** with generous limits
- ✅ High-quality responses (Gemini 1.5 Flash)
- ✅ Easy to set up
- ✅ 15 requests per minute free tier
- ✅ 1,500 requests per day

**How to Get Started:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy the key (starts with `AIza...`)
5. Paste it in Settings → "Google Gemini API Key"
6. Select "Google Gemini (FREE)" in the AI Provider dropdown
7. Start generating flashcards!

**Free Tier Limits:**
- 15 requests per minute
- 1,500 requests per day
- Uses Gemini 1.5 Flash model
- More than enough for personal use!

**Note:** If you see an error about model not found, make sure you're using the latest API key from https://aistudio.google.com/app/apikey

---

### 2. **Groq** (Super Fast & Free)
- ✅ **Completely FREE** 
- ✅ Extremely fast inference (fastest option!)
- ✅ Uses Mixtral-8x7B model
- ✅ 30 requests per minute

**How to Get Started:**
1. Go to [Groq Console](https://console.groq.com/keys)
2. Sign up for a free account
3. Create an API key
4. Copy the key (starts with `gsk_...`)
5. Paste it in Settings → "Groq API Key"
6. Select "Groq - Mixtral (FREE & Fast)" in the AI Provider dropdown

**Free Tier Limits:**
- 30 requests per minute
- 14,400 requests per day
- Blazing fast responses!

---

### 3. **Hugging Face** (Free Inference API)
- ✅ **Completely FREE**
- ✅ Access to many open-source models
- ✅ Uses Mistral-7B-Instruct
- ✅ Good quality responses

**How to Get Started:**
1. Go to [Hugging Face](https://huggingface.co/settings/tokens)
2. Sign up for a free account
3. Create a new token (Read access is enough)
4. Copy the token (starts with `hf_...`)
5. Paste it in Settings → "Hugging Face API Key"
6. Select "Hugging Face - Mistral (FREE)" in the AI Provider dropdown

**Free Tier Limits:**
- Rate limits apply but generous for personal use
- May have slower response times during peak hours

---

### 4. **Ollama** (100% FREE - Run Locally)
- ✅ **100% FREE** - No API keys needed!
- ✅ Complete privacy - runs on your computer
- ✅ No internet required after setup
- ✅ No rate limits
- ✅ Multiple models available (Llama 2, Mistral, CodeLlama, etc.)

**How to Get Started:**

**Step 1: Install Ollama**
1. Go to [ollama.ai](https://ollama.ai)
2. Download for your OS (Windows/Mac/Linux)
3. Install the application

**Step 2: Download a Model**
Open terminal/command prompt and run:
```bash
# Download Llama 2 (recommended for general use)
ollama pull llama2

# OR download Mistral (faster, good quality)
ollama pull mistral

# OR download CodeLlama (best for technical content)
ollama pull codellama
```

**Step 3: Start Ollama Server**
```bash
ollama serve
```
This will start the server at `http://localhost:11434`

**Step 4: Configure in App**
1. In Settings, the Ollama URL should be: `http://localhost:11434`
2. Select "Ollama - Local (100% FREE)" in the AI Provider dropdown
3. Start generating flashcards!

**Advantages:**
- ✅ Completely free forever
- ✅ No API keys needed
- ✅ Works offline
- ✅ Complete privacy
- ✅ No rate limits

**Requirements:**
- At least 8GB RAM (16GB recommended)
- 4-7GB disk space per model
- Decent CPU/GPU for faster generation

---

## 💳 Paid Options (For Reference)

### OpenAI ChatGPT
- Requires payment
- High quality but expensive
- ~$0.03 per 1K tokens

### Anthropic Claude
- Requires payment
- Excellent quality
- ~$0.015 per 1K tokens

---

## Comparison Table

| Provider | Cost | Speed | Quality | Setup Difficulty | Rate Limits |
|----------|------|-------|---------|------------------|-------------|
| **Google Gemini** | FREE ✅ | Fast | Excellent | Easy | 60/min |
| **Groq** | FREE ✅ | Very Fast | Good | Easy | 30/min |
| **Hugging Face** | FREE ✅ | Medium | Good | Easy | Moderate |
| **Ollama** | FREE ✅ | Medium | Good | Medium | None |
| OpenAI | Paid 💳 | Fast | Excellent | Easy | Varies |
| Anthropic | Paid 💳 | Fast | Excellent | Easy | Varies |

---

## Recommended Setup

### For Best Experience (FREE):
1. **Primary**: Use **Google Gemini** - Best balance of quality and ease
2. **Backup**: Set up **Groq** for when you need faster responses
3. **Offline**: Install **Ollama** for complete privacy and offline use

### Quick Start (Easiest):
1. Get a **Google Gemini** API key (takes 2 minutes)
2. Paste it in Settings
3. Start generating flashcards!

### Privacy-Focused (Best for Sensitive Content):
1. Install **Ollama**
2. Download a model (`ollama pull llama2`)
3. Run `ollama serve`
4. Use completely offline!

---

## Troubleshooting

### Google Gemini
**Error: "API key not valid"**
- Make sure you copied the entire key
- Check if you're using the correct Google account
- Try creating a new API key

### Groq
**Error: "Rate limit exceeded"**
- Wait 1 minute and try again
- Free tier: 30 requests per minute

### Hugging Face
**Error: "Model is loading"**
- Wait 20-30 seconds and try again
- Free tier models may need to "wake up"

### Ollama
**Error: "Failed to connect to Ollama"**
- Make sure Ollama is installed
- Run `ollama serve` in terminal
- Check if URL is `http://localhost:11434`
- Make sure a model is downloaded (`ollama pull llama2`)

**Slow generation:**
- Normal for local models
- Upgrade RAM or use GPU acceleration
- Try a smaller model like `mistral`

---

## Cost Comparison Example

**Generating 100 flashcards:**

| Provider | Cost |
|----------|------|
| Google Gemini | $0.00 ✅ |
| Groq | $0.00 ✅ |
| Hugging Face | $0.00 ✅ |
| Ollama | $0.00 ✅ |
| OpenAI GPT-4 | ~$3.00 💸 |
| Anthropic Claude | ~$1.50 💸 |

**Generating 1,000 flashcards per month:**

| Provider | Monthly Cost |
|----------|--------------|
| Google Gemini | $0.00 ✅ |
| Groq | $0.00 ✅ |
| Hugging Face | $0.00 ✅ |
| Ollama | $0.00 ✅ |
| OpenAI GPT-4 | ~$30.00 💸 |
| Anthropic Claude | ~$15.00 💸 |

---

## My Recommendation

**Start with Google Gemini:**
1. Takes only 2 minutes to set up
2. Excellent quality
3. Generous free tier
4. No credit card required
5. Perfect for students and personal use

**Then add Ollama for:**
- Offline use
- Complete privacy
- No rate limits
- Learning about local AI

---

## Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Verify your API key is correct
3. Check rate limits
4. Try a different provider
5. For Ollama, make sure the server is running

Happy flashcard generating! 🎉
