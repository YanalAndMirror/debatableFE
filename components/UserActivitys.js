import React from "react";
import { GrEdit } from "react-icons/gr";

export default function UserActivitys() {
  return (
    <div>
      Activity
      <ul className="menu  py-3 bg-base-100 rounded-box ">
        <li>
          <a>
            <GrEdit /> - You posted an argue on : does god exist
          </a>
        </li>
      </ul>
    </div>
  );
}
