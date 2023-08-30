import React from 'react'
import Player from '../Player'

function Goalkeeper({gk}) {
  return (
    <div className='goalkeeper'>
        {gk.map((player) => {
            return <Player player={player} />
        })}
    </div>
  )
}

export default Goalkeeper