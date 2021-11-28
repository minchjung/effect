import React, { useEffect, useState } from 'react';
import '../style/Toggle.css'

function Toggle({ toggleHandler, effectOn , darkMode }) {
  const [ tail, setTail ] = useState()

  useEffect( ()=> {
    darkMode 
      ? setTail("-darkMode") : setTail("")
  }, [ darkMode ] )

  const handleOnClickToggle = () => {
    toggleHandler()
  }
  return(
    <div className="toggle-wrapper">
      <div className="toggle-container" onClick={handleOnClickToggle}>
        <div className={`toggle-container${effectOn ? ' toggle--checked' : ''}`} />
        <div className={`toggle-circle${effectOn ? ' toggle--checked'+tail : ''+tail}`} />
      </div>
    </div>
  )
}

export default Toggle