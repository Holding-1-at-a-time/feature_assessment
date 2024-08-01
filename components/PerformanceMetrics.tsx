import { useQuery } from 'convex/react';
import { getAppointmentDurations, getCustomerSatisfaction, getStaffProductivity } from '../convex/functions';
import { Bar } from 'react-chartjs-2';

const PerformanceMetrics = () => {
  const appointmentDurations = useQuery(getAppointmentDurations);
  const customerSatisfaction = useQuery(getCustomerSatisfaction);
  const staffProductivity = useQuery(getStaffProductivity);

  const appointmentDurationsData = {
    labels: appointmentDurations.map(item => item.date),
    datasets: [
      {
        label: 'Duration (minutes)',
        data: appointmentDurations.map(item => item.duration),
        backgroundColor: 'purple',
        borderColor: 'purple',
      },
    ],
  };

  const customerSatisfactionData = {
    labels: customerSatisfaction.map(item => item.date),
    datasets: [
      {
        label: 'Satisfaction',
        data: customerSatisfaction.map(item => item.satisfactionScore),
        backgroundColor: 'yellow',
        borderColor: 'yellow',
      },
    ],
  };

  const staffProductivityData = {
    labels: staffProductivity.map(item => item.staffName),
    datasets: [
      {
        label: 'Productivity',
        data: staffProductivity.map(item => item.productivityScore),
        backgroundColor: 'red',
        borderColor: 'red',
      },
    ],
  };

  return (
    <div>
      <h1>Performance Metrics</h1>
      <Bar data={appointmentDurationsData} />
      <Bar data={customerSatisfactionData} />
      <Bar data={staffProductivityData} />
    </div>
  );
};

export default PerformanceMetrics;