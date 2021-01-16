import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState({
    key: "stateName",
    direction: "ascending",
  })

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [items, sortConfig])

  const requestSort = key => {
    let direction = "ascending"
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return {
    items: sortedItems,
    requestSort,
    sortConfig,
  }
}

const TableSort = ({ sortFunc, sortConfig, fieldname }) => {
  return (
    <div className="table-acc-dec">
      <FontAwesomeIcon
        className={`table-sort ascending ${
          sortConfig.key === fieldname && sortConfig.direction === "ascending"
            ? "disable"
            : ""
        } `}
        onClick={() => sortFunc()}
        icon={faChevronDown}
      />

      <FontAwesomeIcon
        className={`table-sort descending ${
          sortConfig.key === fieldname && sortConfig.direction === "descending"
            ? "disable"
            : ""
        } `}
        onClick={() => sortFunc()}
        icon={faChevronUp}
      />
    </div>
  )
}

const TableComponent = props => {
  const { items, requestSort, sortConfig } = useSortableData(props.data)
  const Header = props.thead

  const getColor = val => {
    var color = ""
    if (val > 25) {
      color = "circle-red"
    } else if (val > 10) {
      color = "circle-darkorange"
    } else if (val > 0.9) {
      color = "circle-yellow"
    } else {
      color = "circle-green"
    }

    return color
  }

  const getColorInfection = val => {
    var color = ""
    if (val > 1.4) {
      color = "circle-red"
    } else if (val > 1.11) {
      color = "circle-darkorange"
    } else if (val > 0.91) {
      color = "circle-yellow"
    } else {
      color = "circle-green"
    }

    return color
  }
  const getColorPositive = val => {
    var color = ""
    if (val > 20) {
      color = "circle-red"
    } else if (val > 10) {
      color = "circle-darkorange"
    } else if (val > 3) {
      color = "circle-yellow"
    } else {
      color = "circle-green"
    }

    return color
  }
  const getColorICU = val => {
    var color = ""
    if (val > 70) {
      color = "circle-red"
    } else if (val > 60) {
      color = "circle-darkorange"
    } else if (val > 50) {
      color = "circle-yellow"
    } else {
      color = "circle-green"
    }

    return color
  }
  const getColorTracer = val => {
    var color = ""
    if (val > 90) {
      color = "circle-green"
    } else if (val > 10) {
      color = "circle-yellow"
    } else if (val > 1) {
      color = "circle-darkorange"
    } else {
      color = "circle-red"
    }

    return color
  }

  return (
    <div className="table-wrapper">
      <table className="table sortable-table">
        <thead>
          <tr>
            {Header.map(head => (
              <th onClick={() => requestSort(head.value)}>
                {head.name}
                <TableSort
                  sortConfig={sortConfig}
                  fieldname={head.value}
                  sortFunc={() => requestSort(head.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="population-td">
                <span className="city-name">
                  <span
                    className={`circle ${getColor(item.testPositivityRatio)}`}
                  ></span>
                  {item.stateName}
                </span>
                <span className="population">{item.population}</span>
              </td>

              <td>
                <span className={`circle ${getColor(item.caseDensity)}`}></span>
                {item.caseDensity ? item.caseDensity.toFixed(2) : null}
              </td>

              <td>
                <span
                  className={`circle ${getColorInfection(item.infectionRate)}`}
                ></span>
                {item.infectionRate ? item.infectionRate.toFixed(2) : 0.0}
              </td>

              <td>
                <span
                  className={`circle ${getColorPositive(
                    item.testPositivityRatio
                  )}`}
                ></span>
                {item.testPositivityRatio
                  ? `${item.testPositivityRatio.toFixed(2)} %`
                  : 0.0}
              </td>

              <td>
                <span
                  className={`circle ${getColorICU(item.icuHeadroomRatio)}`}
                ></span>
                {item.icuHeadroomRatio
                  ? `${item.icuHeadroomRatio.toFixed(2)}%`
                  : 0.0}
              </td>

              <td>
                <span
                  className={`circle ${getColorTracer(
                    item.contactTracerCapacityRatio
                  )}`}
                ></span>
                {item.contactTracerCapacityRatio
                  ? `${item.contactTracerCapacityRatio.toFixed(2)}%`
                  : 0.0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TableComponentWrapper(props) {
  return <TableComponent data={props.data} thead={props.header} />
}
