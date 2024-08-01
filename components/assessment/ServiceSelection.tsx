const ServiceSelection = ({ services, onChange }) => {
  const handleServiceChange = (serviceId, quantity) => {
    onChange((prev) => {
      const existingService = prev.find((s) => s.id === serviceId);
      if (existingService) {
        return prev.map((s) => (s.id === serviceId ? { ...s, quantity } : s));
      }
      return [...prev, { id: serviceId, quantity }];
    });
  };

  if (!services) return <div>Loading services...</div>;

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>
          <span>{service.name}</span>
          <input
            type="number"
            min="0"
            onChange={(e) => handleServiceChange(service.id, parseInt(e.target.value, 10))}
          />
        </div>
      ))}
    </div>
  );
};

export default ServiceSelection;