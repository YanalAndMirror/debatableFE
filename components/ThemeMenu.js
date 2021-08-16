import React from "react";
import { RiBrush2Line } from "react-icons/ri";
import Cookies from "js-cookie";

export default function ThemeMenu({ setTheme }) {
  return (
    <>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex="0">
            <button className="btn btn-square btn-ghost">
              <RiBrush2Line />
            </button>
          </div>
          <ul
            tabIndex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black"
          >
            <li
              onClick={() => {
                localStorage.setItem("theme", "light");
                setTheme("light");
              }}
            >
              <a>Light</a>
            </li>
            <li
              onClick={() => {
                localStorage.setItem("theme", "dark");
                setTheme("dark");
              }}
            >
              <a>Dark</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
