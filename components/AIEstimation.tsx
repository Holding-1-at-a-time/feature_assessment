import { useMutation } from 'react-query';
import { calculateEstimate } from '../convex/functions';

const AIEstimation = ({ vehicleDetails, selectedServices, customizations }) => {
  const mutation = useMutation(calculateEstimate);

  const handleEstimate = async () => {
    const result = await mutation.mutateAsync({
      vehicleDetails,
      selectedServices,
      customizations,
    });
    // Handle the result
  };

  return (
    <div>
      <button onClick={handleEstimate}>Calculate Estimate</button>
      {mutation.isLoading && <div>Calculating...</div>}
      {mutation.isSuccess && (
        <div>
          <h3>Estimated Total: ${mutation.data.estimatedTotal}</h3>
          <p>Detailed Analysis: {mutation.data.detailedAnalysis}</p>
        </div>
      )}
    </div>
  );
};

export default AIEstimation;