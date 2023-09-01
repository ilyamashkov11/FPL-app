import React from 'react'
import Player from '../Player'
import '../css/Bench.css'

function Bench( {bench} ) {
  return (
    <div className='bench'>
        {bench.map((player) => {
            return <Player player={player} key={player.position}/> 
        })}
    </div>
  )
}

export default Bench