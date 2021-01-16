import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { FullContainer, Loader } from "../../theme-components"
import Pagination from "./components/pagination"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faThLarge } from "@fortawesome/free-solid-svg-icons"

const NewsTemplate = () => {
  const [news, setNews] = useState([])
  const [currentNews, setCurrentNews] = useState([])
  const [totalPages, setTotalPages] = useState(null)
  const [currentPages, setCurrentPages] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newsView, setNewsView] = useState("column")

  const onPageChanged = data => {
    window.scrollTo(0, 0)

    const offset = (data.currentPage - 1) * data.pageLimit
    const currentNewsData = news.slice(offset, offset + data.pageLimit)

    setCurrentPages(data.currentPage)
    setCurrentNews(currentNewsData)
    setTotalPages(data.totalPages)
  }

  const getNews = () => {
    setIsLoading(true)
    fetch(
      "https://covid-19-news.p.rapidapi.com/v1/covid?lang=en&media=True&q=covid",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-news.p.rapidapi.com",
          "x-rapidapi-key":
            "1ee69d06b5mshfe657c81612ce43p14ac96jsn5a1ea919b128",
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        setNews(data.articles)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getNews()
  }, [])

  const changeNewsView = view => {
    setNewsView(view)
  }

  return (
    <>
      {isLoading ? <Loader /> : null}

      <FullContainer>
        <div className="news-row-header">
          <button
            className={`news-chngview-btn ${
              newsView === "column" ? "active-btn" : ""
            }`}
            onClick={() => changeNewsView("column")}
          >
            <FontAwesomeIcon icon={faThLarge} />
          </button>
          <button
            className={`news-chngview-btn ${
              newsView === "row" ? "active-btn" : ""
            }`}
            onClick={() => changeNewsView("row")}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>

        <div className="news-row">
          {currentNews.length > 0 ? (
            currentNews.map((item, index) => (
              <div
                className={`news-card ${newsView} ${
                  [0, 3, 4, 7].indexOf(index) >= 0 ? "odd" : "even"
                }`}
                key={index}
              >
                <Link
                  to={`/singlenews/${item.link}`}
                  className="news-card-wrapper"
                >
                  <div className="news-card-img-wrapper">
                    {item.media ? (
                      <img src={item.media} alt={item.title} />
                    ) : (
                      <img
                        src="https://www.freeiconspng.com/uploads/no-image-icon-4.png"
                        width="350"
                        alt="Not Found Image"
                      />
                    )}
                  </div>
                  <div className="news-card-body">
                    <h3 className="news-card-title">{item.title}</h3>
                    <p className="news-card-paragraph">
                      {item.summary.length > 50
                        ? item.summary.substring(0, 50) + "..."
                        : item.summary}
                    </p>
                    <div className="post-meta">
                      <span className="post-date">
                        {new Date(item.published_date).toDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No Any News Founds</p>
          )}
        </div>

        {news.length > 0 ? (
          <div className="news-row-footer">
            <Pagination
              totalRecords={news.length}
              pageLimit={8}
              pageNeighbours={1}
              onPageChanged={onPageChanged}
            />
          </div>
        ) : null}
      </FullContainer>
    </>
  )
}

export default NewsTemplate
