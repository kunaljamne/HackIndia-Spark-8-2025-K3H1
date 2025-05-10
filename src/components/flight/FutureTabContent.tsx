
import React from 'react';

interface FutureTabContentProps {
  text: string;
}

const FutureTabContent: React.FC<FutureTabContentProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-24">
      <p className="text-gray-500">{text} functionality coming soon!</p>
    </div>
  );
};

export default FutureTabContent;
