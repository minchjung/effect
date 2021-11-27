import React, { Component, useEffect, useState } from "react";
import Info from "./Info"
import axios from 'axios';
import Header from './Header'
import { getGoogleUserInfo } from '../api/social'
import { getWeather, createEffect } from '../api/weather'

function Mypage ({ isGoogle, accessToken }) {
  const [ intervalId, setIntervalId ] = useState(null); 
  const [ background, setBackground ] = useState("");
  const [ weather, setWeather]= useState([null, null]); //[ id, main , icon]
  const [ temp, setTemp ] = useState([ null, null, null ]); // [ 현재, 최저, 최고]
  const [ googleData, setGoogleData ] = useState(null);

  useEffect( () => { 
    console.log(accessToken)
    console.log("isGoogle ", isGoogle)
    isGoogle 
      ? googleUserHandler() 
      : kakaoUserHandler()
  },[])

  const effectHandler = () => {
    if( intervalId ) setFalling();
    else stopFalling();
  }

  const setFalling = () => {
    const interval = setInterval(createEffect, 100);
    setIntervalId({ intervalId : interval })
  }
 
  const stopFalling = () => {
    clearInterval(intervalId);
    setIntervalId({ intervalId : null });
  }

  const weatherHandler = async () => {
    const API_key = "21674499d78d5cc9f73dd339f934e97d";
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?id=1835848&appid=${API_key}` 
    const weatherInfo = await axios.get(endpoint)
    .catch(err=> { console.log(err) })

    if(weatherInfo){
      const{
        sunrise, sunset
      } = weatherInfo.data.sys

      const sunfall = new Date(sunset*1000)
      // console.log(now.getMilliseconds())
      // console.log(now.getHours())
      // console.log(sunfall)
      
      sunfall.getHours() > new Date().getHours()
        ? setBackground({background : ""})
        : setBackground({background : "darkMode"})
      const {
        id, main, icon 
      } = weatherInfo.data.weather[0];
      const { 
        temp, temp_min, temp_max
      } = weatherInfo.data.main
      
      setWeather([id,main,icon]);
      setTemp([temp, temp_min, temp_max]);
    }
  }

  const googleUserHandler = async () => {
    const{  
      isSuccess,data,msg
    } = await getGoogleUserInfo({ accessToken })
    const { email, picture, name } = data;
    if( isSuccess ) setGoogleData({ email, picture, name })
    else console.log(msg) // error handle here
  }
  
  // Should refactor to server since it has Cors error (browser issue)
  const kakaoUserHandler = () => {
    console.log("I know you are kakao user to get resources")
    // const { accessToken } = this.props;
		// const kakaodata = await axios.get(`http://localhost:8080/callback?accessToken=${accessToken}`, 
		// )
    // .catch(err => {
    //   console.log(err);
    //   return // we can give some feedback here 
    // })
    // const { nickname, profile_image, thumbnail_image } = kakaodata.data
    // this.setState({
    //   nickname, profile_image, thumbnail_image
    // })
  }

    // const { nickname, profile_image, thumbnail_image } = this.state
    return (
      !accessToken 
      ? <div>로그인이 필요합니다</div>
      : 
      <div>
        <Header />
        <div className="mypageContainer">
        {/* <div className={this.state.background}> */}
          <div> 
            <div className="main-center-container">
              <div className="imgWrapper"> 
                  <i class="fas fa-cloud"></i>
                  <i class="far fa-sun"></i>
                  <i class="fas fa-cloud-showers-heavy"></i>
                  <i class="fas fa-cloud-sun"></i>
              </div>
              <div className="myTitle">WeaDresser</div>
              <Info 
                temp={temp[0]} temp_max={temp[2]} temp_min={temp[1]} 
                icon={weather[2]} codeId ={weather[0]} main={weather[1]}
              />
              <div className="mypage-btn-container">
                <div className="mypage-btn-container">
                  <button className="getWeatherBtn" onClick={weatherHandler}>날씨 받자</button>
                  <button className="getAnimationBtn" onClick={effectHandler}>효과 받자</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
}

export default Mypage;
