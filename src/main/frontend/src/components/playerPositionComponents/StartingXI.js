import React, {useState, useEffect} from 'react'
import Player from '../Player'
import Goalkeeper from './Goalkeeper'
import Defenders from './Defenders'
import Midfielders from './Midfielders'
import Forwards from './Forwards'
import '../css/StartingXI.css'

function StartingXI( {startingXI} ) {
    const [gk, setGk] = useState([])
    const [defenders, setDefenders] = useState([])
    const [midfielders, setMidfielders] = useState([])
    const [forwards, setForwards] = useState([])

    useEffect(() => {
        const gkArray = []
        const defArray = []
        const midArray = []
        const fwdArray = []
        startingXI.forEach((player) => {
            if (player.element_type === 1) {
                gkArray.push(player)
            } else if (player.element_type === 2) {
                defArray.push(player)
            } else if (player.element_type === 3) {
                midArray.push(player)
            } else {
                fwdArray.push(player)
            }
        })
        setGk(gkArray)
        setDefenders(defArray)
        setMidfielders(midArray)
        setForwards(fwdArray)
    }, [startingXI])

  return (
    <div className='StartingXI'>
        <Goalkeeper gk={gk}/>
        <Defenders defenders={defenders}/>
        <Midfielders midfielders={midfielders}/>
        <Forwards forwards={forwards}/>
    </div>
  )
}

export default StartingXI