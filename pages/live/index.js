import { useQuery } from "@apollo/client";
import Head from "next/head";
import router from "next/router";
import React from "react";
import Loading from "../../components/Loading";
import { getRooms } from "../../providers/apollo/queries";

export default function liveDebates() {
  const { data, loading } = useQuery(getRooms);
  if (loading) return <Loading />;
  const rooms = data.rooms.map((room) => (
    <>
      <div className="card border-2">
        <figure>
          <img
            src={room.debate.photo}
            className="object-cover  h-40 cursor-pointer"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {room.debate.title}
            <div className="badge mx-2 badge-secondary">LIVE</div>
          </h2>
          <div className="card-actions">
            {room.debate.tags?.map((tag) => {
              return <div className="badge badge-outline">{tag.title}</div>;
            })}
          </div>

          <div className="justify-end card-actions">
            <button
              className="btn"
              onClick={() => router.push(`/live/${room.slug}`)}
            >
              Watch
            </button>
          </div>
        </div>
      </div>
    </>
  ));

  return (
    <div className="md:container md:mx-auto ">
      <Head>
        <title>Live</title>
      </Head>

      <div className="grid md:grid-cols-3 gap-4 mt-4 ml-32 mr-32">{rooms}</div>
    </div>
  );
}
