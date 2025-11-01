import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import QuestionFeed from "./components/QuestionFeed";
import QuestionModal from "./components/QuestionModal";
import QuestionDetail from "./components/QuestionDetail";
import Sidebar from "./components/Sidebar";
import UserProfile from "./components/UserProfile";
import TrendingTopics from "./components/TrendingTopics";
import Pagination from "./components/Pagination";
import FeatureNotAvailable from "./components/FeatureNotAvailable";
import aiService from "./services/aiService";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]); // Store all questions for pagination
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock user for demo purposes with enhanced profile
  const [currentUser, setCurrentUser] = useState({
    _id: "507f1f77bcf86cd799439011",
    username: "GenZVibes",
    name: "Alex Chen",
    avatar: "🚀",
    bio: "Living in the future, one question at a time",
    location: "San Francisco, CA",
  });

  useEffect(() => {
    fetchQuestions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Update displayed questions when page changes
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    setQuestions(allQuestions.slice(startIndex, endIndex));
  }, [currentPage, allQuestions, questionsPerPage]);

  const fetchQuestions = async () => {
    try {
      // Generate content using AI service
      const aiContent = await aiService.generateDummyContent(50);

      // Mock data for demonstration
      const mockQuestions = [
        {
          _id: "1",
          title: "What are the best ways to learn React in 2024? 🚀",
          description:
            "Looking for modern approaches to master React with hooks, context, and latest features.",
          author: {
            _id: "1",
            username: "CodeNinja",
            avatar: "👩‍💻",
          },
          tags: ["React", "JavaScript", "WebDev"],
          upvotes: ["user1", "user2", "user3"],
          downvotes: [],
          views: 1247,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          _id: "2",
          title: "Is Web3 really the future or just hype? 🤔",
          description:
            "Genuinely curious about the real-world applications of blockchain technology beyond crypto.",
          author: {
            _id: "2",
            username: "TechSkeptic",
            avatar: "🧠",
          },
          tags: ["Web3", "Blockchain", "Future"],
          upvotes: ["user1", "user4"],
          downvotes: ["user5"],
          views: 892,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
        // ... (baki mock questions)
      ];

      // Combine mock questions with AI-generated content
      const combinedQuestions = [...mockQuestions];
      if (aiContent.success) {
        const aiQuestions = aiContent.content.map((item) => ({
          _id: `ai_${item.id}`,
          title: item.question,
          description: item.answer,
          author: {
            _id: `author_${item.id}`,
            username: item.author,
            avatar: "🤖",
          },
          tags: item.tags,
          upvotes: Array.from(
            { length: Math.floor(item.upvotes * 0.8) },
            (_, i) => `user_${i}`
          ),
          downvotes: [],
          views: Math.floor(Math.random() * 2000) + 100,
          createdAt: item.timestamp,
        }));
        combinedQuestions.push(...aiQuestions);
      }

      setAllQuestions(combinedQuestions);
      setQuestions(combinedQuestions.slice(0, questionsPerPage));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const handleUpdateProfile = (updatedProfile) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updatedProfile,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addQuestion = (newQuestion) => {
    const questionWithId = {
      ...newQuestion,
      _id: Date.now().toString(),
      author: currentUser,
      upvotes: [],
      downvotes: [],
      views: 0,
      createdAt: new Date(),
    };
    setQuestions([questionWithId, ...questions]);
  };

  const handleUpvote = (questionId) => {
    setQuestions(
      questions.map((q) => {
        if (q._id === questionId) {
          // ... (logic sahi hai)
        }
        return q;
      })
    );
  };

  const handleDownvote = (questionId) => {
    setQuestions(
      questions.map((q) => {
        if (q._id === questionId) {
          // ... (logic sahi hai)
        }
        return q;
      })
    );
  };

  return (
    <Router>
      <div className="App">
        <Header
          onAskQuestion={() => setShowQuestionModal(true)}
          currentUser={currentUser}
          onToggleSidebar={handleToggleSidebar}
        />

        <div className="app-container">
          <Sidebar
            isMobileOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <div className="home-layout">
                      <div className="main-feed">
                        <QuestionFeed
                          questions={questions}
                          loading={loading}
                          onUpvote={handleUpvote}
                          onDownvote={handleDownvote}
                          currentUser={currentUser}
                        />
                        {!loading && allQuestions.length > questionsPerPage && (
                          <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(
                              allQuestions.length / questionsPerPage
                            )}
                            onPageChange={handlePageChange}
                            itemsPerPage={questionsPerPage}
                            totalItems={allQuestions.length}
                          />
                        )}
                      </div>
                      <div className="trending-sidebar">
                        <TrendingTopics />
                      </div>
                    </div>
                  </div>
                }
              />
              <Route
                path="/profile"
                element={
                  <UserProfile
                    user={currentUser}
                    onUpdateProfile={handleUpdateProfile}
                  />
                }
              />
              <Route
                path="/question/:id"
                element={
                  <QuestionDetail
                    questions={allQuestions}
                    currentUser={currentUser}
                    onUpvote={handleUpvote}
                    onDownvote={handleDownvote}
                  />
                }
              />
              {/* ... (baki routes) ... */}
              <Route
                path="/trending"
                element={<FeatureNotAvailable featureName="Trending Page" />}
              />
              <Route
                path="/topics"
                element={<FeatureNotAvailable featureName="Topics Page" />}
              />
              <Route
                path="/following"
                element={<FeatureNotAvailable featureName="Following Page" />}
              />
              <Route
                path="/saved"
                element={<FeatureNotAvailable featureName="Saved Posts" />}
              />
              <Route
                path="/favorites"
                element={<FeatureNotAvailable featureName="Favorites" />}
              />
            </Routes>
          </main>
        </div>

        {showQuestionModal && (
          <QuestionModal
            onClose={() => setShowQuestionModal(false)}
            onSubmit={addQuestion}
            currentUser={currentUser}
          />
        )}

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
