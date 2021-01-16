import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ alt, imageName }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(imageName)
      })
      if (!image) {
        return null
      }
      return <Img alt={alt} fluid={image.node.childImageSharp.fluid} />
    }}
  />
)

export default Image

// import { useStaticQuery } from "gatsby"
// const Image = ({ name, maxWidth }) => {
//   const data = useStaticQuery(graphql`
//     query {
//       placeholderImage: file(relativePath: { eq: name }) {
//         childImageSharp {
//           fluid(maxWidth: maxWidth) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   `)

//   return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
// }
