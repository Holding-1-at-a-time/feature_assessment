import { useState } from 'react';
import { useMutation } from 'convex/react';
import { estimateServiceDuration } from '../convex/functions';

const ServiceSelection = ({ services }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const estimateDuration = useMutation(estimateServiceDuration);

  const handleServiceChange = async (serviceId, selected) => {
    const newSelectedServices = selected
      ? [...selectedServices, serviceId]
      : selectedServices.filter(id => id !== serviceId);
    setSelectedServices(newSelectedServices);

    const duration = await estimateDuration({ services: newSelectedServices });
    console.log('Estimated Duration:', duration);
  };

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          <span>{service.name}</span>
          <input
            type="checkbox"
            onChange={(e) => handleServiceChange(service.id, e.target.checked)}
          />
        </div>
      ))}
    </div>
  );
};

export default ServiceSelection;