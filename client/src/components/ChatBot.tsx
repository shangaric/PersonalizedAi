import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Fade,
  Collapse,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Send,
  Chat,
  Close,
  SmartToy,
  Person,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI career advisor. I can help you explore career paths, create learning roadmaps, and answer questions about skills and opportunities. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "What career paths are available in CSE?",
        "Help me create a learning roadmap",
        "What skills should I learn for AI/ML?",
        "Show me job market trends"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = generateBotResponse(inputText);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: botResponse.suggestions,
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const generateBotResponse = (userInput: string): { text: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('career') || input.includes('path')) {
      return {
        text: "Great question! Based on your CSE background, here are some popular career paths:\n\n• AI/ML Engineer - Build intelligent systems and machine learning models\n• Data Scientist - Extract insights from data using statistical methods\n• Cybersecurity Analyst - Protect systems from cyber threats\n• DevOps Engineer - Bridge development and operations\n• Full Stack Developer - Build complete web applications\n\nWhich of these interests you most? I can provide detailed information about any of them.",
        suggestions: [
          "Tell me more about AI/ML Engineer",
          "What skills do I need for Data Science?",
          "How do I get started in Cybersecurity?",
          "Create a roadmap for DevOps"
        ]
      };
    }
    
    if (input.includes('skill') || input.includes('learn')) {
      return {
        text: "Here are the essential skills you should focus on:\n\n**Programming Languages:**\n• Python (most important for AI/ML/Data Science)\n• JavaScript (for web development)\n• SQL (for data analysis)\n\n**Technical Skills:**\n• Machine Learning frameworks (TensorFlow, PyTorch)\n• Cloud platforms (AWS, Azure, GCP)\n• Version control (Git)\n• Database management\n\n**Soft Skills:**\n• Problem-solving\n• Communication\n• Continuous learning\n\nWhat specific area would you like to focus on?",
        suggestions: [
          "How do I learn Python effectively?",
          "What are the best ML courses?",
          "Help me with cloud computing",
          "Create a skill development plan"
        ]
      };
    }
    
    if (input.includes('roadmap') || input.includes('plan')) {
      return {
        text: "I'd be happy to help you create a learning roadmap! Here's a general structure:\n\n**Phase 1: Foundation (2-3 months)**\n• Learn Python programming\n• Understand basic mathematics and statistics\n• Get familiar with data structures\n\n**Phase 2: Specialization (3-4 months)**\n• Choose your focus area (AI/ML, Web Dev, etc.)\n• Learn relevant frameworks and tools\n• Work on small projects\n\n**Phase 3: Advanced (2-3 months)**\n• Build complex projects\n• Contribute to open source\n• Prepare for interviews\n\nWhat specific career path would you like a roadmap for?",
        suggestions: [
          "Create roadmap for AI/ML Engineer",
          "I want to be a Data Scientist",
          "Help me with Web Development path",
          "Show me Cybersecurity roadmap"
        ]
      };
    }
    
    if (input.includes('job') || input.includes('market') || input.includes('trend')) {
      return {
        text: "Here are the current job market trends in India:\n\n**High Demand Roles:**\n• AI/ML Engineers (₹8-25 LPA)\n• Data Scientists (₹9-22 LPA)\n• DevOps Engineers (₹7-20 LPA)\n• Cloud Architects (₹10-30 LPA)\n\n**Growing Skills:**\n• Cloud Computing (AWS, Azure)\n• Machine Learning\n• Cybersecurity\n• Blockchain\n\n**Top Companies Hiring:**\n• FAANG companies\n• Indian tech giants (TCS, Infosys, Wipro)\n• Startups (Flipkart, Zomato, Swiggy)\n\nWould you like specific information about any of these areas?",
        suggestions: [
          "What's the salary range for AI roles?",
          "Which companies are hiring freshers?",
          "How competitive is the job market?",
          "What certifications are valuable?"
        ]
      };
    }
    
    if (input.includes('certification') || input.includes('certificate')) {
      return {
        text: "Certifications can significantly boost your career! Here are the most valuable ones:\n\n**Cloud & DevOps:**\n• AWS Certified Solutions Architect\n• Google Cloud Professional\n• Kubernetes Administrator (CKA)\n\n**AI/ML:**\n• Google ML Engineer\n• AWS Machine Learning Specialty\n• Microsoft Azure AI Engineer\n\n**Cybersecurity:**\n• Certified Ethical Hacker (CEH)\n• CISSP\n• CompTIA Security+\n\n**Data Science:**\n• IBM Data Science Professional\n• Microsoft Azure Data Scientist\n\nWhich field interests you most for certification?",
        suggestions: [
          "Tell me about AWS certifications",
          "How to prepare for Google ML Engineer?",
          "What's the best cybersecurity cert?",
          "Are certifications worth it for freshers?"
        ]
      };
    }
    
    // Default response
    return {
      text: "I understand you're looking for career guidance. I can help you with:\n\n• Exploring different career paths in technology\n• Creating personalized learning roadmaps\n• Identifying skills you need to develop\n• Understanding job market trends and opportunities\n• Recommending courses and certifications\n\nWhat specific aspect of your career development would you like to discuss?",
      suggestions: [
        "What career paths are available?",
        "Help me create a learning plan",
        "What skills should I focus on?",
        "Show me job market insights"
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      {/* Chat Button */}
      {!isOpen && (
        <Fade in={!isOpen}>
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 56,
              height: 56,
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Chat />
          </IconButton>
        </Fade>
      )}

      {/* Chat Window */}
      <Collapse in={isOpen} orientation="vertical">
        <Paper
          sx={{
            width: 350,
            height: isExpanded ? 500 : 400,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 1 }}>
                <SmartToy />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Career Advisor
                </Typography>
                <Typography variant="caption">
                  AI Assistant
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{ color: 'white', mr: 1 }}
                size="small"
              >
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <IconButton
                onClick={() => setIsOpen(false)}
                sx={{ color: 'white' }}
                size="small"
              >
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 1,
              bgcolor: '#f5f5f5',
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '80%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.300',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      width: 32,
                      height: 32,
                      mr: message.sender === 'user' ? 0 : 1,
                      ml: message.sender === 'user' ? 1 : 0,
                    }}
                  >
                    {message.sender === 'user' ? <Person /> : <SmartToy />}
                  </Avatar>
                  <Box>
                    <Paper
                      sx={{
                        p: 1.5,
                        bgcolor: message.sender === 'user' ? 'primary.main' : 'white',
                        color: message.sender === 'user' ? 'white' : 'text.primary',
                        borderRadius: 2,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      <Typography variant="body2">
                        {message.text}
                      </Typography>
                    </Paper>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      {formatTime(message.timestamp)}
                    </Typography>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <Box sx={{ mt: 1, ml: 1 }}>
                        {message.suggestions.map((suggestion, index) => (
                          <Chip
                            key={index}
                            label={suggestion}
                            size="small"
                            onClick={() => handleSuggestionClick(suggestion)}
                            sx={{
                              mr: 0.5,
                              mb: 0.5,
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'primary.light',
                                color: 'white',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box sx={{ p: 1, bgcolor: 'white' }}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                placeholder="Ask me anything about careers..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                size="small"
                sx={{ mr: 1 }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                color="primary"
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default ChatBot;
