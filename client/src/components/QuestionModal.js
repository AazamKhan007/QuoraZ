import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Hash, Zap, Sparkles, Bot, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import aiService from "../services/aiService";
import "./QuestionModal.css";

const QuestionModal = ({ onClose, onSubmit, currentUser }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState({
    tags: [],
    writing: null,
    content: [], // <-- NAYI STATE ADD KI
    loading: false,
  });

  // AI Content Suggestions (Run once on mount)
  useEffect(() => {
    const fetchContentSuggestions = async () => {
      // General suggestions le rahe hain
      const contentResult = await aiService.getContentSuggestions("general");
      if (contentResult.success) {
        setAiSuggestions((prev) => ({
          ...prev,
          content: contentResult.suggestions,
        }));
      }
    };
    fetchContentSuggestions();
  }, []); // Empty array, bas ek baar chalega

  // AI-powered tag generation
  useEffect(() => {
    const generateAITags = async () => {
      if (formData.title.length > 10 || formData.description.length > 20) {
        setAiSuggestions((prev) => ({ ...prev, loading: true }));

        const tagResult = await aiService.generateTags(
          formData.title,
          formData.description
        );
        if (tagResult.success) {
          setAiSuggestions((prev) => ({
            ...prev,
            tags: tagResult.tags.filter((tag) => !formData.tags.includes(tag)),
            loading: false,
          }));
        }
      }
    };

    const debounceTimer = setTimeout(generateAITags, 1000);
    return () => clearTimeout(debounceTimer);
  }, [formData.title, formData.description, formData.tags]);

  // AI writing analysis with debounce
  useEffect(() => {
    const analyzeWriting = async () => {
      const combinedText = `${formData.title} ${formData.description}`.trim();
      if (combinedText.length > 10) {
        setAiSuggestions((prev) => ({ ...prev, loading: true }));
        const writingResult = await aiService.analyzeWriting(combinedText);
        if (writingResult.success) {
          setAiSuggestions((prev) => ({
            ...prev,
            writing: writingResult,
            loading: false,
          }));
        }
      }
    };

    const debounceTimer = setTimeout(analyzeWriting, 1500);
    return () => clearTimeout(debounceTimer);
  }, [formData.title, formData.description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please add a question title!");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      toast.success("Question posted! 🚀");
      onClose();
    } catch (error) {
      toast.error("Failed to post question");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tag],
        });
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="question-modal glass"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <div className="modal-title">
              <Zap className="title-icon" />
              <h2 className="gradient-text">Ask a Question</h2>
              <Sparkles className="sparkle" />
            </div>
            <motion.button
              className="close-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="question-form">
            {/* Title Input */}
            <div className="form-group">
              <label className="form-label">What's your question? 🤔</label>
              <motion.input
                type="text"
                placeholder="Ask something interesting..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="form-input title-input"
                whileFocus={{ scale: 1.02 }}
                maxLength={200}
              />
              <div className="char-count">{formData.title.length}/200</div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                Add more details (optional) 📝
              </label>
              <motion.textarea
                placeholder="Provide context, examples, or what you've tried..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="form-input description-input"
                rows={4}
                whileFocus={{ scale: 1.01 }}
                maxLength={1000}
              />

              {/* === NAYA CONTENT SUGGESTION BLOCK === */}
              {aiSuggestions.content.length > 0 &&
                formData.description.length === 0 && (
                  <motion.div
                    className="ai-content-suggestions"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="ai-suggestions-header">
                      <Sparkles size={16} />
                      <span>Need inspiration? Try one of these:</span>
                    </div>
                    <div className="content-suggestion-list">
                      {aiSuggestions.content.map((q, i) => (
                        <button
                          type="button"
                          key={i}
                          className="content-suggestion-btn"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              title: q,
                              description: "", // Description clear rakhte hain
                            }))
                          }
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              {/* === END NAYA BLOCK === */}

              <div className="char-count">
                {formData.description.length}/1000
              </div>
            </div>

            {/* === AI ASSISTANT KO YAHAN MOVE KIYA === */}
            {aiSuggestions.writing && !aiSuggestions.loading && (
              <motion.div
                className="ai-writing-assistant-inline"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="ai-assistant-compact">
                  <div className="ai-status">
                    <div className="ai-status-label">
                      <Bot size={14} />
                      <span className="ai-label">AI Assistant</span>
                    </div>
                    <div
                      className={`score-compact ${
                        aiSuggestions.writing.score >= 80
                          ? "good"
                          : aiSuggestions.writing.score >= 60
                          ? "okay"
                          : "needs-work"
                      }`}
                    >
                      {aiSuggestions.writing.score}%
                    </div>
                  </div>

                  {(aiSuggestions.writing.suggestions.length > 0 ||
                    aiSuggestions.writing.improvements.length > 0) && (
                    <div className="ai-tips">
                      {aiSuggestions.writing.suggestions
                        .slice(0, 2)
                        .map((suggestion, index) => (
                          <div key={index} className="ai-tip">
                            <span className="tip-icon">💡</span>
                            <span className="tip-text">
                              {suggestion.message}
                            </span>
                          </div>
                        ))}
                      {aiSuggestions.writing.improvements
                        .slice(0, 1)
                        .map((improvement, index) => (
                          <div
                            key={`imp-${index}`}
                            className="ai-tip improvement-tip"
                          >
                            <span className="tip-icon">✨</span>
                            <span className="tip-text">
                              {improvement.message}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}

                  <div className="ai-stats">
                    <span className="word-count">
                      {aiSuggestions.writing.wordCount} words
                    </span>
                    {aiSuggestions.writing.score >= 80 && (
                      <span className="quality-badge">
                        <CheckCircle size={12} />
                        Great quality!
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            {/* === END MOVED BLOCK === */}

            {/* Tags */}
            <div className="form-group">
              <label className="form-label">
                <Hash size={16} />
                Tags (up to 5)
              </label>
              <div className="tags-container">
                {formData.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
                {formData.tags.length < 5 && (
                  <input
                    type="text"
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    className="tag-input"
                  />
                )}
              </div>
              <div className="tags-hint">Press Enter or comma to add tags</div>

              {/* AI Suggested Tags */}
              {aiSuggestions.tags.length > 0 && !aiSuggestions.loading && (
                <motion.div
                  className="ai-suggestions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="ai-suggestions-header">
                    <Bot size={16} />
                    <span>AI Suggested Tags</span>
                  </div>
                  <div className="suggested-tags">
                    {aiSuggestions.tags.map((tag, index) => (
                      <motion.button
                        key={tag}
                        type="button"
                        className="suggested-tag"
                        onClick={() => {
                          if (formData.tags.length < 5) {
                            setFormData({
                              ...formData,
                              tags: [...formData.tags, tag],
                            });
                          }
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={formData.tags.length >= 5}
                      >
                        <span>#{tag}</span>
                        <span className="add-icon">+</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* User Info */}
            <div className="author-info">
              <div className="author-avatar">{currentUser.avatar}</div>
              <div className="author-details">
                <span className="author-name">{currentUser.username}</span>
                <span className="author-bio">{currentUser.bio}</span>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="submit-btn neon-btn"
              disabled={isSubmitting || !formData.title.trim()}
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
                  Post Question
                </>
              )}
            </motion.button>
          </form>

          {/* Background Effects */}
          <div className="modal-bg-effects">
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionModal;
