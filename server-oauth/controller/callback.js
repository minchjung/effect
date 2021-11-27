require('dotenv').config();

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');

module.exports = async (req, res) => {
  console.log(req.query)

  // const { accessToken } = req.query
  // const userInfo = await axios({
  //   method: "get",
  //   url: `https://kapi.kakao.com/v2/user/me?access_token=${accessToken}`,
  //   headers: {
  //     "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //   },
  // })
  // console.log(userInfo.data.properties)
  // return res.send(userInfo.data.properties)
  return res.send("asdfasdfasdfasdf_asdfasdf")
}
