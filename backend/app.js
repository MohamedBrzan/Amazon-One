const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProductRoutes = require('./routes/ProductRoutes');
const UserRoutes = require('./routes/UserRoutes');

dotenv.config({ path: 'config/.env' });

app.use(cors());
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1/product', ProductRoutes);
app.use('/api/v1/user', UserRoutes);

module.exports = app;
