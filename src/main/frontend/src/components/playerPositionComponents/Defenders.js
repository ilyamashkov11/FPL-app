import React from 'react'
import Player from '../Player'

function Defenders({defenders}) {
  return (
    <div className='defenders'>
        {defenders.map((player) => {
            return <Player player={player} key={player.position}/>
        })}
    </div>
  )
}

export default Defenders