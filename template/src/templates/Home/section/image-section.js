import React from "react"
import { SmallContainer } from "../../../theme-components"
import Image from "../../../components/image"

const ImageSection = () => {
  return (
    <>
      <SmallContainer withoutPadding>
        <div className="row-image-wrapper mb-normal mt-normal">
          <div className="col-2">
            <Image
              alt="Coronavirus Riskiest Activities"
              imageName="image-1.png"
              maxWidth="300"
            />
          </div>
          <div className="col-2">
            <Image
              alt="Coronavirus Riskiest Activities"
              imageName="image-2.png"
              maxWidth="300"
            />
          </div>
        </div>
        <div className="image-wrapper mb-normal mt-normal">
          <Image
            alt="Coronavirus Riskiest Activities"
            imageName="riskiest-activities.png"
            maxWidth="300"
          />
        </div>
        <div className="row-image-wrapper mb-normal mt-normal">
          <div className="col-2">
            <Image
              alt="Coronavirus Riskiest Activities"
              imageName="image-3.png"
              maxWidth="300"
            />
          </div>
          <div className="col-2">
            <Image
              alt="Coronavirus Riskiest Activities"
              imageName="image-4.png"
              maxWidth="300"
            />
          </div>
        </div>
      </SmallContainer>
    </>
  )
}

export default ImageSection
