const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const logger = require('morgan');


const createCoords = () => {
  return new Promise((resolve, reject) => {
    const arr = [];

    for(let i=0;i<10;i++){
      arr.push({
        x: Math.floor(Math.random()*10),
        y: Math.floor(Math.random()*90)
      })
    }
    resolve(arr);
  })
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if(process.env.NODE_ENV === 'production') {
  app.use(express.state(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get('/api/coords', (req, res) => {
  createCoords()
    .then(data => res.send(data))
    .catch(error => console.error(error));
});


app.listen(port, () => console.log(`Listening on port ${port}`));