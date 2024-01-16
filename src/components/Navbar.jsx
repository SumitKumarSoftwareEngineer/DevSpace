import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        DevSpace
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/Users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/Posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="/Albums">Albums</NavLink>
        </li>
      </ul>
    </nav>
  );
};
