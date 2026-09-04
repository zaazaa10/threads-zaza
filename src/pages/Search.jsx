import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import profileData from "../data/profile.json";

function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const profiles = profileData.profile || [];
  const filteredProfiles = profiles.filter((profile) => {
  const keyword = search.toLowerCase();
    return profile.profileName.toLowerCase().includes(keyword);
    });

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-header">
          <div className="search-input-wrapper">
            <SearchIcon size={18} className="search-icon" />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {search.trim() !== "" && (
          <div className="search-results">

            {filteredProfiles.map((profile) => (
             <div
                 className="search-user"
                 key={profile.profileId}
                 onClick={() => navigate(`/profile/${profile.profileId}`)}
>
                <img
                  src={profile.imageUrl}
                  alt={profile.profileName}
                  className="search-avatar"
                />

                <div className="search-user-info">
                  <div className="search-user-name">
                    {profile.profileName}
                  </div>

                  <div className="search-user-handle">
                    {profile.desc}
                  </div>
                </div>

                <button
                  type="button"
                  className="search-follow-btn"
                >
                  Follow
                </button>
              </div>
            ))}

            {filteredProfiles.length === 0 && (
              <div className="search-empty">
                No results found
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Search;