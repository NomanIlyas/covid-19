import React, { useLayoutEffect } from "react"
import { SmallContainer, Sections } from "../../../theme-components"
import StatesData from "./usState"
import L from "leaflet"

const KeyIndicatorSection = () => {
  useLayoutEffect(() => {
    var map = L.map("map").setView([37.8, -96], 4)

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid29mZWwiLCJhIjoiY2szanpjbHI0MG1oczNkbGM0NGV4eHFrdSJ9.dUPlJcOwQKDH-FLEz5IHTw",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/light-v9",
      }
    ).addTo(map)

    var info = L.control()

    info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info")
      this.update()
      return this._div
    }

    info.update = function (props) {
      this._div.innerHTML =
        "<h4>Learning Paths</h4>" +
        (props
          ? "<b>" +
            props.name +
            "</b><br />" +
            props.paths +
            " people / mi<sup>2</sup>"
          : "Hover over a state")
    }

    info.addTo(map)

    function getColor(d) {
      return d > 1000
        ? "darkgreen"
        : d > 100
        ? "lightgreen"
        : d > 50
        ? "yellow"
        : d > 20
        ? "orange"
        : d > 10
        ? "red"
        : "#FFEDA0"
    }

    function style(feature) {
      return {
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.paths),
      }
    }

    function highlightFeature(e) {
      var layer = e.target

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      })

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
      }

      info.update(layer.feature.properties)
    }

    // var marker = L.marker([125.45, 174.78219], {
    //   draggable: false,
    //   title: "Hover Text",
    //   opacity: 0.5,
    // })
    //   // .bindLabel('A sweet static label!', { noHide: true })
    //   .addTo(map)

    var geojson

    function resetHighlight(e) {
      geojson.resetStyle(e.target)
      info.update()
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds())
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      })
    }

    geojson = L.geoJson(StatesData, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(map)

    map.attributionControl.addAttribution(
      'Population data &copy; <a href="http://census.gov/">US Census Bureau</a>'
    )

    var legend = L.control({ position: "bottomright" })

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [],
        from,
        to

      for (var i = 0; i < grades.length; i++) {
        from = grades[i]
        to = grades[i + 1]

        labels.push(
          '<i style="background:' +
            getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? "&ndash;" + to : "+")
        )
      }

      div.innerHTML = labels.join("<br>")
      return div
    }

    legend.addTo(map)
    return () => {
      map.remove()
    }
  }, [])

  return (
    <SmallContainer>
      <Sections
        withPadding
        title="United States CoVID-19 Risk Levels from 5 Key Indicators"
      />
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </SmallContainer>
  )
}

export default KeyIndicatorSection
