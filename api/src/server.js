require('dotenv').config({path: ('apiConfig.env')});
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./modules/user/routes');
const skillModuleRoutes = require('./modules/skill_module/routes');
const port = process.env.SERVER_PORT;
require('./config/database');

app.use(cors({
    origin: true,
    credentials: true,
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));

app.get('/api/', (req, res) => {
    res.send('wellcome to skill-tree API')
})

app.use('/api/user', userRoutes);
app.use('/api/module', skillModuleRoutes);

app.listen(port, console.log(`server started on port ${port}`));