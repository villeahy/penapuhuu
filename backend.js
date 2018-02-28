const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db');

const app = express();

const user = require('./Routes/user');

app.use(express.static(path.resolve(__dirname,'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/api/users', user);
const port = process.env.PORT || 3420;

app.listen(port, () => console.log('server started on port '+port));
