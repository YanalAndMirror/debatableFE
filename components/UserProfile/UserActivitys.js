import React from 'react';

export default function UserActivitys({ notfications }) {
  notfications = notfications?.map((notfication) => (
    <li>
      <a>{notfication.text}</a>
    </li>
  ));
  return (
    <>
      Notifications
      <div className="md:container md:mx-auto bordered border-2 w-3/6 rounded">
        <ul className="menu  py-3 bg-base-100 rounded-box ">{notfications}</ul>
      </div>
    </>
  );
}
