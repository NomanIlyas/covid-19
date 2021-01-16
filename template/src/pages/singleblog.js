import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SingleBlogTemplate from "../templates/SingleBlog"

const SingleBlogPage = props => {
  var blogTitle = Object.values(props.params)[0] || ""

  return (
    <Layout>
      <SEO title={"News"} />
      <SingleBlogTemplate blogTitle={blogTitle} />
    </Layout>
  )
}

export default SingleBlogPage
