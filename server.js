const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const logger = require('morgan');


const createCoords = () => {
  return new Promise((resolve, reject) => {
    const xArr = [];
    const yArr = [];
    const pointArr = [];

    for(let i=0;i<10;i++){
      xArr.push(Math.floor(Math.random()*800) / 10)
      yArr.push(Math.floor(Math.random()*100) / 10)

    }
    xArr.sort((a,b) => a-b)
    yArr.sort((a,b) => a-b)

    for(let i=0;i<10;i++){
      pointArr.push({
        x: xArr[i],
        y: yArr[i]
      })
    }
    resolve(pointArr);
  })
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get('/api/coords', (req, res) => {
  createCoords()
    .then(data => res.send(data))
    .catch(error => console.error(error));
});


const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;