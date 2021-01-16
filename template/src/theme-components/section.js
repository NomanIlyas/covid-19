import React from "react"

const Sections = ({
  title,
  subtitle,
  date,
  paragraph,
  withPadding,
  children,
}) => {
  return (
    <div
      className={`section-layout ${
        withPadding ? "section-layout-padding" : ""
      }`}
    >
      {title ? <h2 className="section-title">{title}</h2> : null}
      {subtitle ? <h6 className="section-subtitle">{subtitle}</h6> : null}
      {date ? <p className="section-date">{date}</p> : null}
      {paragraph ? <p className="section-paragrapgh">{paragraph}</p> : null}
      {children}
    </div>
  )
}

export default Sections
