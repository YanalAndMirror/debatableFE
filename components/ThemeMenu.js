import React from 'react';
import { RiBrush2Line } from 'react-icons/ri';
import Cookies from 'js-cookie';

export default function ThemeMenu({ setTheme }) {
  const setCurrTheme = (theme) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };
  let themesArray = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
  ];
  themesArray = themesArray.map((theme) => (
    <li
      onClick={() => {
        setCurrTheme(theme);
      }}
    >
      <a> {theme}</a>
    </li>
  ));
  return (
    <>
      <div className="flex-none text-base-content">
        <div className="dropdown dropdown-end">
          <div tabIndex="0">
            <button className="btn btn-square btn-ghost">
              <RiBrush2Line
                size="24px"
                className=" fill-current text-neutral-content"
              />
            </button>
          </div>
          <ul
            tabIndex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            {themesArray}
          </ul>
        </div>
      </div>
    </>
  );
}
