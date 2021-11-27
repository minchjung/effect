import React, { Component } from "react";
import Info from "./Info"
import axios from 'axios';
import Header from './Header'
import { getGoogleUserInfo } from '../oauth'

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      effectOn:false,
      background : "mypageContainer"
    }
    this.googleUserHandler = this.googleUserHandler.bind(this)
    this.getKakaoUserInfo = this.getKakaoUserInfo.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.startTimer= this.startTimer(this)
    this.createEffect = this.createEffect.bind(this)
  }

  startTimer(){
    this.setState({ effectOn : true });
    
  }

  createEffect(){
    if(this.state.effectOn){
      setInterval(this.createEffect, 100)
      const effect = document.createElement('i');
      let container = document.querySelector('.headerContainer')
      effect.classList.add('fas');
      effect.classList.add('fa-snowflake');
      effect.style.left = Math.random() * window.innerWidth + 'px';
      effect.style.animationDirection = Math.random()*3+2+'s';
      effect.style.fontSize=Math.random()+"rem";
      effect.style.opacity=Math.random();
      container.prepend(effect)
      setTimeout(()=>{
        effect.remove();
      }, 5000)
    }
  }

  async getWeather(){
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
        ? this.setState({background : "mypageContainer"})
        : this.setState({background : "mypageContainer darkMode"})

      this.setState(
        weatherInfo.data.weather[0], 
      )
      this.setState(
        weatherInfo.data.main
      )
      this.setState({
        sunrise, sunset
      })
    }
  }

  async googleUserHandler() {
    const { accessToken } = this.props
    const{  
      isSuccess,
      data,
      msg
    } = await getGoogleUserInfo({ accessToken })
    const { email, picture, name } = data;
    
    if(isSuccess){
      this.setState({
        email, picture, name
      })
    }
    else{
      console.log(msg)
      // error handle here
    }

  }
  
  // Should refactor to server since it has Cors error (browser issue)
  async getKakaoUserInfo(){
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

  componentDidMount() {
    const { isGoogle } = this.props;
    return isGoogle 
      ? this.googleUserHandler() 
      : this.getKakaoUserInfo()
  }

  render() {
    const { accessToken } = this.props
    if (!accessToken) {
      return <div>로그인이 필요합니다</div>
    }
    const { isGoogle } = this.props.isGoogle
    const social = isGoogle ? "Google" : "Kakao"
    const { email, picture, name } = this.state;
    const { nickname, profile_image, thumbnail_image } = this.state
    const { id ,main, icon, temp_max, temp_min, temp } = this.state 

    return (
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
                temp={temp} temp_max={temp_max} temp_min={temp_min} 
                icon={icon} codeId ={id} main={main}
              />
              <div className="mypage-btn-container">
                <div className="mypage-btn-container">
                  <button className="getWeatherBtn" onClick={this.getWeather}>날씨 받자</button>
                  <button className="getAnimationBtn" onClick={this.startTimer}>효과 받자</button>
                </div>
              </div>
              {/* <button className="goOn">Go on</button> */}
            </div>
          </div>
        </div>
      </div >
    );
  }

}

export default Mypage;
