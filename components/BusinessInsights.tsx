import { useQuery } from 'convex/react';
import { getServicePopularity, getRevenueData, getCustomerRetention } from '../convex/functions';
import { Line, Bar } from 'react-chartjs-2';

const BusinessInsights = () => {
  const servicePopularity = useQuery(getServicePopularity);
  const revenueData = useQuery(getRevenueData);
  const customerRetention = useQuery(getCustomerRetention);

  const servicePopularityData = {
    labels: servicePopularity.map(item => item.serviceName),
    datasets: [
      {
        label: 'Popularity',
        data: servicePopularity.map(item => item.count),
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],
  };

  const revenueChartData = {
    labels: revenueData.map(item => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.map(item => item.revenue),
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  const customerRetentionData = {
    labels: customerRetention.map(item => item.date),
    datasets: [
      {
        label: 'Retention',
        data: customerRetention.map(item => item.retentionRate),
        backgroundColor: 'orange',
        borderColor: 'orange',
      },
    ],
  };

  return (
    <div>
      <h1>Business Insights</h1>
      <Line data={servicePopularityData} />
      <Line data={revenueChartData} />
      <Bar data={customerRetentionData} />
    </div>
  );
};

export default BusinessInsights;