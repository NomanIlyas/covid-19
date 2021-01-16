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
        <SmallContainer>
          <Sections
            withPadding
            title={`Key Indicators to Determine COVID-19 Risk Levels`}
            subtitle="This model is based on a traditional SEIR model by Dr. Alison Hill at Harvard."
            date="Last updated: August 12, 2020 at 5:45 a.m. ET"
          >
            <p className="section-paragrapgh">{`What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R).`}</p>

            <p className="section-paragrapgh">{`Models try to predict things such as how a disease spreads, or the total number infected, or the duration of an epidemic, and to estimate various epidemiological parameters such as the reproductive number. Such models can show how different public health interventions may affect the outcome of the epidemic, e.g., what the most efficient technique is for issuing a limited number of vaccines in a given population.`}</p>
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
              chartDiv="state-daily-newcase-chart"
              stokeColor="#35377c"
              fillColor="#35377c"
            />
            <ChartCard
              title={"Infection Rate"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "Over the last week, {State Name} has averaged {Cases} new confirmed cases of COVID-19 per day."
              }
              chartDiv="state-infection-rate-chart"
              stokeColor="#35377c"
              fillColor="#35377c"
            />
            <ChartCard
              title={"Positive Test Rate"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "Over the last week, {State Name} has averaged {Cases} new confirmed cases of COVID-19 per day. "
              }
              chartDiv="state-positive-test-chart"
              stokeColor="#dc482f"
              fillColor="#dc482f"
            />
            <ChartCard
              title={"ICU Headroom Used"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "Over the last week, {State Name} has averaged {Cases} new confirmed cases of COVID-19 per day."
              }
              chartDiv="state-ICU-headroom-chart"
              stokeColor="#04469b"
              fillColor="#04469b"
            />
            <ChartCard
              title={"Contacts Traced"}
              subtitle={"Daily new cases per 100,00"}
              description={
                "Over the last week, {State Name} has averaged {Cases} new confirmed cases of COVID-19 per day."
              }
              chartDiv="contacts-traced-chart"
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
