import React from 'react';
import { GrEdit } from 'react-icons/gr';

export default function profile() {
  return (
    <>
      <div class="card text-center shadow-2xl ">
        <center>
          <div class="avatar">
            <div class=" w-24 h-24 mask mask-squircle mt-8">
              <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
            </div>
          </div>{' '}
        </center>
        <div class="card-body">
          <h2 class="card-title">Joe Doe</h2>
          <p>
            <div class="w-full shadow stats">
              <div class="stat place-items-center place-content-center">
                <div class="stat-title">Debates</div>
                <div class="stat-value">31</div>
              </div>
              <div class="stat place-items-center place-content-center">
                <div class="stat-title">Argues</div>
                <div class="stat-value text-success">42</div>
              </div>
              <div class="stat place-items-center place-content-center">
                <div class="stat-title">Votes</div>
                <div class="stat-value text-error">120</div>
              </div>
            </div>
          </p>
        </div>
        <div class="justify-center card-actions rounded-none">
          <button class="btn btn-outline rounded-none">Edit Profile</button>
        </div>
        <center>
          Activity
          <ul class="menu  py-3 bg-base-100 rounded-box ">
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
