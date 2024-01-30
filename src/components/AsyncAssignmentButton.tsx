import React from "react";

interface AsyncAssignmentButtonProps {
  badgeTitle: string;
  badgeDescription: string;
  email: string;
}

const AsyncAssignmentButton: React.FC<AsyncAssignmentButtonProps> = (
  props: AsyncAssignmentButtonProps
) => {
  return (
    <button className={`bg-gray-700 p-2 rounded-md text-white`}>
      Async Assignment
    </button>
  );
};

export default AsyncAssignmentButton;
