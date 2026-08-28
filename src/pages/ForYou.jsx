import { MoreHorizontal } from "lucide-react";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";

import profileData from "../data/profile.json";
import actionData from "../data/action.json";
import actionTypeData from "../data/actionType.json";

function ForYou({ posts, onPost }) {
  const profiles = profileData.profile;
  const actions = actionData.action;
  const actionTypes = actionTypeData.actionType;

  const mainPosts = posts
    .filter((post) => post.parentPostId === undefined)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
    );

  const getProfile = (profileId) => {
    return profiles.find(
      (profile) => Number(profile.profileId) === Number(profileId)
    );
  };

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

  return (
    <div className="page">
      <header className="page-header">
        <h1>For you</h1>
        <MoreHorizontal size={22} />
      </header>

      <Composer onPost={onPost} />

      <section className="posts">
        {mainPosts.map((post) => {
          const profile = getProfile(post.profileId);

          if (!profile) {
            return null;
          }

          return (
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
          );
        })}
      </section>
    </div>
  );
}

export default ForYou;