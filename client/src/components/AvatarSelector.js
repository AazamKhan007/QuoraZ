import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "./AvatarSelector.css";

const AvatarSelector = ({ isOpen, onClose, onSelectAvatar, currentAvatar }) => {
  const predefinedAvatars = [
    "👨‍💻",
    "👩‍💻",
    "👨‍🎓",
    "👩‍🎓",
    "👨‍⚕️",
    "👩‍⚕️",
    "👨‍🔬",
    "👩‍🔬",
    "👨‍🎨",
    "👩‍🎨",
    "👨‍🚀",
    "👩‍🚀",
    "👨‍🏫",
    "👩‍🏫",
    "👨‍💼",
    "👩‍💼",
    "👨",
    "👩",
    "🧑",
    "🧔",
    "👱‍♂️",
    "👱‍♀️",
    "👨‍🦱",
    "👩‍🦱",
    "🧑‍🦱",
    "👨‍🦰",
    "👩‍🦰",
    "🧑‍🦰",
    "👨‍🦳",
    "👩‍🦳",
    "🧑‍🦳",
    "👶",
    "🧒",
    "👦",
    "👧",
    "🧑‍🤝‍🧑",
    "👥",
    "🗣️",
    "👤",
    "🫂",
  ];

  const handleAvatarSelect = (avatar) => {
    onSelectAvatar(avatar);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="avatar-selector-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="avatar-selector-modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="avatar-selector-header">
              <h3>Choose Your Avatar</h3>
              <button className="close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className="avatar-grid">
              {predefinedAvatars.map((avatar, index) => (
                <motion.button
                  key={avatar}
                  className={`avatar-option ${
                    currentAvatar === avatar ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarSelect(avatar)}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 8px 25px rgba(139, 92, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="avatar-emoji">{avatar}</span>
                  {currentAvatar === avatar && (
                    <motion.div
                      className="selected-indicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      layoutId="selected"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="avatar-selector-footer">
              <p>Pick an avatar that represents you! ✨</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarSelector;
