# 📚 Case Study Feature Guide

## Overview

The Case Study feature allows you to generate comprehensive interview case studies with AI-powered questions and follow-up questions. This is perfect for practicing real-world problem-solving scenarios in interviews.

## Features

### 🎯 Three Ways to Create Case Studies

1. **AI Generate** - Let AI create a complete case study scenario
2. **Upload File** - Upload PDF, DOCX, or TXT files with case study content
3. **Paste Text** - Paste your own case study scenario

### 🤖 AI-Powered Generation

- **Main Questions**: 3-8 interview questions based on the case study
- **Follow-up Questions**: For each main question, generate:
  - **Why** questions - Explore reasoning and rationale
  - **What** questions - Clarify concepts and alternatives
  - **How** questions - Dive into implementation details
  - **Issues/Challenges** questions - Discuss edge cases and problems

### 💾 Data Management

- Save case studies to localStorage
- Export case studies as JSON
- Filter by job category
- Delete individual case studies

## How to Use

### Step 1: Access Case Studies

1. Click the **"Case Studies"** tab in the main navigation
2. Click **"Generate Case Study"** button

### Step 2: Choose Input Method

**Option A: AI Generate**
1. Select "AI Generate" tab
2. Enter a topic (e.g., "Building a recommendation system")
3. Choose complexity level (Basic/Intermediate/Advanced)

**Option B: Upload File**
1. Select "Upload File" tab
2. Drag & drop or click to upload PDF/DOCX/TXT file
3. Wait for text extraction

**Option C: Paste Text**
1. Select "Paste Text" tab
2. Paste your case study content
3. Minimum 100 characters required

### Step 3: Configure Settings

- **Job Category**: Select the relevant role
- **Number of Main Questions**: 3-8 questions (slider)
- **Follow-up Types**: Check which types you want:
  - ☑️ Why Questions
  - ☑️ What Questions
  - ☑️ How Questions
  - ☑️ Issues/Challenges
- **AI Provider**: Choose from FREE options (Groq recommended) or paid

### Step 4: Generate

1. Click **"Generate Case Study"**
2. Wait for AI to:
   - Create/analyze the scenario
   - Generate main questions with answers
   - Generate follow-up questions for each main question
3. Review the preview

### Step 5: Review & Save

1. Review the generated case study
2. Check all questions and answers
3. Click **"Save Case Study"** to add to your collection

## Viewing Case Studies

### Case Study Card

Each card shows:
- Job category badge
- Case study title
- Scenario excerpt (first 150 characters)
- Number of main questions
- Number of follow-up questions
- Delete button

### Case Study Viewer

Click any case study card to open the full viewer:

1. **Scenario Section**: Full case study description
2. **Questions Tree**: Expandable question structure
   - Main question with answer
   - Click chevron to expand/collapse follow-ups
   - Color-coded follow-up types:
     - 🟣 Purple: Why questions
     - 🔴 Pink: What questions
     - 🔵 Blue: How questions
     - 🟡 Yellow: Issues/Challenges

## Example Use Cases

### For AI Engineer Interview

**Topic**: "Designing a chatbot with NLP"

**Generated Structure**:
```
📄 Scenario: Company needs chatbot for customer support...

❓ Main Q1: How would you design the NLP pipeline?
   💬 Answer: [Comprehensive answer]
   
   ↳ Why: Why choose transformer models over RNNs?
   ↳ What: What preprocessing steps are essential?
   ↳ How: How would you handle multilingual support?
   ↳ Issues: What challenges might arise with ambiguous queries?

❓ Main Q2: How would you evaluate the chatbot's performance?
   💬 Answer: [Comprehensive answer]
   
   ↳ Why: Why is BLEU score not sufficient?
   ↳ What: What metrics would you track?
   ↳ How: How would you implement A/B testing?
   ↳ Issues: What are common pitfalls in chatbot evaluation?
```

### For Data Scientist Interview

**Topic**: "Building a fraud detection system"

