const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('./db');

const app = express();

const post = require('./Routes/post');
const user = require('./Routes/user');
const message = require('./Routes/privateforum');

app.use(express.static(path.resolve(__dirname,'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/user', user);
app.use('/api/posts', post);
app.use('/api/privateforum', message);
const port = process.env.PORT || 3420;

app.listen(port, () => console.log('server started on port '+port));
