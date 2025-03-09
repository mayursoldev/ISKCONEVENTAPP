import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { getInitials } from "../common/commonMethods";

function Navbar() {
  const { user, logout } = useContext(GlobalContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" className="app-name">
            Event Management System
        </Link>
      </div>
      {showMenu && (
        <div className="menu-links">
          {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
          {!user.token && <Link to="/login">Login</Link>}
        </div>
      )}
      {user.token && (
        <div className="user-initials" onClick={logout}>
          {getInitials(user.name)}
        </div>

      )}
      </nav>
    );
  }
  
  export default Navbar;