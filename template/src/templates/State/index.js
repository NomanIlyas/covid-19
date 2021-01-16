import React from "react"
import Image from "../../components/image"
import { SmallContainer, Sections } from "../../theme-components"
import RiskLevelSection from "./sections/risk-level-section"
import CountiesComparisonSection from "./sections/counties-comprison-section"
import CountyNewsSection from "./sections/county-news"
import EconomicImpactSection from "./sections/economic-impact-section"
import SpendingHabitSection from "./sections/spending-habit-section"
import RevenueSection from "./sections/revenue-section"

const StatesTemplate = ({ stateName }) => {
  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title={`The Impact of COVID-19 in the ${stateName}`}
          subtitle={`Since January 2020, the novel coronavirus has spread to nearly every state and territory.`}
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
        >
          <p className="section-paragrapgh">{`Sed felis eget velit aliquet sagittis id consectetur purus. Id leo in vitae turpis massa sed elementum tempus. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. At lectus urna duis convallis convallis.`}</p>

          <p className="section-paragrapgh">{`Velit laoreet id donec ultrices tincidunt arcu non. Purus sit amet luctus venenatis lectus magna. Sodales neque sodales ut etiam sit amet. Purus in massa tempor nec feugiat nisl pretium. Mi bibendum neque egestas congue quisque. Odio pellentesque diam volutpat commodo sed. Congue quisque egestas diam in arcu. `}</p>
        </Sections>
      </SmallContainer>

      <SmallContainer>
        <Sections
          withPadding
          title={`${stateName}  Risk Levels from 5 Key Indicators `}
        />
      </SmallContainer>

      <SmallContainer withoutPadding>
        <div className="image-wrapper">
          <Image alt="India Map" imageName="india-map.png" maxWidth="300" />
        </div>
      </SmallContainer>

      <RiskLevelSection />

      <CountiesComparisonSection />

      <EconomicImpactSection
        title={`Economic Impact of CoVID-19 on ${stateName}`}
      />

      <SmallContainer>
        <Sections withPadding title={`${stateName} Job Postings`}>
          <p className="section-paragrapgh">{`What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R).`}</p>
          <p className="section-paragrapgh">{`Models try to predict things such as how a disease spreads, or the total number infected, or the duration of an epidemic, and to estimate various epidemiological parameters such as the reproductive number. Such models can show how different public health interventions may affect the outcome of the epidemic, e.g., what the most efficient technique is for issuing a limited number of vaccines in a given population.`}</p>
        </Sections>
      </SmallContainer>

      <SpendingHabitSection title={`${stateName} Spending Habits`} />

      <CountyNewsSection
        title={`${stateName} News`}
        paragraph="What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R)."
      />

      <RevenueSection title={`${stateName} Changes in Business Revenue `} />

      <SmallContainer>
        <Sections withPadding title={`About ${stateName}`}>
          <p className="section-paragrapgh">
            <a href="google.com" target="_blank" rel="noreferrer">
              Visit
            </a>
          </p>
        </Sections>
      </SmallContainer>

      <SmallContainer withoutPadding>
        <div className="image-wrapper">
          <Image alt="States Flag" imageName="states-flag.png" maxWidth="300" />
        </div>
      </SmallContainer>

      <SmallContainer>
        <Sections withPadding title={`About ${stateName}`}>
          <p className="section-paragrapgh">
            {`${stateName} is a state in the Northeastern United States. New York was one of the original thirteen colonies that formed the United States. With more than 19 million residents in 2019, it is the fourth-most-populous state. To distinguish it from New York City, which is the largest city in the state, it is sometimes referred to as New York State.Wikipedia`}
          </p>
          <p className="section-paragrapgh">
            {`Spoken languages :English 69.6%, Spanish 15.2%, Chinese 3.1%, French 1.6%, Russian 1.2%, Italian 0.9%, Yiddish 0.7%, Hindi/Urdu 0.6%, Arabic 0.5%, Korean 0.5% `}
          </p>
        </Sections>
      </SmallContainer>
    </>
  )
}

export default StatesTemplate
