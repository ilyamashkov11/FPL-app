import React from 'react'

function Player({player}) {

    const getElementByPos = (player) => {
        if (player.element_type === 1) {
            return <div className='overheadText'>GK</div>
        } else if (player.element_type === 2) {
            return <div className='overheadText'>DEF</div>
        } else if (player.element_type === 3) {
            return <div className='overheadText'>MID</div>
        } else {
            return <div className='overheadText'>FWD</div>
        }
    }
  return (
    <div className={`player${player.position}`}>
        {getElementByPos(player)}
        <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photo.replace('.jpg', '.png')}`} 
            alt='Image' 
            className={`player${player.position}Img`}
            key={player.position}>
        </img>
        <div className='underPlayerWriting'>
            {player.web_name} <br />
            {player.event_points}
        </div>
    </div>
  )
}

export default Player