const { ChromaClient } = require('chromadb');
const { OpenAI } = require('openai');
const axios = require('axios');

class RAGService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.chroma = new ChromaClient({
      path: `http://${process.env.CHROMA_HOST || 'localhost'}:${process.env.CHROMA_PORT || 8000}`
    });
    this.collection = null;
    this.initializeCollection();
  }

  async initializeCollection() {
    try {
      this.collection = await this.chroma.getOrCreateCollection({
        name: 'career_requirements',
        metadata: { description: 'Latest career requirements and job market data' }
      });
    } catch (error) {
      console.error('Error initializing ChromaDB collection:', error);
    }
  }

  async fetchLatestCareerData() {
    const sources = [
      {
        name: 'Naukri.com',
        url: 'https://www.naukri.com/top-skill-jobs',
        type: 'job_market'
      },
      {
        name: 'LinkedIn Learning',
        url: 'https://www.linkedin.com/learning',
        type: 'skills_trends'
      },
      {
        name: 'Indeed India',
        url: 'https://in.indeed.com',
        type: 'salary_data'
      },
      {
        name: 'Glassdoor India',
        url: 'https://www.glassdoor.co.in',
        type: 'company_reviews'
      }
    ];

    const careerData = [];

    for (const source of sources) {
      try {
        const data = await this.scrapeCareerData(source);
        careerData.push(...data);
      } catch (error) {
        console.error(`Error fetching data from ${source.name}:`, error);
      }
    }

    return careerData;
  }

  async scrapeCareerData(source) {
    // This is a simplified version - in production, you'd use proper web scraping
    // For now, we'll create mock data based on real trends
    const mockData = this.generateMockCareerData(source.type);
    return mockData;
  }

  generateMockCareerData(type) {
    const baseData = {
      job_market: [
        {
          title: 'AI/ML Engineer',
          field: 'CSE',
          domain: 'Artificial Intelligence',
          skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'],
          demand: 'very-high',
          salary: { min: 800000, max: 2500000 },
          companies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys'],
          lastUpdated: new Date()
        },
        {
          title: 'Cybersecurity Analyst',
          field: 'CSE',
          domain: 'Cybersecurity',
          skills: ['Network Security', 'Ethical Hacking', 'SIEM', 'Risk Assessment', 'Compliance'],
          demand: 'high',
          salary: { min: 600000, max: 1800000 },
          companies: ['IBM', 'Accenture', 'Wipro', 'HCL', 'Cognizant'],
          lastUpdated: new Date()
        },
        {
          title: 'DevOps Engineer',
          field: 'CSE',
          domain: 'DevOps',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
          demand: 'high',
          salary: { min: 700000, max: 2000000 },
          companies: ['Amazon', 'Microsoft', 'Google', 'TCS', 'Infosys'],
          lastUpdated: new Date()
        },
        {
          title: 'Data Scientist',
          field: 'CSE',
          domain: 'Data Science',
          skills: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization'],
          demand: 'very-high',
          salary: { min: 900000, max: 2200000 },
          companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Zomato'],
          lastUpdated: new Date()
        }
      ],
      skills_trends: [
        {
          skill: 'Python',
          trend: 'growing',
          demand: 'very-high',
          applications: ['AI/ML', 'Data Science', 'Web Development', 'Automation']
        },
        {
          skill: 'Cloud Computing',
          trend: 'explosive',
          demand: 'very-high',
          applications: ['DevOps', 'Software Development', 'Data Engineering']
        },
        {
          skill: 'Cybersecurity',
          trend: 'growing',
          demand: 'high',
          applications: ['Security Analysis', 'Risk Management', 'Compliance']
        }
      ],
      salary_data: [
        {
          role: 'Software Engineer',
          experience: '0-2 years',
          salary: { min: 400000, max: 800000 },
          location: 'Bangalore'
        },
        {
          role: 'Senior Software Engineer',
          experience: '3-5 years',
          salary: { min: 800000, max: 1500000 },
          location: 'Bangalore'
        }
      ]
    };

    return baseData[type] || [];
  }

  async addDocumentsToVectorStore(documents) {
    if (!this.collection) {
      await this.initializeCollection();
    }

    const texts = documents.map(doc => JSON.stringify(doc));
    const embeddings = await this.generateEmbeddings(texts);
    const ids = documents.map((_, index) => `doc_${Date.now()}_${index}`);

    await this.collection.add({
      ids,
      embeddings,
      documents: texts,
      metadatas: documents.map(doc => ({
        type: doc.type || 'career_data',
        lastUpdated: doc.lastUpdated || new Date().toISOString()
      }))
    });
  }

  async generateEmbeddings(texts) {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: texts
    });

    return response.data.map(item => item.embedding);
  }

  async searchSimilarCareers(query, field = null, limit = 5) {
    if (!this.collection) {
      await this.initializeCollection();
    }

    const queryEmbedding = await this.generateEmbeddings([query]);
    
    const results = await this.collection.query({
      queryEmbeddings: queryEmbedding,
      nResults: limit,
      where: field ? { field } : undefined
    });

    return results.documents[0].map((doc, index) => ({
      content: JSON.parse(doc),
      distance: results.distances[0][index],
      metadata: results.metadatas[0][index]
    }));
  }

  async getCareerRecommendations(userProfile) {
    const query = `User interested in ${userProfile.interests.join(', ')} with ${userProfile.experienceLevel} experience in ${userProfile.currentField}`;
    
    const similarCareers = await this.searchSimilarCareers(query, userProfile.currentField);
    
    // Use OpenAI to generate personalized recommendations
    const prompt = `
    Based on the following user profile and similar career data, provide personalized career recommendations:
    
    User Profile:
    - Interests: ${userProfile.interests.join(', ')}
    - Current Field: ${userProfile.currentField}
    - Experience Level: ${userProfile.experienceLevel}
    - Skills: ${userProfile.skills.map(s => `${s.name} (${s.level})`).join(', ')}
    
    Similar Career Data:
    ${JSON.stringify(similarCareers, null, 2)}
    
    Provide 3-5 specific career recommendations with:
    1. Career title and domain
    2. Required skills and their importance
    3. Recommended certifications
    4. Learning roadmap phases
    5. Expected timeline
    6. Salary expectations
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  }

  async updateCareerData() {
    try {
      console.log('Updating career data...');
      const latestData = await this.fetchLatestCareerData();
      await this.addDocumentsToVectorStore(latestData);
      console.log('Career data updated successfully');
    } catch (error) {
      console.error('Error updating career data:', error);
    }
  }
}

module.exports = new RAGService();
