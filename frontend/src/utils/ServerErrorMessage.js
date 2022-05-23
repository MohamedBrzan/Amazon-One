const ServerErrorMessage = (error) => {
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  } else if (error.response && error.response.data) {
    return error.response.data.Error;
  } else {
    return 'Something went wrong, please try again later' + error.message;
  }
};

export default ServerErrorMessage;
