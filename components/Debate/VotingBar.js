import React from 'react';

export default function VotingBar() {
  return (
    <div>
      <progress
        className="progress progress-success w-1/6"
        value="70"
        max="100"
      ></progress>
    </div>
  );
}
