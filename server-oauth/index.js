const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const handleCallback = require('./controller/callback')
const handleImages = require('./controller/images')

app.use(express.json());

app.use(
  cors({ origin: true })
);

// client에서 post요청으로 보낸 Authorization code가 들어옵니다.

app.get('/callback', handleCallback);

// Access token에 있는 resource server를 확인하는 endpoint 입니다.
app.get('/images', handleImages)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;