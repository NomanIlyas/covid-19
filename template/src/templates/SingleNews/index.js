import React, { useState, useEffect } from "react"
import { Loader } from "../../theme-components"
import ReactHtmlParser from "react-html-parser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"

const SingleNewsTemplate = ({ newsTitle }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const [singleNews, setSingleNews] = useState({
    authors: [],
    blogLogoUrl: "",
    blogName: "",
    category: "",
    description: "",
    html: ``,
    images: [],
    keywords: [],
    language: "",
    mainImage: "",
    predictedCategories: [],
    publishedAt: "",
    summary: "",
    tags: [],
    text: "",
    title: "",
    url: "",
  })

  // HBW API KEY: 1ee69d06b5mshfe657c81612ce43p14ac96jsn5a1ea919b128
  const getSingleNews = () => {
    setIsLoading(true)

    fetch(
      // "https://news-extract1.p.rapidapi.com/?url=https%253A%252F%252Fnypost.com%252F2020%252F07%252F28%252Frevel-shuts-down-service-in-nyc-following-series-of-crashes%252F",
      `https://news-extract1.p.rapidapi.com/?url=${encodeURI(newsTitle)}`,
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "news-extract1.p.rapidapi.com",
          "x-rapidapi-key":
            "1e94609cbamsh1bbf8beef0a4826p107bcejsnb6a2a1bbb6ce",
          url: newsTitle,
          "content-type": "application/x-www-form-urlencoded",
        },
        body: {},
      }
    )
      .then(response => response.json())
      .then(data => {
        setIsLoading(false)
        setSingleNews(data)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }

  useEffect(() => {
    getSingleNews()
  }, [newsTitle])

  return (
    <>
      {isLoading ? <Loader /> : null}
      {singleNews && (
        <div className="single-post-wrapper">
          <h1 className="single-post-title">{singleNews.title}</h1>
          <div className="single-post-meta">
            {singleNews.authors ? (
              <span className="author-name">{singleNews.authors[0]}</span>
            ) : null}
            {singleNews.publishedAt ? (
              <span className="post-date">
                {new Date(singleNews.publishedAt).toDateString()}
              </span>
            ) : null}
          </div>

          {singleNews.mainImage ? (
            <div className="single-post-img">
              <img src={singleNews.mainImage} alt={singleNews.title} />
            </div>
          ) : (
            <img
              src="https://www.freeiconspng.com/uploads/no-image-icon-4.png"
              width="350"
              alt="Not Found Image"
            />
          )}

          <p className="single-post-summary">{singleNews.summary}</p>
          {singleNews.html ? (
            <div className="readmore-btn">
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? `Hide content` : `Read more content`}{" "}
                <FontAwesomeIcon
                  icon={readMore ? faChevronUp : faChevronDown}
                />
              </button>
            </div>
          ) : null}

          <div className={`single-post-full ${readMore ? "read-more" : ""}`}>
            {ReactHtmlParser(singleNews.html)}
          </div>
        </div>
      )}
    </>
  )
}

export default SingleNewsTemplate
