import React, { useLayoutEffect } from "react"
import { SmallContainer } from "../../../theme-components"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"

const GlobeSection = () => {
  useLayoutEffect(() => {
    var chart = am4core.create("rotate-globe", am4maps.MapChart)

    // Set map definition
    chart.geodata = am4geodata_worldLow

    // Set projection
    chart.projection = new am4maps.projections.Orthographic()
    chart.panBehavior = "rotateLongLat"
    chart.deltaLatitude = -20
    chart.padding(20, 20, 20, 20)

    // limits vertical rotation
    chart.adapter.add("deltaLatitude", function (delatLatitude) {
      return am4core.math.fitToRange(delatLatitude, -90, 90)
    })

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = "{name}"
    polygonTemplate.fill = am4core.color("#545454")
    polygonTemplate.stroke = am4core.color("#eee")
    polygonTemplate.strokeWidth = 0.5

    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries())
    graticuleSeries.mapLines.template.line.stroke = am4core.color("#000")
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.09
    graticuleSeries.fitExtent = false

    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.3
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
      "#ffffff"
    )

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover")
    hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5)

    let animation
    setTimeout(function () {
      animation = chart.animate(
        { property: "deltaLongitude", to: 100000 },
        20000000
      )
    }, 3000)

    chart.seriesContainer.events.on("down", function () {
      if (animation) {
        animation.stop()
      }
    })

    return () => {
      chart.dispose()
    }
  }, [])

  return (
    <SmallContainer>
      <div id="rotate-globe" className="rotate-globe-section"></div>
    </SmallContainer>
  )
}

export default GlobeSection
