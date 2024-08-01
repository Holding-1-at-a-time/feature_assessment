import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const logUserEngagement = useMutation(api.logUserEngagement);
const logEstimateConversion = useMutation(api.logEstimateConversion);

useEffect(() => {
  logUserEngagement({
    userId: currentUser.id,
    action: 'view_estimate_page',
    timestamp: Date.now(),
  });
}, []);

const handleSaveEstimate = async () => {
  try {
    if (estimate) {
      await saveEstimate({ estimate });
      toast.success('Estimate saved successfully!');
      logEstimateConversion({
        estimateId: estimate.id,
        userId: currentUser.id,
        timestamp: Date.now(),
      });
    }
  } catch (error) {
    toast.error('Failed to save estimate.');
  }
};