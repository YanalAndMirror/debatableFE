import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { getTags } from '../providers/apollo/queries';
import ClipLoader from 'react-spinners/ClipLoader';
import Loading from './Loading';
export default function Header() {
  const { loading, data } = useQuery(getTags);
  if (loading) return <Loading />;
  const myTags = data.tags.slice(0, 8).map((tag) => (
    <Link href={'tag/' + tag.title} key={tag._id}>
      <div className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center cursor-pointer">
        <div className="bg-white rounded-lg mt-5">
          <img
            src={tag.photo}
            className=" object-cover h-20 rounded-md w-64"
            alt=""
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg -mt-4 w-64 h-8">
          <span className="font-bold text-gray-800 text-lg">{tag.title}</span>
        </div>
      </div>
    </Link>
  ));
  return (
    <center>
      <div className="card lg:card-side text-base-content">
        <div className="card-body">
          <div className="card-title text-2xl">Explore Debates</div>
          <span>
            <div className="grid grid-cols-4 gap-4 w-4/6">
              {myTags}

              <div></div>
              <div></div>
              <div></div>
              <div>
                <a href="/tags" className="float-left ml-48 ">
                  See more...
                </a>
              </div>
            </div>
          </span>
        </div>
      </div>
      <div className="divider"></div>
    </center>
  );
}
