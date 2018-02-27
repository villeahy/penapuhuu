const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://pena:pena123@ds249718.mlab.com:49718/penapuu')
.then(()=> console.log('Connected'))
.catch(err => console.log(err));
