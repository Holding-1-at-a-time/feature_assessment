import { useQuery } from 'convex/react';
import { getAnalyticsData } from '../convex/functions';
import { Line } from 'react-chartjs-2';

const Analytics = () => {
  const analyticsData = useQuery(getAnalyticsData);

  const data = {
    labels: analyticsData.map(item => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: analyticsData.map(item => item.revenue),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  return (
    <div>
      <h1>Analytics</h1>
      <Line data={data} />
    </div>
  );
};

export default Analytics;