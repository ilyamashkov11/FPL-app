import React, { useState } from 'react'
import TeamStats from './TeamStats'
import TeamPlayerStatTables from './TeamPlayerStatTables'
import callAPI from './callAPI'
import { useSelector } from "react-redux";
import { useQuery } from '@tanstack/react-query'
import './css/TeamStatsContainer.css'

function TeamStatsContainer() {
    const user_id = useSelector((state) => state.userID.userID)
    const [chip, setChip] = useState('')
    const [teamValue, setTeamValue] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)
    const [pointsThisGW, setPointsThisGW] = useState(0)
    const [pointsOnBench, setPointsOnBench] = useState(0)
    const [team, setTeam] = useState([])
    const [startingXI, setStartingXI] = useState([])
    const [bench, setBench] = useState([])

  
    const getUserTeam = async () => {
        const response = await callAPI('/api/get-user-team', 'POST', user_id)
        const parsed = JSON.parse(JSON.stringify(response))
        return parsed
    }
    const {data, isSuccess} = useQuery(["player", user_id], getUserTeam)

  return (
    <div className='teamStatsContainer'>
        <TeamStats data={data} isSuccess={isSuccess}/>
        <TeamPlayerStatTables data={data} isSuccess={isSuccess}/>
    </div>
  )
}

export default TeamStatsContainer