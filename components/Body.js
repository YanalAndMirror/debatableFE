import React from 'react';
import CardList from './CardList';

export default function Body() {
  return (
    <>
      <div class="md:container md:mx-auto">
        <div class="tabs ">
          <a class="tab tab-bordered">Featured</a>
          <a class="tab tab-bordered tab-active">Popular</a>
          <a class="tab tab-bordered">New</a>
        </div>
        <CardList />
      </div>
    </>
  );
}
