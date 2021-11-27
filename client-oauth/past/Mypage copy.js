import React, { Component } from "react";
import axios from 'axios';

class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // images: [],
      background : "mypageContainer"
    }
    this.getGoogleUserInfo = this.getGoogleUserInfo.bind(this)
    this.getKakaoUserInfo = this.getKakaoUserInfo.bind(this)
    this.getWeather = this.getWeather.bind(this)
  }
  
  async getWeather(){
    const API_key = "21674499d78d5cc9f73dd339f934e97d";
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?id=1835848&appid=21674499d78d5cc9f73dd339f934e97d` 
    // api.openweathermap.org/data/2.5/weather?id=1835848&appid=21674499d78d5cc9f73dd339f934e97d
    const weatherInfo = await axios.get(
      endpoint, 
    ).catch(err=> {
      // return console.log(err.message);
      return 
    })
    if(weatherInfo){
      console.log(weatherInfo.data)
      const{
        sunrise, sunset
      } = weatherInfo.data.sys

      const sunfall = new Date(sunset*1000)
      // console.log(now.getMilliseconds())
      // console.log(now.getHours())
      console.log(sunfall)
      
      sunfall.getHours() > new Date().getHours()
        ? this.setState({background : "mypageContainer"})
        : this.setState({background : "mypageContainer darkMode"})
      // now.getHours() -
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
  async getGoogleUserInfo() {
    const { accessToken } = this.props

    const googleData = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, { 
      headers: { 
        authorization: `token ${accessToken}`, 
        accept: 'application/json' 
    }})
    .catch(err => {
      console.log(err);
      return // we can give some feedback here 
    })
    // console.log(googleData)
    // console.log(googleData.data)
    const { email, picture, name } = googleData.data
    this.setState({
      email, picture, name
    })
    return 
  }

  async getKakaoUserInfo(){
    const { accessToken } = this.props;
    // console.log(accessToken)
		const kakaodata = await axios.get(`http://localhost:8080/callback?accessToken=${accessToken}`, 
		)
    .catch(err => {
      console.log(err);
      return // we can give some feedback here 
    })
    // console.log(kakaodata)
    const { nickname, profile_image, thumbnail_image } = kakaodata.data
    this.setState({
      nickname, profile_image, thumbnail_image
    })
  }

  componentDidMount() {
    const { isGoogle } = this.props;
    return isGoogle 
      ? this.getGoogleUserInfo() 
      : this.getKakaoUserInfo()
  }

  render() {
    const { accessToken } = this.props

    if (!accessToken) {
      return <div>로그인이 필요합니다</div>
    }
    const { isGoogle } = this.props.isGoogle
    const { email, picture, name } = this.state;
    const { nickname, profile_image, thumbnail_image } = this.state
    const { icon } = this.state
    const { temp_max, temp_min, temp } = this.state 

    const social = this.props.isGoogle ? "Google" : "Kakao"
    return (
      <div>
        <div className="mypageContainer">
        {/* <div className={this.state.background}> */}
          <h3>Mypage</h3>
          <hr />
          <div> 
            <div className="imgWrapper"> 
              {/* <div className="imgBox1"></div>
              <div className="imgBox2"></div>
              <div className="imgBox3"></div>
              <div className="imgBox4"></div> */}
              <div className="title">WeaDresser</div>
              <button className="goOn">Go on</button>
            </div>
            {!icon 
              ? <button onClick={this.getWeather}>날씨 받자</button>   
              : (
                <div>
                  <div>
                    <span> 현재 : {parseInt(temp -273)}</span>
                    <span> 최고 : {parseInt(temp_max -273)}</span>
                    <span> 최저 : {parseInt(temp_min -273)}</span>
                  </div>
                  <div>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
                  </div>
                </div>
              )
            }
          </div>

          <div>안녕하세요. <span className="name" id="name">{name}</span>님! {social} 로그인이 완료되었습니다.</div>
          <div>
            <div className="item">
              나의 로그인 아이디:
              <span id="login">  {isGoogle ? email : nickname} </span>
            </div>
            <div className="item">
              나의 {social} email:
              <span id="html_url">  { isGoogle? email : "kakao@email.com" } </span>
            </div>
            {/* <div className="item">
              나의 profile picture:
              <span id="public_repos">{picture}</span>
            </div> */}
          </div>

          <div id="images">
            <p>내 프로필 이미지</p>
              <img src={ isGoogle? picture : profile_image } />
              {
                isGoogle ? null : <img src={ thumbnail_image }/>
              }
            
          </div>
        </div>
      </div >
    );
  }

}

export default Mypage;
