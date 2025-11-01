// AI Service for QuoraZ - Free AI features using various APIs

class AIService {
  constructor() {
    // Using free APIs - no API keys required for basic functionality
    this.huggingFaceAPI = "https://api-inference.huggingface.co/models/";
    this.fallbackEnabled = true;
  }

  // Generate tags for questions using text analysis
  async generateTags(questionText, answerText = "") {
    try {
      const text = `${questionText} ${answerText}`.toLowerCase();

      // Simple keyword extraction and categorization
      const tags = [];
      const categories = {
        technology: [
          "tech",
          "coding",
          "programming",
          "software",
          "app",
          "computer",
          "ai",
          "machine learning",
          "data",
          "javascript",
          "python",
          "react",
          "web",
          "development",
          "algorithm",
          "cybersecurity",
          "blockchain",
          "cloud",
          "devops",
          "mobile",
          // New Keywords
          "laptop",
          "pc",
          "server",
          "database",
          "sql",
          "nosql",
          "api",
          "frontend",
          "backend",
          "fullstack",
          "ui",
          "ux",
          "bug",
          "error",
          "crash",
          "slow",
          "network",
          "internet",
          "website",
          "code 'nahi chal raha'",
          "error 'aa raha hai'",
          "slow 'chal raha hai'",
          "website 'down hai'",
          "phone",
          "android",
          "ios",
          "game dev",
        ],
        career: [
          "job",
          "career",
          "work",
          "interview",
          "resume",
          "salary",
          "professional",
          "business",
          "startup",
          "entrepreneur",
          "internship",
          "freelance",
          "remote work",
          "leadership",
          "networking",
          "mentorship",
          // New Keywords
          "office",
          "manager",
          "promotion",
          "hike",
          "appraisal",
          "linkedin",
          "portfolio",
          "cover letter",
          "naukri",
          "kaam",
          "boss",
          "salary 'kitni hai'",
          "job 'lag nahi rahi'",
          "interview 'crack kaise karein'",
          "side hustle",
          "WFH",
          "hybrid",
          "corporate",
          "burnout",
        ],
        education: [
          "study",
          "school",
          "college",
          "university",
          "exam",
          "student",
          "learning",
          "course",
          "degree",
          "homework",
          "research",
          "academic",
          "online learning",
          "self-study",
          "certification",
          "bootcamp",
          // New Keywords
          "teacher",
          "professor",
          "assignment",
          "project",
          "notes",
          "GRE",
          "GMAT",
          "CAT",
          "JEE",
          "NEET",
          "exam 'stress'",
          "padhai",
          "pass 'kaise ho'",
          "fail",
          "marks 'kam aaye'",
          "backlog",
          "tuition",
          "subject",
          "phd",
        ],
        lifestyle: [
          "health",
          "fitness",
          "diet",
          "wellness",
          "mental health",
          "relationship",
          "dating",
          "friendship",
          "family",
          "lifestyle",
          "habits",
          "self-care",
          "mindfulness",
          "work-life balance",
          "personal growth",
          // New Keywords
          "gym",
          "workout",
          "sleep",
          "routine",
          "friends",
          "anxiety",
          "depression",
          "stress",
          "glow up",
          "rizz",
          "main character energy",
          "vibe",
          "aesthetic",
          "self-care",
          "tension",
          "dost",
          "ghoomna",
          "love",
          "breakup",
          "fashion",
        ],
        finance: [
          "money",
          "budget",
          "investment",
          "savings",
          "crypto",
          "stocks",
          "financial",
          "economy",
          "income",
          "expense",
          "loan",
          "debt",
          "fintech",
          "personal finance",
          "trading",
          "wealth management",
          // New Keywords
          "tax",
          "SIP",
          "mutual fund",
          "bank",
          "credit card",
          "debit card",
          "EMI",
          "paisa",
          "bachat",
          "khatam 'ho gaye'",
          "udhaar",
          "kamao",
          "stonks",
          "HODL",
          "to the moon",
          "NFT",
          "bitcoin",
          "ethereum",
        ],
        entertainment: [
          "movie",
          "music",
          "game",
          "gaming",
          "netflix",
          "spotify",
          "entertainment",
          "fun",
          "hobby",
          "art",
          "creative",
          "streaming",
          "anime",
          "esports",
          "content creation",
          // New Keywords
          "songs",
          "series",
          "web series",
          "marvel",
          "dc",
          "bollywood",
          "hollywood",
          "youtube",
          "binge-watch",
          "stan",
          "ship",
          "film",
          "gaana",
          "reels",
          "shorts",
          "twitch",
        ],
        travel: [
          "travel",
          "trip",
          "vacation",
          "flight",
          "hotel",
          "destination",
          "adventure",
          "backpacking",
          "tourism",
          "explore",
          "digital nomad",
          "local experiences",
          "budget travel",
          "luxury travel",
          // New Keywords
          "road trip",
          "beach",
          "mountains",
          "trekking",
          "solo travel",
          "ghoomne 'jaana hai'",
          "sasta 'trip'",
          "vlog",
          "visa",
        ],
        food: [
          "food",
          "cooking",
          "recipe",
          "restaurant",
          "meal",
          "diet",
          "nutrition",
          "cuisine",
          "eating",
          "chef",
          "foodie",
          "vegan",
          "baking",
          "meal prep",
          "food tech",
          // New Keywords
          "pizza",
          "burger",
          "pasta",
          "healthy",
          "junk food",
          "street food",
          "sushi",
          "chinese",
          "indian",
          "kya 'khaoon'",
          "bhukh 'lagi hai'",
          "tasty",
          "kaise banaye",
          "banau",
        ],
        science: [
          "science",
          "physics",
          "chemistry",
          "biology",
          "mathematics",
          "research",
          "experiment",
          "theory",
          "discovery",
          "space",
          "climate",
          "neuroscience",
          "quantum",
          "biotech",
          // New Keywords
          "nasa",
          "isro",
          "environment",
          "evolution",
          "genetics",
          "mars",
          "moon",
        ],
        social: [
          "social media",
          "instagram",
          "tiktok",
          "twitter",
          "facebook",
          "online",
          "internet",
          "digital",
          "viral",
          "trending",
          "influencer",
          "community",
          "social impact",
          "creator economy",
          // New Keywords
          "x.com",
          "threads",
          "whatsapp",
          "discord",
          "reddit",
          "meme",
        ],
        genz: [
          "meme",
          "aesthetic",
          "vibe",
          "relatable",
          "social justice",
          "sustainable",
          "authentic",
          "digital native",
          "side hustle",
          "stan culture",
          "gen z",
          "metaverse",
          // New Keywords
          "rizz",
          "main character",
          "delulu",
          "bet",
          "slay",
          "cap",
          "no cap",
          "tea",
          "FOMO",
          "JOMO",
        ],
      };

      // Check for category matches
      Object.entries(categories).forEach(([category, keywords]) => {
        // Use .some() for efficiency - it stops as soon as it finds one match
        if (keywords.some((keyword) => text.includes(keyword))) {
          tags.push(category);
        }
      });

      // Add specific keyword tags
      const commonTags = [
        "advice",
        "tips",
        "help",
        "question",
        "discussion",
        "opinion",
        "experience",
        "beginner",
        "guide",
        "tutorial",
        "review",
        "comparison",
      ];

      commonTags.forEach((tag) => {
        if (text.includes(tag)) {
          tags.push(tag);
        }
      });

      // Limit to 5 tags and add some variety
      const finalTags = [...new Set(tags)].slice(0, 5);

      // If no tags found, add some generic ones based on length and question marks
      if (finalTags.length === 0) {
        if (text.includes("?")) finalTags.push("question");
        if (text.length > 200) finalTags.push("detailed");
        if (text.length < 50) finalTags.push("quick");
        finalTags.push("general");
      }

      return {
        success: true,
        tags: finalTags,
        confidence: Math.min(finalTags.length * 0.2, 0.9),
      };
    } catch (error) {
      console.error("Tag generation error:", error);
      return {
        success: false,
        tags: ["general", "question"],
        confidence: 0.3,
      };
    }
  }

