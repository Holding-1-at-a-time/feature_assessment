import create from 'zustand';

const useAssessmentStore = create((set) => ({
    activeHotspot: null,
    assessmentId: null,
    setActiveHotspot: (hotspot) => set({ activeHotspot: hotspot }),
    setAssessmentId: (id) => set({ assessmentId: id }),
}));

export default useAssessmentStore;
import useAssessmentStore from '@/store/assessmentStore';

const VehicleAssessmentContainer = () => {
    const { activeHotspot, setActiveHotspot, assessmentId } = useAssessmentStore();

    const handleHotspotClick = (part) => {
        setActiveHotspot(part);
    }
}
return (
    <div>
    <VehicleHotspotAssessment onHotspotClick= { handleHotspotClick } />
{ activeHotspot && <ConditionDetailForm activeHotspot={ activeHotspot } /> }        < FileUploadsComponent />
        <AdaptiveQuestionnaire vehicleType = "sedan" reportedIssues = { []} />
            { assessmentId && <RealTimeSummary assessmentId={ assessmentId } />}
</div>
    );
}
