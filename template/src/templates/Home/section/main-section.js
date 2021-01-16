import React from "react"
import { SmallContainer, Sections } from "../../../theme-components"
import Image from "../../../components/image"

const MainSection = () => {
  return (
    <>
      {/* <SmallContainer withoutPadding>
        <div className="image-wrapper">
          <Image alt="Globe" imageName="globe.png" maxWidth="300" />
        </div>
      </SmallContainer> */}
      <SmallContainer>
        <Sections
          withPadding
          title="The Impact of COVID-19 Across the World."
          subtitle="The coronavirus COVID-19 is affecting 213 countries and territories
      around the world and 2 international conveyances."
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
        >
          <p className="section-paragrapgh">{`There are currently {6,445,494 Currently Infected Patients} tests for COVID were administered. Of that total, {6,380,929 in Mild Condition} are experiencing few to mild conditions. Across the globe there are estimated to be {64,565 Serious or Critical} people experiencing Serious or Life Threatening conditions assoicated with COVID-19.`}</p>

          <p className="section-paragrapgh">{`It is reported that {14,909,195 Closed Cases} about more than 14,000,00 people have recovered and/or been discharged from hospital care.`}</p>
          <p className="section-paragrapgh">{`Unfortunately, {763,353) people have lost their lives due to CoVID since January 2020.`}</p>
        </Sections>
      </SmallContainer>
    </>
  )
}

export default MainSection
