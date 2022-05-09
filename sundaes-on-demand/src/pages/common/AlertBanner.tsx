import Alert from "react-bootstrap/Alert";

export default function AlertBanner({ variant, message }) {
  const alertVariant = variant || 'danger';
  const alertMessage = message || 'An error occurred';

  return (
    <Alert key={alertVariant} variant={alertVariant}>
      {alertMessage}
    </Alert>
  )
}