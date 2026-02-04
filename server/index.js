const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Mock knowledge base data
const knowledgeBase = {
  hr: [
    {
      id: 1,
      title: "How do I request time off?",
      content: "Submit a request through the HR portal at least 2 weeks in advance. Your manager will be notified automatically.",
      category: "Benefits",
      views: 1250
    },
    {
      id: 2,
      title: "What is our remote work policy?",
      content: "Employees can work remotely 2 days per week with manager approval. Full remote requires VP approval.",
      category: "Policy",
      views: 980
    },
    {
      id: 3,
      title: "How do I access my 401k?",
      content: "Log into Fidelity NetBenefits using your employee ID. Company match is 6%.",
      category: "Benefits",
      views: 756
    }
  ],
  it: [
    {
      id: 4,
      title: "How do I reset my password?",
      content: "Use the self-service portal at password.company.com or contact IT at ext. 4357.",
      category: "Support",
      views: 2100
    },
    {
      id: 5,
      title: "VPN Setup Instructions",
      content: "Download Cisco AnyConnect from the software portal. Use your SSO credentials.",
      category: "Security",
      views: 890
    }
  ]
};

// Mock SOPs
const sops = [
  {
    id: 1,
    title: "Employee Onboarding Process",
    status: "published",
    lastUpdated: "2025-01-15",
    author: "HR Team",
    steps: 12
  },
  {
    id: 2,
    title: "Quarterly Performance Review",
    status: "draft",
    lastUpdated: "2025-02-01",
    author: "People Ops",
    steps: 8
  },
  {
    id: 3,
    title: "Security Incident Response",
    status: "published",
    lastUpdated: "2024-12-20",
    author: "Security Team",
    steps: 15
  }
];

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context = 'general' } = req.body;
  
  const responses = {
    hr: [
      "Based on our HR policies, you can submit time off requests through the HR portal. Would you like me to walk you through the steps?",
      "For benefits questions, I recommend checking the knowledge base first. Here's what I found about your query...",
      "I've found the relevant policy document. The key points are: 1) Submit 2 weeks in advance, 2) Manager approval required."
    ],
    it: [
      "I can help you with that IT issue. Have you tried restarting your device first?",
      "For VPN issues, please ensure you're using the latest Cisco AnyConnect client. Here's the download link.",
      "I see you're having trouble with your account. Let me connect you with IT support."
    ],
    general: [
      "I understand you're asking about " + message + ". Let me find the most relevant information for you.",
      "Based on your question, here are the relevant resources from our knowledge base...",
      "I can help with that! Here's what you need to know: "
    ]
  };
  
  const contextResponses = responses[context] || responses.general;
  const randomResponse = contextResponses[Math.floor(Math.random() * contextResponses.length)];
  
  res.json({
    response: randomResponse,
    context: context,
    suggestedActions: [
      "View related documentation",
      "Connect with support",
      "Create a ticket"
    ],
    confidence: 0.94
  });
});

// Knowledge base endpoints
app.get('/api/kb/search', (req, res) => {
  const { q, category } = req.query;
  let results = [];
  
  Object.values(knowledgeBase).forEach(categoryItems => {
    results = [...results, ...categoryItems];
  });
  
  if (q) {
    results = results.filter(item => 
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      item.content.toLowerCase().includes(q.toLowerCase())
    );
  }
  
  if (category) {
    results = results.filter(item => item.category === category);
  }
  
  res.json({ results, total: results.length });
});

app.get('/api/kb/categories', (req, res) => {
  res.json({
    categories: [
      { id: 'hr', name: 'HR & Benefits', articles: 12 },
      { id: 'it', name: 'IT Support', articles: 8 },
      { id: 'finance', name: 'Finance', articles: 5 },
      { id: 'legal', name: 'Legal & Compliance', articles: 3 }
    ]
  });
});

// SOP endpoints
app.get('/api/sops', (req, res) => {
  res.json({ sops, total: sops.length });
});

app.post('/api/sops/generate', (req, res) => {
  const { title, description, processSteps } = req.body;
  
  const newSop = {
    id: sops.length + 1,
    title: title || "New SOP",
    status: "draft",
    lastUpdated: new Date().toISOString().split('T')[0],
    author: "AI Assistant",
    steps: processSteps ? processSteps.split('\n').length : 5
  };
  
  sops.push(newSop);
  
  res.json({
    sop: newSop,
    generated: true,
    suggestions: [
      "Add approval workflow",
      "Include screenshots",
      "Add video tutorial"
    ]
  });
});

// Analytics dashboard
app.get('/api/analytics', (req, res) => {
  res.json({
    chats: {
      total: 15420,
      resolved: 14230,
      escalationRate: 0.08
    },
    knowledgeBase: {
      articles: 45,
      views: 89300,
      helpfulRate: 0.87
    },
    sops: {
      total: 28,
      published: 22,
      drafts: 6
    },
    costSavings: {
      monthly: 45000,
      annual: 540000,
      calculation: "Based on 45% reduction in support tickets"
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Guidely Server running on port ${PORT}`);
});
