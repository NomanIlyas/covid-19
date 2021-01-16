import React from "react"
import {
  SmallContainer,
  Sections,
  SingleChart,
} from "../../../theme-components"

const BusinessRevnueSection = () => {
  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title="{State Name} Changes in Small Business Revenue "
          subtitle="In New York, as of August 01 2020, total small business revenue decreased by 28.1% compared to January 2020.  "
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
          paragraph="In the United States, as of August 01 2020, total small business revenue decreased by 18.6% compared to January 2020."
        />
        <div className="singleline-chart-card-wrapper">
          <SingleChart
            title={"United States changes in Small Business Revenue"}
            subtitle={"Updated: {Build Date}"}
            chartDiv="business-revenue-chart"
            stokeColor="#116083"
          >
            <p>{`In the United States, as of August 01 2020, transportation and trade small business revenue decreased by 9% compared to January 2020.`}</p>
            <p>{`Education & Health Services, Leisurre & Hospitality, Retail & Transportation `}</p>
          </SingleChart>
        </div>
      </SmallContainer>
    </>
  )
}

export default BusinessRevnueSection
