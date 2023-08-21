import React from 'react';
import './InstructionsSidebar.css';

const InstructionsSidebar = () => {
  return (
    <div className='sideBar'>
      <h1>
        <u>INFORMATION</u>
      </h1>
      <p>
        Hello and welcome to <em>FPLWizard</em>. This is a tool aimed to assist you in visualising information about different aspects of your FPL account to help you win your mini-leagues!
        To use the tool simply enter your name in the search bar below and select your team from the drop down menu.<br/><br/>

        If you have any suggestions or ideas on how to improve the tool please submit a form that can be found in the <a href='#'>suggestions</a> tab. Any feedback is greatly apreciated.
      </p>
    </div>
  )
}

export default InstructionsSidebar