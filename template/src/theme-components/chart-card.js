import React, { useLayoutEffect, useRef } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"

const ChartCard = ({
  title,
  subtitle,
  description,
  chartDiv,
  fillColor,
  stokeColor,
  percantage,
}) => {
  const chart = useRef(null)

  useLayoutEffect(() => {
    let x = am4core.create(chartDiv, am4charts.XYChart)

    x.data = [
      {
        date: new Date(2019, 5, 12),
        value1: 900000,
        value2: 700000,
        previousDate: new Date(2019, 5, 5),
      },
      {
        date: new Date(2019, 5, 13),
        value1: 600000,
        value2: 500000,
        previousDate: new Date(2019, 5, 6),
      },
      {
        date: new Date(2019, 5, 14),
        value1: 400000,
        value2: 300000,
        previousDate: new Date(2019, 5, 7),
      },
      {
        date: new Date(2019, 5, 15),
        value1: 200000,
        value2: 300000,
        previousDate: new Date(2019, 5, 8),
      },
      {
        date: new Date(2019, 5, 16),
        value1: 100000,
        value2: 200000,
        previousDate: new Date(2019, 5, 9),
      },
      {
        date: new Date(2019, 5, 17),
        value1: 100000,
        value2: 300000,
        previousDate: new Date(2019, 5, 10),
      },
      {
        date: new Date(2019, 5, 18),
        value1: 530000,
        value2: 400000,
        previousDate: new Date(2019, 5, 11),
      },
    ]

    // Create axes
    var dateAxis = x.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.minGridDistance = 50
    dateAxis.fontSize = "9px"

    var valueAxis = x.yAxes.push(new am4charts.ValueAxis())
    valueAxis.fontSize = "9px"

    var series = x.series.push(new am4charts.LineSeries())
    series.dataFields.valueY = "value1"
    series.dataFields.dateX = "date"
    series.fillOpacity = 0.3
    series.tooltipText =
      "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}"
    series.tooltip.pointerOrientation = "vertical"
    series.tooltip.fontSize = "9px"
    series.fill = am4core.color(fillColor)

    var series2 = x.series.push(new am4charts.LineSeries())
    series2.dataFields.valueY = "value2"
    series2.dataFields.dateX = "date"
    series2.strokeWidth = 2
    //series2.stroke = series.stroke
    series2.stroke = am4core.color(stokeColor)

    x.cursor = new am4charts.XYCursor()
    x.cursor.xAxis = dateAxis
    x.cursor.fontSize = "9px"

    chart.current = x

    return () => {
      x.dispose()
    }
  }, [])

  return (
    <div className="chart-card">
      <h4 className="chart-card-title">{title}</h4>
      {percantage ? (
        <h6 className="chart-card-percantage">{percantage}</h6>
      ) : null}
      <h6 className="chart-card-subtitle">{subtitle}</h6>
      <p className="chart-card-description">{description}</p>
      <div className="chart-area">
        <div id={chartDiv} style={{ width: "100%", height: "300px" }}></div>
      </div>
    </div>
  )
}

export default ChartCard
