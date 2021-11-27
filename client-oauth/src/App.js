import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Mypage from './components/Mypage';
import Header from './components/Header';   
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      isGoogle: false,
      accessToken: '',
    };
    this.getKakaoAccToken = this.getKakaoAccToken.bind(this);
  }

  async getKakaoAccToken(kakaoCode){
    const client_id = "1790cb63ae07847a0629b8b85b1bc2c6";
    const client_secret= "LZl1ctF5A55MsMTwjxUSGioxXtWO5abm";
    const kakaoUrl = `https://kauth.kakao.com/oauth/token?code=${kakaoCode}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=http://localhost:3000&grant_type=authorization_code`;
		const data = await axios.post(
			kakaoUrl,
			{ headers: { accept: `application/x-www-form-urlencoded` } },
			{ property_keys: ["kakao_account.email"] }
		)
    .catch(err =>{
      console.log(err); 
      // we can give some feedback of err to user here
    })
    // console.log(data)
    if(data){
      // console.log(data)
      this.setState({
        isLogin:true, 
        isGoogle:false,
        accessToken : data.data.access_token,
      })
      // console.log(data.data.access_token)
      return 
    }

  }
  componentDidMount() {
    const url = new URL(window.location.href)
    const googleAccToken = url.hash.split("=")[1]
    const kakaoCode = url.searchParams.get("code")
    if (googleAccToken) {

      this.setState({
        isLogin : true, 
        isGoogle : true,
        accessToken : googleAccToken,
      })
    }
    if(kakaoCode){
      this.getKakaoAccToken(kakaoCode)
    }

  }

  render() {
    const { isLogin, accessToken , isGoogle } = this.state;
    return (
      <Router>
        <div className='App'>
          <Header/>
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
