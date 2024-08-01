import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import VehicleDetailsForm from '../components/VehicleDetailsForm';
import ServiceSelection from '../components/ServiceSelection';
import CustomizationOptions from '../components/CustomizationOptions';
import RealTimeSummary from '../components/RealTimeSummary';

const EstimatePage = () => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customizations, setCustomizations] = useState([]);
  const [estimate, setEstimate] = useState(null);

  const getServiceList = useQuery(api.getServiceList);
  const getCustomizationOptions = useQuery(api.getCustomizationOptions);
  const calculateEstimate = useMutation(api.calculateEstimate);
  const saveEstimate = useMutation(api.saveEstimate);

  useEffect(() => {
    if (vehicleDetails && selectedServices.length > 0) {
      calculateEstimate({
        services: selectedServices,
        vehicleDetails,
      }).then(setEstimate);
    }
  }, [vehicleDetails, selectedServices, calculateEstimate]);

  const handleSaveEstimate = async () => {
    if (estimate) {
      await saveEstimate({ estimate });
      alert('Estimate saved successfully!');
    }
  };

  return (
    <div>
      <VehicleDetailsForm onSubmit={setVehicleDetails} />
      <ServiceSelection services={getServiceList} onChange={setSelectedServices} />
      <CustomizationOptions options={getCustomizationOptions} onChange={setCustomizations} />
      {estimate && <RealTimeSummary estimate={estimate} />}
      <button onClick={handleSaveEstimate}>Save Estimate</button>
    </div>
  );
};

export default EstimatePage;