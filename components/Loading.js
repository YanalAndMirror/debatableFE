import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Loading() {
  return (
    <div class="flex h-screen">
      <div class="m-auto">
        <ClipLoader />
      </div>
    </div>
  );
}
