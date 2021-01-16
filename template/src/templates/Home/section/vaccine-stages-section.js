import React, { useEffect, useState } from "react"
import { SmallContainer, Sections } from "../../../theme-components"
import Tabletop from "tabletop"
import { Line } from "rc-progress"
import stage4Icon from "../../../images/approval.svg"
import stage1Icon from "../../../images/exploratory.svg"
import stage3Icon from "../../../images/humanTrials.svg"
import stage2Icon from "../../../images/preClinical.svg"
import stage5Icon from "../../../images/production.svg"

const VaccineStageSection = () => {
  const [stages, setStages] = useState({
    stageOngoing: [],
    stageSuccess: [],
    totalVaccines: [],
    stage3Success: [],
    stage3Ongoing: [],
  })

  useEffect(() => {
    Tabletop.init({
      key: "1ImpYv9-_qKmF8JkdV8YW1tN8IAycPszPpG6VCn-rH4Q",
      callback: virusInfo => {
        console.log("virusInfo", virusInfo)
        let ongoingStage = virusInfo.VaccineCounts.elements[0]
        let successStage = virusInfo.VaccineCounts.elements[1]

        var data = {
          stageOngoing: {
            stage1: ongoingStage.stage1,
            stage2: ongoingStage.stage2,
            s3Phase1: ongoingStage.s3Phase1,
            s3Phase2: ongoingStage.s3Phase2,
            s3Phase3: ongoingStage.s3Phase3,
            stage4: ongoingStage.stage4,
            stage5: ongoingStage.stage5,
          },
          stageSuccess: {
            stage1: successStage.stage1,
            stage2: successStage.stage2,
            s3Phase1: successStage.s3Phase1,
            s3Phase2: successStage.s3Phase2,
            s3Phase3: successStage.s3Phase3,
            stage4: successStage.stage4,
            stage5: successStage.stage5,
          },
          totalVaccines: virusInfo.vaccineData.elements.length,
          stage3Ongoing:
            parseInt(ongoingStage.s3Phase1) +
            parseInt(ongoingStage.s3Phase2) +
            parseInt(ongoingStage.s3Phase3),
          stage3Success:
            parseInt(ongoingStage.stage4) + parseInt(ongoingStage.stage5),
        }

        setStages(data)
      },
    })
  }, [])

  const Loading = () => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          hegith: "100%",
        }}
      >
        Loading
      </div>
    )
  }

  return (
    <>
      <SmallContainer>
        <Sections
          withPadding
          title="COVID-19 or Coronavirus vaccine development stages and status"
          subtitle="In the United States, as of June 27 2020, employment rates decreased by 6.8% compared to January 2020."
          date="Last updated: August 12, 2020 at 5:45 a.m. ET"
          paragraph="What’s an SEIR model? An SEIR model tracks the flow of people between four states: susceptible (S), exposed (E), infected (I), and recovered (R)."
        />
      </SmallContainer>
      <div className="vaccineWrapper">
        <p className="covidVaccineStagesAndPhases-title">
          COVID-19 or Coronavirus vaccine development stages and status
        </p>
        <div className="covidVaccineStagesAndPhases">
          <div className="stages stage1">
            <div className="icon">
              <img src={stage1Icon} alt="Stage 1 icon, Microscope Icon" />
            </div>
            <div className="stageTitle paragraph">
              <h3>
                Exploratory
                <br />
                Stage
              </h3>
            </div>
            <div className="stageNumber">
              <p className="c5Para">Stage 1</p>
            </div>
            <div className="totalStageCount">
              <h2>
                {stages.stageOngoing.stage1 >= 0 ? (
                  stages.stageOngoing.stage1
                ) : (
                  <Loading />
                )}
              </h2>
            </div>
            <div className="progressBar">
              <Line
                percent={[
                  (stages.stageSuccess.stage1 * 100) / stages.totalVaccines,
                  (stages.stageOngoing.stage1 * 100) / stages.totalVaccines,
                ]}
                strokeWidth="3"
                strokeColor={["#16a716", "#ffa502"]}
                strokeLinecap="butt"
              />
            </div>
            <div className="progressCount">
              <div className="ongoingIndicator" />
              <div className="gs0Para indicatorPara">Ongoing</div>
              <div className="count gs0Para">
                {stages.stageOngoing.stage1}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
            <div className="progressCount">
              <div className="successIndicator" />
              <div className="gs0Para indicatorPara">Success</div>
              <div className="count gs0Para">
                {stages.stageSuccess.stage1}{" "}
                <span className="totalVaccinesCount">
                  {"/ " + stages.totalVaccines}
                </span>
              </div>
            </div>
          </div>
          <div className="stages stage2">
            <div className="icon">
              <img src={stage2Icon} alt="Stage 1 icon, Microscope Icon" />
            </div>
            <div className="stageTitle paragraph">
              <h3>
                Pre Clinical
                <br />
                Stage
              </h3>
            </div>
            <div className="stageNumber">
              <p className="c5Para">Stage 2</p>
            </div>
            <div className="totalStageCount">
              <h2>
                {stages.stageOngoing.stage2 >= 0 ? (
                  stages.stageOngoing.stage2
                ) : (
                  <Loading />
                )}
              </h2>
            </div>
            <div className="progressBar">
              <Line
                percent={[
                  (stages.stageOngoing.stage2 * 100) / stages.totalVaccines,
                  (stages.stageSuccess.stage2 * 100) / stages.totalVaccines,
                ]}
                strokeWidth="3"
                strokeColor={["#ffa502", "#16a716"]}
                strokeLinecap="butt"
              />
            </div>
            <div className="progressCount">
              <div className="ongoingIndicator" />
              <div className="gs0Para indicatorPara">Ongoing</div>
              <div className="count gs0Para">
                {stages.stageOngoing.stage2}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
            <div className="progressCount">
              <div className="successIndicator" />
              <div className="gs0Para indicatorPara">Success</div>
              <div className="count gs0Para">
                {stages.stageSuccess.stage2}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
          </div>
          <div className="stages stage3">
            <div className="icon">
              <img src={stage3Icon} alt="Stage 1 icon, Microscope Icon" />
            </div>
            <div className="stageTitle paragraph">
              <h3>
                Human Trials
                <br />
                Stage
              </h3>
            </div>
            <div className="stageNumber">
              <p className="c5Para">Stage 3</p>
            </div>
            <div className="totalStageCount">
              <div className="phases phase1">
                <h2>
                  {stages.stageOngoing.s3Phase1 >= 0 ? (
                    stages.stageOngoing.s3Phase1
                  ) : (
                    <Loading />
                  )}
                </h2>
                <p className="c5Para">S3 : Phase 1</p>
              </div>
              <div className="phases phase2">
                <h2>
                  {stages.stageOngoing.s3Phase2 >= 0 ? (
                    stages.stageOngoing.s3Phase2
                  ) : (
                    <Loading />
                  )}
                </h2>
                <p className="c5Para">S3 : Phase 2</p>
              </div>
              <div className="phases phase3">
                <h2>
                  {stages.stageOngoing.s3Phase3 >= 0 ? (
                    stages.stageOngoing.s3Phase3
                  ) : (
                    <Loading />
                  )}
                </h2>
                <p className="c5Para">S3 : Phase 3</p>
              </div>
            </div>
            <div className="progressBar">
              <Line
                percent={[
                  (stages.stage3Ongoing * 100) / stages.totalVaccines,
                  (stages.stage3Success * 100) / stages.totalVaccines,
                ]}
                strokeWidth="1.8"
                trailWidth="0.6"
                strokeColor={["#ffa502", "#16a716"]}
                strokeLinecap="butt"
              />
            </div>

            <div className="progressCount">
              <div className="ongoingIndicator" />
              <div className="gs0Para indicatorPara">Ongoing</div>
              <div className="count gs0Para">
                {stages.stage3Ongoing}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
            <div className="progressCount">
              <div className="successIndicator" />
              <div className="gs0Para indicatorPara">Success</div>
              <div className="count gs0Para">
                {stages.stage3Success}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
          </div>
          <div className="stages stage4">
            <div className="icon">
              <img src={stage4Icon} alt="Stage 1 icon, Microscope Icon" />
            </div>
            <div className="stageTitle paragraph">
              <h3>
                Approval
                <br />
                Stage
              </h3>
            </div>
            <div className="stageNumber">
              <p className="c5Para">Stage 4</p>
            </div>
            <div className="totalStageCount">
              <h2>
                {stages.stageOngoing.stage4 >= 0 ? (
                  stages.stageOngoing.stage4
                ) : (
                  <Loading />
                )}
              </h2>
            </div>
            <div className="progressBar">
              <Line
                percent={[
                  (stages.stageOngoing.stage4 * 100) / stages.totalVaccines,
                  (stages.stageSuccess.stage4 * 100) / stages.totalVaccines,
                ]}
                strokeWidth="3"
                strokeColor={["#ffa502", "#16a716"]}
                strokeLinecap="butt"
              />
            </div>

            <div className="progressCount">
              <div className="ongoingIndicator" />
              <div className="gs0Para indicatorPara">Ongoing</div>
              <div className="count gs0Para">
                {stages.stageOngoing.stage4}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
            <div className="progressCount">
              <div className="successIndicator" />
              <div className="gs0Para indicatorPara">Success</div>
              <div className="count gs0Para">
                {stages.stageSuccess.stage4}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
          </div>
          <div className="stages stage5">
            <div className="icon">
              <img src={stage5Icon} alt="Stage 1 icon, Microscope Icon" />
            </div>
            <div className="stageTitle paragraph">
              <h3>
                Production
                <br />
                Stage
              </h3>
            </div>
            <div className="stageNumber">
              <p className="c5Para">Stage 5</p>
            </div>
            <div className="totalStageCount">
              <h2>
                {stages.stageOngoing.stage5 >= 0 ? (
                  stages.stageOngoing.stage5
                ) : (
                  <Loading />
                )}
              </h2>
            </div>
            <div className="progressBar">
              <Line
                percent={[
                  (stages.stageOngoing.stage5 * 100) / stages.totalVaccines,
                  (stages.stageSuccess.stage5 * 100) / stages.totalVaccines,
                ]}
                strokeWidth="3"
                strokeColor={["#ffa502", "#16a716"]}
                strokeLinecap="butt"
              />
            </div>

            <div className="progressCount">
              <div className="ongoingIndicator" />
              <div className="gs0Para indicatorPara">Ongoing</div>
              <div className="count gs0Para">
                {stages.stageOngoing.stage5}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
            <div className="progressCount">
              <div className="successIndicator" />
              <div className="gs0Para indicatorPara">Success</div>
              <div className="count gs0Para">
                {stages.stageSuccess.stage4}{" "}
                <span className="">{"/ " + stages.totalVaccines}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VaccineStageSection
