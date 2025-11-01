import React, { useState } from "react";
import AvatarSelector from "./AvatarSelector";
import "./UserProfile.css";

const UserProfile = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    avatar: user.avatar || "🚀",
  });

  const handleSave = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  const handleAvatarSelect = (avatar) => {
    setEditForm({ ...editForm, avatar });
  };

  const openAvatarSelector = () => {
    setShowAvatarSelector(true);
  };

  // Number formatting handled inline with hardcoded values

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar-section">
          {isEditing ? (
            <div className="avatar-selector-trigger">
              <button
                type="button"
                className="avatar-edit-btn"
                onClick={openAvatarSelector}
              >
                <div className="profile-avatar">{editForm.avatar}</div>
                <div className="avatar-edit-overlay">
                  <span>Change</span>
                </div>
              </button>
            </div>
          ) : (
            <div className="profile-avatar-display">
              <div className="profile-avatar">{user.avatar || "🚀"}</div>
            </div>
          )}
        </div>

        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Your name"
                className="edit-input"
              />
              <textarea
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                className="edit-textarea"
                rows="3"
              />
              <input
                type="text"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                placeholder="Location"
                className="edit-input"
              />
            </div>
          ) : (
            <div className="profile-display">
              <h2 className="profile-name">{user.name || "Anonymous User"}</h2>
              <p className="profile-bio">
                {user.bio ||
                  "No bio yet. Add one to tell the world about yourself! 🌟"}
              </p>
              {user.location && (
                <p className="profile-location">📍 {user.location}</p>
              )}
            </div>
          )}

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">42</span>
              <span className="stat-label">Questions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">128</span>
              <span className="stat-label">Answers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1.2k</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">834</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  ✨ Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Removed followers section as requested */}

      {/* Avatar Selector Modal */}
      <AvatarSelector
        isOpen={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        onSelectAvatar={handleAvatarSelect}
        currentAvatar={editForm.avatar}
      />
    </div>
  );
};

export default UserProfile;
