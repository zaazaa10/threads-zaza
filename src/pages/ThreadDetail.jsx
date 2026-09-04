import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Repeat2,
  Send,
} from "lucide-react";

import profileData from "../data/profile.json";
import postData from "../data/post.json";

function ThreadDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const profiles = profileData.profile || [];
  const posts = postData.post || [];
  const post = posts.find(
    (item) => Number(item.postId) === Number(postId)
  );
  const getProfile = (profileId) => {
    return profiles.find(
      (profile) =>
        Number(profile.profileId) === Number(profileId)
    );
  };

  const getUsername = (profile) => {
    if (!profile) return "user";
    if (profile.username) {
      return profile.username.replace(/^@/, "");
    }

    if (profile.profileName) {
      return profile.profileName
        .toLowerCase()
        .replace(/\s+/g, "");
    }

    return "user";
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };
    const replies = posts
    .filter(
      (item) =>
        Number(item.parentPostId) === Number(postId)
    )
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() -
        new Date(b.timestamp).getTime()
    );

  if (!post) {
    return (
      <div className="page thread-detail-page">
        <header className="thread-detail-header">
          <button
            type="button"
            className="thread-back-button"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1>Thread</h1>
          <div className="thread-header-space"></div>

        </header>

        <div className="thread-not-found">
          Thread tidak ditemukan.
        </div>

      </div>
    );
  }
  const profile = getProfile(post.profileId);
  return (
    <div className="page thread-detail-page">
      <header className="thread-detail-header">
        <button
          type="button"
          className="thread-back-button"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <ArrowLeft size={21} />
        </button>
        <h1>Thread</h1>
        <div className="thread-header-space"></div>
      </header>

      <main className="thread-detail-container">
        <article className="thread-detail-post">

          <div className="thread-detail-user">
            {profile?.imageUrl ? (

              <img
                src={profile.imageUrl}
                alt={profile.profileName || "Profile"}
                className="thread-detail-avatar"
              />

            ) : (

              <div className="thread-detail-avatar thread-default-avatar">
                {(profile?.profileName || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

            )}


            <div className="thread-detail-user-info">
              <strong>
                {profile?.profileName || "Unknown User"}
              </strong>
              <span className="thread-user-meta">
                @{getUsername(profile)}
                <span className="thread-user-separator">
                  ·
                </span>
                <span className="thread-post-date">
                  {formatDate(post.timestamp)}
                </span>
              </span>
            </div>

          </div>

          <div className="thread-detail-content">
            {post.desc}
          </div>

          <div className="thread-detail-actions">
            <button
              type="button"
              aria-label="Like"
            >
              <Heart size={22} />
            </button>
            <button
              type="button"
              aria-label="Reply"
            >
              <MessageCircle size={22} />
            </button>

            <button
              type="button"
              aria-label="Repost"
            >
              <Repeat2 size={22} />
            </button>

            <button
              type="button"
              aria-label="Share"
            >
              <Send size={21} />
            </button>

          </div>

          <div className="thread-replies-section">
            <span className="thread-replies-title">
              {replies.length}{" "}
              {replies.length === 1
                ? "Reply"
                : "Replies"}
            </span>

            {replies.length === 0 ? (
              <div className="thread-no-replies">
                Belum ada replies.
              </div>

            ) : (

              <div className="thread-replies-list">
                {replies.map((reply) => {
                  const replyProfile =
                    getProfile(reply.profileId);
                  return (
                    <article
                      key={reply.postId}
                      className="thread-reply"
                    >

                      <div className="thread-detail-user">
                        {replyProfile?.imageUrl ? (
                          <img
                            src={replyProfile.imageUrl}
                            alt={
                              replyProfile.profileName ||
                              "Profile"
                            }
                            className="thread-detail-avatar"
                          />

                        ) : (

                          <div className="thread-detail-avatar thread-default-avatar">
                            {(
                              replyProfile?.profileName ||
                              "U"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}


                        <div className="thread-detail-user-info">
                          <strong>
                            {replyProfile?.profileName ||
                              "Unknown User"}
                          </strong>

                          <span className="thread-user-meta">
                            @{getUsername(replyProfile)}
                            <span className="thread-user-separator">
                              ·
                            </span>
                            <span className="thread-post-date">
                              {formatDate(reply.timestamp)}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="thread-reply-content">
                        {reply.desc}
                      </div>

                      <div className="thread-detail-actions thread-reply-actions">
                        <button
                          type="button"
                          aria-label="Like">
                          <Heart size={18} />
                        </button>

                        <button
                          type="button"
                          aria-label="Reply"
                        >
                          <MessageCircle size={18} />
                        </button>

                        <button
                          type="button"
                          aria-label="Repost"
                        >
                          <Repeat2 size={18} />
                        </button>

                        <button
                          type="button"
                          aria-label="Share"
                        >
                          <Send size={17} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}

export default ThreadDetail;