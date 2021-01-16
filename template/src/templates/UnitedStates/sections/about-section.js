import React from "react"
import Image from "../../../components/image"
import { SmallContainer, Sections } from "../../../theme-components"

const AboutSection = () => {
  return (
    <>
      <SmallContainer>
        <Sections withPadding title="About {United States}">
          <a
            href="https://www.whitehouse.gov "
            target="_blank"
            rel="noreferrer"
          >
            Visit
          </a>
        </Sections>
        <div className="image-wrapper mb-normal mt-normal">
          <Image alt="Us Flag" imageName="us-flag.png" maxWidth="300" />
        </div>
        <Sections withPadding>
          <p className="section-paragrapgh">
            The United States of America, commonly known as the United States or
            America, is a country mostly located in central North America,
            between Canada and Mexico. It consists of 50 states, a federal
            district, five major self-governing territories, and various
            possessions.
          </p>
          <p className="section-paragrapgh">
            The current population of the United States of America is
            331,235,184 as of Friday, August 14, 2020, based on Worldometer
            elaboration of the latest United Nations data.{" "}
          </p>
          <p className="section-paragrapgh">
            The United States 2020 population is estimated at 331,002,651 people
            at mid year according to UN data.
          </p>
          <p className="section-paragrapgh">
            The United States population is equivalent to 4.25% of the total
            world population.
          </p>
          <p className="section-paragrapgh">
            The U.S.A. ranks number 3 in the list of countries (and
            dependencies) by population. The population density in the United
            States is 36 per Km2 (94 people per mi2).
          </p>
          <p className="section-paragrapgh">
            The total land area is 9,147,420 Km2 (3,531,837 sq. miles)
          </p>
          <p className="section-paragrapgh">
            {" "}
            82.8 % of the population is urban (273,975,139 people in 2020)
          </p>
          <p className="section-paragrapgh">
            The median age in the United States is 38.3 years.
          </p>
        </Sections>
      </SmallContainer>
    </>
  )
}

export default AboutSection
