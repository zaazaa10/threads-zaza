import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import profileData from "../data/profile.json";
import postData from "../data/post.json";
import actionData from "../data/action.json";
import actionTypeData from "../data/actionType.json";

function Profile() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const LOGGED_IN_PROFILE_ID = 2;
  const profiles = profileData.profile || [];
  const posts = postData.post || [];
  const actions = actionData.action || [];
  const actionTypes = actionTypeData.actionType || [];
  const selectedProfileId = profileId
    ? Number(profileId)
    : LOGGED_IN_PROFILE_ID;
  const profile = profiles.find(
    (item) => Number(item.profileId) === selectedProfileId
  );
  const isOwnProfile =
    selectedProfileId === LOGGED_IN_PROFILE_ID;
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Threads");
  const [isFollowing, setIsFollowing] = useState(false);

  // Edit profile states
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [interests, setInterests] = useState("");
  const [links, setLinks] = useState("");
  const [podcast, setPodcast] = useState("");
  const [showInstagram, setShowInstagram] = useState(false);
  const [showRecentViews, setShowRecentViews] = useState(false);
  const [profilePrivacy, setProfilePrivacy] = useState("Private");

  // Cari profile berdasarkan ID
  const getProfileById = (id) => {
    return profiles.find(
      (item) => Number(item.profileId) === Number(id)
    );
  };

  // Buka edit profile
  const handleEdit = () => {
    setEditName(profile?.profileName || "");
    setEditUsername(profile?.username || "username");
    setEditBio(profile?.desc || "");
    setInterests("");
    setLinks("");
    setPodcast("");
    setShowInstagram(false);
    setShowRecentViews(false);
    setProfilePrivacy("Private");
    setIsEditing(true);
  };

  // Simpan edit
  const handleSave = () => {
    setIsEditing(false);
  };

  // Cancel edit
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Threads milik profile
  const profileThreads = posts
    .filter(
      (post) =>
        Number(post.profileId) === selectedProfileId &&
        post.parentPostId === undefined
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
    );

  // Replies milik profile
  const profileReplies = posts
    .filter(
      (post) =>
        Number(post.profileId) === selectedProfileId &&
        post.parentPostId !== undefined
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
    );

  // Hitung jumlah action
  const getActionCount = (postId, actionName) => {
    const actionType = actionTypes.find(
      (type) =>
        type.actionTypeName?.toLowerCase() ===
        actionName.toLowerCase()
    );

    if (!actionType) {
      return 0;
    }

    return actions.filter(
      (action) =>
        Number(action.postId) === Number(postId) &&
        Number(action.actionTypeId) ===
          Number(actionType.actionTypeId)
    ).length;
  };

  // Hitung jumlah reply
  const getReplyCount = (postId) => {
    return posts.filter(
      (post) =>
        Number(post.parentPostId) === Number(postId)
    ).length;
  };

  // Format waktu post
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

  const displayedPosts =
    activeTab === "Threads"
      ? profileThreads
      : profileReplies;

  if (!profile) {
    return (
      <div className="page profile-page">
        <div className="profile-empty">
          <h3>Profile not found</h3>

          <p>
            The profile you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page profile-page">

      <header className="page-header">
        <div className="profile-header-left">
          {!isOwnProfile && (
            <button
              type="button"
              className="profile-back-btn"
              onClick={() => navigate("/search")}
              aria-label="Back to search"
            >
              ←
            </button>
          )}

          <h1>Profile</h1>
        </div>

        <MoreHorizontal size={22} />
      </header>

      <section className="profile-card">
        <div className="profile-top">
          <div className="profile-info">
            <h2>{profile.profileName}</h2>

            <p>
              @{profile.username}
            </p>
          </div>

          <img
            src={profile.imageUrl}
            alt={profile.profileName}
            className="profile-avatar"
          />
        </div>

        <p className="profile-bio">
          {profile.desc}
        </p>

        {isOwnProfile ? (
          <button
            type="button"
            className="edit-profile-btn"
            onClick={handleEdit}
          >
            Edit profile
          </button>
        ) : (

          <button
            type="button"
            className={`follow-profile-btn ${
              isFollowing ? "following" : ""
            }`}
            onClick={() =>
              setIsFollowing(!isFollowing)
            }
          >
            {isFollowing ? "Followed" : "Follow"}
          </button>
        )}
      </section>

      {isEditing && isOwnProfile && (
        <div
          className="edit-profile-overlay"
          onClick={handleCancel}
        >
          <div
            className="edit-profile-card"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="edit-profile-header">
              <h2>Edit profile</h2>

              <button
                type="button"
                className="done-btn"
                onClick={handleSave}
              >
                Done
              </button>
            </div>

            <div className="edit-profile-body">
              <div className="edit-field">
                <label>Name</label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                  placeholder="Name"
                />
              </div>

              <div className="edit-field">
                <label>Username</label>

                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) =>
                    setEditUsername(e.target.value)
                  }
                  placeholder="Username"
                />
              </div>

              <div className="edit-field">
                <label>Bio</label>

                <textarea
                  value={editBio}
                  onChange={(e) =>
                    setEditBio(e.target.value)
                  }
                  placeholder="Bio"
                  rows={2}
                />
              </div>

              <div className="edit-field">
                <label>Interests</label>

                <input
                  type="text"
                  value={interests}
                  onChange={(e) =>
                    setInterests(e.target.value)
                  }
                  placeholder="Add interests"
                />
              </div>

              <div className="edit-field">
                <label>Links</label>

                <input
                  type="text"
                  value={links}
                  onChange={(e) =>
                    setLinks(e.target.value)
                  }
                  placeholder="Add links"
                />
              </div>

              <div className="edit-field">
                <label>Podcast</label>
                <input
                  type="text"
                  value={podcast}
                  onChange={(e) =>
                    setPodcast(e.target.value)
                  }
                  placeholder="+ Link to your podcast"
                />
              </div>

              <div className="edit-field toggle-field">
                <label>
                  Show Instagram badge
                </label>

                <button
                  type="button"
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
                <label>
                  Show recent views
                </label>

                <button
                  type="button"
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
                  This will be public on your profile when
                  you get 10K+ recent views.
                </p>
              </div>

              <div className="edit-field">
                <label>
                  Profile privacy
                </label>

                <select
                  value={profilePrivacy}
                  onChange={(e) =>
                    setProfilePrivacy(e.target.value)
                  }
                >
                  <option value="Private">
                    Private
                  </option>

                  <option value="Public">
                    Public
                  </option>
                </select>

                <p className="field-note">
                  If you switch to public, anyone can see
                  your threads and replies.
                </p>
              </div>
            </div>

            <div className="edit-profile-footer">
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
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
          type="button"
          className={`profile-tab ${
            activeTab === "Threads"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("Threads")
          }
        >
          Threads
        </button>

        <button
          type="button"
          className={`profile-tab ${
            activeTab === "Replies"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("Replies")
          }
        >
          Replies
        </button>

        <button
          type="button"
          className={`profile-tab ${
            activeTab === "Media"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("Media")
          }
        >
          Media
        </button>

        <button
          type="button"
          className={`profile-tab ${
            activeTab === "Reposts"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("Reposts")
          }
        >
          Reposts
        </button>

      </div>

      {activeTab === "Media" ||
      activeTab === "Reposts" ? (
        <div className="profile-empty">
          <h3>
            No {activeTab.toLowerCase()} yet
          </h3>

          <p>
            Your {activeTab.toLowerCase()} will appear
            here.
          </p>
        </div>

      ) : displayedPosts.length > 0 ? (

        <section className="posts profile-posts">
          {displayedPosts.map((post) => {
            const postProfile =
              getProfileById(post.profileId);
            return (
              <PostCard
                key={post.postId}

                username={
                  postProfile?.profileName ||
                  "Unknown"
                }

                time={formatTime(
                  post.timestamp
                )}

                content={post.desc}

                avatar={
                  postProfile?.imageUrl
                }

                likes={getActionCount(
                  post.postId,
                  "Like"
                )}

                replies={getReplyCount(
                  post.postId
                )}

                reposts={getActionCount(
                  post.postId,
                  "Repost"
                )}

                shares={getActionCount(
                  post.postId,
                  "Share"
                )}
              />
            );
          })}

        </section>
      ) : (

        <div className="profile-empty">

          <h3>
            No {activeTab.toLowerCase()} yet
          </h3>

          <p>
            Your {activeTab.toLowerCase()} will appear
            here.
          </p>

        </div> )}
    </div>
  );
}

export default Profile;