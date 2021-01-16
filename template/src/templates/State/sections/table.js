import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"

const data = [
  {
    name: "Florida",
    state_population: 21500000,
    daily_new_cases: 31.1,
    infection_rate: 0.86,
    positive_test_rate: 17.7,
    ICU_headroom_used: 100,
    tracers_hired: 8,
  },
  {
    name: "Mississippi",
    state_population: 2980000,
    daily_new_cases: 26.8,
    infection_rate: 0.85,
    positive_test_rate: 19.8,
    ICU_headroom_used: 67,
    tracers_hired: 5,
  },
  {
    name: "Idaho",
    state_population: 1790000,
    daily_new_cases: 26.4,
    infection_rate: 1,
    positive_test_rate: 17.1,
    ICU_headroom_used: 17,
    tracers_hired: 11,
  },
  {
    name: "Albama",
    state_population: 4900000,
    daily_new_cases: 26.1,
    infection_rate: 0.89,
    positive_test_rate: 14.3,
    ICU_headroom_used: 65,
    tracers_hired: 6,
  },
  {
    name: "Texas",
    state_population: 29000000,
    daily_new_cases: 23.7,
    infection_rate: 0.94,
    positive_test_rate: 16.1,
    ICU_headroom_used: 64,
    tracers_hired: 11,
  },
  {
    name: "Georgia",
    state_population: 10600,
    daily_new_cases: 30.6,
    infection_rate: 0.98,
    positive_test_rate: 18.9,
    ICU_headroom_used: 90,
    tracers_hired: 8,
  },
]

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config)

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

  return { items: sortedItems, requestSort, sortConfig }
}

const TableSort = ({ sortFunc }) => {
  return (
    <div className="table-acc-dec">
      <FontAwesomeIcon onClick={() => sortFunc()} icon={faChevronDown} />
      <FontAwesomeIcon onClick={() => sortFunc()} icon={faChevronUp} />
    </div>
  )
}

const TableComponent = props => {
  const { items, requestSort, sortConfig } = useSortableData(props.data)
  const getClassNamesFor = name => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>
              State Population
              <TableSort sortFunc={() => requestSort("name")} />
            </th>
            <th>
              Daily New Cases per 100k
              <TableSort sortFunc={() => requestSort("daily_new_cases")} />
            </th>
            <th>
              Infection Rate
              <TableSort sortFunc={() => requestSort("infection_rate")} />
            </th>
            <th>
              Positive Test Rate
              <TableSort sortFunc={() => requestSort("positive_test_rate")} />
            </th>
            <th>
              ICU Headroom Used
              <TableSort sortFunc={() => requestSort("ICU_headroom_used")} />
            </th>
            <th>
              Tracers Hired
              <TableSort sortFunc={() => requestSort("tracers_hired")} />
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="population-td">
                <span className="city-name">
                  <span className="circle circle-red"></span>
                  {item.name}
                </span>
                <span className="population">{item.state_population}</span>
              </td>
              <td>
                <span className="circle circle-green"></span>
                {item.daily_new_cases}
              </td>
              <td>
                <span className="circle circle-blue"></span>
                {item.infection_rate}
              </td>
              <td>
                <span className="circle circle-yellow"></span>
                {item.positive_test_rate}%
              </td>
              <td>
                <span className="circle circle-orange"></span>
                {item.ICU_headroom_used}%
              </td>
              <td>
                <span className="circle circle-red"></span>
                {item.tracers_hired}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function App() {
  return <TableComponent data={data} />
}
