const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db');

const app = express();

app.use(express.static(path.resolve(__dirname,'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extemded: false}));

app.use(cors());

const port = process.env.PORT||3420;

app.listen(port, () => console.log('server started on port '+port));
