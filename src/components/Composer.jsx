import profileData from "../data/profile.json";

function Composer() {
  const currentUser = profileData.profile.find(
    (profile) => Number(profile.profileId) === 2
  );

  if (!currentUser) {
    return null;
  }

  return (
    <section className="composer">
      <img
        src={currentUser.imageUrl}
        alt={currentUser.profileName}
        className="avatar composer-avatar"
      />

      <div className="composer-input">
        What's new?
      </div>

      <button className="post-button">
        Post
      </button>
    </section>
  );
}

export default Composer;