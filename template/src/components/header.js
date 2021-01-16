import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Navigation from "./navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

const Header = ({ siteTitle }) => {
  const [sideBarToggle, setSideBarToggle] = useState(false)
  return (
    <header className="header">
      <div className="site-logo">
        <h1 style={{ margin: 0 }}>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>

      <span className="menu-toggle">
        <FontAwesomeIcon
          icon={sideBarToggle ? faTimes : faBars}
          color={"#fff"}
          onClick={() => setSideBarToggle(!sideBarToggle)}
        />
      </span>

      <Navigation toggle={sideBarToggle} />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
