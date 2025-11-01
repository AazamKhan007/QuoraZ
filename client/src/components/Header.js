import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, Plus, Sparkles, Menu } from "lucide-react";
import { motion } from "framer-motion";
import "./Header.css";

const Header = ({ onAskQuestion, currentUser, onToggleSidebar }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <motion.header
      className="header glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        {/* Mobile Menu Button */}
        <motion.button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </motion.button>

        {/* Logo */}
        <motion.div
          className="logo"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ cursor: "pointer" }}
        >
          <Sparkles className="logo-icon" />
          <span className="logo-text gradient-text">QuoraZ</span>
        </motion.div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <div
            className={`search-container ${isSearchFocused ? "focused" : ""}`}
          >
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search questions, topics, or vibes... 🔍"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="search-input"
            />
            {searchQuery && (
              <motion.button
                type="button"
                className="search-clear"
                onClick={() => setSearchQuery("")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            )}
          </div>
        </form>

        {/* Navigation Actions */}
        <div className="nav-actions">
          {/* Ask Question Button */}
          <motion.button
            className="ask-btn neon-btn"
            onClick={onAskQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <Plus size={18} /> */}
            <span>Ask</span>
          </motion.button>

          {/* User Profile */}
          <motion.div
            className="user-profile"
            onClick={() => navigate("/profile")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: "pointer" }}
          >
            <div className="user-avatar">
              {currentUser.avatar || <User size={20} />}
            </div>
            <span className="user-name">{currentUser.username}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
