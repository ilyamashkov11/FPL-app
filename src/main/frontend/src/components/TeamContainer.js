import React from 'react'
import './css/TeamContainer.css'
import footballPitchImage from './resources/football-pitch.png'

function TeamContainer() {
  return (
    <div className='TeamContainer'>
      <img src={footballPitchImage} alt='Image' className='footballPitchImage'></img>
      <img src='https://resources.premierleague.com/premierleague/photos/players/110x140/p232223.png' alt='Image'></img>
    </div>
  )
}

export default TeamContainer