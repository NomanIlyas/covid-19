import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import "./theme.css"
import "./main.css"

import * as am4core from "@amcharts/amcharts4/core"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
try {
  am4core.useTheme(am4themes_animated)
} catch {}

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
      </Helmet>

      <Header siteTitle="The Covid Center" />
      <div className="site-wrapper">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
