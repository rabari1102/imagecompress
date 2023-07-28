const express = require('express');
const app = express();
global.__basedir = __dirname;

const compressImageRouter = require('./routes/routes');
const imagecontroller = require('./controller/imagecontroller')

app.use(compressImageRouter);
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
