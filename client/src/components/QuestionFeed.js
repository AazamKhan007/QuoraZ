import React from "react";
import { motion } from "framer-motion";
import QuestionCard from "./QuestionCard";
import { Sparkles, TrendingUp, Clock, Zap } from "lucide-react";
import "./QuestionFeed.css";

const QuestionFeed = ({
  questions,
  loading,
  onUpvote,
  onDownvote,
  currentUser,
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="cyber-loader">
          <div className="cyber-spinner"></div>
          <p className="loading-text gradient-text">Loading the vibes... ✨</p>
        </div>
      </div>
    );
  }

  const trendingTopics = [
    "React",
    "AI",
    "Web3",
    "Career",
    "Productivity",
    "Mental Health",
  ];

  return (
    <motion.div
      className="question-feed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Feed Header */}
      <motion.div
        className="feed-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="feed-title">
          <Zap className="title-icon" />
          <h1 className="gradient-text">Latest Questions</h1>
          <Sparkles className="sparkle" />
        </div>

        <div className="feed-stats">
          <div className="stat-item">
            <TrendingUp size={16} />
            <span>{questions.length} questions</span>
          </div>
          <div className="stat-item">
            <Clock size={16} />
            <span>Updated now</span>
          </div>
        </div>
      </motion.div>

      {/* Trending Topics */}
      <motion.div
        className="trending-section"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3>🔥 Trending Topics</h3>
        <div className="trending-tags">
          {trendingTopics.map((topic, index) => (
            <motion.span
              key={topic}
              className="trending-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{topic}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Questions List */}
      <div className="questions-container">
        {questions.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="empty-icon">🤔</div>
            <h3>No questions yet!</h3>
            <p>Be the first to ask something interesting...</p>
            <div className="empty-decoration">
              <div className="floating-emoji">💭</div>
              <div className="floating-emoji">✨</div>
              <div className="floating-emoji">🚀</div>
            </div>
          </motion.div>
        ) : (
          questions.map((question, index) => (
            <motion.div
              key={question._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * index,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <QuestionCard
                question={question}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
                currentUser={currentUser}
              />
            </motion.div>
          ))
        )}
      </div>

      {/* Infinite Scroll Loader */}
      <motion.div
        className="scroll-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="pulse-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <span>Loading more questions...</span>
      </motion.div>
    </motion.div>
  );
};

export default QuestionFeed;
