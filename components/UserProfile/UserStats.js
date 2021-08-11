import React from 'react';

export default function UserStats() {
  return (
    <div>
      <div className="w-full shadow stats">
        <div className="stat place-items-center place-content-center">
          <div className="stat-title">Debates</div>
          <div className="stat-value">31</div>
        </div>
        <div className="stat place-items-center place-content-center">
          <div className="stat-title">Argues</div>
          <div className="stat-value text-success">42</div>
        </div>
        <div className="stat place-items-center place-content-center">
          <div className="stat-title">Votes</div>
          <div className="stat-value text-error">120</div>
        </div>
      </div>
    </div>
  );
}
