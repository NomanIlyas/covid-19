import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeTemplate from "../templates/Home"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <HomeTemplate />
  </Layout>
)

export default IndexPage
