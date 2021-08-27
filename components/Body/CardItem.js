import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { BsArrowUpDown } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CardItem({ debate }) {
  const router = useRouter();
  return (
    <div className="card h-max border-2 m-4 text-base-content">
      <Link href={"/" + debate.slug}>
        <figure>
          <img
            src={debate.photo}
            className="object-cover  h-40 cursor-pointer"
          />
        </figure>
      </Link>

      <div className="card-body h-max">
        <Link href={"/" + debate.slug}>
          <h2 className="card-title mt-0 cursor-pointer">{debate.title}</h2>
        </Link>

        <div className="card-actions">
          <span className="badge badge-lg ">
            <AiOutlineEye className="mr-1" /> {debate.views}
          </span>
          <span className="badge badge-lg ">
            <FaRegComments className="mr-1" /> {debate.argueCount}
          </span>
          <span className="badge badge-lg ">
            <BsPeople className="mr-1" /> {debate.participants}
          </span>
          <span className="badge badge-lg ">
            <BsArrowUpDown className="mr-1" /> {debate.argueVotes}
          </span>
        </div>
        <div className="card-actions">
          {debate.tags?.map((tag) => {
            return (
              <div
                className="badge badge-error badge-outline cursor-pointer"
                onClick={() => router.push("tag/" + tag.title)}
                key={tag._id}
              >
                {tag.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
