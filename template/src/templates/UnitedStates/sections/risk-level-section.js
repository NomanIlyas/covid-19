import React from "react"
import {
  SmallContainer,
  Sections,
  FullContainer,
  ChartCard,
} from "../../../theme-components"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import chartResponsive from "../../../utils/chart-slider-responsive"

const RiskLevelSection = () => {
  return (
    <>
      <FullContainer>
        <SmallContainer noBottomPadding>
          <Sections
            withPadding
            title="Key Indicators to Determine COVID-19 Risk Levels"
            subtitle="This model is based on a traditional SEIR model by Dr. Alison Hill at Harvard."
            date="Last updated: August 12, 2020 at 5:45 a.m. ET"
            paragraph="What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R)."
          >
            <p className="section-paragrapgh">
              What’s an SEIR model? An SEIR model tracks the flow of people
              between four states: susceptible (S), exposed (E), infected (I),
              and recovered (R).{" "}
            </p>
            <p className="section-paragrapgh">
              Models try to predict things such as how a disease spreads, or the
              total number infected, or the duration of an epidemic, and to
              estimate various epidemiological parameters such as the
              reproductive number. Such models can show how different public
              health interventions may affect the outcome of the epidemic, e.g.,
              what the most efficient technique is for issuing a limited number
              of vaccines in a given population.
            </p>
          </Sections>
        </SmallContainer>
        {/* <div className="chart-card-wrapper"></div> */}
        <div className="chart-slider">
          <Carousel
            ssr
            partialVisbile
            responsive={chartResponsive}
            itemClass="image-item"
          >
            <ChartCard
              title={"Daily New Cases"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "Over the last week, {State Name} has averaged {Cases} new confirmed cases of COVID-19 per day."
              }
              chartDiv="daily-new-cases-chart"
              stokeColor="#35377c"
              fillColor="#35377c"
            />
            <ChartCard
              title={"Recovered Cases"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "Per best available data, {Country Name} is likely able to trace only 5% of new COVID infections in 48 hours."
              }
              chartDiv="recovered-cases-chart"
              stokeColor="#35377c"
              fillColor="#35377c"
            />
            <ChartCard
              title={"Infection Rate"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "On average, each person in {State Name} with COVID is infecting 0.90 other people. "
              }
              chartDiv="infection-rate-chart"
              stokeColor="#dc482f"
              fillColor="#dc482f"
            />
            <ChartCard
              title={"Positive Test Rate"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "Currently, {XY%} of {State Name}’s tests for COVID-19 were positive. "
              }
              chartDiv="positive-test-rate-chart"
              stokeColor="#04469b"
              fillColor="#04469b"
            />
            <ChartCard
              title={"Hospital Usage"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "Based on best available data, we estimate that {State Name} has about 2,730 ICU beds. 51% (1,405) are currently occupied by non-COVID patients."
              }
              chartDiv="hospital-usage-chart"
              stokeColor="#4c5153"
              fillColor="#4c5153"
            />
          </Carousel>
        </div>
      </FullContainer>
    </>
  )
}

export default RiskLevelSection
