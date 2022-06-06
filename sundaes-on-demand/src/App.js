import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');
  let Component = OrderEntry;

  if (orderPhase === 'review') Component = OrderSummary;
  if (orderPhase === 'complete') Component = OrderConfirmation;


  return (
    <Container>
      <OrderDetailsProvider>
        {/* Order details and summary page needs provider */}
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
