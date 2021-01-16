import React from "react"
import { SmallContainer, Sections } from "../../../theme-components"

const ImpactCovid19Section = () => {
  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title="The Impact of COVID-19 in the {United States}"
          subtitle="This information covers confirmed data and does not indicate the actual numbers of infected or non infected residents of the United States."
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
        >
          <p className="section-paragrapgh">{`During the last {time period} a total of {65,452,700 Total Test Results} tests for COVID were administered. Of that total, {60,172,837 Negative} tests for COVID were confirmed negative. There are currently {5,279,863 Cases} confirmed positives cases of COVID-19 in the United States, of which {4,415 Pending} in a pending status.`}</p>
          <p className="section-paragrapgh">{`The outcome of all the testing means that there are now {45,826 Currently} hospital beds occupied because of CoVID-19. The good news is that {1,796,326 Recovered} people have recovered from CoVID-19.`}</p>
          <p className="section-paragrapgh">{`Unfortunately, {160,155 Deaths) people have lost their lives due to CoVID since January 2020. `}</p>
        </Sections>
      </SmallContainer>
    </>
  )
}

export default ImpactCovid19Section
