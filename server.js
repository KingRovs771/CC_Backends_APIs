const bodyParser = require('body-parser');
const express = require('express');

const morgan = require('morgan');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const routes = require('./routes/router');
routes(app);

app.use('/auth', require('./middleware/index'));

app.listen(3000, () => {
  console.log(`Server started on port`);
});
