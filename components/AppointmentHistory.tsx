import { useQuery } from 'convex/react';
import { Button, List, ListItem } from 'shadcn-ui';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AppointmentHistory = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const appointments = useQuery('getAppointments', { page, pageSize });

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h1>Appointment History</h1>
      <List>
        {appointments.map(appointment => (
          <ListItem key={appointment.id}>
            <div>{appointment.date}</div>
            <div>{appointment.details}</div>
          </ListItem>
        ))}
      </List>
      <div>
        <Button onClick={handlePreviousPage} disabled={page === 1}>Previous</Button>
        <Button onClick={handleNextPage} disabled={appointments.length < pageSize}>Next</Button>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AppointmentHistory), { ssr: false });