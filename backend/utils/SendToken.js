const SendToken = (res, statusCode, user) => {
  const token = user.generateToken();

  const options = {
    expires: new Date(Date.now() + 5 * 60 * 60 * 24 * 30),

    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, user, token });
};

module.exports = SendToken;
