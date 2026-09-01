import {
  Activity,
  Bookmark,
  Home,
  Pencil,
  Search,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ onNewThread }) {
  return (
    <aside className="sidebar">
      <div className="threads-logo">
        <span className="threads-symbol">@</span>
        <span>threads</span>
      </div>

      <nav className="main-menu">
        {/* FOR YOU */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <Home size={23} />
          <span>For you</span>
        </NavLink>

        {/* NEW THREAD */}
        <button
          type="button"
          className="menu-item new-thread-menu"
          onClick={onNewThread}
        >
          <Pencil size={23} />
          <span>New thread</span>
        </button>

        {/* SEARCH */}
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <Search size={23} />
          <span>Search</span>
        </NavLink>

        {/* ACTIVITY */}
        <button
          type="button"
          className="menu-item disabled"
        >
          <Activity size={23} />
          <span>Activity</span>
          <span className="notification-dot"></span>
        </button>

        {/* PROFILE */}
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <User size={23} />
          <span>Profile</span>
        </NavLink>

        {/* SAVED */}
        <button
          type="button"
          className="menu-item disabled"
        >
          <Bookmark size={23} />
          <span>Saved</span>
        </button>
      </nav>

      {/* FEEDS */}
      <div className="feeds">
        <div className="feeds-title">
          <span>Feeds</span>
          <span>Edit</span>
        </div>

        <div className="feed-link">
          Following
        </div>

        <div className="feed-link">
          <span>Ghost posts</span>
          <span className="ghost-icon">◌</span>
        </div>
      </div>

      {/* MORE */}
      <button
        type="button"
        className="more-button"
      >
        <span className="more-icon">☰</span>
        <span>More</span>
      </button>
    </aside>
  );
}

export default Sidebar;