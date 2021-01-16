import React from "react"
import {
  SmallContainer,
  Sections,
  SingleChart,
} from "../../../theme-components"

const BusinessRevenueSection = () => {
  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title="United States Changes in Small Business Revenue"
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
          paragraph="In New York, as of August 01 2020, total small business revenue decreased by 28.1% compared to January 2020. In the United States, as of August 01 2020, total small business revenue decreased by 18.6% compared to January 2020."
        />
        <div className="singleline-chart-card-wrapper">
          <SingleChart
            title={"US Changes in Employment "}
            subtitle={"Updated: {Build Date}"}
            chartDiv="home-economic-impact-chart"
            stokeColor="#116083"
          >
            <p>{`Over the last week, {State Name} has averaged {Cases} new confirmed cases of COVID-19 per day (34.2 for every 100,000 residents)`}</p>
            <p>{`Low Income ($27,000 or less), Middle Income ($27,000 to $60,000), High Income (>$60,000)`}</p>
          </SingleChart>
        </div>
      </SmallContainer>
    </>
  )
}

export default BusinessRevenueSection
