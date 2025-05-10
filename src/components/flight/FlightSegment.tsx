
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatDuration } from '@/utils/formatUtils';

interface FlightSegmentProps {
  fromCode: string;
  fromTime: string;
  toCode: string;
  toTime: string;
  duration: number;
  flightNumber: string;
}

const FlightSegment: React.FC<FlightSegmentProps> = ({
  fromCode,
  fromTime,
  toCode,
  toTime,
  duration,
  flightNumber
}) => {
  return (
    <div className="flex items-center text-sm">
      <div className="flex-1">
        <p className="font-medium">{fromCode}</p>
        <p className="text-xs text-muted-foreground">{fromTime}</p>
      </div>
      <div className="flex-1 flex flex-col items-center px-2">
        <p className="text-xs text-muted-foreground">{formatDuration(duration)}</p>
        <div className="w-full h-[1px] bg-gray-300 my-1 relative">
          <ArrowRight className="h-3 w-3 absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500" />
        </div>
        <p className="text-xs text-muted-foreground">{flightNumber}</p>
      </div>
      <div className="flex-1 text-right">
        <p className="font-medium">{toCode}</p>
        <p className="text-xs text-muted-foreground">{toTime}</p>
      </div>
    </div>
  );
};

export default FlightSegment;
