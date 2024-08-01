import Layout from '../components/Layout';
import AppointmentOverview from '../components/AppointmentOverview';
import ClientManagement from '../components/ClientManagement';
import ServiceManagement from '../components/ServiceManagement';
import TeamManagement from '../components/TeamManagement';
import Analytics from '../components/Analytics';
import InventoryTracking from '../components/InventoryTracking';
import Onboarding from '../components/Onboarding';

const Dashboard = () => {
  return (
    <Layout>
      <Onboarding />
      <AppointmentOverview />
      <ClientManagement />
      <ServiceManagement />
      <TeamManagement />
      <Analytics />
      <InventoryTracking />
    </Layout>
  );
};

export default Dashboard;