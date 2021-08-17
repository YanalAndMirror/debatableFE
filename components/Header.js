import React from 'react';

export default function Header() {
  return (
    <center>
      <div className="card lg:card-side text-base-content">
        <div className="card-body">
          <div className="card-title text-2xl">Explore Debates</div>
          <p>
            <div className="badge badge-outline m-2">Politics</div>
            <div className="badge badge-outline m-2">Philosophy</div>
            <div className="badge badge-outline m-2">Science</div>
            <div className="badge badge-outline m-2">Ethics</div>
            <div className="badge badge-outline m-2">Religion</div>
            <div className="badge badge-outline m-2">Technology</div>
            <br />
            <div className="badge badge-outline m-2">Health</div>
            <div className="badge badge-outline m-2">Culture</div>
            <a href="#">See more...</a>
          </p>
        </div>
      </div>
      <div className="divider"></div>
    </center>
  );
}
