import Axios from 'axios';
import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.googleLoginHandler = this.googleLoginHandler.bind(this)
    this.kakaoLoginHandler = this.kakaoLoginHandler.bind(this)
  }

  googleLoginHandler() {
    const client_id="218465323122-rtk87nvtaj2j5qmdg72qvas9sj81jee0.apps.googleusercontent.com";
    const redirect_uri = "http://localhost:3000"
    // const redirect_uri = "http://localhost:3000"
    const google= `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/userinfo.profile`
    // https://accounts.google.com/o/oauth2/v2/auth/identifier?client_id=218465323122-rtk87nvtaj2j5qmdg72qvas9sj81jee0.apps.googleusercontent.com&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&flowName=GeneralOAuthFlow
    window.location.assign(google)
  }
  kakaoLoginHandler(){
    const client_id = "1790cb63ae07847a0629b8b85b1bc2c6";
    const kakao = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000&response_type=code`;
    window.location.assign(kakao)
  }


  render() {
    return (
      <div className='loginContainer'>
        OAuth 2.0으로 소셜 로그인을 구현해보세요.
        <img id="logo" alt="logo" src="https://image.flaticon.com/icons/png/512/25/25231.png" />
        <button onClick={this.googleLoginHandler} className='socialloginBtn'>
          Google 로그인
        </button>
          <button onClick={this.kakaoLoginHandler} className='socialloginBtn'>
          Kakao 로그인
        </button>
      </div>
    );
  }
}

export default Login;
