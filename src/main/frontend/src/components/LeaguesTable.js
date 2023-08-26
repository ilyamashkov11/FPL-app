import React, {useState, useEffect} from 'react'
import {useTable} from 'react-table'
import { useMemo } from 'react'
import callAPI from './callAPI'
import { useSelector } from "react-redux";
import './LeaguesTable.css'

function LeaguesTable(state) {
  const {renderState} = useSelector((state) => state.renderState)
  const [apiResponse, setApiresponse] = useState([])
  const teamName = useSelector((state) => state.name.teamName)

  // async function fetchData() {
  //   await callAPI('/api/player/leagues', 'GET', null)
  //   .then((response) => {
  //     setApiresponse(response);
  //     // console.log(response)
  //     return response
  //   })
  // }

  async function fetchData(value) {
    await callAPI('/api/player/leagues', 'POST', value)
    .then((response) => {
      setApiresponse(response);
      // console.log(response)
      return response
    })
  }

  useEffect(() => {
    fetchData(teamName);
  }, []);

  const data = useMemo(() => apiResponse || [], [])
  const columns = useMemo(() => [
    {
      Header: "League Name",
      accessor: "leagueName"
    },
    {
      Header: "Position",
      accessor: "leagueRank"
    }
  ], [])

 
  
  // console.log('apiResponse' + apiResponse)
  const {headerGroups, rows, getTableProps, getTableBodyProps, prepareRow} = useTable({ columns, data: apiResponse || [apiResponse] });

  return (
    <div className="leaguesTableContainer">
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  )
}

export default LeaguesTable