import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Mypage from './components/Mypage';
import { getKakaoAccToken }  from './api/social';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      isGoogle: false,
      accessToken: '',
      darkMode:"",
    };
    this.googleTokenHandler = this.googleTokenHandler.bind(this);
    this.kakaoTokenHandler = this.kakaoTokenHandler.bind(this);
    this.darkModeHandler= this.darkModeHandler.bind(this);
  }

  componentDidMount() { // useEffect 와 유사 function! 
    // google token on redirect para
    // kakao code on redirect para
    const url = new URL(window.location.href)
    const googleAccToken = url.hash.split("=")[1]
    const kakaoCode = url.searchParams.get("code")

    if(googleAccToken) { // google 로긴 유저 
      this.googleTokenHandler(googleAccToken);
    }
    if(kakaoCode){ // kakao 로긴 유저 
      this.kakaoTokenHandler(kakaoCode);
    }
  }

  // google user ahuthentic to login : 토큰 존재 
  googleTokenHandler (googleAccToken){
      this.setState({
      isLogin : true, 
      isGoogle : true,
      accessToken : googleAccToken,// set this token 
    })
  }

  async kakaoTokenHandler(kakaoCode){
    // kakao must exchange code to token 
    const { 
      isSuccess, 
      accessToken, 
      msg 
    } = await getKakaoAccToken(kakaoCode) // <- get kakao token function  
    
    if(isSuccess){ 
      this.setState({
        isLogin : true, 
        isGoogle : false,
        accessToken, 
        // set this token !! 
      })
    }
    else{
      console.log(msg); 
      // error hanlde here
    }
  }

  darkModeHandler({ darkMode }){
    this.setState({ darkMode })
  }

  render() {
    const { isLogin, accessToken , isGoogle, darkMode } = this.state;
    return (
      <Router>
        <div className={ !darkMode ? `App` : `App-darkMode`}>
          {isLogin ? (
            <Mypage 
              darkMode={darkMode} 
              darkModeHandler={this.darkModeHandler} accessToken={accessToken} isGoogle={isGoogle}/>
          ) : (
              <Login />
            )}
        </div>
      </Router>
    );
  }
}

export default App;
