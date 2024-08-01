import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { sendConfirmationEmail } from '../utils/sendGrid';

const BookingConfirmation = () => {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const { bookingId } = router.query;
    // Fetch booking details using bookingId
    // setBookingDetails(fetchedDetails);
  }, [router.query]);

  const handleSendEmail = async () => {
    await sendConfirmationEmail(bookingDetails);
  };

  return (
    <div>
      <h1>Booking Confirmation</h1>
      {bookingDetails && (
        <div>
          <p>Service: {bookingDetails.service}</p>
          <p>Date: {bookingDetails.date}</p>
          <button onClick={handleSendEmail}>Send Confirmation Email</button>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;