import { NextApiRequest, NextApiResponse } from 'next';
import { createBooking, updateBookingStatus } from '../../../convex/functions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const bookingDetails = req.body;
    const bookingId = await createBooking(bookingDetails);
    res.status(200).json({ bookingId });
  } else if (req.method === 'PUT') {
    const { bookingId, status } = req.body;
    await updateBookingStatus({ bookingId, status });
    res.status(200).json({ message: 'Booking status updated' });
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}