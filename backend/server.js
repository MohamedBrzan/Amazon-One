const mongoose = require('mongoose');
const app = require('./app');

const DBConnections = async () => {};
mongoose
  .connect('mongodb://localhost:27017/e-commerce')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err.message));

DBConnections();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
