import React from 'react';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './FeatureNotAvailable.css';

const FeatureNotAvailable = ({ featureName }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="feature-not-available"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="not-available-container">
        <motion.div 
          className="construction-icon"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Construction size={80} />
        </motion.div>
        
        <h2 className="not-available-title">
          {featureName || 'This Feature'} is Coming Soon!
        </h2>
        
        <p className="not-available-description">
          We're working hard to bring you this amazing feature. 
          Stay tuned for updates in our next release! 🚀
        </p>
        
        <div className="not-available-features">
          <h3>Meanwhile, check out what's available:</h3>
          <ul>
            <li>✨ AI-Powered Question Suggestions</li>
            <li>🤖 Smart Writing Assistant</li>
            <li>📱 Responsive Design</li>
            <li>👤 User Profile Management</li>
            <li>🔥 Trending Topics</li>
          </ul>
        </div>
        
        <motion.button
          className="back-home-btn"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FeatureNotAvailable;