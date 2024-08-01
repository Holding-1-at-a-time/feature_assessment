import dynamic from 'next/dynamic';
import { useQuery } from 'convex/react';
import { getAppointments } from '../convex/functions';

const Calendar = dynamic(() => import('shadcn-ui').then(mod => mod.Calendar), { ssr: false });

const AppointmentOverview = () => {
  const appointments = useQuery(getAppointments);

  return (
    <Calendar
      events={appointments}
      onEventClick={(event) => console.log('Event clicked:', event)}
    />
  );
};

export default AppointmentOverview;