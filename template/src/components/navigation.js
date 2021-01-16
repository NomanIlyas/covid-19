import React from "react"
import { Link } from "gatsby"

const Navigation = ({ toggle }) => {
  return (
    <nav className={`site-navigation ${toggle ? "show-nav" : ""}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/united-states">United States</Link>
        </li>
        <li>
          <Link to="/world">World</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
