const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const ragService = require('../services/ragService');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, userId, context } = req.body;

    // Get user context for personalization
    const userContext = context || {};

    // Search for relevant career information
    const relevantInfo = await ragService.searchSimilarCareers(message, userContext.currentField, 3);

    // Create context for the AI
    const systemPrompt = `You are a personalized AI career advisor for Indian students. 
    
    User Context:
    - Field: ${userContext.currentField || 'Not specified'}
    - Experience Level: ${userContext.experienceLevel || 'Not specified'}
    - Interests: ${userContext.interests?.join(', ') || 'Not specified'}
    - Skills: ${userContext.skills?.map(s => `${s.name} (${s.level})`).join(', ') || 'Not specified'}

    Relevant Career Information:
    ${JSON.stringify(relevantInfo, null, 2)}

    Provide helpful, personalized career advice. Be specific about:
    1. Career paths that match their profile
    2. Skills they should develop
    3. Learning roadmaps and resources
    4. Job market insights for India
    5. Salary expectations and company recommendations

    Keep responses conversational and actionable.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    res.json({
      message: response.choices[0].message.content,
      suggestions: generateSuggestions(message, userContext)
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      message: 'I apologize, but I encountered an error. Please try again.',
      error: error.message 
    });
  }
});

// Get conversation suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const { userId, context } = req.query;
    
    const suggestions = generateSuggestions('', context ? JSON.parse(context) : {});
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suggestions', error: error.message });
  }
});

function generateSuggestions(message, userContext) {
  const baseSuggestions = [
    "What career paths are available in my field?",
    "Help me create a learning roadmap",
    "What skills should I focus on?",
    "Show me job market trends",
    "What certifications are valuable?",
    "How do I prepare for interviews?"
  ];

  // Add personalized suggestions based on context
  if (userContext.currentField === 'CSE') {
    baseSuggestions.push(
      "Tell me about AI/ML career opportunities",
      "What's the demand for cybersecurity roles?",
      "How do I get started in DevOps?",
      "Show me data science career paths"
    );
  }

  if (userContext.experienceLevel === 'beginner') {
    baseSuggestions.push(
      "What should I learn first as a beginner?",
      "How do I build my first project?",
      "What are the best beginner courses?",
      "How do I get my first internship?"
    );
  }

  if (userContext.interests?.includes('Artificial Intelligence')) {
    baseSuggestions.push(
      "What's the AI job market like in India?",
      "How do I transition to AI/ML?",
      "What AI projects should I build?",
      "Tell me about AI certifications"
    );
  }

  return baseSuggestions.slice(0, 6); // Return top 6 suggestions
}

module.exports = router;
