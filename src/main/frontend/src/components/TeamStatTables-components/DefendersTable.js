import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import '../css/DefsTable.css'

function DefendersTable({defs}) {
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
        Header: "xG Conceded per 90",
        accessor: "xG_conceded_per90",
      },
      {
        Header: "Goals Conceded per 90",
        accessor: "goals_conceded_per90",
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
    useTable({ columns, data: defs || [defs] });

  return (
    <div className="defsTableContainer">
      {defs.length === 0 ? (
        <p>Loading Table...</p>
      ) : (
        <table {...getTableProps()} className='defsTable'>
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

export default DefendersTable