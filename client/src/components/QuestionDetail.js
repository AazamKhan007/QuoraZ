import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Bookmark, 
  MessageCircle,
  Clock,
  Eye,
  Send,
  Zap,
  Award,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import './QuestionDetail.css';

const QuestionDetail = ({ questions, currentUser, onUpvote, onDownvote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundQuestion = questions.find(q => q._id === id);
    if (foundQuestion) {
      setQuestion(foundQuestion);
      // Mock answers data
      setAnswers([
        {
          _id: '1',
          content: 'Great question! I\'d recommend starting with the official React documentation and building small projects. The key is consistent practice and understanding the fundamentals before jumping into complex libraries.',
          author: {
            _id: '2',
            username: 'ReactPro',
            avatar: '⚛️'
          },
          upvotes: ['user1', 'user2', 'user3'],
          downvotes: [],
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          _id: '2',
          content: 'I found that building a full-stack project really helped me understand React better. Try creating a todo app, then a blog, then maybe an e-commerce site. Each project teaches you different concepts!',
          author: {
            _id: '3',
            username: 'FullStackDev',
            avatar: '💻'
          },
          upvotes: ['user4', 'user5'],
          downvotes: ['user6'],
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
        }
      ]);
    }
  }, [id, questions]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) {
      toast.error('Please write an answer!');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const answer = {
        _id: Date.now().toString(),
        content: newAnswer,
        author: currentUser,
        upvotes: [],
        downvotes: [],
        createdAt: new Date()
      };
      
      setAnswers([answer, ...answers]);
      setNewAnswer('');
      toast.success('Answer posted! 🎉');
    } catch (error) {
      toast.error('Failed to post answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerVote = (answerId, type) => {
    setAnswers(answers.map(answer => {
      if (answer._id === answerId) {
        const hasUpvoted = answer.upvotes.includes(currentUser._id);
        const hasDownvoted = answer.downvotes.includes(currentUser._id);
        
        if (type === 'upvote') {
          return {
            ...answer,
            upvotes: hasUpvoted 
              ? answer.upvotes.filter(id => id !== currentUser._id)
              : [...answer.upvotes, currentUser._id],
            downvotes: hasDownvoted 
              ? answer.downvotes.filter(id => id !== currentUser._id)
              : answer.downvotes
          };
        } else {
          return {
            ...answer,
            downvotes: hasDownvoted 
              ? answer.downvotes.filter(id => id !== currentUser._id)
              : [...answer.downvotes, currentUser._id],
            upvotes: hasUpvoted 
              ? answer.upvotes.filter(id => id !== currentUser._id)
              : answer.upvotes
          };
        }
      }
      return answer;
    }));
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (!question) {
    return (
      <div className="question-detail-loading">
        <div className="cyber-loader">
          <div className="cyber-spinner"></div>
          <p className="loading-text gradient-text">Loading question... ✨</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="question-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="detail-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.button
          className="back-btn"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Feed</span>
        </motion.button>
      </motion.div>

      {/* Question Card */}
      <motion.div 
        className="question-card glass"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Question Header */}
        <div className="question-header">
          <div className="author-info">
            <div className="author-avatar">{question.author.avatar}</div>
            <div className="author-details">
              <span className="author-name">{question.author.username}</span>
              <div className="question-meta">
                <Clock size={14} />
                <span>{formatTimeAgo(question.createdAt)}</span>
                <Eye size={14} />
                <span>{question.views} views</span>
              </div>
            </div>
          </div>
          
          <div className="question-actions">
            <motion.button 
              className="action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark size={18} />
            </motion.button>
            <motion.button 
              className="action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={18} />
            </motion.button>
          </div>
        </div>

        {/* Question Content */}
        <div className="question-content">
          <h1 className="question-title">{question.title}</h1>
          {question.description && (
            <p className="question-description">{question.description}</p>
          )}
          
          {question.tags && question.tags.length > 0 && (
            <div className="question-tags">
              {question.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Question Stats */}
        <div className="question-stats">
          <motion.button
            className={`vote-btn ${question.upvotes.includes(currentUser._id) ? 'active' : ''}`}
            onClick={() => onUpvote(question._id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThumbsUp size={18} />
            <span>{question.upvotes.length}</span>
          </motion.button>
          
          <motion.button
            className={`vote-btn ${question.downvotes.includes(currentUser._id) ? 'active' : ''}`}
            onClick={() => onDownvote(question._id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThumbsDown size={18} />
            <span>{question.downvotes.length}</span>
          </motion.button>
          
          <div className="stat-item">
            <MessageCircle size={18} />
            <span>{answers.length} answers</span>
          </div>
        </div>
      </motion.div>

      {/* Answer Form */}
      <motion.div 
        className="answer-form-container glass"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="form-header">
          <Zap className="form-icon" />
          <h3>Share Your Knowledge</h3>
        </div>
        
        <form onSubmit={handleAnswerSubmit} className="answer-form">
          <div className="form-user">
            <div className="user-avatar">{currentUser.avatar}</div>
            <span className="user-name">{currentUser.username}</span>
          </div>
          
          <textarea
            placeholder="Write your answer... Share your insights! 💡"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="answer-input"
            rows={4}
          />
          
          <motion.button
            type="submit"
            className="submit-answer-btn neon-btn"
            disabled={isSubmitting || !newAnswer.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Posting...
              </>
            ) : (
              <>
                <Send size={18} />
                Post Answer
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Answers Section */}
      <motion.div 
        className="answers-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="answers-header">
          <h3>{answers.length} Answers</h3>
          <div className="answers-sort">
            <select className="sort-select">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-voted">Most Upvoted</option>
            </select>
          </div>
        </div>

        <div className="answers-list">
          {answers.map((answer, index) => (
            <motion.div
              key={answer._id}
              className="answer-card glass"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="answer-header">
                <div className="answer-author">
                  <div className="author-avatar">{answer.author.avatar}</div>
                  <div className="author-info">
                    <span className="author-name">{answer.author.username}</span>
                    <div className="answer-meta">
                      <Clock size={12} />
                      <span>{formatTimeAgo(answer.createdAt)}</span>
                      {answer.upvotes.length > 5 && (
                        <div className="quality-badge">
                          <Award size={12} />
                          <span>Quality Answer</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="answer-content">
                <p>{answer.content}</p>
              </div>

              <div className="answer-actions">
                <motion.button
                  className={`vote-btn ${answer.upvotes.includes(currentUser._id) ? 'active' : ''}`}
                  onClick={() => handleAnswerVote(answer._id, 'upvote')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThumbsUp size={16} />
                  <span>{answer.upvotes.length}</span>
                </motion.button>
                
                <motion.button
                  className={`vote-btn ${answer.downvotes.includes(currentUser._id) ? 'active' : ''}`}
                  onClick={() => handleAnswerVote(answer._id, 'downvote')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThumbsDown size={16} />
                  <span>{answer.downvotes.length}</span>
                </motion.button>

                <motion.button
                  className="action-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionDetail;