import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsTemplate from "../templates/News"

const NewsPage = () => (
  <Layout>
    <SEO title="News" />
    <NewsTemplate />
  </Layout>
)

export default NewsPage
