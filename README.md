<<<<<<< HEAD
# PersonalizedAi
=======
# 🎯 Personalized AI Career Advisor

An intelligent platform that provides personalized career guidance and learning roadmaps for Indian students, helping them navigate the evolving job market with AI-powered insights and recommendations.

![Platform Preview](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-orange)
![AI](https://img.shields.io/badge/AI-OpenAI%20GPT--4-purple)
![Database](https://img.shields.io/badge/Database-MongoDB%20%2B%20ChromaDB-green)

## 🌟 Features

### 🤖 AI-Powered Personalization
- **RAG System**: Real-time career data fetching using ChromaDB vector database
- **Smart Recommendations**: GPT-4 powered career path suggestions based on user profile
- **Semantic Search**: Find relevant careers using natural language queries
- **Context-Aware Chatbot**: 24/7 AI assistant for career guidance

### 📊 Career Exploration
- **Interactive Dashboard**: Beautiful UI with career match scores and progress tracking
- **Field-Based Filtering**: Browse careers by engineering fields (CSE, ECE, Mechanical, etc.)
- **Domain Specialization**: Explore specific domains like AI/ML, Cybersecurity, DevOps, Data Science
- **Real-time Market Data**: Latest salary ranges, job demand, and company insights

### 🛤️ Learning Roadmaps
- **Phase-Based Learning**: Structured learning paths with clear milestones
- **Progress Tracking**: Visual progress indicators and completion tracking
- **Resource Recommendations**: Curated courses, books, and projects
- **Skill Mapping**: Three-tier proficiency system (Practitioner, Intermediate, Professional)

### 📅 Smart Scheduling
- **Google Calendar Integration**: Schedule learning sessions and track progress
- **Task Management**: Google Tasks integration for milestone tracking
- **Reminder System**: Automated notifications for learning goals
- **Progress Analytics**: Detailed insights into learning patterns

### 👤 Profile Management
- **Comprehensive Profiles**: Skills, interests, career goals, and learning preferences
- **Skill Gap Analysis**: Identify missing skills for target careers
- **Learning Preferences**: Customize learning style, format, and time commitment
- **Career Goals Tracking**: Set and monitor long-term career objectives

## 🏗️ Architecture

### Backend Stack
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - User data and career information storage
- **ChromaDB** - Vector database for semantic search and RAG
- **OpenAI GPT-4** - AI-powered recommendations and chatbot
- **Google Cloud APIs** - Calendar and Tasks integration
- **JWT Authentication** - Secure user authentication

### Frontend Stack
- **React.js 19** with **TypeScript** - Modern, type-safe frontend
- **Material-UI v7** - Beautiful, responsive UI components
- **React Router** - Client-side routing
- **Recharts** - Data visualization and analytics
- **Axios** - HTTP client for API communication

### AI & ML Components
- **LangChain** - AI application framework
- **OpenAI Embeddings** - Text vectorization for semantic search
- **RAG Pipeline** - Retrieval-Augmented Generation for accurate recommendations
- **Vector Search** - Similarity-based career matching

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Python 3.8+ (for ChromaDB)
- OpenAI API Key
- Google Cloud Project (for Calendar integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personalized-career-advisor.git
   cd personalized-career-advisor
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your API keys
   nano .env
   ```

   Required environment variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/career-advisor
   OPENAI_API_KEY=your-openai-api-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   JWT_SECRET=your-jwt-secret-key
   CHROMA_HOST=localhost
   CHROMA_PORT=8000
   ```

4. **Set up databases**
   ```bash
   # Start MongoDB (if using local instance)
   mongod
   
   # Install and start ChromaDB
   pip install chromadb
   chroma run --host localhost --port 8000
   ```

5. **Start the application**
   ```bash
   # Start backend server
   npm run dev
   
   # In another terminal, start frontend
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
personalized-career-advisor/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CareerExplorer.tsx
│   │   │   ├── LearningRoadmap.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── ChatBot.tsx
│   │   │   └── Navbar.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
├── models/                     # MongoDB models
│   ├── User.js
│   ├── CareerPath.js
│   └── LearningRoadmap.js
├── routes/                     # API routes
│   ├── auth.js
│   ├── careers.js
│   ├── skills.js
│   ├── roadmaps.js
│   ├── chat.js
│   └── calendar.js
├── services/                   # Business logic
│   └── ragService.js          # RAG system implementation
├── server.js                  # Express server
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile/:userId` - Get user profile
- `PUT /api/auth/profile/:userId` - Update user profile

### Careers
- `GET /api/careers/field/:field` - Get careers by field
- `GET /api/careers/domain/:domain` - Get careers by domain
- `POST /api/careers/recommendations` - Get AI recommendations
- `GET /api/careers/search/:query` - Search careers
- `GET /api/careers/trending/skills` - Get trending skills

### Skills
- `GET /api/skills/user/:userId` - Get user skills
- `POST /api/skills/user/:userId` - Add/update skill
- `DELETE /api/skills/user/:userId/:skillName` - Remove skill
- `POST /api/skills/recommendations` - Get skill recommendations
- `POST /api/skills/gap-analysis` - Analyze skill gaps

### Learning Roadmaps
- `GET /api/roadmaps/user/:userId` - Get user roadmaps
- `POST /api/roadmaps` - Create new roadmap
- `GET /api/roadmaps/:id` - Get roadmap details
- `PUT /api/roadmaps/:id/progress` - Update progress
- `DELETE /api/roadmaps/:id` - Delete roadmap

### AI Chat
- `POST /api/chat` - Send message to AI chatbot
- `GET /api/chat/suggestions` - Get conversation suggestions

### Calendar Integration
- `GET /api/calendar/events/:userId` - Get calendar events
- `POST /api/calendar/events/:userId` - Create learning event
- `POST /api/calendar/schedule/:userId` - Create learning schedule
- `GET /api/calendar/auth-url` - Get Google OAuth URL
- `POST /api/calendar/auth-callback` - Handle OAuth callback

## 🤖 RAG System Implementation

### Vector Database (ChromaDB)
```javascript
// Initialize ChromaDB collection
const collection = await this.chroma.getOrCreateCollection({
  name: 'career_requirements',
  metadata: { description: 'Latest career requirements and job market data' }
});

// Add documents with embeddings
await this.collection.add({
  ids,
  embeddings,
  documents: texts,
  metadatas: documents.map(doc => ({
    type: doc.type || 'career_data',
    lastUpdated: doc.lastUpdated || new Date().toISOString()
  }))
});
```

### Semantic Search
```javascript
// Search for similar careers
const results = await this.collection.query({
  queryEmbeddings: queryEmbedding,
  nResults: limit,
  where: field ? { field } : undefined
});
```

### AI Recommendations
```javascript
// Generate personalized recommendations using GPT-4
const response = await this.openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: prompt }],
  max_tokens: 1500,
  temperature: 0.7
});
```

## 🎨 UI Components

### Dashboard
- Personalized overview with career match scores
- Skills progress visualization
- Learning roadmap preview
- Quick access to recommendations

### Career Explorer
- Interactive career cards with detailed information
- Advanced filtering by field, domain, and skills
- Salary ranges and job market insights
- One-click roadmap creation

### Learning Roadmaps
- Visual progress tracking with stepper component
- Milestone management and completion tracking
- Resource recommendations and scheduling
- Calendar integration for learning sessions

### AI Chatbot
- Context-aware conversations
- Personalized career advice
- Learning support and guidance
- Integration throughout the platform

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Google OAuth integration
- Secure API endpoints
- Input validation and sanitization
- CORS configuration

## 🚀 Deployment

### Production Setup

1. **Set up MongoDB Atlas**
   ```bash
   # Create cluster on MongoDB Atlas
   # Get connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/career-advisor
   ```

2. **Deploy Backend**
   ```bash
   # Deploy to Heroku, AWS, or DigitalOcean
   git push heroku main
   ```

3. **Deploy Frontend**
   ```bash
   # Deploy to Netlify, Vercel, or AWS S3
   cd client
   npm run build
   # Upload build folder to hosting service
   ```

4. **Set up ChromaDB**
   ```bash
   # Use ChromaDB Cloud or self-hosted instance
   CHROMA_HOST=your-chroma-host
   CHROMA_PORT=8000
   ```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-production-jwt-secret
CHROMA_HOST=your-chroma-host
CHROMA_PORT=8000
```

## 📊 Data Sources

The RAG system fetches data from:
- **Naukri.com** - Job market trends and requirements
- **LinkedIn Learning** - Skills trends and course data
- **Indeed India** - Salary data and job postings
- **Glassdoor India** - Company reviews and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 API and embeddings
- **Google Cloud** for Calendar and Tasks APIs
- **Material-UI** for the component library
- **ChromaDB** for vector database capabilities
- **MongoDB** for data storage
- **React** team for the amazing framework

## 📞 Support

For support and questions:
- Open an issue in the repository
- Contact the development team
- Check the documentation

## 🎯 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with more job portals
- [ ] Machine learning for better recommendations
- [ ] Video interview preparation
- [ ] Networking features
- [ ] Mentorship matching
- [ ] Industry-specific roadmaps

---

**Built with ❤️ for Indian students pursuing their career dreams**

*Empowering the next generation of tech professionals with AI-driven career guidance*
>>>>>>> f412e8b (Initial commit: project setup)
