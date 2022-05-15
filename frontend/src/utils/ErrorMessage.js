import Alert from 'react-bootstrap/Alert';

const ErrorMessage = ({ variant, children }) => {
  return <Alert variant={variant || 'info'}>{children}</Alert>;
};

export default ErrorMessage;
