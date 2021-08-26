import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { getUser } from '../providers/apollo/queries';
import Link from 'next/link';
import { CLEAR_NOTIFICATION } from '../providers/apollo/mutations';
import { BsBell } from 'react-icons/bs';
import Loading from './Loading';

export default function Notifications({ user }) {
  const [clearNotification] = useMutation(CLEAR_NOTIFICATION);

  const { data, loading } = useQuery(getUser);
  if (loading) return <Loading />;
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
  let notSeen = data?.user?.notifications.filter((n) => !n.seen);
  notifications = data?.user?.notifications.map((notification) => (
    <li>
      <Link href={`/${notification.debate.slug}`}>
        <a>
          <div class="card sm:card-side border-2">
            <img src={notification.debate.photo} className="mb-8  w-20 h-20" />
            <div class="card-body">
              <p class="card-title text-sm">{notification.text}</p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  ));

  notifications = notifications.reverse().slice(0, 4);
  return (
    <>
      <div tabIndex="0" onClick={() => clearNotification()}>
        <div
          class={
            notSeen.length > 0
              ? 'my-6 mr-4 indicator animate-bounce'
              : 'my-6 mr-4 indicator'
          }
        >
          {notSeen.length > 0 && (
            <div class="indicator-item badge badge-info badge-sm ">
              {notSeen.length}
            </div>
          )}
          <BsBell size="20px" className="cursor-pointer" />
        </div>
      </div>
      {!notifications ? (
        <div>
          <ul
            tabIndex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-max text-base-content"
          >
            You have no notifications{' '}
          </ul>
        </div>
      ) : (
        <div>
          <ul
            tabIndex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-max text-base-content"
          >
            {notifications}
          </ul>
        </div>
      )}
    </>
  );
}
