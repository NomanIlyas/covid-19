import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContryTemplate from "../templates/Country"

const CountryPage = props => {
  // console.log("props", props.params)
  // console.log(Object.values(props.params)[0])

  var countryName = Object.values(props.params)[0] || ""

  return (
    <Layout>
      <SEO title={countryName} />
      <ContryTemplate countryName={countryName} />
    </Layout>
  )
}

export default CountryPage
