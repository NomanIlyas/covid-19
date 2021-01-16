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

const MobilitySection = () => {
  return (
    <>
      <FullContainer>
        <SmallContainer>
          <Sections
            withPadding
            title={`Mobility Changes in Country during COVID-19 Pandemic`}
            subtitle="This model is based on a traditional SEIR model by Dr. Alison Hill at Harvard."
            date="Last updated: August 12, 2020 at 5:45 a.m. ET"
          >
            <p className="section-paragrapgh">{`This data set is intended to help remediate the impact of COVID-19. It shouldn’t be used for medical diagnostic, prognostic or treatment purposes. Nor is it intended to be used for guidance on personal travel plans.`}</p>
            <p className="section-paragrapgh">
              {`This report highlights {Country Name}’s percentage change in visits to places like supermarkets and parks within a geographic area. Location accuracy and the understanding of categorised places varies from region to region, do not use report to compare changes between countries, or regions with different characteristics (e.g. rural versus urban areas).`}{" "}
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
              title={"Retail & Recreation"}
              percantage={"-47%"}
              subtitle={"Compared to baseline."}
              description={
                "Mobility trends for places such as restaurants, cafés, shopping centres, theme parks, museums, libraries and cinemas"
              }
              chartDiv="retail-recreation-chart"
              stokeColor="#35377c"
              fillColor="#35377c"
            />
            <ChartCard
              title={"Markets & Pharmacy"}
              percantage={"-4%"}
              subtitle={"Compared to baseline."}
              description={
                "Mobility trends for places such as restaurants, cafés, shopping centres, theme parks, museums, libraries and cinemas"
              }
              chartDiv="markets-pharmacy-chart"
              stokeColor="#35377c"
              fillColor="#35377c"
            />
            <ChartCard
              title={"Parks & Beach"}
              percantage={"-51%"}
              subtitle={"Compared to baseline."}
              description={
                "Mobility trends for places such as restaurants, cafés, shopping centres, theme parks, museums, libraries and cinemas "
              }
              chartDiv="parks-beach-chart"
              stokeColor="#dc482f"
              fillColor="#dc482f"
            />
            <ChartCard
              title={"Public Transport"}
              percantage={"-35%"}
              subtitle={"Compared to baseline."}
              description={
                "Mobility trends for places such as restaurants, cafés, shopping centres, theme parks, museums, libraries and cinemas"
              }
              chartDiv="public-transport-chart"
              stokeColor="#04469b"
              fillColor="#04469b"
            />
            <ChartCard
              title={"Workplace"}
              percantage={"-29%"}
              subtitle={"Compared to baseline."}
              description={
                "Mobility trends for places such as restaurants, cafés, shopping centres, theme parks, museums, libraries and cinemas"
              }
              chartDiv="workplace-chart"
              stokeColor="#4c5153"
              fillColor="#4c5153"
            />
          </Carousel>
        </div>
      </FullContainer>
    </>
  )
}

export default MobilitySection
