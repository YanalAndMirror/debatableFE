import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <ClipLoader />
      </div>
    </div>
  );
}
