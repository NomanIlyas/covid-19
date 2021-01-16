import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogsTemplate from "../templates/Blog"

const BlogsPage = () => (
  <Layout>
    <SEO title="Blogs" />
    <BlogsTemplate />
  </Layout>
)

export default BlogsPage