  // Writing assistant - check grammar and provide suggestions
  async analyzeWriting(text) {
    try {
      const suggestions = [];
      const improvements = [];

      // Enhanced grammar and style checks
      const checks = [
        // Common Grammar Issues
        {
          pattern: /\b(i|i'm|i'll|i've|i'd)\b/g,
          suggestion: 'Capitalize "I" when referring to yourself',
          type: "grammar",
        },
        {
          pattern: /\b(ur|u)\b/gi,
          suggestion: 'Consider using "your" or "you" instead of text speak',
          type: "style",
        },
        {
          pattern: /\btho\b/gi,
          suggestion: 'Consider using "though" instead of "tho"',
          type: "style",
        },
        {
          pattern: /\b(gonna|wanna|gotta)\b/gi,
          suggestion:
            'Consider using "going to", "want to", "have to" for formal writing',
          type: "formality",
        },
        // Punctuation
        {
          pattern: /\b(dont|cant|wont|shouldnt|couldnt|wouldnt)\b/gi,
          suggestion: "Add an apostrophe for contractions (don't, can't, etc.)",
          type: "grammar",
        },
        {
          pattern: /([a-z])\?+/g,
          suggestion: "Add a space before question marks",
          type: "punctuation",
        },
        // Common Mistakes
        {
          pattern:
            /\b(your)\b(?=\s+(?:going|doing|watching|reading|listening))/gi,
          suggestion: 'Use "you\'re" instead of "your" before verbs',
          type: "grammar",
        },
        {
          pattern:
            /\bthere\b(?=\s+(?:is|are|was|were)\s+(?:many|few|several|two|three|multiple))/gi,
          suggestion: 'Consider using "their" if referring to possession',
          type: "grammar",
        },
        // Style Improvements
        {
          pattern: /\b(very|really|literally|basically|actually)\s+/gi,
          suggestion:
            "Consider removing or replacing filler words for stronger writing",
          type: "style",
        },
        {
          pattern: /!{2,}/g,
          suggestion: "Use a single exclamation mark for emphasis",
          type: "style",
        },
        {
          pattern: /[.!?]\s*[a-z]/g,
          suggestion: "Start sentences with capital letters",
          type: "grammar",
        },
        {
          pattern: /\s{2,}/g,
          suggestion: "Remove extra spaces",
          type: "formatting",
        },
        {
          pattern: /[.]{2,}/g,
          suggestion: "Use single period or ellipsis (...)",
          type: "formatting",
        },
      ];

      checks.forEach((check) => {
        if (check.pattern.test(text)) {
          suggestions.push({
            type: check.type,
            message: check.suggestion,
            severity: check.type === "grammar" ? "high" : "medium",
          });
        }
      });

      // Length and readability suggestions
      if (text.length < 10) {
        improvements.push({
          type: "length",
          message:
            "Consider adding more details to make your post more helpful",
          suggestion: "Try to explain your question or answer more thoroughly",
        });
      }

      if (text.length > 500) {
        improvements.push({
          type: "length",
          message: "Consider breaking this into shorter paragraphs",
          suggestion:
            "Long posts are harder to read. Try using bullet points or shorter sentences",
        });
      }

      // Check for questions without question marks
      const questionWords = [
        "what",
        "how",
        "why",
        "when",
        "where",
        "who",
        "which",
        "can",
        "could",
        "should",
        "would",
      ];
      const startsWithQuestion = questionWords.some((word) =>
        text.toLowerCase().trim().startsWith(word)
      );

      if (startsWithQuestion && !text.includes("?")) {
        suggestions.push({
          type: "grammar",
          message:
            "This looks like a question - consider adding a question mark",
          severity: "medium",
        });
      }

      // Positivity and engagement suggestions
      const positiveWords = [
        "thank",
        "please",
        "appreciate",
        "grateful",
        "help",
      ];
      const hasPositiveWords = positiveWords.some((word) =>
        text.toLowerCase().includes(word)
      );

      if (!hasPositiveWords && text.length > 50) {
        improvements.push({
          type: "engagement",
          message: "Consider adding polite language to encourage responses",
          suggestion:
            'Words like "please", "thank you", or "I appreciate" can make your post more engaging',
        });
      }

      return {
        success: true,
        suggestions,
        improvements,
        score: Math.max(
          100 - suggestions.length * 10 - improvements.length * 5,
          60
        ),
        wordCount: text.split(/\s+/).filter((word) => word.length > 0).length,
      };
    } catch (error) {
      console.error("Writing analysis error:", error);
      return {
        success: false,
        suggestions: [],
        improvements: [],
        score: 75,
        wordCount: 0,
      };
    }
  }

