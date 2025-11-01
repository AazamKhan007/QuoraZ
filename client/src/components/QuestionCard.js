import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, MessageCircle, Eye, Share2, Bookmark, Clock } from 'lucide-react';
import './QuestionCard.css';

const QuestionCard = ({ question, onUpvote, onDownvote, currentUser }) => {
  const hasUpvoted = question.upvotes.includes(currentUser._id);
  const hasDownvoted = question.downvotes.includes(currentUser._id);
  const score = question.upvotes.length - question.downvotes.length;

  const formatTime = (date) => {
    const now = new Date();
    const questionTime = new Date(date);
    const diffInHours = Math.floor((now - questionTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onUpvote(question._id);
  };

  const handleDownvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDownvote(question._id);
  };

  return (
    <motion.div 
      className="question-card glass hover-lift"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card Header */}
      <div className="card-header">
        <div className="author-info">
          <div className="author-avatar">
            {question.author.avatar}
          </div>
          <div className="author-details">
            <span className="author-name">{question.author.username}</span>
            <div className="question-meta">
              <Clock size={12} />
              <span>{formatTime(question.createdAt)}</span>
              <span className="separator">•</span>
              <Eye size={12} />
              <span>{question.views} views</span>
            </div>
          </div>
        </div>
        
        <motion.button 
          className="bookmark-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bookmark size={18} />
        </motion.button>
      </div>

      {/* Question Content */}
      <Link to={`/question/${question._id}`} className="question-link">
        <div className="question-content">
          <h3 className="question-title">{question.title}</h3>
          {question.description && (
            <p className="question-description">{question.description}</p>
          )}
        </div>
      </Link>

      {/* Tags */}
      {question.tags && question.tags.length > 0 && (
        <div className="question-tags">
          {question.tags.map((tag, index) => (
            <motion.span
              key={index}
              className="tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              #{tag}
            </motion.span>
          ))}
        </div>
      )}

      {/* Card Actions */}
      <div className="card-actions">
        {/* Voting Section */}
        <div className="voting-section">
          <motion.button
            className={`vote-btn upvote ${hasUpvoted ? 'active' : ''}`}
            onClick={handleUpvote}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} />
          </motion.button>
          
          <span className={`vote-score ${score > 0 ? 'positive' : score < 0 ? 'negative' : ''}`}>
            {score}
          </span>
          
          <motion.button
            className={`vote-btn downvote ${hasDownvoted ? 'active' : ''}`}
            onClick={handleDownvote}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown size={20} />
          </motion.button>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link to={`/question/${question._id}`}>
            <motion.button 
              className="action-btn answer-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={16} />
              <span>Answer</span>
            </motion.button>
          </Link>
          
          <motion.button 
            className="action-btn share-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={16} />
            <span>Share</span>
          </motion.button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="card-glow"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;