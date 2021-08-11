import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { BsArrowUpDown } from 'react-icons/bs';

export default function CardItem({ title }) {
  return (
    <>
      <div className="card bordered m-4 rounded-none bg-white">
        <figure>
          <img
            src="https://picsum.photos/id/1005/60/40"
            className="w-full h-36"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title mt-0">{title}</h2>
          <p>
            <div className="card-actions">
              <button className="btn btn-outline btn-sm">
                <AiOutlineEye className="mr-1" /> 200
              </button>
              <button className="btn btn-outline btn-sm">
                <FaRegComments className="mr-1" /> 64
              </button>
              <button className="btn btn-outline btn-sm">
                <BsPeople className="mr-1" /> 15
              </button>
              <button className="btn btn-outline btn-sm">
                <BsArrowUpDown className="mr-1" /> 36
              </button>
            </div>
          </p>
          <div className="card-actions">
            <div className="badge badge-outline">Article</div>
            <div className="badge badge-outline">Photography</div>
          </div>
        </div>
      </div>
    </>
  );
}
