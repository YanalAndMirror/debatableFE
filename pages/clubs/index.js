import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { JOIN_CLUB } from "../../providers/apollo/mutations";
import { getClubs } from "../../providers/apollo/queries";

export default function clubs() {
  const router = useRouter();
  const { loading, data } = useQuery(getClubs);
  const [joinClub] = useMutation(JOIN_CLUB);

  const join = (club) => {
    joinClub({
      variables: { club },
      update: (cache, { data: { joinClub } }) => {
        let data;
        data = cache.readQuery({
          query: getClubs,
        });
        cache.writeQuery({
          query: getClubs,
          data: {
            clubs: {
              otherClubs: data.clubs.otherClubs.filter(
                (club) => club._id !== joinClub._id
              ),
              myClubs: [...data.clubs.myClubs, joinClub],
            },
          },
        });
      },
    });
  };
  if (loading) return <>Loading</>;

  let otherClubsCards = data.clubs.otherClubs.map((club) => (
    <div class="card text-center">
      <figure class="px-10 pt-10">
        <img src={club.photo} class="rounded-xl" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{club.name}</h2>
        <div class="justify-center card-actions">
          <button
            class="btn btn-outline btn-accent"
            onClick={() => join(club._id)}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  ));
  let myClubsCards = data.clubs.myClubs.map((club) => (
    <div
      class="card text-center"
      onClick={() => router.push(`/clubs/${club.slug}`)}
    >
      <figure class="px-10 pt-10">
        <img src={club.photo} class="rounded-xl" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{club.name}</h2>
      </div>
    </div>
  ));
  return (
    <div className="container mx-auto">
      <button
        class="btn btn-outline btn-primary"
        onClick={() => router.push(`/clubs/create`)}
      >
        Create
      </button>
      <div className="text-4xl">My Clubs</div>
      <div className="grid md:grid-cols-3 gap-4 mt-4 ml-32 mr-32">
        {myClubsCards.length > 0 ? myClubsCards : "you have no clubs"}
      </div>
      <div className="text-4xl">Public Clubs</div>
      <div className="grid md:grid-cols-3 gap-4 mt-4 ml-32 mr-32">
        {otherClubsCards}
      </div>
    </div>
  );
}
