
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Cpu, Route as RouteIcon } from 'lucide-react';

interface APIRouteDetailsProps {
  algorithm: string;
  path: string[];
}

const APIRouteDetails: React.FC<APIRouteDetailsProps> = ({ 
  algorithm = 'auto', 
  path = [] 
}) => {
  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <div className="flex items-center">
          <Server className="h-5 w-5 mr-2 text-sky-600" />
          <CardTitle className="text-lg">Backend API Route Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium flex items-center mb-2">
              <Cpu className="h-4 w-4 mr-1 text-sky-600" /> Algorithm Used
            </h4>
            <div className="bg-sky-50 text-sky-800 px-3 py-2 rounded-md">
              {algorithm === 'dijkstra' ? 'Dijkstra' : 
               algorithm === 'astar' ? 'A* (A-Star)' : 
               'Auto-selected optimal algorithm'}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium flex items-center mb-2">
              <RouteIcon className="h-4 w-4 mr-1 text-sky-600" /> Path Sequence
            </h4>
            <div className="border rounded-md p-2">
              {path.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {path.map((airport, index) => (
                    <React.Fragment key={index}>
                      <span className="bg-sky-100 text-sky-800 px-2 py-1 rounded-md text-sm">
                        {airport}
                      </span>
                      {index < path.length - 1 && (
                        <span className="text-gray-400 self-center">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No path information available</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIRouteDetails;
