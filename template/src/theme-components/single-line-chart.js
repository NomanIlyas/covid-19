import React, { useLayoutEffect, useRef } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"

const SingleLineChart = ({ title, subtitle, chartDiv, stokeColor }) => {
  const chart = useRef(null)

  useLayoutEffect(() => {
    var x = am4core.create(chartDiv, am4charts.XYChart)
    x.paddingRight = 20
    x.data = [
      {
        year: "1963",
        value: 0,
      },

      {
        year: "1973",
        value: 0.077,
      },

      {
        year: "1977",
        value: 0.019,
      },

      {
        year: "1979",
        value: 0.05,
      },
      {
        year: "1980",
        value: 0.077,
      },
      {
        year: "1981",
        value: 0.12,
      },
      {
        year: "1982",
        value: 0.011,
      },
      {
        year: "1983",
        value: 0.177,
      },

      {
        year: "1986",
        value: 0.03,
      },
      {
        year: "1987",
        value: 0.179,
      },
      {
        year: "1988",
        value: 0.18,
      },
      {
        year: "1989",
        value: 0.104,
      },
      {
        year: "1990",
        value: 0.255,
      },
      {
        year: "1991",
        value: 0.21,
      },
      {
        year: "1992",
        value: 0.065,
      },
      {
        year: "1993",
        value: 0.11,
      },
      {
        year: "1994",
        value: 0.172,
      },
      {
        year: "1995",
        value: 0.269,
      },
      {
        year: "1996",
        value: 0.141,
      },
      {
        year: "1997",
        value: 0.353,
      },
      {
        year: "1998",
        value: 0.548,
      },
      {
        year: "1999",
        value: 0.298,
      },
      {
        year: "2000",
        value: 0.267,
      },
      {
        year: "2001",
        value: 0.411,
      },
      {
        year: "2002",
        value: 0.462,
      },
      {
        year: "2003",
        value: 0.47,
      },
      {
        year: "2004",
        value: 0.445,
      },
      {
        year: "2005",
        value: 0.47,
      },
    ]

    var categoryAxis = x.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = "year"
    categoryAxis.renderer.minGridDistance = 50
    categoryAxis.renderer.grid.template.location = 0.5
    categoryAxis.startLocation = 0.5
    categoryAxis.endLocation = 0.5
    categoryAxis.fontSize = "9px"

    var valueAxis = x.yAxes.push(new am4charts.ValueAxis())
    valueAxis.baseValue = 0
    valueAxis.fontSize = "9px"

    var series = x.series.push(new am4charts.LineSeries())
    series.dataFields.valueY = "value"
    series.dataFields.categoryX = "year"
    series.strokeWidth = 2
    series.tensionX = 0.77
    series.stroke = am4core.color(stokeColor)

    // bullet is added because we add tooltip to a bullet for it to change color
    var bullet = series.bullets.push(new am4charts.Bullet())
    bullet.tooltipText = "{valueY}"

    var range = valueAxis.createSeriesRange(series)
    range.value = 0
    range.endValue = -1000
    range.contents.stroke = am4core.color("#FF0000")
    range.contents.fill = range.contents.stroke

    x.cursor = new am4charts.XYCursor()

    return () => {
      x.dispose()
    }
  }, [])

  return (
    <div className="single-line-chart-card">
      <h4 className="chart-card-title">{title}</h4>
      <h6 className="chart-card-subtitle">{subtitle}</h6>
      <div className="chart-area">
        <div id={chartDiv} style={{ width: "100%", height: "300px" }}></div>
      </div>
    </div>
  )
}

export default SingleLineChart
