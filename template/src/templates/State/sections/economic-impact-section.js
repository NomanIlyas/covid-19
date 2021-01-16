import React from "react"
import {
  SmallContainer,
  Sections,
  SingleChart,
} from "../../../theme-components"

const EconomicImpactSection = ({ title }) => {
  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title={title}
          subtitle="In New York, as of June 27 2020, employment rates decreased by 10.6% compared to January 2020."
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
          paragraph="What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R)."
        />

        <div className="singleline-chart-card-wrapper">
          <SingleChart
            title={"{State Name} Changes in Employment "}
            subtitle={"Updated: {Build Date}"}
            chartDiv="eco-imp-chart"
            stokeColor="#116083"
          >
            <p>{`Over the last week, {State Name} has averaged {Cases} new confirmed cases of COVID-19 per day (34.2 for every 100,000 residents).`}</p>
          </SingleChart>
        </div>
      </SmallContainer>
    </>
  )
}

export default EconomicImpactSection
