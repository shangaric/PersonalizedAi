# Personalized Career and Skills Advisor 🎯

An AI-powered platform that provides personalized career guidance and learning roadmaps for Indian students, helping them navigate the evolving job market with confidence.

## 🌟 Features

### Core Functionality
- **Personalized Career Recommendations** - AI-driven career path suggestions based on user profile
- **Interactive Career Explorer** - Browse and filter career paths by field, domain, and skills
- **Learning Roadmaps** - Detailed, phase-based learning paths with milestones and resources
- **Skills Mapping** - Track skill development across different proficiency levels
- **AI Chatbot** - 24/7 career guidance and learning support
- **Google Calendar Integration** - Schedule learning sessions and track progress
- **Real-time Job Market Data** - RAG system with latest career requirements and trends

### Technology Stack
- **Backend**: Node.js, Express.js, MongoDB, OpenAI GPT-4
- **Frontend**: React.js, TypeScript, Material-UI
- **AI/ML**: LangChain, ChromaDB (Vector Database)
- **Cloud**: Google Cloud APIs (Calendar, Tasks)
- **Authentication**: JWT, Google OAuth

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- OpenAI API Key
- Google Cloud Project (for Calendar integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personalizedai
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your credentials:
   ```env
   MONGODB_URI=mongodb://localhost:27017/career-advisor
   OPENAI_API_KEY=your-openai-api-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the application**
   ```bash
   # Start backend
   npm run dev
   
   # Start frontend (in another terminal)
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
personalizedai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.tsx        # Main app component
│   │   └── index.tsx      # Entry point
├── models/                 # MongoDB models
│   ├── User.js
│   ├── CareerPath.js
│   └── LearningRoadmap.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── careers.js
│   ├── skills.js
│   ├── roadmaps.js
│   ├── chat.js
│   └── calendar.js
├── services/               # Business logic
│   └── ragService.js      # RAG system
├── server.js              # Express server
└── package.json
```

## 🎯 Key Components

### 1. RAG System (`services/ragService.js`)
- Fetches latest career data from job portals
- Uses ChromaDB for vector storage and semantic search
- Generates personalized recommendations using OpenAI

### 2. Career Explorer
- Interactive dashboard for exploring career paths
- Filter by field (CSE, ECE, etc.) and domain
- Detailed career information with skills and salary data

### 3. Learning Roadmaps
- Phase-based learning paths
- Progress tracking with milestones
- Resource recommendations and scheduling

### 4. AI Chatbot
- Context-aware conversations
- Personalized career advice
- Integration throughout the learning process

### 5. Google Calendar Integration
- Schedule learning sessions
- Progress reminders
- Task management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile/:userId` - Get user profile

### Careers
- `GET /api/careers/field/:field` - Get careers by field
- `POST /api/careers/recommendations` - Get AI recommendations
- `GET /api/careers/search/:query` - Search careers

### Skills
- `GET /api/skills/user/:userId` - Get user skills
- `POST /api/skills/user/:userId` - Add/update skill
- `POST /api/skills/recommendations` - Get skill recommendations

### Roadmaps
- `GET /api/roadmaps/user/:userId` - Get user roadmaps
- `POST /api/roadmaps` - Create new roadmap
- `PUT /api/roadmaps/:id/progress` - Update progress

### Chat
- `POST /api/chat` - Send message to AI chatbot
- `GET /api/chat/suggestions` - Get conversation suggestions

### Calendar
- `GET /api/calendar/events/:userId` - Get calendar events
- `POST /api/calendar/events/:userId` - Create learning event
- `POST /api/calendar/schedule/:userId` - Create learning schedule

## 🎨 UI Features

### Dashboard
- Personalized overview with career match scores
- Skills progress tracking
- Learning roadmap preview
- Quick access to recommendations

### Career Explorer
- Interactive career cards with detailed information
- Advanced filtering and search
- Salary ranges and job market insights
- One-click roadmap creation

### Learning Roadmaps
- Visual progress tracking with stepper component
- Milestone management
- Resource recommendations
- Calendar integration

### Profile Management
- Comprehensive user profile
- Skills and interests management
- Learning preferences configuration
- Career goals tracking

## 🤖 AI Features

### Personalized Recommendations
- Career path matching based on user profile
- Skill gap analysis
- Learning resource recommendations
- Job market insights

### Intelligent Chatbot
- Context-aware responses
- Career guidance and advice
- Learning support
- Progress tracking assistance

### RAG System
- Real-time career data updates
- Semantic search capabilities
- Personalized content generation
- Market trend analysis

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Google OAuth integration
- Secure API endpoints
- Input validation and sanitization

## 🚀 Deployment

### Production Setup
1. Set up MongoDB Atlas or self-hosted MongoDB
2. Configure environment variables for production
3. Set up Google Cloud project and OAuth credentials
4. Deploy backend to cloud platform (Heroku, AWS, etc.)
5. Deploy frontend to CDN (Netlify, Vercel, etc.)

### Environment Variables
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-production-jwt-secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Google Cloud for Calendar and Tasks APIs
- Material-UI for the component library
- ChromaDB for vector database capabilities

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for Indian students pursuing their career dreams**
