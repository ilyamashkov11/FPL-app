import React from 'react'
import LeaguesTable from './LeaguesTable'
import './UserInfoContainer.css'

function UserInfoContainer({teamName, renderState}) {
    if (renderState){
        console.log('6 - RENDER SET TO TRUE CAUSES LEAGUESTABLE TO RENDER')
        return (
            <div className='userInfoContainer'>
            <div className='userInfoText'>{teamName}</div>
                <LeaguesTable className='Table'/>
            </div>
        )
    } else {
        return <div className='notWorking'>{renderState}</div>
    }
}

export default UserInfoContainer