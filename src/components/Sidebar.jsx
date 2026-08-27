import {
  Activity,
  Bookmark,
  Home,
  Pencil,
  Search,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="threads-logo">
        <span className="threads-symbol">@</span>
        <span>threads</span>
      </div>

      <nav className="main-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <Home size={23} />
          <span>For you</span>
        </NavLink>

        <button className="menu-item disabled">
          <Pencil size={23} />
          <span>New thread</span>
        </button>

        <button className="menu-item disabled">
          <Search size={23} />
          <span>Search</span>
        </button>

        <button className="menu-item disabled">
          <Activity size={23} />
          <span>Activity</span>
          <span className="notification-dot"></span>
        </button>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <User size={23} />
          <span>Profile</span>
        </NavLink>

        <button className="menu-item disabled">
          <Bookmark size={23} />
          <span>Saved</span>
        </button>
      </nav>

      <div className="feeds">
        <div className="feeds-title">
          <span>Feeds</span>
          <span>Edit</span>
        </div>

        <div className="feed-link">Following</div>

        <div className="feed-link">
          <span>Ghost posts</span>
          <span className="ghost-icon">◌</span>
        </div>
      </div>

      <button className="more-button">
        <span className="more-icon">☰</span>
        <span>More</span>
      </button>
    </aside>
  );
}

export default Sidebar;