import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StatesTemplate from "../templates/State"

const StatesPage = props => {
  var stateName = Object.values(props.params)[0] || ""

  return (
    <Layout>
      <SEO title={stateName} />
      <StatesTemplate stateName={stateName} />
    </Layout>
  )
}

export default StatesPage
