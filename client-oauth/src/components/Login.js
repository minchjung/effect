import React, { Component } from 'react';
const { getGoogleAccesToken } = require('../oauth')

class Login extends Component {
  constructor(props) {
    super(props)
    this.googleLoginHandler = this.googleLoginHandler.bind(this)
    this.kakaoLoginHandler = this.kakaoLoginHandler.bind(this)
  }

  googleLoginHandler() {
    getGoogleAccesToken()
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
