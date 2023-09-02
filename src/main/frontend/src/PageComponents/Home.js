import React from 'react'
import InstructionsSidebar from '../components/InstructionsSidebar';
import Searchbar from '../components/Searchbar';
import UserInfoContainer from '../components/UserInfoContainer';
import { useSelector, useDispatch } from "react-redux";



function Home() {
    const {renderState} = useSelector((state) => state.renderState)
  const teamName = useSelector((state) => state.name.teamName)
  return (
    <div>
        <InstructionsSidebar className="InstructionsSidebar"/>
        <Searchbar className="Searchbar"/>
        <div className='teamNameText'>{teamName}</div>
        <UserInfoContainer className="UserInfoContainer" teamName={teamName} renderState= {renderState}/>
    </div>
  )
}

export default Home