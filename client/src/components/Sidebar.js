import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  TrendingUp,
  Bookmark,
  User,
  Settings,
  HelpCircle,
  Zap,
  Hash,
  Users,
  Star,
  Award,
  Coffee,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isMobileOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { icon: Home, label: "Home", path: "/", badge: null },
    { icon: User, label: "Profile", path: "/profile", badge: null },
    { icon: TrendingUp, label: "Trending", path: "/trending", badge: "🔥" },
    { icon: Hash, label: "Topics", path: "/topics", badge: null },
    { icon: Users, label: "Following", path: "/following", badge: "12" },
    { icon: Bookmark, label: "Saved", path: "/saved", badge: null },
    { icon: Star, label: "Favorites", path: "/favorites", badge: null },
  ];

  const quickTopics = [
    { name: "React", color: "#61dafb", posts: "2.4k" },
    { name: "AI", color: "#ff6b6b", posts: "1.8k" },
    { name: "Web3", color: "#4ecdc4", posts: "956" },
    { name: "Career", color: "#ffe66d", posts: "3.2k" },
    { name: "Design", color: "#ff8b94", posts: "1.5k" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose(); // Close mobile sidebar after navigation
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div
          className="sidebar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      <motion.aside
        className={`sidebar glass ${isCollapsed ? "collapsed" : ""} ${
          isMobileOpen ? "mobile-open" : ""
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="sidebar-header">
          <motion.button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Zap size={20} />
          </motion.button>
          {!isCollapsed && (
            <motion.h3
              className="sidebar-title gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Navigation
            </motion.h3>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? "active" : ""}`}
                onClick={() => handleNavigation(item.path)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="nav-icon">
                  <Icon size={20} />
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="nav-label">{item.label}</span>
                )}
                {isActive(item.path) && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Quick Topics */}
        {!isCollapsed && (
          <motion.div
            className="quick-topics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="section-title">🔥 Hot Topics</h4>
            <div className="topics-list">
              {quickTopics.map((topic, index) => (
                <motion.div
                  key={topic.name}
                  className="topic-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="topic-color"
                    style={{ backgroundColor: topic.color }}
                  />
                  <div className="topic-info">
                    <span className="topic-name">#{topic.name}</span>
                    <span className="topic-posts">{topic.posts} posts</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* User Stats */}
        {!isCollapsed && (
          <motion.div
            className="user-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="section-title">✨ Your Stats</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <Award className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-value">42</span>
                  <span className="stat-label">Answers</span>
                </div>
              </div>
              <div className="stat-item">
                <Coffee className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-value">156</span>
                  <span className="stat-label">Upvotes</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Actions */}
        <div className="sidebar-bottom">
          <motion.button
            className="bottom-action"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={18} />
            {!isCollapsed && <span>Settings</span>}
          </motion.button>

          <motion.button
            className="bottom-action"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HelpCircle size={18} />
            {!isCollapsed && <span>Help</span>}
          </motion.button>
        </div>

        {/* Background Effects */}
        <div className="sidebar-bg-effects">
          <div className="gradient-line"></div>
          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
