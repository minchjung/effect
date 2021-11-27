import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Mypage from './components/Mypage';
import { getKakaoAccToken }  from './oauth';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      isGoogle: false,
      accessToken: '',
    };
    this.googleTokenHandler = this.googleTokenHandler.bind(this);
    this.kakaoTokenHandler = this.kakaoTokenHandler.bind(this);
  }

  componentDidMount() {
    const url = new URL(window.location.href)
    const googleAccToken = url.hash.split("=")[1]
    const kakaoCode = url.searchParams.get("code")

    if(googleAccToken) {
      this.googleTokenHandler(googleAccToken);
    }
    if(kakaoCode){
      this.kakaoTokenHandler(kakaoCode);
    }
  }

  googleTokenHandler (googleAccToken){
    this.setState({
      isLogin : true, 
      isGoogle : true,
      accessToken : googleAccToken,
    })
  }

  async kakaoTokenHandler(kakaoCode){
    const { isSuccess, accessToken, msg } = await getKakaoAccToken(kakaoCode)
    if(isSuccess){
      this.setState({
        accessToken,
        isLogin : true, 
        isGoogle : false
      })
    }
    else{
      console.log(msg); // error hanlde here
    }
  }

  render() {
    const { isLogin, accessToken , isGoogle } = this.state;
    return (
      <Router>
        <div className='App'>
          {isLogin ? (
            <Mypage accessToken={accessToken} isGoogle={isGoogle}/>
          ) : (
              <Login />
            )}
        </div>
      </Router>
    );
  }
}

export default App;
