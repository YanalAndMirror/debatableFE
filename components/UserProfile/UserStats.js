import React from 'react';

export default function UserStats({ user }) {
  return (
    <div>
      <div className="w-3/6 shadow stats">
        <div className="stat place-items-center place-content-center">
          <div className="stat-title">Debates</div>
          <div className="stat-value">{user?.debates.length}</div>
        </div>
        <div className="stat place-items-center place-content-center">
          <div className="stat-title">Argues</div>
          <div className="stat-value text-success">{user?.arguesCount}</div>
        </div>
        <div className="stat place-items-center place-content-center">
          <div className="stat-title">Votes</div>
          <div className="stat-value text-error">{user?.votesCount}</div>
        </div>
      </div>
    </div>
  );
}
