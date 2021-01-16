import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const WorldPage = () => {
  return (
    <Layout>
      <SEO title="World" />

      <h2>Countries</h2>
      <Link to="/country/south-africa">South Africa</Link>
      <br />
      <Link to="/country/london">London</Link>
      <br />
      <Link to="/country/india">India</Link>
      <br />
      <Link to="/country/china">China</Link>

      <h2>States</h2>
      <Link to="/states/new-york">New York</Link>
      <br />
      <Link to="/states/madhya-pradesh">Madhya Pradesh</Link>
    </Layout>
  )
}

export default WorldPage
