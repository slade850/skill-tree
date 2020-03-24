require('dotenv').config({path: ('apiConfig.env')});
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.SERVER_PORT;
require('./config/database');

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('wellcome to skill-tree API')
})

app.listen(port, console.log(`server started on port ${port}`));