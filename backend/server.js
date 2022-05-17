const mongoose = require('mongoose');
const app = require('./app');

const DBConnections = async () => {};
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err.message));

DBConnections();

// MiddleWare Error Message
app.use((err, req, res, next) => {
  res.status(500).json({ Error: err.message });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
