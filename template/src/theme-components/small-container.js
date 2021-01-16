import React from "react"

const SmallContainer = ({ children, withoutPadding, noBottomPadding }) => {
  return (
    <div
      className={`small-container ${withoutPadding ? "no-padding" : ""}  ${
        noBottomPadding ? "no-bottom-padding" : ""
      }`}
    >
      {children}
    </div>
  )
}

export default SmallContainer
