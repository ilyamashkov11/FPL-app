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
  const user_id = useSelector((state) => state.userID.userID)

  async function fetchData(value) {
    console.log(user_id)
    await callAPI('/api/player/leagues', 'POST', {value, user_id})
    .then((response) => {
      setApiresponse(response);
      return response
    })
  }

  useEffect(() => {
    fetchData(teamName);
  }, [user_id]);

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