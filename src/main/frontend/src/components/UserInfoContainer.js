import React from 'react'
import LeaguesTable from './LeaguesTable'
import './UserInfoContainer.css'

function UserInfoContainer({teamName, renderState}) {
    console.log('in useinfocontainer '+ renderState)
    if (renderState){
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