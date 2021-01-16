import React from "react"
import {
  FullContainer,
  BlogCard,
  SmallContainer,
  Sections,
} from "../../../theme-components"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import blogSliderResponsive from "../../../utils/blog-slider-responsive"

const NewsSection = () => {
  return (
    <>
      <FullContainer>
        <SmallContainer>
          <Sections
            withPadding
            title="United States News"
            paragraph="What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R). "
          />
        </SmallContainer>

        <div className="blog-slider">
          <Carousel
            ssr
            partialVisbile
            responsive={blogSliderResponsive}
            itemClass="image-item"
          >
            <BlogCard
              title="News Title"
              excerpt="There are currently 6,445,494 Currently Infected Patients tests for
      COVID were administered."
              readmorelink="https://www.google.com/"
              sourcelink="https://www.google.com/"
              bgImg="https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
            />
            <BlogCard
              title="News Title"
              excerpt="There are currently 6,445,494 Currently Infected Patients tests for
      COVID were administered."
              readmorelink="https://www.google.com/"
              sourcelink="https://www.google.com/"
              bgImg="https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
            />
            <BlogCard
              title="News Title"
              excerpt="There are currently 6,445,494 Currently Infected Patients tests for
      COVID were administered."
              readmorelink="https://www.google.com/"
              sourcelink="https://www.google.com/"
              bgImg="https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
            />
            <BlogCard
              title="News Title"
              excerpt="There are currently 6,445,494 Currently Infected Patients tests for
      COVID were administered."
              readmorelink="https://www.google.com/"
              sourcelink="https://www.google.com/"
              bgImg="https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
            />
            <BlogCard
              title="News Title"
              excerpt="There are currently 6,445,494 Currently Infected Patients tests for
      COVID were administered."
              readmorelink="https://www.google.com/"
              sourcelink="https://www.google.com/"
              bgImg="https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
            />
            <BlogCard
              title="News Title"
              excerpt="There are currently 6,445,494 Currently Infected Patients tests for
      COVID were administered."
              readmorelink="https://www.google.com/"
              sourcelink="https://www.google.com/"
              bgImg="https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
            />
            <BlogCard
              title="News Title"
              excerpt="There are currently 6,445,494 Currently Infected Patients tests for
      COVID were administered."
              readmorelink="https://www.google.com/"
              sourcelink="https://www.google.com/"
              bgImg="https://images.unsplash.com/photo-1597614773588-543592d2c5f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
            />
          </Carousel>
        </div>
        {/* <div className="us-news-section"></div> */}
      </FullContainer>
    </>
  )
}

export default NewsSection
