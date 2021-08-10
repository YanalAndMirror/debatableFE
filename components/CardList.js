import React from 'react';
import CardItem from './CardItem';

export default function CardList() {
  return (
    <>
      <div class="grid md:grid-cols-3 gap-4 mt-4">
        <CardItem title="Does God Exist" />
        <CardItem title="Does God Exist" />
        <CardItem title="Does God Exist" />
        <CardItem title="Does God Exist" />
      </div>
    </>
  );
}
