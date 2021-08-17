import React from 'react';
import CardList from './CardList';

export default function Body({ debates }) {
  return (
    <>
      <CardList debates={debates} />
    </>
  );
}
