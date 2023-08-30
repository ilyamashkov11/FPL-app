import React from 'react'

function Player({player}) {
  return (
    <div className={`player${player.position}`}>
        <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photo.replace('.jpg', '.png')}`} 
            alt='Image' 
            className={`player${player.position}`}>
        </img>
        <div className='playerName'>{player.web_name}</div>
    </div>
  )
}

export default Player