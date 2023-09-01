import React from 'react'
import Player from '../Player'

function Forwards({forwards}) {
  return (
    <div className='forwards'>
        {forwards.map((player) => {
            return <Player player={player} key={player.position}/>
        })}
    </div>
  )
}

export default Forwards