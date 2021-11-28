import React, { useEffect, useState } from "react";
import Info from "./Info"
import Header from './Header'
import '../style/Mypage.css'
import { getGoogleUserInfo } from '../api/social'
import { getWeather } from '../api/weather'
// import axios from 'axios';

function Mypage ({ isGoogle, accessToken, darkMode, darkModeHandler }) {
  const [ weather, setWeather]= useState([null, null]); //[ id, main , icon]
  const [ temp, setTemp ] = useState([ null, null, null ]); // [ 현재, 최저, 최고]
  const [ userData, setUserData ] = useState(null);
  const [ effectOn, setEffectOn ] = useState(false);
  const [ apiDone, setApiDone ] = useState([false, false]);

  // myPage rendring  :  소셜 userInfo  (서버 처리시 수정 필요 ) 
  useEffect( () => { 
    if(!apiDone[0]){
      isGoogle 
        ? googleUserHandler() 
        : kakaoUserHandler()
    }
  },[apiDone[0]])
  // mypage rendering : 기상 정보 
  useEffect( () => {
    if(!apiDone[1]){
      weatherHandler()
    }
  },[apiDone[1]])

  // 날씨 api get 요청 ( useEffect 내 실행)
  const weatherHandler = async () => {
    const result = await getWeather() 
    if( !result.isSuccess ){ //  결과 요청 실패 
      console.log(result.msg) //err handle 
      return 
    }
    const { // 성공 가져온 값
      id, main, icon, temp, temp_min, temp_max, sunrise, sunset
    } = result.data

    // 현재시간, 일출, 일몰로 darkmode 
    const night = new Date(sunset*1000).getHours();
    const morning = new Date(sunrise*1000).getHours();
    const nowHrs = new Date().getHours();
    nowHrs > morning && nowHrs <= night  
      ? darkModeHandler({ darkMode : false })
      : darkModeHandler({ darkMode : true })
      
    setWeather([id,main,icon]);
    setTemp([temp, temp_min, temp_max]);
    setApiDone([ apiDone[0] , true ])
    return 
  }

  // 구글 유저 정보 받아오기 (UseEffect )
  const googleUserHandler = async () => {
    const{  
      isSuccess,data,msg
    } = await getGoogleUserInfo({ accessToken })
    const { email, picture, name } = data;
    if( isSuccess ){
      setUserData({ email, picture, name });
      setApiDone([ true, apiDone[1] ])
    } 
    else console.log(msg) // error handle here
  }
  
  // Should refactor to server since it has Cors error (browser issue)
  // 카카오 유저 정보 받아오기 (UseEffect) 서버처리!
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
      : !apiDone[0] || !apiDone[1]
      ? <div> Loading indicator </div>
      : <div>
        <Header effectOn={effectOn} setEffectOn={setEffectOn} darkMode={darkMode} />
        <div className="mypageContainer">
          <div> 
            <div className="main-center-container">
            <div className="myTitle">WeaDresser </div>
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
            </div>
          </div>
        </div>
      </div >
    );
}

export default Mypage;
