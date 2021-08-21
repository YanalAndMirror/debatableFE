import { useQuery } from '@apollo/client';
import router from 'next/router';
import React from 'react';
import { getRooms } from '../providers/apollo/queries';

export default function liveDebates() {
  const { data, loading } = useQuery(getRooms);
  if (loading) return <>Loading</>;
  console.log(data.rooms);
  const rooms = data.rooms.map((room) => (
    <>
      <div class="card border-2">
        <figure>
          <img
            src={room.debate.photo}
            className="object-cover  h-40 cursor-pointer"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {room.debate.title}
            <div class="badge mx-2 badge-secondary">LIVE</div>
          </h2>
          <div className="card-actions">
            {room.debate.tags?.map((tag) => {
              return <div className="badge badge-outline">{tag.title}</div>;
            })}
          </div>

          <div class="justify-end card-actions">
            <button
              class="btn"
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
      <div className="grid md:grid-cols-3 gap-4 mt-4 ml-32 mr-32">{rooms}</div>
    </div>
  );
}
