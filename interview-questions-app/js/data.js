// Default Interview Questions Database
const defaultQuestions = [
    // Software Engineer - Technical
    {
        id: 1,
        category: "Software Engineer",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the difference between var, let, and const in JavaScript. When would you use each?",
        answer: "",
        tags: ["javascript", "variables", "scope"],
        favorite: false,
        answered: false
    },
    {
        id: 2,
        category: "Software Engineer",
        type: "Technical",
        difficulty: "Hard",
        question: "What is the time complexity of common operations in a hash table? Explain how collision resolution works.",
        answer: "",
        tags: ["data-structures", "hash-table", "algorithms"],
        favorite: false,
        answered: false
    },
    {
        id: 3,
        category: "Software Engineer",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the concept of closures in JavaScript with a practical example.",
        answer: "",
        tags: ["javascript", "closures", "functions"],
        favorite: false,
        answered: false
    },
    {
        id: 4,
        category: "Software Engineer",
        type: "Technical",
        difficulty: "Easy",
        question: "What is the difference between == and === in JavaScript?",
        answer: "",
        tags: ["javascript", "operators", "comparison"],
        favorite: false,
        answered: false
    },
    {
        id: 5,
        category: "Software Engineer",
        type: "Technical",
        difficulty: "Hard",
        question: "Implement a function to reverse a linked list. What is the time and space complexity?",
        answer: "",
        tags: ["algorithms", "linked-list", "data-structures"],
        favorite: false,
        answered: false
    },

    // Software Engineer - Behavioral
    {
        id: 6,
        category: "Software Engineer",
        type: "Behavioral",
        difficulty: "Medium",
        question: "Tell me about a time when you had to debug a complex issue in production. How did you approach it?",
        answer: "",
        tags: ["debugging", "problem-solving", "production"],
        favorite: false,
        answered: false
    },
    {
        id: 7,
        category: "Software Engineer",
        type: "Behavioral",
        difficulty: "Medium",
        question: "Describe a situation where you had to work with a difficult team member. How did you handle it?",
        answer: "",
        tags: ["teamwork", "conflict-resolution", "communication"],
        favorite: false,
        answered: false
    },
    {
        id: 8,
        category: "Software Engineer",
        type: "Behavioral",
        difficulty: "Easy",
        question: "Why do you want to work for our company?",
        answer: "",
        tags: ["motivation", "company-culture", "career-goals"],
        favorite: false,
        answered: false
    },

    // Frontend Developer - Technical
    {
        id: 9,
        category: "Frontend Developer",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the Virtual DOM in React. How does it improve performance?",
        answer: "",
        tags: ["react", "virtual-dom", "performance"],
        favorite: false,
        answered: false
    },
    {
        id: 10,
        category: "Frontend Developer",
        type: "Technical",
        difficulty: "Easy",
        question: "What is the CSS Box Model? Explain each component.",
        answer: "",
        tags: ["css", "box-model", "layout"],
        favorite: false,
        answered: false
    },
    {
        id: 11,
        category: "Frontend Developer",
        type: "Technical",
        difficulty: "Hard",
        question: "How would you optimize the performance of a React application? List at least 5 techniques.",
        answer: "",
        tags: ["react", "performance", "optimization"],
        favorite: false,
        answered: false
    },
    {
        id: 12,
        category: "Frontend Developer",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the difference between localStorage, sessionStorage, and cookies.",
        answer: "",
        tags: ["web-storage", "browser", "cookies"],
        favorite: false,
        answered: false
    },

    // Backend Developer - Technical
    {
        id: 13,
        category: "Backend Developer",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the difference between SQL and NoSQL databases. When would you use each?",
        answer: "",
        tags: ["databases", "sql", "nosql"],
        favorite: false,
        answered: false
    },
    {
        id: 14,
        category: "Backend Developer",
        type: "Technical",
        difficulty: "Hard",
        question: "How would you design a rate limiting system for an API?",
        answer: "",
        tags: ["system-design", "api", "rate-limiting"],
        favorite: false,
        answered: false
    },
    {
        id: 15,
        category: "Backend Developer",
        type: "Technical",
        difficulty: "Medium",
        question: "What is the N+1 query problem and how would you solve it?",
        answer: "",
        tags: ["databases", "performance", "optimization"],
        favorite: false,
        answered: false
    },
    {
        id: 16,
        category: "Backend Developer",
        type: "Technical",
        difficulty: "Easy",
        question: "Explain the difference between authentication and authorization.",
        answer: "",
        tags: ["security", "authentication", "authorization"],
        favorite: false,
        answered: false
    },

    // Full Stack Developer - Technical
    {
        id: 17,
        category: "Full Stack Developer",
        type: "Technical",
        difficulty: "Hard",
        question: "Design a URL shortening service like bit.ly. Explain your architecture, database schema, and how you'd handle scaling.",
        answer: "",
        tags: ["system-design", "architecture", "scaling"],
        favorite: false,
        answered: false
    },
    {
        id: 18,
        category: "Full Stack Developer",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain how HTTPS works. What happens during the SSL/TLS handshake?",
        answer: "",
        tags: ["security", "https", "ssl-tls"],
        favorite: false,
        answered: false
    },
    {
        id: 19,
        category: "Full Stack Developer",
        type: "Technical",
        difficulty: "Medium",
        question: "What is CORS and why is it important? How do you handle CORS issues?",
        answer: "",
        tags: ["web", "cors", "security"],
        favorite: false,
        answered: false
    },

    // Data Scientist - Technical
    {
        id: 20,
        category: "Data Scientist",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the bias-variance tradeoff in machine learning.",
        answer: "",
        tags: ["machine-learning", "bias-variance", "model-evaluation"],
        favorite: false,
        answered: false
    },
    {
        id: 21,
        category: "Data Scientist",
        type: "Technical",
        difficulty: "Hard",
        question: "How would you detect and handle outliers in a dataset? Discuss multiple approaches.",
        answer: "",
        tags: ["statistics", "data-cleaning", "outliers"],
        favorite: false,
        answered: false
    },
    {
        id: 22,
        category: "Data Scientist",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the difference between supervised and unsupervised learning with examples.",
        answer: "",
        tags: ["machine-learning", "supervised", "unsupervised"],
        favorite: false,
        answered: false
    },
    {
        id: 23,
        category: "Data Scientist",
        type: "Technical",
        difficulty: "Easy",
        question: "What is the difference between correlation and causation?",
        answer: "",
        tags: ["statistics", "correlation", "causation"],
        favorite: false,
        answered: false
    },

    // Data Scientist - Behavioral
    {
        id: 24,
        category: "Data Scientist",
        type: "Behavioral",
        difficulty: "Medium",
        question: "Describe a time when your analysis led to a significant business decision. What was the impact?",
        answer: "",
        tags: ["impact", "business-analysis", "decision-making"],
        favorite: false,
        answered: false
    },

    // Product Manager - Behavioral
    {
        id: 25,
        category: "Product Manager",
        type: "Behavioral",
        difficulty: "Medium",
        question: "Tell me about a time when you had to prioritize features with limited resources. How did you decide?",
        answer: "",
        tags: ["prioritization", "resource-management", "decision-making"],
        favorite: false,
        answered: false
    },
    {
        id: 26,
        category: "Product Manager",
        type: "Behavioral",
        difficulty: "Hard",
        question: "Describe a product you launched that failed. What did you learn from it?",
        answer: "",
        tags: ["failure", "learning", "product-launch"],
        favorite: false,
        answered: false
    },
    {
        id: 27,
        category: "Product Manager",
        type: "Behavioral",
        difficulty: "Medium",
        question: "How do you handle disagreements with engineering about technical feasibility?",
        answer: "",
        tags: ["conflict-resolution", "engineering", "communication"],
        favorite: false,
        answered: false
    },

    // Product Manager - Technical
    {
        id: 28,
        category: "Product Manager",
        type: "Technical",
        difficulty: "Medium",
        question: "How would you improve [popular app]? Walk me through your thought process.",
        answer: "",
        tags: ["product-design", "improvement", "user-experience"],
        favorite: false,
        answered: false
    },
    {
        id: 29,
        category: "Product Manager",
        type: "Technical",
        difficulty: "Easy",
        question: "What metrics would you track for a social media application?",
        answer: "",
        tags: ["metrics", "analytics", "kpis"],
        favorite: false,
        answered: false
    },

    // DevOps Engineer - Technical
    {
        id: 30,
        category: "DevOps Engineer",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the difference between Docker containers and virtual machines.",
        answer: "",
        tags: ["docker", "containers", "virtualization"],
        favorite: false,
        answered: false
    },
    {
        id: 31,
        category: "DevOps Engineer",
        type: "Technical",
        difficulty: "Hard",
        question: "How would you design a CI/CD pipeline for a microservices architecture?",
        answer: "",
        tags: ["ci-cd", "microservices", "pipeline"],
        favorite: false,
        answered: false
    },
    {
        id: 32,
        category: "DevOps Engineer",
        type: "Technical",
        difficulty: "Medium",
        question: "What is Infrastructure as Code (IaC)? What are the benefits and which tools have you used?",
        answer: "",
        tags: ["iac", "terraform", "automation"],
        favorite: false,
        answered: false
    },
    {
        id: 33,
        category: "DevOps Engineer",
        type: "Technical",
        difficulty: "Easy",
        question: "Explain what Kubernetes is and why it's useful.",
        answer: "",
        tags: ["kubernetes", "orchestration", "containers"],
        favorite: false,
        answered: false
    },

    // DevOps Engineer - Behavioral
    {
        id: 34,
        category: "DevOps Engineer",
        type: "Behavioral",
        difficulty: "Medium",
        question: "Tell me about a time when you had to respond to a critical production incident. How did you handle it?",
        answer: "",
        tags: ["incident-response", "production", "problem-solving"],
        favorite: false,
        answered: false
    },

    // General Behavioral Questions
    {
        id: 35,
        category: "Software Engineer",
        type: "Behavioral",
        difficulty: "Easy",
        question: "What are your greatest strengths and weaknesses?",
        answer: "",
        tags: ["self-awareness", "strengths", "weaknesses"],
        favorite: false,
        answered: false
    },
    {
        id: 36,
        category: "Frontend Developer",
        type: "Behavioral",
        difficulty: "Medium",
        question: "Describe a time when you had to learn a new technology quickly. How did you approach it?",
        answer: "",
        tags: ["learning", "adaptability", "technology"],
        favorite: false,
        answered: false
    },
    {
        id: 37,
        category: "Backend Developer",
        type: "Behavioral",
        difficulty: "Medium",
        question: "Tell me about a time when you improved the performance of an application. What was your approach?",
        answer: "",
        tags: ["performance", "optimization", "problem-solving"],
        favorite: false,
        answered: false
    },
    {
        id: 38,
        category: "Full Stack Developer",
        type: "Behavioral",
        difficulty: "Hard",
        question: "Describe a situation where you had to make a trade-off between perfect code and meeting a deadline.",
        answer: "",
        tags: ["trade-offs", "deadlines", "decision-making"],
        favorite: false,
        answered: false
    },

    // More Technical Questions
    {
        id: 39,
        category: "Software Engineer",
        type: "Technical",
        difficulty: "Hard",
        question: "Explain how garbage collection works in JavaScript. What are memory leaks and how do you prevent them?",
        answer: "",
        tags: ["javascript", "memory-management", "garbage-collection"],
        favorite: false,
        answered: false
    },
    {
        id: 40,
        category: "Frontend Developer",
        type: "Technical",
        difficulty: "Medium",
        question: "What are React Hooks? Explain useState, useEffect, and useContext with examples.",
        answer: "",
        tags: ["react", "hooks", "state-management"],
        favorite: false,
        answered: false
    },
    {
        id: 41,
        category: "Backend Developer",
        type: "Technical",
        difficulty: "Hard",
        question: "Design a database schema for a social media platform. Consider posts, users, comments, and likes.",
        answer: "",
        tags: ["database-design", "schema", "relationships"],
        favorite: false,
        answered: false
    },
    {
        id: 42,
        category: "Data Scientist",
        type: "Technical",
        difficulty: "Hard",
        question: "Explain the Random Forest algorithm. What are its advantages and disadvantages?",
        answer: "",
        tags: ["machine-learning", "random-forest", "algorithms"],
        favorite: false,
        answered: false
    },
    {
        id: 43,
        category: "DevOps Engineer",
        type: "Technical",
        difficulty: "Medium",
        question: "What is blue-green deployment? How does it differ from canary deployment?",
        answer: "",
        tags: ["deployment", "strategies", "devops"],
        favorite: false,
        answered: false
    },
    {
        id: 44,
        category: "Full Stack Developer",
        type: "Technical",
        difficulty: "Easy",
        question: "What is REST API? What are the main HTTP methods and when do you use each?",
        answer: "",
        tags: ["api", "rest", "http"],
        favorite: false,
        answered: false
    },
    {
        id: 45,
        category: "Software Engineer",
        type: "Technical",
        difficulty: "Medium",
        question: "Explain the SOLID principles in object-oriented programming with examples.",
        answer: "",
        tags: ["oop", "solid", "design-principles"],
        favorite: false,
        answered: false
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { defaultQuestions };
}
