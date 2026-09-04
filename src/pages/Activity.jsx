import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
} from "lucide-react";

import profileData from "../data/profile.json";
import postData from "../data/post.json";
import actionData from "../data/action.json";
import actionTypeData from "../data/actionType.json";

function Activity() {
  const LOGGED_IN_PROFILE_ID = 2;
  const profiles = profileData.profile || [];
  const posts = postData.post || [];
  const actions = actionData.action || [];
  const actionTypes = actionTypeData.actionType || [];
  const [activeTab, setActiveTab] = useState("All");

  const getProfile = (profileId) => {
    return profiles.find(
      (profile) =>
        Number(profile.profileId) === Number(profileId)
    );
  };

    const getActionType = (actionTypeId) => {
    return actionTypes.find(
      (type) =>
        Number(type.actionTypeId) === Number(actionTypeId)
    );
  };

    const formatTime = (timestamp) => {
    if (!timestamp) {
      return "";
    }

    const activityTime = new Date(timestamp);
    if (Number.isNaN(activityTime.getTime())) {
      return "";
    }

    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - activityTime.getTime()) / 1000
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
    return activityTime.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  const userPostIds = posts
    .filter(
      (post) =>
        Number(post.profileId) === LOGGED_IN_PROFILE_ID
    )
    .map((post) => Number(post.postId));

  const activityData = actions
    .filter((action) =>
      userPostIds.includes(Number(action.postId))
    )
    .map((action) => {
      const actor = getProfile(action.profileId);

      const post = posts.find(
        (item) =>
          Number(item.postId) === Number(action.postId)
      );

      const actionType = getActionType(action.actionTypeId);

      if (!actor || !post || !actionType) {
        return null;
      }

      return {
        ...action,
        actor,
        post,
        actionType: actionType.actionTypeName,
      };
    })
    .filter(Boolean)

    .sort(
      (a, b) =>
        new Date(b.post.timestamp).getTime() -
        new Date(a.post.timestamp).getTime()
    );

  const getIcon = (type) => {
    const name = type.toLowerCase();

    if (name.includes("like")) {
      return <Heart size={18} fill="currentColor" />;
    }

    if (name.includes("reply")) {
      return <MessageCircle size={18} fill="currentColor" />;
    }

    if (name.includes("repost")) {
      return <Repeat2 size={18} />;
    }

    return <Heart size={18} />;
  };

  const getActivityText = (type) => {
    const name = type.toLowerCase();

    if (name.includes("like")) {
      return "liked your thread";
    }

    if (name.includes("reply")) {
      return "replied to your thread";
    }

    if (name.includes("repost")) {
      return "reposted your thread";
    }

    if (name.includes("share")) {
      return "shared your thread";
    }

    return `${type.toLowerCase()} your thread`;
  };

  const filteredActivities =
    activeTab === "All"
      ? activityData
      : activityData.filter((activity) => {
          const type = activity.actionType.toLowerCase();

          if (activeTab === "Likes") {
            return type.includes("like");
          }

          if (activeTab === "Replies") {
            return type.includes("reply");
          }

          if (activeTab === "Reposts") {
            return type.includes("repost");
          }

          return true;
        });

  return (
    <div className="page activity-page">
      <header className="page-header">
        <h1>Activity</h1>
      </header>

      <div className="activity-tabs">
        {["All", "Likes", "Replies", "Reposts"].map(
          (tab) => (
            <button
              key={tab}
              type="button"
              className={`activity-tab ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>

      <section className="activity-list">
        {filteredActivities.map((activity) => {
          const actor = activity.actor;

          return (
            <article
              className="activity-item"
              key={activity.actionId}
            >
              <div className="activity-avatar-wrapper">
                <img
                  src={actor.imageUrl}
                  alt={actor.profileName}
                  className="activity-avatar"
                />

                <span
                  className={`activity-icon ${
                    activity.actionType
                      .toLowerCase()
                      .includes("like")
                      ? "like"
                      : ""
                  }`}
                >
                  {getIcon(activity.actionType)}
                </span>
              </div>

              <div className="activity-content">
                <div className="activity-top">
                  <div>
                    <strong>{actor.profileName}</strong>

                    <span className="activity-username">
                      @{actor.username}
                    </span>
                  </div>

                  <span className="activity-time">
                    {formatTime(activity.post.timestamp)}
                  </span>
                </div>

                <p className="activity-action">
                  {getActivityText(activity.actionType)}
                </p>

                <p className="activity-preview">
                  {activity.post.desc}
                </p>
              </div>
            </article>
          );
        })}

        {filteredActivities.length === 0 && (
          <div className="activity-empty">
            <h3>No activity yet</h3>

            <p>
              When people interact with your threads,
              you'll see it here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Activity; 