import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Image from 'next/image';

const VehicleHotspotAssessment = ({ onHotspotClick }) => {
    const vehicleParts = useQuery(api.vehicles.list);

    if (!vehicleParts) {
        return <div>Loading vehicle parts...</div>;
    }

    return (
        <div className="relative w-full max-w-[800px] mx-auto">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <Image
                    src="/vehicle-outline.svg"
                    alt="Vehicle Diagram"
                    className="w-full h-full object-contain"
                    layout="responsive"
                    objectFit="contain"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="bg-red-500 p-1 rounded-full"></span>
            </div>
        </div>
        );
    };

export default VehicleHotspotAssessment;