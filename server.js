const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/router');
routes(app);

app.listen(3000, () => {
  console.log(`Server started on port`);
});
