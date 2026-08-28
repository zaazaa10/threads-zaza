import { useState } from "react";
import profileData from "../data/profile.json";

function Composer({ onPost }) {
  const [content, setContent] = useState("");

  const currentUser = profileData.profile.find(
    (profile) => Number(profile.profileId) === 2
  );

  if (!currentUser) {
    return null;
  }

  const handlePost = () => {
    const text = content.trim();

    if (!text) return;

    const newPost = {
      postId: Date.now(),
      profileId: Number(currentUser.profileId),
      parentPostId: undefined,
      desc: text,
      timestamp: new Date().toISOString(),
    };

    onPost(newPost);
    setContent("");
  };

  return (
    <section className="composer">
      <img
        src={currentUser.imageUrl}
        alt={currentUser.profileName}
        className="avatar composer-avatar"
      />

      <div className="composer-body">
        <textarea
          className="composer-input"
          placeholder="What's new?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="composer-bottom">
          <button
            type="button"
            className={`post-button ${
              content.trim() ? "post-active" : ""
            }`}
            onClick={handlePost}
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </section>
  );
}

export default Composer;