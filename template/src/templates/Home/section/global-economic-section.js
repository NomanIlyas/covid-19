import React from "react"
import {
  SmallContainer,
  Sections,
  FullContainer,
  SingleLineChart,
} from "../../../theme-components"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import chartResponsive from "../../../utils/chart-slider-responsive"

const GlobalEconomicsSection = () => {
  return (
    <>
      <FullContainer>
        <SmallContainer noBottomPadding>
          <Sections withPadding title="Global Economic Indicators">
            <p className="section-paragrapgh">
              What’s an SEIR model? An SEIR model tracks the flow of people
              between four states: susceptible (S), exposed (E), infected (I),
              and recovered (R).
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
        <div className="singleline-chart-card-wrapper"></div>
        <div className="chart-slider">
          <Carousel
            ssr
            partialVisbile
            responsive={chartResponsive}
            itemClass="image-item"
          >
            <SingleLineChart
              title={"National Debt"}
              subtitle={"In Trillions USD"}
              chartDiv="home-national-debt-chart"
              stokeColor="#f2612d"
            />
            <SingleLineChart
              title={"Fed Balance Sheet"}
              subtitle={"In Trillions USD"}
              chartDiv="home-fed-balance-sheet-chart"
              stokeColor="#f2612d"
            />
            <SingleLineChart
              title={"US Dollar"}
              subtitle={"US Dollar Index (DXY)"}
              chartDiv="home-us-dollar-chart"
              stokeColor="#f2612d"
            />
            <SingleLineChart
              title={"Inflation Rate"}
              subtitle={"Percent"}
              chartDiv="home-inflation-rate-chart"
              stokeColor="#f2612d"
            />
            <SingleLineChart
              title={"Loan to the Private Sector"}
              subtitle={"In Trillions USD"}
              chartDiv="home-loan-private-sector-chart"
              stokeColor="#f2612d"
            />
            <SingleLineChart
              title={"US Money Supply"}
              subtitle={"In Trillions USD"}
              chartDiv="home-us-money-supply-chart"
              stokeColor="#f2612d"
            />
          </Carousel>
        </div>
      </FullContainer>
    </>
  )
}

export default GlobalEconomicsSection
