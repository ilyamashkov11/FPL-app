import React from "react";

function Stats({ data, isSuccess }) {
    if (isSuccess) {
    const chipUsed = (chip) => {
        var newString = chip
        if (chip.includes('"')) {newString = chip.replace(/"/g, '')}
        if (chip === 'null') {
            return <div>NO CHIP USED</div>
        } else {
            return <div>{newString}</div>
        }
    }

    return (
      <div className="teamStats">
        <div className="totalPoints">
          <h2>TOTAL POINTS</h2>
          <div>{data.total_points}</div>
        </div>
        <div className="ptsThisGW">
          <h2>POINTS THIS WEEK</h2>
          <div>{data.points_this_gameweek}</div>
        </div>
        <div className="ptsOnBench">
          <h2>POINTS ON BENCH</h2>
          <div>{data.points_on_bench}</div>
        </div>
        <div className="teamValue">
          <h2>TEAM VALUE</h2>
          <div>£ {data.team_value/10}</div>
        </div>
        <div className="chipUsed">
          <h2>CHIP USED</h2>
          {chipUsed(data.chip)}
        </div> <div className="numTransfers">
          <h2>TRANSFERS MADE</h2>
          {data.num_transfers}
        </div>
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
}

export default Stats;
