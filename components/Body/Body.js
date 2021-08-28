import React from 'react';
import CardList from './CardList';

export default function Body({ debates }) {
  return (
    <>
      {debates.length > 0 ? (
        <CardList debates={debates} />
      ) : (
        <center className="text-content">No Results Found</center>
      )}
    </>
  );
}
