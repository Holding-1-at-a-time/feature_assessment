import { useQuery } from 'convex/react';
import { getClients } from '../convex/functions';

const ClientManagement = () => {
  const clients = useQuery(getClients, { page: 1, pageSize: 10 });

  return (
    <div>
      <h1>Client Management</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientManagement;