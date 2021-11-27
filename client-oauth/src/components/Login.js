import React, { Component } from 'react';
import { getGoogleAccToken, getKakaoCode } from '../oauth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.googleLoginHandler = this.googleLoginHandler.bind(this)
    this.kakaoLoginHandler = this.kakaoLoginHandler.bind(this)
  }
  // get google token 
  googleLoginHandler() {
    getGoogleAccToken()
  }
  // get kakao code 
  kakaoLoginHandler(){
    getKakaoCode()
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
