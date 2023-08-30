import React from 'react'
import Player from '../Player'

function Defenders({defenders}) {
  return (
    <div className='defenders'>
        {defenders.map((player) => {
            return <Player player={player} />
        })}
    </div>
  )
}

export default Defenders