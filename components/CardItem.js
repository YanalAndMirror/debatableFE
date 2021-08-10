import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { BsArrowUpDown } from 'react-icons/bs';

export default function CardItem({ title }) {
  return (
    <>
      <div class="card bordered m-4">
        <figure>
          <img src="https://picsum.photos/id/1005/60/40" class="w-full" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{title}</h2>
          <p>
            <div class="card-actions">
              <button class="btn btn-outline btn-sm">
                <AiOutlineEye className="mr-1" /> 200
              </button>
              <button class="btn btn-outline btn-sm">
                <FaRegComments className="mr-1" /> 64
              </button>
              <button class="btn btn-outline btn-sm">
                <BsPeople className="mr-1" /> 15
              </button>
              <button class="btn btn-outline btn-sm">
                <BsArrowUpDown className="mr-1" /> 36
              </button>
            </div>
          </p>
          <div class="card-actions">
            <div class="badge badge-outline">Article</div>
            <div class="badge badge-outline">Photography</div>
          </div>
        </div>
      </div>
    </>
  );
}
