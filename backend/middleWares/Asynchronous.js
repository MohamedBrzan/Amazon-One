const Asynchronous = (controller) => {
  return (req, res, next) => {
    controller(req, res, next)
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  };
};

module.exports = Asynchronous;
