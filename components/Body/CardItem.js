import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { BsArrowUpDown } from 'react-icons/bs';
import Link from 'next/link';

export default function CardItem({ debate }) {
  console.log(debate);
  return (
    <div className="card bordered m-4 text-base-content">
      <Link href={'/' + debate.slug}>
        <figure>
          <img
            src={debate.photo}
            className="object-cover  h-40 cursor-pointer"
          />
        </figure>
      </Link>

      <div className="card-body">
        <Link href={'/' + debate.slug}>
          <h2 className="card-title mt-0 cursor-pointer">{debate.title}</h2>
        </Link>

        <p>
          <div className="card-actions">
            <button className="btn btn-outline btn-sm">
              <AiOutlineEye className="mr-1" /> {debate.views}
            </button>
            <button className="btn btn-outline btn-sm">
              <FaRegComments className="mr-1" /> {debate.argueCount}
            </button>
            <button className="btn btn-outline btn-sm">
              <BsPeople className="mr-1" /> {debate.participants}
            </button>
            <button className="btn btn-outline btn-sm">
              <BsArrowUpDown className="mr-1" /> {debate.argueVotes}
            </button>
          </div>
        </p>
        <div className="card-actions">
          {debate.tags?.map((tag) => {
            return <div className="badge badge-outline">{tag.title}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
