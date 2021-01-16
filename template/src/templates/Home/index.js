import React from "react"
import MainSection from "./section/main-section"
import VaccineStageSection from "./section/vaccine-stages-section"
import ContryComparisonSection from "./section/country-comprison-section"
import GlobalEconomicsSection from "./section/global-economic-section"
import GlobalNewsSection from "./section/global-news"
import BusinessRevenueSection from "./section/businees-revenue"
import ImageSection from "./section/image-section"
import GlobeSection from "./section/globe-section"

const HomeTemplate = () => {
  return (
    <>
      <GlobeSection />

      <MainSection />

      <ImageSection />

      <ContryComparisonSection />

      <VaccineStageSection />

      <GlobalEconomicsSection />

      <GlobalNewsSection />

      <BusinessRevenueSection />
    </>
  )
}

export default HomeTemplate
