import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const AdminDashboard = () => {
  const deposits = useQuery(api.getDeposits);
  const processRefund = useMutation(api.processRefund);
  const updateStatus = useMutation(api.updateBookingStatus);

  const handleRefund = async (depositId) => {
    await processRefund({ depositId });
  };

  const handleStatusUpdate = async (depositId, status) => {
    await updateStatus({ depositId, status });
  };

return (
  <div>
    <h1>Admin Dashboard</h1>
    <div>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Client</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.client}</td>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
              <td>{booking.status}</td>
              <td>
                <button onClick={() => handleStatusUpdate(booking.id, 'confirmed')}>Confirm</button>
                <button onClick={() => handleStatusUpdate(booking.id, 'cancelled')}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Deposit ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map(deposit => (
            <tr key={deposit.id}>
              <td>{deposit.id}</td>
              <td>${deposit.amount}</td>
              <td>{deposit.status}</td>
              <td>
                <button onClick={() => handleRefund(deposit.id)}>Refund</button>
                <button onClick={() => handleStatusUpdate(deposit.id, 'completed')}>Mark as Completed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
export default AdminDashboard;
