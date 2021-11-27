
module.exports = {
  getGoogleAccesToken : () => {
    const client_id="218465323122-rtk87nvtaj2j5qmdg72qvas9sj81jee0.apps.googleusercontent.com";
    const redirect_uri = "http://localhost:3000"
    const google= `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/userinfo.profile`
    window.location.assign(google)
  },
  
  getGoogleUserInfo : () => {

  }
}