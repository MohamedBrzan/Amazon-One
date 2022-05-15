const SendToken = (res, statusCode, user) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: true,
    // path: '/',
    // domain: process.env.NODE_ENV === 'production' ? '.shop.com' : 'localhost',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, user, token });
};

module.exports = SendToken;
