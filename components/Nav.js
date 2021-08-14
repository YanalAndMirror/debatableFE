import React, { useEffect, useState } from "react";
import Link from "next/link";
import Login from "./Login";
import { userVar } from "../providers/apollo/vars";
import { useQuery, gql } from "@apollo/client";
import { getUser } from "../providers/apollo/queries";

export default function Nav() {
  const { data } = useQuery(getUser);
  useEffect(() => {
    if (data) userVar(data.user);
  }, [data]);
  return (
    <>
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content ">
        <div className="flex-none px-2 mx-2">
          <span className="text-lg font-bold">
            {" "}
            <Link href="/">Debatable </Link>
          </span>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="items-stretch hidden lg:flex">
            <span className="btn btn-ghost btn-sm rounded-btn">
              <Link href="/">Explore</Link>
            </span>

            <span className="btn btn-ghost btn-sm rounded-btn">
              <Link href="/create">Create a debate</Link>
            </span>
            <span className="btn btn-ghost btn-sm rounded-btn">
              <Link href="/debate">Debates</Link>
            </span>
          </div>
        </div>
        <div className="flex-1 lg:flex-none">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost"
            />
          </div>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex="0">
              <button className="btn btn-square btn-ghost">
                <div className="indicator">
                  <div className="indicator-item badge badge-secondary badge-xs"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <ul
              tabIndex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-none">
          <div class="dropdown dropdown-end">
            <div className="avatar">
              <div className="rounded-full w-10 h-10 m-1">
                <div tabindex="0">
                  <img src="https://i.pravatar.cc/500?img=32" />
                </div>
                <ul
                  tabindex="0"
                  class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black"
                >
                  <div class="form-control">
                    <Login />
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
