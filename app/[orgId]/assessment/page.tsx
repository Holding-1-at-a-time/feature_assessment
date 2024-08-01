import { useState } from 'react';
import { useOrganization } from '@/hooks/useOrganization';
import VehicleHotspotAssessment from '@/components/assessments/VehicleHotspotAssessmentComponent';
import ConditionDetailForm from '@/components/assessments/ConditionDetailForm';
import FileUploadsComponent from '@/components/assessments/FileUploadsComponent';
import AdaptiveQuestionnaire from '@/components/assessments/AdaptiveQuestionnaire';
import RealTimeSummary from '@/components/assessments/RealTimeSummary';

export default function VehicleAssessmentContainer() {
  const { organization } = useOrganization();
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);

  const handleHotspotClick = (part) => {
    setActiveHotspot(part);
  };

  return (
    <div>
      <VehicleHotspotAssessment onHotspotClick={handleHotspotClick} />
      {activeHotspot && <ConditionDetailForm activeHotspot={activeHotspot} />}
      <FileUploadsComponent />
      <AdaptiveQuestionnaire vehicleType="sedan" reportedIssues={[]} />
      {assessmentId && <RealTimeSummary assessmentId={assessmentId} />}
    </div>
  );
}