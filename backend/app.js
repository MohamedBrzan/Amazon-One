const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProductRoutes = require('./routes/ProductRoutes');
dotenv.config({ path: 'config/.env' });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', ProductRoutes);

module.exports = app;
