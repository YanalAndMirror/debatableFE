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
      <div class="btn-group justify-center">
        <button class="btn">Previous</button>
        <button class="btn">1</button>
        <button class="btn btn-active">2</button>
        <button class="btn">3</button>
        <button class="btn">4</button>
        <button class="btn">Next</button>
      </div>
    </>
  );
}
