import { useQuery } from '@apollo/client';
import React from 'react';
import { getUser } from '../providers/apollo/queries';
import { GrScheduleNew } from 'react-icons/gr';
import Link from 'next/link';
export default function Notifications({ user }) {
  const { data, loading } = useQuery(getUser);
  if (loading) return <>Loading...</>;
  if (!user)
    return (
      <div>
        <ul
          tabIndex="0"
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-max text-base-content"
        >
          Sign in to see your notifications{' '}
        </ul>
      </div>
    );
  let notifications;
  console.log(data?.user?.notifications);
  notifications = data?.user?.notifications.map((notification) => (
    <li>
      <Link href={`/${notification.debate.slug}`}>
        <a>
          <div class="card sm:card-side bordered">
            <figure>
              <img src={notification.debate.photo} className="h-28 w-20" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{notification.text}</h2>
            </div>
          </div>
        </a>
      </Link>
    </li>
  ));
  if (!notifications)
    return (
      <div>
        <ul
          tabIndex="0"
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-max text-base-content"
        >
          You have no notifications{' '}
        </ul>
      </div>
    );
  return (
    <div>
      <ul
        tabIndex="0"
        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-max text-base-content"
      >
        {notifications}
      </ul>
    </div>
  );
}
