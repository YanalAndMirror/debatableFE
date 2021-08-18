import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { getTags } from '../providers/apollo/queries';

export default function Header() {
  const { loading, data } = useQuery(getTags);
  if (loading) return <>Loading</>;
  const myTags = data.tags.slice(0, 9).map((tag) => (
    <Link href={'tag/' + tag.title}>
      <div class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center cursor-pointer">
        <div class="bg-white rounded-lg mt-5">
          <img src={tag.photo} class="h-20 rounded-md w-64" alt="" />
        </div>
        <div class="bg-white shadow-lg rounded-lg -mt-4 w-64 h-8">
          <span class="font-bold text-gray-800 text-lg">{tag.title}</span>
        </div>
      </div>
    </Link>
  ));
  return (
    <center>
      <div className="card lg:card-side text-base-content">
        <div className="card-body">
          <div className="card-title text-2xl">Explore Debates</div>
          <p>
            <div class="grid grid-cols-3 gap-4 w-3/6">
              {myTags}
              <div></div>
              <div></div>
              <a href="/tag" className="ml-44">
                See more...
              </a>
            </div>
          </p>
        </div>
      </div>
      <div className="divider"></div>
    </center>
  );
}
