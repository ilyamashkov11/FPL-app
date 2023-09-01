import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import '../css/MidsTable.css'

function MidfieldersTable({mids}) {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "web_name",
      },
      {
        Header: "Total Points",
        accessor: "points",
      },
      {
        Header: "Points per Game",
        accessor: "pts_per_game",
      },
      {
        Header: "Form",
        accessor: "form",
      },
      {
        Header: "xG per 90",
        accessor: "xG_per90",
      },
      {
        Header: "xA per 90",
        accessor: "xA_per90",
      },
      {
        Header: "xGI per 90",
        accessor: "xGi_per90",
      },
      {
        Header: "Influence",
        accessor: "influence",
      },
      {
        Header: "Total Bonus Points",
        accessor: "num_bonus_pts",
      },
      {
        Header: "BPS System",
        accessor: "bps",
      },
      {
        Header: "Cost £",
        accessor: "now_cost",
      },
      {
        Header: "Selected %",
        accessor: "selected_by_percent",
      },
    ], []);

  const { headerGroups, rows, getTableProps, getTableBodyProps, prepareRow } =
    useTable({ columns, data: mids || [mids] });

  return (
    <div className="midsTableContainer">
      {mids.length === 0 ? (
        <p>Loading Table...</p>
      ) : (
        <table {...getTableProps()} className='midsTable'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className='Header'>
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
                <tr {...row.getRowProps()} className='rows'>
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
  );
}

export default MidfieldersTable