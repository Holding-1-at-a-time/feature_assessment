import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { sendConfirmationEmail } from '../utils/sendGrid';

const ConfirmationPage = () => {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const { paymentIntentId } = router.query;
    // Fetch payment details using paymentIntentId
    // setPaymentDetails(fetchedDetails);
  }, [router.query]);

  const handleSendEmail = async () => {
    await sendConfirmationEmail(paymentDetails);
  };

  return (
    <div>
      <h1>Booking Confirmation</h1>
      {paymentDetails && (
        <div>
          <p>Amount: ${paymentDetails.amount}</p>
          <p>Status: {paymentDetails.status}</p>
          <button onClick={handleSendEmail}>Send Confirmation Email</button>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;