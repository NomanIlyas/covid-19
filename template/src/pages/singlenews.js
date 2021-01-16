import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SingleNewsTemplate from "../templates/SingleNews"

const SingleNewsPage = props => {
  // console.log("props", props.params)
  // console.log(Object.values(props.params)[0])

  var newsTitle = Object.values(props.params)[0] || ""

  return (
    <Layout>
      <SEO title={"News"} />
      <SingleNewsTemplate newsTitle={newsTitle} />
    </Layout>
  )
}

export default SingleNewsPage
