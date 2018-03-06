const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('./db');

const app = express();

const post = require('./Routes/post');
const login = require('./Routes/login');

app.use(express.static(path.resolve(__dirname,'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/login', login);
app.use('/api/posts', post);
const port = process.env.PORT || 3420;

app.listen(port, () => console.log('server started on port '+port));
