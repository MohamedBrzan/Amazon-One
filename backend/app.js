const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProductRoutes = require('./routes/ProductRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
const PaymentRoutes = require('./routes/PaymentRoutes');
const UserRoutes = require('./routes/UserRoutes');

dotenv.config({ path: 'config/.env' });

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: '50000mb', extended: true }));
app.use(
  bodyParser.json({
    limit: '50000mb',
  })
);
app.use(cookieParser());

app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/product', ProductRoutes);
app.use('/api/v1/order', OrderRoutes);
app.use('/api/v1/payment', PaymentRoutes);

module.exports = app;
