import { useQuery } from 'convex/react';
import { getServicesReceived, getSpendingHistory, getVehicleConditionTrends } from '../convex/functions';
import { Line } from 'react-chartjs-2';

const ClientReports = () => {
  const servicesReceived = useQuery(getServicesReceived);
  const spendingHistory = useQuery(getSpendingHistory);
  const vehicleConditionTrends = useQuery(getVehicleConditionTrends);

  const servicesReceivedData = {
    labels: servicesReceived.map(item => item.date),
    datasets: [
      {
        label: 'Services Received',
        data: servicesReceived.map(item => item.count),
        backgroundColor: 'cyan',
        borderColor: 'cyan',
      },
    ],
  };

  const spendingHistoryData = {
    labels: spendingHistory.map(item => item.date),
    datasets: [
      {
        label: 'Spending',
        data: spendingHistory.map(item => item.amount),
        backgroundColor: 'magenta',
        borderColor: 'magenta',
      },
    ],
  };

  const vehicleConditionTrendsData = {
    labels: vehicleConditionTrends.map(item => item.date),
    datasets: [
      {
        label: 'Condition',
        data: vehicleConditionTrends.map(item => item.conditionScore),
        backgroundColor: 'lime',
        borderColor: 'lime',
      },
    ],
  };

  return (
    <div>
      <h1>Client Reports</h1>
      <Line data={servicesReceivedData} />
      <Line data={spendingHistoryData} />
      <Line data={vehicleConditionTrendsData} />
    </div>
  );
};

export default ClientReports;