import React from 'react'
import LeaguesTable from './LeaguesTable'
import TeamContainer from './TeamContainer'
import './css/UserInfoContainer.css'

function UserInfoContainer({teamName, renderState}) {
    if (renderState){
        console.log('6 - RENDER SET TO TRUE CAUSES LEAGUESTABLE TO RENDER')
        return (
            <div className='userInfoContainer'>
                <LeaguesTable className='Table'/>
                <TeamContainer className='TeamContainer' />
            </div>
        )
    } else {
        return <div className='notActive'></div>
    }
}

export default UserInfoContainer