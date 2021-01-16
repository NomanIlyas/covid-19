import React from "react"
import { Link } from "gatsby"

const BlogCard = ({ title, excerpt, readmorelink, sourcelink, bgImg }) => {
  return (
    <div className="blog-card" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="blog-card-seprator"></div>
      <div className="blog-card-body">
        <h6 className="blog-card-title">{title}</h6>
        <p className="blog-card-excerpt">{excerpt}</p>
        <Link to={`/singleblog/${title}`} className="blog-card-readnow">
          Read Now
        </Link>

        <p className="blog-card-source">
          <b>Source:</b>{" "}
          <a href={sourcelink} target="_blank" rel="noreferrer">
            Source Link
          </a>
        </p>
      </div>
    </div>
  )
}

export default BlogCard
