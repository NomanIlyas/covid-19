import React from "react"
import Image from "../../components/image"
import { SmallContainer, Sections } from "../../theme-components"
import CountryNewsSection from "./sections/country-news"
import MobilitySection from "./sections/mobility-section"
import RegionalComparisonSection from "./sections/regional-comprison-section"

const ContryTemplate = ({ countryName }) => {
  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title={`The Impact of COVID-19 in the ${countryName}`}
          subtitle={`This information covers confirmed data and and may not represent actual number of infected or non infected residents of ${countryName}.`}
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
        >
          <p className="section-paragrapgh">{`During the last {time period} a total of {65,452,700 Total Test Results} tests for COVID were administered. Of that total, {60,172,837 Negative} tests for COVID were confirmed negative. There are currently {5,279,863 Cases} confirmed positives cases of COVID-19 in {Country), of which {4,415 Pending} in a pending status. `}</p>

          <p className="section-paragrapgh">{`The outcome of all the testing means that there are now {45,826 Currently} hospital beds occupied because of CoVID-19. The good news is that {1,796,326 Recovered} people have recovered from CoVID-19.`}</p>
          <p className="section-paragrapgh">{`Unfortunately, {160,155 Deaths) people have lost their lives due to CoVID since January 2020.`}</p>
        </Sections>
      </SmallContainer>

      <SmallContainer>
        <Sections withPadding title={`${countryName}  CoVID-19 Statistics `} />
      </SmallContainer>

      <SmallContainer withoutPadding>
        <div className="image-wrapper">
          <Image alt="India Map" imageName="india-map.png" maxWidth="300" />
        </div>
      </SmallContainer>

      <RegionalComparisonSection />

      <MobilitySection />

      <CountryNewsSection
        title={`${countryName} News`}
        paragraph="What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R)."
      />

      <SmallContainer>
        <Sections withPadding title={`About ${countryName}`}>
          <p className="section-paragrapgh">
            <a href="google.com" target="_blank" rel="noreferrer">
              Visit
            </a>
          </p>
        </Sections>
      </SmallContainer>

      <SmallContainer withoutPadding>
        <div className="image-wrapper">
          <Image alt="India Flag" imageName="flag-india.png" maxWidth="300" />
        </div>
      </SmallContainer>

      <SmallContainer>
        <Sections withPadding>
          <p className="section-paragrapgh">
            {`The current population of ${countryName} is 1,381,715,400 as of Monday, August 17, 2020, based on Worldometer elaboration of the latest United Nations data.`}
          </p>
          <p className="section-paragrapgh">
            {`${countryName} 2020 population is estimated at 1,380,004,385 people at mid year according to UN data. `}
          </p>
          <p className="section-paragrapgh">
            {`${countryName} population is equivalent to 17.7% of the total world population. `}
          </p>
          <p className="section-paragrapgh">
            {`${countryName} ranks number 2 in the list of countries (and dependencies) by population. `}
          </p>
          <p className="section-paragrapgh">
            {`The population density in ${countryName} is 464 per Km2 (1,202 people per mi2).`}
          </p>
          <p className="section-paragrapgh">
            {`The total land area is 2,973,190 Km2 (1,147,955 sq. miles)`}
          </p>
          <p className="section-paragrapgh">
            {`35.0 % of the population is urban (483,098,640 people in 2020)`}
          </p>
          <p className="section-paragrapgh">
            {`The median age in ${countryName} is 28.4`}
          </p>
        </Sections>
      </SmallContainer>
    </>
  )
}

export default ContryTemplate
