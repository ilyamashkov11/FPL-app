import React, {useState, useEffect} from 'react'
import {useTable} from 'react-table'
import { useMemo } from 'react'
import callAPI from './callAPI'
import { useSelector, useDispatch } from "react-redux";
import { setLeagues } from './redux/PlayerLeaguesReducer';
import './css/LeaguesTable.css'

function LeaguesTable(state) {
  const {renderState} = useSelector((state) => state.renderState)
  const [apiResponse, setApiresponse] = useState([])
  const teamName = useSelector((state) => state.name.teamName)
  const user_id = useSelector((state) => state.userID.userID)
  const leagues = useSelector((state) => state.leagues.leagues)
  const dispatch = useDispatch()

  async function fetchData(value) {
    console.log("9 - INSIDE FETCH DATA")
    if (leagues !== []) {
      console.log('10 - CALLS /LEAGUES')
      await callAPI('/api/player/leagues', 'POST', {value, user_id})
      .then((response) => {
        console.log('11 - /LEAGUES RESPONSE: ' + response)
        console.log("12 - SETS apiResponse, LEAGUES")
        setApiresponse(response);
        dispatch(setLeagues(response))
        // console.log('response ' +response)
        return response
      })
    }
  }

  useEffect(() => {
    console.log("7 - USE EFFECT 1 CALLED BECAUSE LEAGUESTABLE NOW RENDERING OR ID CHANGED")
    if (leagues === undefined || leagues.length === 0){ 
      console.log('8 - LEAGUES == [], CALLS fetchData()')
      fetchData(teamName);
    } else if (leagues !== undefined ) {
      console.log('8 - LEAGUES != [] SETS apiResponse (apiResponse is what is used in the table)')
      setApiresponse(leagues)
    } else {
      console.log('leagues === []')
    }
    // fetchData(teamName)
    // setApiresponse(leagues)
  }, [user_id]);

  // useEffect(() => {
  //   console.log("use effect 2: ")
  //   if (apiResponse.length > 0) {
  //     dispatch(setLeagues(apiResponse)); // Update leagues in Redux store
  //   }
  // }, [apiResponse]);

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
    {apiResponse.length === 0 ? (<p>Loading Table...</p>) : (
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
    )}
  </div>
  )
}

export default LeaguesTable