import React, { useState, useEffect } from 'react'
import './css/TeamContainer.css'
import footballPitchImage from './resources/football-pitch.png'
import { useSelector } from "react-redux";
import {useQuery} from '@tanstack/react-query'
import callAPI from './callAPI'
import StartingXI from './playerPositionComponents/StartingXI';
import Bench from './playerPositionComponents/Bench';


function TeamContainer() {
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
  
  useEffect(() => {
    if (isSuccess) {
      setChip(data.chip)
      setTeamValue(data.team_value)
      setTotalPoints(data.total_points)
      setPointsThisGW(data.points_this_gameweek)
      setPointsOnBench(data.points_on_bench)
      setTeam(data.team)

      const starterArray = []
      const benchArray = []
      
      data.team.forEach((player) => {
        if (player.position <= 11) {
          starterArray.push(player)
        } else {
          benchArray.push(player)
        }
      })
      setStartingXI(starterArray)
      setBench(benchArray)
    }
  }, [isSuccess, user_id]);

  return (
    <div className='TeamContainer'>
      <img src={footballPitchImage} alt='Image' className='footballPitchImage'></img>
        <StartingXI startingXI={startingXI} />
        <Bench bench={bench} className='bench'/>
    </div>
  )
}

export default TeamContainer