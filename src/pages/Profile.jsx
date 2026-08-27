import { MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import profileData from "../data/profile.json";

function Profile() {
  const profile = profileData.profile.find(
    (item) => item.profileId === 2
  );

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(profile?.profileName || "");
  const [username, setUsername] = useState(profile?.username || "username");
  const [bio, setBio] = useState(profile?.desc || "");

  const [interests, setInterests] = useState("");
  const [links, setLinks] = useState("");
  const [podcast, setPodcast] = useState("");

  const [showInstagram, setShowInstagram] = useState(false);
  const [showRecentViews, setShowRecentViews] = useState(false);
  const [profilePrivacy, setProfilePrivacy] = useState("Private");

  if (!profile) {
    return <div className="page">Profile not found.</div>;
  }

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(profile.profileName || "");
    setUsername(profile.username || "username");
    setBio(profile.desc || "");

    setInterests("");
    setLinks("");
    setPodcast("");

    setShowInstagram(false);
    setShowRecentViews(false);
    setProfilePrivacy("Private");

    setIsEditing(false);
  };

  return (
    <div className="page profile-page">
      <header className="page-header">
        <h1>Profile</h1>

        <button className="header-more-btn">
          <MoreHorizontal size={22} />
        </button>
      </header>

      <section className="profile-card">
        <div className="profile-top">
          <div className="profile-info">
            <h2>{name}</h2>
            <p>
              @{username}
            </p>
          </div>

          <img
            src={profile.imageUrl}
            alt={name}
            className="profile-avatar"
          />
        </div>

        <p className="profile-bio">
          {bio}
        </p>
        <button
          className="edit-profile-btn"
          onClick={() => setIsEditing(true)}
        >
          Edit profile
        </button>
      </section>

      {isEditing && (
        <div
          className="edit-profile-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCancel();
            }
          }}
        >

          <div className="edit-profile-card">
            <div className="edit-profile-header">
              <button
                className="close-edit-btn"
                onClick={handleCancel}
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <h2>Edit profile</h2>
              <button
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
                  rows={3}
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
                <div className="toggle-content">
                  <label>Show Instagram badge</label>
                </div>

                <button
                  type="button"
                  className={`toggle-btn ${
                    showInstagram ? "active" : ""
                  }`}
                  onClick={() =>
                    setShowInstagram(!showInstagram)
                  }
                  aria-label="Toggle Instagram badge"
                >
                  <span className="toggle-slider"></span>
                </button>
              </div>

              <div className="edit-field toggle-field">
                <div className="toggle-content">
                  <label>Show recent views</label>
                  <p className="field-note">
                    This will be public on your profile when you
                    get 10K+ recent views.
                  </p>
                </div>

                <button
                  type="button"
                  className={`toggle-btn ${
                    showRecentViews ? "active" : ""
                  }`}
                  onClick={() =>
                    setShowRecentViews(!showRecentViews)
                  }
                  aria-label="Toggle recent views"
                >
                  <span className="toggle-slider"></span>
                </button>
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
        <button className="profile-tab active">
          Threads
        </button>
        <button className="profile-tab">
          Replies
        </button>

        <button className="profile-tab">
          Media
        </button>

        <button className="profile-tab">
          Reposts
        </button>

      </div>
      <div className="profile-empty">

        <h3>No threads yet</h3>

        <p>
          Your threads will appear here.
        </p>

      </div>

    </div>
  );
}

export default Profile;