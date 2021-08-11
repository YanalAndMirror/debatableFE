import React from 'react';
import { GrEdit } from 'react-icons/gr';

export default function profile() {
  return (
    <>
      <div className="card text-center shadow-2xl ">
        <center>
          <div className="avatar">
            <div className=" w-24 h-24 mask mask-squircle mt-8">
              <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
            </div>
          </div>{' '}
        </center>
        <div className="card-body">
          <h2 className="card-title">Joe Doe</h2>
          <p>
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
          </p>
        </div>
        <div className="justify-center card-actions rounded-none">
          <button className="btn btn-outline rounded-none">Edit Profile</button>
        </div>
        <center>
          Activity
          <ul className="menu  py-3 bg-base-100 rounded-box ">
            <li>
              <a>
                <GrEdit /> - You posted an argue on : does god exist
              </a>
            </li>
          </ul>
        </center>
      </div>
    </>
  );
}
