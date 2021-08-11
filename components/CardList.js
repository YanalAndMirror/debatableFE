import React from 'react';
import CardItem from './CardItem';

export default function CardList() {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mt-4 ml-32 mr-32">
        <CardItem title="Does God Exist" />
        <CardItem title="Does God Exist" />
        <CardItem title="Does God Exist" />
        <CardItem title="Does God Exist" />
      </div>
    </>
  );
}
