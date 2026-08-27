import { MoreHorizontal } from "lucide-react";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";

import profileData from "../data/profile.json";
import postData from "../data/post.json";
import actionData from "../data/action.json";
import actionTypeData from "../data/actionType.json";

function ForYou() {
  const profiles = profileData.profile;
  const posts = postData.post;
  const actions = actionData.action;
  const actionTypes = actionTypeData.actionType;

  const mainPosts = posts
    .filter((post) => post.parentPostId === undefined)
    .slice(0, 5);

  const getProfile = (profileId) => {
    return profiles.find(
      (profile) => profile.profileId === profileId
    );
  };

  const getActionCount = (postId, actionName) => {
    const actionType = actionTypes.find(
      (type) => type.actionTypeName.toLowerCase() ===
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

  return (
    <div className="page">
      <header className="page-header">
        <h1>For you</h1>
        <MoreHorizontal size={22} />
      </header>

      <Composer />

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
              time="Today"
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