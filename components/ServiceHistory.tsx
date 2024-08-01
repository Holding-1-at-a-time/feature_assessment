import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ServiceHistoryProps {
  vehicleId: string;
}

const PAGE_SIZE = 10;

export const ServiceHistory: React.FC<ServiceHistoryProps> = ({ vehicleId }) => {
  const [page, setPage] = useState(0);
  const [allServices, setAllServices] = useState<any[]>([]);
  const { ref, inView } = useInView();

  const services = useQuery(api.services.getServiceHistory, { 
    vehicleId, 
    page, 
    pageSize: PAGE_SIZE 
  });

  useEffect(() => {
    if (services && services.length > 0) {
      setAllServices(prev => [...prev, ...services]);
    }
  }, [services]);

  useEffect(() => {
    if (inView && services && services.length === PAGE_SIZE) {
      setPage(prev => prev + 1);
    }
  }, [inView, services]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Service History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {allServices.map((service, index) => (
            <Card key={service.id} className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">
                  {service.name}
                  <Badge className="ml-2" variant={service.status === 'Completed' ? 'default' : 'secondary'}>
                    {service.status}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{formatDate(service.date)}</p>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
                <p className="mt-2 font-semibold">Price: ${service.price.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
          {services === undefined && (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}
          <div ref={ref} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ServiceHistory;