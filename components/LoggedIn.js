import React, { useState } from 'react';

import Cookies from 'js-cookie';
import Link from 'next/link';

export default function LoggedIn() {
  const handleSignOut = () => {
    Cookies.remove('token');
    window.location.reload(false);
  };
  return (
    <>
      <li>
        <Link href="/profile/">
          <button className="btn btn-outline">Profile</button>
        </Link>
      </li>
      <li>
        <button className="btn mt-1" onClick={handleSignOut}>
          Logout
        </button>
      </li>
    </>
  );
}
