import React from "react"
import RiskLevelSection from "./sections/risk-level-section"
import JobPostingSection from "./sections/job-posting-section.js"
import EconomicImpactSection from "./sections/economic-impact-section"
import ConsumerSpendingSection from "./sections/consumer-spending-section"
import BusinessRevnueSection from "./sections/busineess-revenue-section"
import NewsSection from "./sections/news-section"
import KeyIndicatorSection from "./sections/key-indicator-section"
import StateComprisonSection from "./sections/state-comprison"
import AboutSection from "./sections/about-section"
import ImpactCovid19Section from "./sections/impact-covid19-section"

const UnitedStatesTemplate = () => {
  return (
    <>
      <ImpactCovid19Section />

      <KeyIndicatorSection />

      <RiskLevelSection />

      <StateComprisonSection />

      <EconomicImpactSection />

      <JobPostingSection />

      <ConsumerSpendingSection />

      <NewsSection />

      <BusinessRevnueSection />

      <AboutSection />
    </>
  )
}

export default UnitedStatesTemplate
