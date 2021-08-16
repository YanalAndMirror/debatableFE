import React from 'react';
import CardList from './CardList';

export default function Body({ debates }) {
  return (
    <>
      <div className="md:container md:mx-auto ">
        <div className="tabs ml-32">
          <a className="tab tab-bordered">Featured</a>
          <a className="tab tab-bordered tab-active">Popular</a>
          <a className="tab tab-bordered">New</a>
        </div>
        <CardList debates={debates} />
      </div>
      <div className="btn-group justify-center">
        <button className="btn">Previous</button>
        <button className="btn">1</button>
        <button className="btn btn-active">2</button>
        <button className="btn">3</button>
        <button className="btn">4</button>
        <button className="btn">Next</button>
      </div>
    </>
  );
}
