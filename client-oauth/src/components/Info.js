import React, { Component } from "react";
import axios from 'axios';
import './Info.css'

class Info extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const{
      temp, 
      temp_max,
      temp_min,
      icon,
      codeId,
      main
    }= this.props;
    return (
      <div>
        <div className="info-container">
          <div className="info-innerbox">
            
            <div className="info-img-box">
              {
                icon 
                ? <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
                : null
              }
            </div>
            <span className="info-cur-temp"> {main} </span>
          </div>
          <div className="info-innerbox">
            <span className="info-temp-title"> 최고 기온 </span>
            <span className="info-temp-max"> ㅤ{ temp_max ? parseInt(10*(temp_max -273))/10 : null} </span>
          </div>
          <div className="info-innerbox">
            <span className="info-temp-title"> 최저 기온 </span>
            <span className="info-temp-min"> ㅤ{ temp_min ? parseInt(10*(temp_min -273))/10 : null} </span>
          </div>
        </div>
      </div >
    );
  }

}

export default Info;
