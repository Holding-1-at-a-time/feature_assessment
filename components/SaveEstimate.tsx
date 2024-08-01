import { useMutation } from 'react-query';
import { saveEstimate } from '../convex/functions';

const SaveEstimate = ({ estimate }) => {
  const mutation = useMutation(saveEstimate);

  const handleSave = async () => {
    await mutation.mutateAsync({ estimate });
    // Handle save result
  };

  return (
    <div>
      <button onClick={handleSave}>Save Estimate</button>
      {mutation.isLoading && <div>Saving...</div>}
      {mutation.isSuccess && <div>Estimate saved successfully!</div>}
    </div>
  );
};

export default SaveEstimate;