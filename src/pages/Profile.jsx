import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import PostCard from "../components/PostCard";

import profileData from "../data/profile.json";
import postData from "../data/post.json";
import actionData from "../data/action.json";
import actionTypeData from "../data/actionType.json";

function Profile() {
  const LOGGED_IN_PROFILE_ID = 2;

  const profiles = profileData.profile;
  const posts = postData.post;
  const actions = actionData.action;
  const actionTypes = actionTypeData.actionType;

  const profile = profiles.find(
    (item) => item.profileId === LOGGED_IN_PROFILE_ID
  );

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Threads");

  const [name, setName] = useState(profile.profileName);
  const [username, setUsername] = useState(
    profile.username || "username"
  );
  const [bio, setBio] = useState(profile.desc);
  const [interests, setInterests] = useState("");
  const [links, setLinks] = useState("");
  const [podcast, setPodcast] = useState("");
  const [showInstagram, setShowInstagram] = useState(false);
  const [showRecentViews, setShowRecentViews] = useState(false);
  const [profilePrivacy, setProfilePrivacy] = useState("Private");

  const profileThreads = posts
    .filter(
      (post) =>
        post.profileId === LOGGED_IN_PROFILE_ID &&
        post.parentPostId === undefined
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
    );

  const profileReplies = posts
    .filter(
      (post) =>
        post.profileId === LOGGED_IN_PROFILE_ID &&
        post.parentPostId !== undefined
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
    );

  const getActionCount = (postId, actionName) => {
    const actionType = actionTypes.find(
      (type) =>
        type.actionTypeName.toLowerCase() ===
        actionName.toLowerCase()
    );

    if (!actionType) {
      return 0;
    }

    return actions.filter(
      (action) =>
        action.postId === postId &&
        action.actionTypeId === actionType.actionTypeId
    ).length;
  };

  const getReplyCount = (postId) => {
    return posts.filter(
      (post) => post.parentPostId === postId
    ).length;
  };

  const formatTime = (timestamp) => {
    const postTime = new Date(timestamp);
    const now = new Date();

    const diffInSeconds = Math.floor(
      (now.getTime() - postTime.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return `${Math.max(diffInSeconds, 1)}s`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d`;
    }

    return postTime.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(profile.profileName);
    setUsername(profile.username || "username");
    setBio(profile.desc);
    setInterests("");
    setLinks("");
    setPodcast("");
    setShowInstagram(false);
    setShowRecentViews(false);
    setProfilePrivacy("Private");
    setIsEditing(false);
  };

  const displayedPosts =
    activeTab === "Threads" ? profileThreads : profileReplies;

  return (
    <div className="page profile-page">
      <header className="page-header">
        <h1>Profile</h1>
        <MoreHorizontal size={22} />
      </header>

      <section className="profile-card">
        <div className="profile-top">
          <div className="profile-info">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
                placeholder="Name"
              />
            ) : (
              <>
                <h2>{name}</h2>
                <p>@{username}</p>
              </>
            )}
          </div>

          <img
            src={profile.imageUrl}
            alt={name}
            className="profile-avatar"
          />
        </div>

        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="profile-textarea"
            placeholder="Bio"
          />
        ) : (
          <p className="profile-bio">{bio}</p>
        )}

        <button
          className="edit-profile-btn"
          onClick={() => setIsEditing(true)}
        >
          Edit profile
        </button>
      </section>

      {isEditing && (
        <div className="edit-profile-overlay">
          <div className="edit-profile-card">
            <div className="edit-profile-header">
              <h2>Edit profile</h2>

              <button
                className="done-btn"
                onClick={handleSave}>
                Done
              </button>
            </div>

            <div className="edit-profile-body">
              <div className="edit-field">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>

              <div className="edit-field">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>

              <div className="edit-field">
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Bio"
                  rows={2}
                />
              </div>

              <div className="edit-field">
                <label>Interests</label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Add interests"
                />
              </div>

              <div className="edit-field">
                <label>Links</label>
                <input
                  type="text"
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  placeholder="Add links"
                />
              </div>

              <div className="edit-field">
                <label>Podcast</label>
                <input
                  type="text"
                  value={podcast}
                  onChange={(e) => setPodcast(e.target.value)}
                  placeholder="+ Link to your podcast"
                />
              </div>

              <div className="edit-field toggle-field">
                <label>Show Instagram badge</label>

                <button
                  className={`toggle-btn ${
                    showInstagram ? "active" : ""
                  }`}
                  onClick={() =>
                    setShowInstagram(!showInstagram)
                  }
                >
                  <span className="toggle-slider"></span>
                </button>
              </div>

              <div className="edit-field toggle-field">
                <label>Show recent views</label>

                <button
                  className={`toggle-btn ${
                    showRecentViews ? "active" : ""
                  }`}
                  onClick={() =>
                    setShowRecentViews(!showRecentViews)
                  }
                >
                  <span className="toggle-slider"></span>
                </button>

                <p className="field-note">
                  This will be public on your profile when you get
                  10K+ recent views.
                </p>
              </div>

              <div className="edit-field">
                <label>Profile privacy</label>

                <select
                  value={profilePrivacy}
                  onChange={(e) =>
                    setProfilePrivacy(e.target.value)
                  }
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>

                <p className="field-note">
                  If you switch to public, anyone can see your
                  threads and replies.
                </p>
              </div>
            </div>

            <div className="edit-profile-footer">
              <button
                className="cancel-edit-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="save-edit-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-tabs">
        <button
          className={`profile-tab ${
            activeTab === "Threads" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Threads")}
        >
          Threads
        </button>

        <button
          className={`profile-tab ${
            activeTab === "Replies" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Replies")}
        >
          Replies
        </button>

        <button
          className={`profile-tab ${
            activeTab === "Media" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Media")}
        >
          Media
        </button>

        <button
          className={`profile-tab ${
            activeTab === "Reposts" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Reposts")}
        >
          Reposts
        </button>
      </div>

      {activeTab === "Media" || activeTab === "Reposts" ? (
        <div className="profile-empty">
          <h3>No {activeTab.toLowerCase()} yet</h3>
          <p>Your {activeTab.toLowerCase()} will appear here.</p>
        </div>
      ) : displayedPosts.length > 0 ? (
        <section className="posts profile-posts">
          {displayedPosts.map((post) => (
            <PostCard
              key={post.postId}
              username={profile.profileName}
              time={formatTime(post.timestamp)}
              content={post.desc}
              avatar={profile.imageUrl}
              likes={getActionCount(post.postId, "Like")}
              replies={getReplyCount(post.postId)}
              reposts={getActionCount(post.postId, "Repost")}
              shares={getActionCount(post.postId, "Share")}
            />
          ))}
        </section>
      ) : (
        <div className="profile-empty">
          <h3>
            No {activeTab.toLowerCase()} yet
          </h3>
          <p>
            Your {activeTab.toLowerCase()} will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;