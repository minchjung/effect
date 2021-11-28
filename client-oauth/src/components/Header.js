import React, { useState } from "react";
import '../style/Header.css'
import Toggle  from './Toggle.js'
import { createEffect } from '../api/weather'

function Header({ effectOn , setEffectOn, darkMode }){
  const [ intervalId, setIntervalId ] = useState(null)
  // console.log("Header", darkMode)
  const toggleHandler =() => {
    setEffectOn(!effectOn) 
    effectOnHandler() 
  }

  // 눈, 비 효과 (시작 버튼 클릭시 falling 효과, 토글 교체 가능)
  const effectOnHandler = () => {
    if( !effectOn ){
      const interval = setInterval(createEffect, 300);
      setIntervalId(interval);
    }
    else{
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }
  return (
    <div>
      <div className="headerContainer">
        <div className="header-title-container">
          <span className="logo-name-header">W</span>
          <span className="logo-name">EA</span>
          <span className="logo-name-header">D</span>
          <span className="logo-name">RESSER</span>
        </div>
        <div className="user-box">
          <Toggle toggleHandler={toggleHandler} effectOn={effectOn} darkMode={darkMode}/>
          <div><i className="fas fa-user"></i></div>
          <div><i className="fas fa-sign-in-alt"></i></div>
          {/* { !effectOn ? null : <DropDownUser userData = {userData} />  } */}
        </div>  {/* user-box */}
      </div>
    </div >
  );

}

export default Header;