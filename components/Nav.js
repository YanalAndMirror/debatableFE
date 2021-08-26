import React, { useEffect, useState } from "react";
import Link from "next/link";
import Login from "./Login";
import { BiAddToQueue } from "react-icons/bi";

import { userVar } from "../providers/apollo/vars";
import { useQuery } from "@apollo/client";
import { currentUser, getClubs, getUser } from "../providers/apollo/queries";
import { CgMediaLive } from "react-icons/cg";
import { TiGroup } from "react-icons/ti";
import { io } from "socket.io-client";
import client from "./../providers/apollo/client";
import LoggedIn from "./LoggedIn";
import ThemeMenu from "./ThemeMenu";
import Notifications from "./Notifications";
import { toast } from "react-toastify";

export default function Nav() {
  const { data } = useQuery(getUser);
  const [theme, setTheme] = useState(null);
  const [socket, setSocket] = useState(false);

  const user = useQuery(currentUser).data.currentUser;
  useEffect(async () => {
    if (data) {
      userVar(data.user);
      if (data.user) {
        if (typeof window !== undefined && !socket) {
          await client.refetchQueries({
            include: [getUser, getClubs],
          });
          setSocket(
            io(process.env.BACKEND, {
              query: {
                token: localStorage.getItem("token"),
              },
            })
          );
        }
      }
    }
  }, [data]);
  useEffect(() => {
    if (socket) {
      socket.on("notifcation", (notification) => {
        const { user } = client.readQuery({
          query: getUser,
        });
        if (user) {
          client.writeQuery({
            query: getUser,
            data: {
              user: {
                ...user,
                notifications: [
                  ...user.notifications.filter(
                    (n) =>
                      n.debate.slug !== notification.debate.slug ||
                      n.seen === true
                  ),
                  { ...notification, __typename: "Notification", seen: false },
                ],
              },
            },
          });
        }
        toast.info(notification.text, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  }, [socket]);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ?? localStorage?.getItem("theme") ?? "fantasy"
    );
  }, [theme]);
  return (
    <>
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content ">
        <div className="flex-none px-2 mx-2">
          <span className="text-lg font-bold">
            <Link href="/">Debatable </Link>
          </span>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="items-stretch hidden lg:flex">
            <span className="btn btn-ghost btn-sm rounded-btn">
              <Link href="/tags">Explore</Link>
            </span>
            <Link href="/live">
              <span className="btn btn-ghost btn-sm rounded-btn">
                <CgMediaLive className="mr-1" size="24px" />
                Live
              </span>
            </Link>
            <Link href="/clubs">
              <span className="btn btn-ghost btn-sm rounded-btn">
                <TiGroup className="mr-1" size="24px" />
                Clubs
              </span>
            </Link>
            {user && (
              <span className="btn btn-ghost btn-sm rounded-btn">
                <Link href="/create">
                  <span className="flex justify-center">
                    <BiAddToQueue size="24px" className="mr-1" />
                    Debate
                  </span>
                </Link>
              </span>
            )}
          </div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <Notifications user={user} />
          </div>
        </div>
        <ThemeMenu setTheme={setTheme} />
        <div className="flex-none">
          <div class="dropdown dropdown-end">
            <div className="avatar">
              <div className="rounded-full w-10 h-full m-1">
                {user ? (
                  <div tabindex="0">
                    {user.photo ? (
                      <img src={user.photo} />
                    ) : (
                      <img src="data:image/jpeg;base64,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" />
                    )}
                  </div>
                ) : (
                  <div tabindex="0">
                    <img src="data:image/jpeg;base64,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" />
                  </div>
                )}

                <ul
                  tabindex="0"
                  class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 "
                >
                  {user ? <LoggedIn /> : <Login />}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
