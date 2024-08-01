import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const RealTimeSummary = ({ assessmentId }) => {
  const assessmentSummary = useQuery(api.assessments.getAssessmentSummary, { assessmentId });

  if (!assessmentSummary) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Vehicle Details</h3>
      <p>Make: {assessmentSummary.vehicleDetails.make}</p>
      <p>Model: {assessmentSummary.vehicleDetails.model}</p>
      <p>Year: {assessmentSummary.vehicleDetails.year}</p>
      <h3>Selected Services</h3>
      <ul>
        {assessmentSummary.selectedServices.map(service => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
      <h3>Customizations</h3>
      <ul>
        {assessmentSummary.customizations.map(customization => (
          <li key={customization.id}>{customization.name}: ${customization.price}</li>
        ))}
      </ul>
      <h3>Total Price</h3>
      <p>${assessmentSummary.totalPrice}</p>
    </div>
  );
};

export default RealTimeSummary;
