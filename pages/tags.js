import { useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { getTags } from "../providers/apollo/queries";
import Head from "next/head";
import Loading from "../components/Loading";

export default function tags() {
  const { loading, data } = useQuery(getTags);
  if (loading) return <Loading />;
  const myTags = data.tags.map((tag) => (
    <Link href={"tag/" + tag.title} key={tag._id}>
      <div className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center cursor-pointer">
        <div className="bg-white rounded-lg mt-5">
          <img src={tag.photo} className="h-20 rounded-md w-64" alt="" />
        </div>
        <div className="bg-white shadow-lg rounded-lg -mt-4 w-64 h-8">
          <span className="font-bold text-gray-800 text-lg">{tag.title}</span>
        </div>
      </div>
    </Link>
  ));

  return (
    <center>
      <Head>
        <title>Tags</title>
      </Head>

      <div className="grid grid-cols-3 gap-4 w-3/6">{myTags}</div>
    </center>
  );
}
