import React, { useState } from "react"
import { SmallContainer, Loader } from "../../theme-components"

const SingleBlogTemplate = ({ blogTitle }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [singleBlog, setSingleBlog] = useState({
    title: "Blog Title",
    description: `Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
    Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`,
    authors: "John Doe",
    image:
      "https://nypost.com/wp-content/uploads/sites/2/2020/07/revel.jpg?quality=90&strip=all&w=1200",
    publishedAt: "2020-07-28T14:40:08.001Z",
  })

  return (
    <>
      {isLoading ? <Loader /> : null}
      {singleBlog && (
        <SmallContainer>
          <h1 className="single-blog-title">{singleBlog.title}</h1>
          <div className="single-blog-meta">
            {singleBlog.authors ? (
              <span className="author-name">{singleBlog.authors}</span>
            ) : null}
            <span className="blog-date">
              {new Date(singleBlog.publishedAt).toDateString()}
            </span>
          </div>

          {singleBlog.image ? (
            <div className="single-blog-img">
              <img src={singleBlog.image} alt={singleBlog.title} />
            </div>
          ) : null}

          <p className="single-blog-paragraph">{singleBlog.description}</p>
        </SmallContainer>
      )}
    </>
  )
}

export default SingleBlogTemplate
