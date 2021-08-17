import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { BsArrowUpDown } from "react-icons/bs";
import Link from "next/link";

export default function CardItem({ debate }) {
  return (
    <Link href={"/" + debate.slug}>
      <div className="card bordered m-4 rounded-none bg-white">
        <figure>
          <img src={debate.photo} className="object-cover  h-40" />
        </figure>
        <div className="card-body">
          <h2 className="card-title mt-0">{debate.title}</h2>
          <p>
            <div className="card-actions">
              <button className="btn btn-outline btn-sm">
                <AiOutlineEye className="mr-1" /> {debate.views}
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
    </Link>
  );
}
