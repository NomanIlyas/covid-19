import React from "react"
import {
  SmallContainer,
  Sections,
  SingleChart,
} from "../../../theme-components"

const ConsumerSpendingSection = () => {
  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title="United States Consumer Spending Habits"
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
          paragraph="What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R)."
        />
        <div className="singleline-chart-card-wrapper">
          <SingleChart
            title={"United States changes in All Consumer Spending"}
            subtitle={"Updated: {Build Date}"}
            chartDiv="consumer-spending-chart"
            stokeColor="#116083"
          >
            <p>{`In the United States, as of August 02 2020, grocery spending by all consumers increased by 9.7% compared to January 2020.)`}</p>
            <p>{`Apparel & General Merchandise, Entertainment & Recreation, Grocery, Healthcare, Restaurants & Hospitality, and Transportation`}</p>
          </SingleChart>
        </div>
      </SmallContainer>
    </>
  )
}

export default ConsumerSpendingSection
