import React from 'react';
import { GrEdit } from 'react-icons/gr';
import UserActivitys from '../components/UserActivitys';
import UserStats from '../components/UserStats';

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
            <UserStats />
          </p>
        </div>
        <div className="justify-center card-actions rounded-none">
          <button className="btn btn-outline rounded-none">Edit Profile</button>
        </div>
        <UserActivitys />
      </div>
    </>
  );
}
