import { useQuery, useMutation } from 'convex/react';
import { getServices, updateService } from '../convex/functions';

const ServiceManagement = () => {
  const services = useQuery(getServices);
  const updateServiceMutation = useMutation(updateService);

  const handleUpdateService = async (serviceId, newDetails) => {
    await updateServiceMutation({ serviceId, ...newDetails });
  };

  return (
    <div>
      <h1>Service Management</h1>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.name} - ${service.price}
            <button onClick={() => handleUpdateService(service.id, { price: service.price + 10 })}>Increase Price</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceManagement;