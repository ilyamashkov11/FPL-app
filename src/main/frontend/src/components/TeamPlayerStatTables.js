import React, { useState, useEffect } from "react";
import GoalkeepersTable1 from "./TeamStatTables-components/GoalkeepersTable1";
import MidfieldersTable from './TeamStatTables-components/MidfieldersTable'
import DefendersTable from './TeamStatTables-components/DefendersTable'
import ForwardsTable from './TeamStatTables-components/ForwardsTable'

function TeamPlayerStatTables({ data, isSuccess }) {
  const [gks, setGks] = useState([]);
  const [defenders, setDefenders] = useState([]);
  const [midfielders, setMidfielders] = useState([]);
  const [forwards, setForwards] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data.team)
      const gksArray = [];
      const defArray = [];
      const midArray = [];
      const fwdArray = [];
      data.team.forEach((player) => {
        if (player.element_type === 1) {
          gksArray.push(player);
        } else if (player.element_type === 2) {
          defArray.push(player);
        } else if (player.element_type === 3) {
          midArray.push(player);
        } else {
          fwdArray.push(player);
        }
      });
      setGks(gksArray);
      setDefenders(defArray);
      setMidfielders(midArray);
      setForwards(fwdArray);
    }
  }, [data]);

  return (
    <div className="teamPlayerStatTables">
      <h3 className='Title'>GOALKEEPERS</h3>
      <GoalkeepersTable1 gks={gks}/>
      <h3 className='Title'>DEFENDERS</h3>
      <DefendersTable defs={defenders}/>
      <h3 className='Title'>MIDFIELDERS</h3>
      <MidfieldersTable mids={midfielders}/>
      <h3 className='Title'>FORWARDS</h3>
      <ForwardsTable fwds={forwards}/>
    </div>
  )
}

export default TeamPlayerStatTables;