  // Generate content suggestions based on trending topics
  async getContentSuggestions(category = "general") {
    try {
      const suggestions = {
        technology: [
          "What's the best programming language to learn in 2024?",
          "How do I start learning web development as a complete beginner?",
          "What are the most useful VS Code extensions for productivity?",
          "How do I prepare for technical interviews at big tech companies?",
        ],
        career: [
          "How do I write a resume that stands out to employers?",
          "What skills should I develop to be more marketable?",
          "How do I negotiate salary for my first job?",
          "What are some good side hustles for college students?",
        ],
        lifestyle: [
          "What are some effective study techniques for better retention?",
          "How do I maintain work-life balance as a young professional?",
          "What are some budget-friendly self-care ideas?",
          "How do I build confidence in social situations?",
        ],
        education: [
          "What are the best online resources for learning new skills?",
          "How do I choose the right college major for my interests?",
          "What study apps actually help with productivity?",
          "How do I deal with exam anxiety and stress?",
        ],
        general: [
          "What's something you wish you knew when you were younger?",
          "What are your best productivity tips for busy schedules?",
          "How do you stay motivated when things get tough?",
          "What's the best advice you've ever received?",
        ],
      };

      const categoryQuestions = suggestions[category] || suggestions.general;

      return {
        success: true,
        suggestions: categoryQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0, 3),
      };
    } catch (error) {
      return {
        success: false,
        suggestions: ["What's on your mind today?"],
      };
    }
  }

  // Simulate content generation for dummy posts
  async generateDummyContent(count = 10) {
    try {
      const sampleQuestions = [
        {
          question: "How do I stay motivated while learning to code?",
          answer:
            "Set small daily goals, join coding communities, and celebrate small wins. Remember that every expert was once a beginner!",
          author: "CodeMaster21",
          tags: ["programming", "motivation", "learning"],
          upvotes: 45,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
        },
        {
          question:
            "What are the best study techniques for retaining information?",
          answer:
            "Try the Pomodoro technique, active recall, and spaced repetition. Also, teaching others what you've learned really helps!",
          author: "StudyGuru",
          tags: ["study", "education", "tips"],
          upvotes: 32,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
        },
        {
          question: "How do I build confidence for job interviews?",
          answer:
            "Practice common questions, research the company thoroughly, and remember that they already liked your resume enough to interview you!",
          author: "CareerCoach",
          tags: ["career", "interview", "confidence"],
          upvotes: 67,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
        },
        {
          question: "What's the best way to manage social media addiction?",
          answer:
            "Use app timers, turn off notifications, and find offline hobbies you enjoy. Digital detox weekends are also great!",
          author: "MindfulUser",
          tags: ["social media", "mental health", "lifestyle"],
          upvotes: 28,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
        },
        {
          question: "How do I start investing with a small budget?",
          answer:
            "Start with index funds, use commission-free brokers, and invest consistently even if it's just $25/month. Time in market beats timing the market!",
          author: "InvestSmart",
          tags: ["finance", "investing", "money"],
          upvotes: 54,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
        },
      ];

      // Generate more varied content
      const extendedQuestions = [];
      for (let i = 0; i < count; i++) {
        const baseQuestion = sampleQuestions[i % sampleQuestions.length];
        extendedQuestions.push({
          ...baseQuestion,
          id: i + 1,
          upvotes: Math.floor(Math.random() * 100) + 10,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 30),
        });
      }

      return {
        success: true,
        content: extendedQuestions,
      };
    } catch (error) {
      return {
        success: false,
        content: [],
      };
    }
  }
}

// Create an instance and export it
const aiServiceInstance = new AIService();
export default aiServiceInstance;