Generates questions about:
- Model selection and architecture
- Feature engineering
- Handling imbalanced data
- Real-time vs batch processing
- Model monitoring and updates

## Tips for Best Results

### 1. **Be Specific with Topics**
   - ❌ Bad: "Machine learning"
   - ✅ Good: "Building a recommendation system for e-commerce"

### 2. **Choose Appropriate Complexity**
   - **Basic**: Entry-level, simple scenarios
   - **Intermediate**: Mid-level, moderate complexity
   - **Advanced**: Senior-level, multi-faceted problems

### 3. **Select Relevant Follow-ups**
   - For technical deep-dives: Enable all types
   - For quick review: Select only Why and How
   - For problem-solving focus: Enable Issues/Challenges

### 4. **Use FREE AI Providers**
   - **Groq** (Recommended): Fast, reliable, generous free tier
   - **Gemini**: Good alternative, completely free
   - **Hugging Face**: Free inference API
   - **Ollama**: 100% free, runs locally

## AI Provider Comparison

| Provider | Speed | Quality | Free Tier | Best For |
|----------|-------|---------|-----------|----------|
| Groq | ⚡⚡⚡ | ⭐⭐⭐⭐ | Generous | **Recommended** |
| Gemini | ⚡⚡ | ⭐⭐⭐⭐ | Unlimited | Alternative |
| Hugging Face | ⚡ | ⭐⭐⭐ | Good | Backup |
| Ollama | ⚡⚡ | ⭐⭐⭐ | Unlimited | Privacy |
| Claude | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Paid | Premium |
| ChatGPT | ⚡⚡ | ⭐⭐⭐⭐⭐ | Paid | Premium |

## Keyboard Shortcuts

- **Esc**: Close any modal
- **Enter**: Submit forms
- **Click Scenario**: Copy to clipboard (future feature)

## Data Storage

Case studies are stored in browser localStorage:
- Key: `case_studies`
- Format: JSON array
- Persists across sessions
- Export regularly to backup

## Troubleshooting

### Issue: "Content is too short"
**Solution**: Provide at least 100 characters of content

### Issue: "Failed to generate"
**Solution**: 
- Check API key is configured
- Try different AI provider
- Check internet connection
- Verify content is relevant

### Issue: "No follow-ups generated"
**Solution**:
- Ensure at least one follow-up type is checked
- Try regenerating with different settings
- Check AI provider has sufficient quota

### Issue: "Case study not saving"
**Solution**:
- Check browser localStorage is not full
- Try exporting and clearing old data
- Disable browser extensions that block storage

## Best Practices

1. **Start Simple**: Begin with AI-generated scenarios
2. **Iterate**: Regenerate if quality isn't satisfactory
3. **Customize**: Upload your own case studies for specific prep
4. **Practice Out Loud**: Don't just read - speak your answers
5. **Review Follow-ups**: These test deeper understanding
6. **Export Regularly**: Backup your case studies
7. **Mix Complexity**: Practice various difficulty levels

## Advanced Tips

### Creating Custom Case Studies

1. Find real company case studies online
2. Copy the scenario text
3. Use "Paste Text" option
4. Let AI generate relevant questions
5. Review and save

### Preparing for Specific Companies

1. Research company's tech stack
2. Create case studies around their technologies
3. Generate questions specific to their domain
4. Practice with follow-ups to show deep knowledge

### Using with Team

1. Generate case studies
2. Export as JSON
3. Share with study group
4. Import on their devices
5. Practice together

## Future Enhancements (Planned)

- [ ] Add case study templates
- [ ] Enable editing saved case studies
- [ ] Add difficulty ratings
- [ ] Include time estimates
- [ ] Add practice mode with timer
- [ ] Generate additional follow-ups on demand
- [ ] Add notes/comments feature
- [ ] Enable case study sharing via link

## Support

For issues or questions:
1. Check this guide
2. Review TESTING_GUIDE.md
3. Check browser console (F12) for errors
4. Try different AI provider
5. Export data before troubleshooting

---

**Ready to practice?** Generate your first case study and ace that interview! 🚀
