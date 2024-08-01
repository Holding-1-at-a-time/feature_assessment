import { useQuery } from 'convex/react';
import { Calendar } from 'shadcn-ui';
import { getAvailableSlots } from '../convex/functions';

const AvailabilityCalendar = () => {
  const availableSlots = useQuery(getAvailableSlots);

  return (
    <Calendar
      availableSlots={availableSlots}
      onDateRangeSelect={(range) => console.log('Selected range:', range)}
    />
  );
};

export default AvailabilityCalendar;