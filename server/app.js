const express = require('express')
const app = express()

var path = require("path");
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const apiRoute = require('./routes/apiRoute.js');
const usersRoute = require('./routes/usersRoute.js');

app.use('/api', apiRoute);
app.use('/api/user', usersRoute);
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "..", "dist", "browser")));
app.use(
  "/*",
  express.static(path.join(__dirname, "..", "dist", "browser", "index.html"))
);

//app.listen(port, () => console.log(`Listening on port ${port}`))  //LOCAL CONFIGUE
app.listen()  //SERVER CONFIGUE

