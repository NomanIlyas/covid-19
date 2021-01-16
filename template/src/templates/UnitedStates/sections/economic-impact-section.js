import React from "react"
import {
  SmallContainer,
  Sections,
  SingleChart,
} from "../../../theme-components"

const EconomicImpactSection = () => {
  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title="Economic Impact of CoVID-19 on the United States"
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
          subtitle="In the United States, as of June 27 2020, employment rates decreased by 6.8% compared to January 2020."
          paragraph="What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R)."
        />
        <div className="singleline-chart-card-wrapper">
          <SingleChart
            title={"US Changes in Employment "}
            subtitle={"Updated: {Build Date}"}
            chartDiv="economic-impact-chart"
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

export default EconomicImpactSection
