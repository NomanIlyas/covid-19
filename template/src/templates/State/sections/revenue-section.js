import React from "react"
import {
  SmallContainer,
  Sections,
  SingleChart,
} from "../../../theme-components"

const RevenueSection = ({ title }) => {
  return (
    <>
      <SmallContainer>
        <Sections withPadding title={title}>
          <p className="section-paragrapgh">{`What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R).`}</p>
          <p className="section-paragrapgh">{`Models try to predict things such as how a disease spreads, or the total number infected, or the duration of an epidemic, and to estimate various epidemiological parameters such as the reproductive number. Such models can show how different public health interventions may affect the outcome of the epidemic, e.g., what the most efficient technique is for issuing a limited number of vaccines in a given population.`}</p>
        </Sections>

        <div className="singleline-chart-card-wrapper">
          <SingleChart
            title={"Changes in Business Revenue "}
            subtitle={"Updated: {Build Date}"}
            chartDiv="state-revenue-chart"
            stokeColor="#116083"
          >
            <p>{`In New York, as of August 02 2020, total spending by all consumers decreased by 7.3% compared to January 2020.`}</p>
          </SingleChart>
        </div>
      </SmallContainer>
    </>
  )
}

export default RevenueSection
