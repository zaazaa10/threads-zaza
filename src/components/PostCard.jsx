import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal } from "lucide-react";
import { useState } from "react";

function PostCard({
  username,
  avatar,
  content,
  time,
  likes = 0,
  replies = 0,
  reposts = 0,
  shares = 0,
}) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  return (
    <article className="post">
      <div className="post-left">
        <img
          src={avatar}
          alt={username}
          className="avatar"
        />

        <div className="thread-line"></div>
      </div>

      <div className="post-body">
        <div className="post-header">
          <div className="username-row">
            <strong>{username}</strong>
            <span>{time}</span>
          </div>

          <MoreHorizontal size={18} />
        </div>

        <p className="post-text">
          {content}
        </p>

        <div className="post-actions">
          <button
            className={`action-button ${liked ? "liked" : ""}`}
            onClick={() => setLiked(!liked)}
          >
            <Heart
              size={19}
              fill={liked ? "currentColor" : "none"}
            />
            <span>
              {liked ? likes + 1 : likes}
            </span>
          </button>

          <button className="action-button">
            <MessageCircle size={19} />
            <span>{replies}</span>
          </button>

          <button
            className="action-button"
            onClick={() => setReposted(!reposted)}
            style={{
            color: reposted ? "#00c853" : "#929292",}}>
            <Repeat2 size={19} />
            <span>{reposted ? reposts + 1 : reposts}</span>
        </button>
        
          <button className="action-button">
            <Send size={18} />
            <span>{shares}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default PostCard;