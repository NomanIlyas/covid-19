import React, { useState, useEffect } from "react"
import { FullContainer, BlogCard } from "../../theme-components"

const BlogsTemplate = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    setBlogs([
      {
        title: "Blog Title",
        excerpt:
          "There are currently 6,445,494 Currently Infected Patients tests forCOVID were administered.",
        readmorelink: "https://www.google.com/",
        sourcelink: "https://www.google.com/",
        bgImg:
          "https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80",
      },

      {
        title: "Blog Title",
        excerpt:
          "There are currently 6,445,494 Currently Infected Patients tests forCOVID were administered.",
        readmorelink: "https://www.google.com/",
        sourcelink: "https://www.google.com/",
        bgImg:
          "https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80",
      },

      {
        title: "Blog Title",
        excerpt:
          "There are currently 6,445,494 Currently Infected Patients tests forCOVID were administered.",
        readmorelink: "https://www.google.com/",
        sourcelink: "https://www.google.com/",
        bgImg:
          "https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80",
      },

      {
        title: "Blog Title",
        excerpt:
          "There are currently 6,445,494 Currently Infected Patients tests forCOVID were administered.",
        readmorelink: "https://www.google.com/",
        sourcelink: "https://www.google.com/",
        bgImg:
          "https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80",
      },

      {
        title: "Blog Title",
        excerpt:
          "There are currently 6,445,494 Currently Infected Patients tests forCOVID were administered.",
        readmorelink: "https://www.google.com/",
        sourcelink: "https://www.google.com/",
        bgImg:
          "https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80",
      },
    ])
  }, [])

  return (
    <>
      <FullContainer>
        <div className="all-blogs-section">
          {blogs.length
            ? blogs.map((blog, index) => (
                <BlogCard
                  key={index}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  readmorelink={blog.readmorelink}
                  sourcelink={blog.sourcelink}
                  bgImg={blog.bgImg}
                />
              ))
            : null}
        </div>
      </FullContainer>
    </>
  )
}

export default BlogsTemplate
