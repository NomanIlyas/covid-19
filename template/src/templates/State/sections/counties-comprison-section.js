import React from "react"
import { SmallContainer, Sections } from "../../../theme-components"
import TableComponent from "./table"

const CountiesComparisonSection = () => {
  return (
    <SmallContainer>
      <Sections
        withPadding
        title="{State Name} Counties Comparison "
        subtitle="5 key indicators to determine risk levels"
        date="Last updated: August 12, 2020 at 5:45 a.m. ET"
        paragraph="COVID in is spreading in a slow and controlled fashion, and New York’s COVID preparedness meets international standards."
      />
      <TableComponent />
    </SmallContainer>
  )
}

export default CountiesComparisonSection
