import axios from 'axios';

const getGoogleAccToken = () => {
  const client_id="218465323122-rtk87nvtaj2j5qmdg72qvas9sj81jee0.apps.googleusercontent.com";
  const redirect_uri = "http://localhost:3000"
  const google= `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/userinfo.profile`
  window.location.assign(google)
};
  
const getGoogleUserInfo = async ({accessToken}) => {
  const googleData = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, { 
    headers: { 
      authorization: `token ${accessToken}`, 
      accept: 'application/json' 
  }})
  .catch(err => {
    console.log(err);
    return { isSuccess : false, accessToken : null , msg : "Server error"} 
  })
  return googleData 
    ? { isSuccess : true, data : googleData.data, msg : "Success" }
    : { isSuccess : false, data : null, msg : "Bad Requset" }

};
  
const getKakaoCode = () => {
  const client_id = "1790cb63ae07847a0629b8b85b1bc2c6";
  const kakao = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000&response_type=code`;
  window.location.assign(kakao)
};

const getKakaoAccToken = async (kakaoCode) => {
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
    return { isSuccess : false, accessToken : null , msg : "Server error"} 
  })
  
  return data 
    ? { isSuccess : true ,  accessToken : data.data.access_token, msg : "Success" }
    : { isSuccess : false, accessToken : null, msg : "Bad Request" }
}

export {
  getGoogleAccToken, getGoogleUserInfo, 
  getKakaoCode, getKakaoAccToken, 
}