import React, { useState, useEffect } from 'react';
import './TrendingTopics.css';

const TrendingTopics = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate trending topics with Gen Z themes
  const generateTrendingTopics = () => {
    const topics = [
      { 
        id: 1, 
        title: "Mental Health Tips", 
        posts: 1247, 
        trend: "📈", 
        hashtag: "#MentalHealthMatters",
        description: "Wellness strategies for busy Gen Z lives"
      },
      { 
        id: 2, 
        title: "Sustainable Living", 
        posts: 892, 
        trend: "🔥", 
        hashtag: "#EcoFriendly",
        description: "How to live sustainably on a budget"
      },
      { 
        id: 3, 
        title: "Career Advice", 
        posts: 1156, 
        trend: "⚡", 
        hashtag: "#CareerGoals",
        description: "Navigating the modern job market"
      },
      { 
        id: 4, 
        title: "Tech Reviews", 
        posts: 734, 
        trend: "🚀", 
        hashtag: "#TechTalk",
        description: "Latest gadgets and apps worth trying"
      },
      { 
        id: 5, 
        title: "Study Hacks", 
        posts: 623, 
        trend: "💡", 
        hashtag: "#StudyTips",
        description: "Effective learning techniques that actually work"
      },
      { 
        id: 6, 
        title: "Side Hustles", 
        posts: 945, 
        trend: "💰", 
        hashtag: "#SideHustle",
        description: "Creative ways to earn extra income"
      },
      { 
        id: 7, 
        title: "Travel on Budget", 
        posts: 567, 
        trend: "✈️", 
        hashtag: "#BudgetTravel",
        description: "Explore the world without breaking the bank"
      },
      { 
        id: 8, 
        title: "Coding Bootcamps", 
        posts: 434, 
        trend: "💻", 
        hashtag: "#LearnToCode",
        description: "Breaking into tech industry"
      }
    ];

    // Shuffle and return random subset
    return topics.sort(() => Math.random() - 0.5).slice(0, 6);
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTrendingTopics(generateTrendingTopics());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTopicClick = (topic) => {
    // In a real app, this would navigate to topic page or filter posts
    console.log(`Clicked on topic: ${topic.title}`);
  };

  const refreshTopics = () => {
    setLoading(true);
    setTimeout(() => {
      setTrendingTopics(generateTrendingTopics());
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="trending-container">
        <div className="trending-header">
          <h3 className="trending-title">🔥 What's Trending</h3>
        </div>
        <div className="trending-loading">
          <div className="loading-spinner"></div>
          <p>Finding the hottest topics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-container">
      <div className="trending-header">
        <h3 className="trending-title">🔥 What's Trending</h3>
        <button className="refresh-btn" onClick={refreshTopics}>
          🔄
        </button>
      </div>
      
      <div className="trending-topics">
        {trendingTopics.map((topic, index) => (
          <div 
            key={topic.id}
            className="topic-card"
            onClick={() => handleTopicClick(topic)}
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <div className="topic-rank">
              #{index + 1}
            </div>
            
            <div className="topic-content">
              <div className="topic-header">
                <h4 className="topic-title">{topic.title}</h4>
                <span className="topic-trend">{topic.trend}</span>
              </div>
              
              <p className="topic-description">{topic.description}</p>
              
              <div className="topic-meta">
                <span className="topic-hashtag">{topic.hashtag}</span>
                <span className="topic-posts">{topic.posts.toLocaleString()} posts</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="trending-footer">
        <p className="footer-text">
          Topics refresh every hour • <span className="highlight">Be part of the conversation!</span>
        </p>
      </div>
    </div>
  );
};

export default TrendingTopics;