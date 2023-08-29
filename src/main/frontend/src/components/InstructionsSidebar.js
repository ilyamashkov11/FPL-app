import React from 'react';
import './css/InstructionsSidebar.css';

const InstructionsSidebar = () => {
  return (
    <div className='sideBar'>
      <h1>
        <u>INFORMATION</u>
      </h1>
      <p>
        Hello and welcome to <em>FPLWizard</em>. This is a tool aimed to assist you in visualising information about different aspects of your FPL account to help you win your mini-leagues!
        If this is your first time using the tool, please enter your FPL user ID in the search bar bellow and hit enter. This will store your FPL related information for simpler access in the future. If youre not sure how to get your FPL user ID, <a href='#'>here is a step by step guide</a>.
          If this is not your first time, you can either type your team name or enter your FPL user ID. 
         <br/><br/>

        If you have any suggestions or ideas on how to improve the tool please submit a form that can be found in the <a href='#'>suggestions</a> tab. Any feedback is greatly apreciated.
      </p>
    </div>
  )
}

export default InstructionsSidebar