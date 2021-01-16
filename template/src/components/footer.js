import React, { useState, useEffect } from "react"
import TopArrow from "../images/top-arrow.png"
var window = require("global/window")

const Footer = () => {
  // const [scrollYPosition, setscrollYPosition] = useState(
  //   typeof window === "undefined" ? 0 : window.scrollY
  // )

  // useEffect(() => {
  //   if (typeof window === "undefined") {
  //     window.addEventListener("scroll", handleScroll)
  //   }
  //   return () => {
  //     if (typeof window === "undefined") {
  //       window.removeEventListener("scroll", handleScroll)
  //     }
  //   }
  // }, [])

  const [scrollYPosition, setscrollYPosition] = useState(
    window.scrollY ? 0 : window.scrollY
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // const [scrollYPosition, setscrollYPosition] = useState(window.scrollY)

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [])

  const handleScroll = () => {
    setscrollYPosition(window.scrollY)
  }

  const scrollToTop = () => {
    window.scroll(0, 0)
  }
  return (
    <>
      {scrollYPosition > 100 ? (
        <span className="scroll-to-top" onClick={() => scrollToTop()}>
          Back To Top <img src={TopArrow} alt="backtotop" />
        </span>
      ) : null}

      <footer className="footer">
        © {new Date().getFullYear()} Copyrights
      </footer>
    </>
  )
}

export default Footer
