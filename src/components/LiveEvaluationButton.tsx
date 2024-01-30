import React from "react";

interface LiveEvaluationButtonProps {
  badgeTitle: string;
  badgeDescription: string;
  email: string;
}

const LiveEvaluationButton: React.FC<LiveEvaluationButtonProps> = () => {
  return (
    <button className={`bg-blue-800 p-2 rounded-md text-white`}>
      Request Live Evaluation
    </button>
  );
};

export default LiveEvaluationButton;
