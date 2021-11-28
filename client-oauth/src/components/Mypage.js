import React, { useEffect, useState } from "react";
import Info from "./Info"
import axios from 'axios';
import Header from './Header'
import '../style/Mypage.css'
import { getGoogleUserInfo } from '../api/social'
import { getWeather, createEffect } from '../api/weather'

function Mypage ({ isGoogle, accessToken }) {
  const [ intervalId, setIntervalId ] = useState(null); 
  const [ background, setBackground ] = useState("");
  const [ weather, setWeather]= useState([null, null]); //[ id, main , icon]
  const [ temp, setTemp ] = useState([ null, null, null ]); // [ 현재, 최저, 최고]
  const [ googleData, setGoogleData ] = useState(null);
  const [ effectOn, seteffectOn ] = useState(false)

  // myPage rendring  :  소셜 userInfo 가져옴 (서버 처리시 수정 필요 )  
  useEffect( () => { 
    isGoogle 
      ? googleUserHandler() 
      : kakaoUserHandler()
  },[isGoogle])

  // 눈, 비 효과 (시작 버튼 클릭시 falling 효과, 토글 교체 가능)
  const effectOnHandler = () => {
    seteffectOn(true)
    const interval = setInterval(createEffect, 300);
    setIntervalId(interval);
  }
  // 눈, 비 효과 (스탑 버튼 클릭시 멈춤 효과, 토글 교체 가능)
  const effectOffHandler = () => {
    seteffectOn(false)
    clearInterval(intervalId);
  }

    // 날씨 api get 요청 ( useEffect 로 랜더링 될때 받아오기로 수정 필요)
    const weatherHandler = async () => {
    const result = await getWeather() 
    if( !result.isSuccess ){ //  결과 요청 실패 
      console.log(result.msg) //err handle 
      return 
    }
    
    const { // 성공시 가져온 값
      id, main, icon, temp, temp_min, temp_max, sunrise, sunset
    } = result.data

    // 현재시간, 일출, 일몰로 darkmode 
    const night = new Date(sunset*1000).getHours();
    const morning = new Date(sunrise*1000).getHours();
    const nowHrs = new Date().getHours();
    nowHrs > morning && nowHrs <= night  
      ? setBackground({background : ""})
      : setBackground({background : "darkMode"})
      
    setWeather([id,main,icon]);
    setTemp([temp, temp_min, temp_max]);
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
            <div className="myTitle">WeaDresser</div>
              <div className="imgWrapper"> 
                  <i className="fas fa-cloud"></i>
                  <i className="far fa-sun"></i>
                  <i className="fas fa-cloud-showers-heavy"></i>
                  <i className="fas fa-cloud-sun"></i>
              </div>
              <Info 
                temp={temp[0]} temp_max={temp[2]} temp_min={temp[1]} 
                icon={weather[2]} codeId ={weather[0]} main={weather[1]}
              />
              <div className="mypage-btn-container">
                <div className="mypage-btn-container">
                  <button className="getWeatherBtn" onClick={weatherHandler}>날씨 받자</button>
                  {!effectOn 
                    ? <button className="getAnimationBtn" onClick={effectOnHandler}>효과 받자</button>
                    : <button className="stopAnimationBtn" onClick={effectOffHandler}>효과 그만</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
}

export default Mypage;
