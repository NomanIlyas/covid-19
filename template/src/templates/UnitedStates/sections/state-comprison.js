import React, { useEffect, useState } from "react"
import { SmallContainer, Sections } from "../../../theme-components"
import TableComponent from "./table"

const StateComprisonSection = () => {
  // `https://data.covidactnow.org/latest/us/states/CA.STRONG_INTERVENTION.timeseries.json`
  // `https://data.covidactnow.org/latest/us/counties/27037.NO_INTERVENTION.timeseries.json`

  const [comprisonData, setComprisonData] = useState([])
  var tableHeader = [
    { name: "State Population", value: "stateName" },
    { name: "Daily New Cases per 100k", value: "caseDensity" },
    { name: "Infection Rate", value: "infectionRate" },
    { name: "Positive Test Rate", value: "testPositivityRatio" },
    { name: "ICU Headroom Used", value: "icuHeadroomRatio" },
    { name: "Tracers Hired", value: "contactTracerCapacityRatio" },
  ]

  useEffect(() => {
    fetch(`https://www.hbwebsol.com/work/kobla-api/`)
      .then(res => res.json())
      .then(response => {
        console.log("response", response)
        var data = []
        response.map(res => {
          var object = {
            stateName: res.stateName,
            population: res.population,
            caseDensity: res.metrics.caseDensity,
            infectionRate: res.metrics.infectionRate,
            testPositivityRatio: res.metrics.testPositivityRatio * 100,
            icuHeadroomRatio: res.metrics.icuHeadroomRatio,
            contactTracerCapacityRatio:
              res.metrics.contactTracerCapacityRatio * 100,
          }
          data.push(object)
        })
        console.log("data", data)
        setComprisonData(data)
      })
      .catch(err => {
        console.log("err", err)
      })
  }, [])

  return (
    <SmallContainer>
      <Sections
        withPadding
        title="State Comparison"
        subtitle="5 key indicators to determine risk levels"
        date="Last updated: August 12, 2020 at 5:45 a.m. ET "
        paragraph="COVID in is spreading in a slow and controlled fashion, and New York’s COVID preparedness meets international standards."
      />
      {comprisonData.length > 0 ? (
        <TableComponent data={comprisonData} header={tableHeader} />
      ) : null}
    </SmallContainer>
  )
}

export default StateComprisonSection
