import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOrganization } from '@/hooks/useOrganization';
import { VehicleHotspotAssessment } from '@/components/assessments/VehicleHotspotAssessmentComponent';

export default function VehicleAssessmentContainer() {
  const { organization } = useOrganization();
  const [activeHotspot, setActiveHotspot] = useState(null);

  const handleHotspotClick = (part) => {
    setActiveHotspot(part);
  };

  return (
    <div>
      <VehicleHotspotAssessment onHotspotClick={handleHotspotClick} />
    </div>
  );
}