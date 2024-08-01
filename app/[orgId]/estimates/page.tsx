import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import VehicleDetailsForm from '../components/VehicleDetailsForm';
import ServiceSelection from '../components/ServiceSelection';
import CustomizationOptions from '../components/CustomizationOptions';
import RealTimeSummary from '@/components/assessment/RealTimeSummary';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SaveEstimate from '../components/SaveEstimate';
import AIEstimation from '../components/AIEstimation';
import { getServiceList, getVehicleFactors, getCustomizationOptions } from '../convex/functions';
import { getCustomizationOptions, getServiceList } from '../../../convex/functions';

export const getServerSideProps: GetServerSideProps = async () => {
  const services = await getServiceList();
  const vehicleFactors = await getVehicleFactors();
  const customizationOptions = await getCustomizationOptions();

  return {
    props: {
      services,
      vehicleFactors,
      customizationOptions,
    },
  };
};
export default EstimationPage;
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
  
  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) => prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]);
  };

  const handleCustomizationToggle = (customizationId) => {
    setCustomizations((prev) => prev.includes(customizationId) ? prev.filter(id => id !== customizationId) : [...prev, customizationId]);
  };

  const handleVehicleDetailChange = (e) => {
    setVehicleDetails({ ...vehicleDetails, [e.target.name]: e.target.value });
  };

  const calculateEstimate = async () => {
    // Call calculateEstimate function and handle the result
  };
  const handleSaveEstimate = async () => {
    if (estimate) {
      await saveEstimate({ estimate });
      alert('Estimate saved successfully!');
    }
  };

  return (
    <div>
      <h1>Estimation Page</h1>
      <VehicleDetailsForm vehicleDetails={vehicleDetails} onChange={handleVehicleDetailChange} />
      <ServiceSelection selectedServices={selectedServices} onToggle={handleServiceToggle} />
      <CustomizationOptions selectedCustomizations={customizations} onToggle={handleCustomizationToggle} />
      <AIEstimation
        vehicleDetails={vehicleDetails}
        selectedServices={selectedServices}
        customizations={customizations}
        onEstimate={handleEstimate}
      />
      {estimate && <SaveEstimate estimate={estimate} />}
    </div>
  );
};

export default EstimationPage;