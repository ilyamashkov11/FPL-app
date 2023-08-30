import React from 'react'
import Player from '../Player'

function Midfielders({midfielders}) {
  return (
    <div className='midfielders'>
        {midfielders.map((player) => {
            return <Player player={player} />
        })}
    </div>
  )
}

export default Midfielders