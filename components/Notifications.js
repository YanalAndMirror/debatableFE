import { useQuery } from "@apollo/client";
import React from "react";
import { getUser } from "../providers/apollo/queries";
import { GrScheduleNew } from "react-icons/gr";
import Link from "next/link";
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
          Sign in to see your notifications{" "}
        </ul>
      </div>
    );
  let notifications;
  notifications = data?.user?.notifications.map((notification) => (
    <li>
      <Link href={`/${notification.debate.slug}`}>
        <a>
          <div class="card sm:card-side border-2 w-max h-max">
            <img src={notification.debate.photo} className=" h-24 w-24" />
            <div class="card-body">
              <p class="card-title text-sm">{notification.text}</p>
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
          You have no notifications{" "}
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
