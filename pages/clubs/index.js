import { useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Loading from "../../components/Loading";
import { JOIN_CLUB } from "../../providers/apollo/mutations";
import { currentUser, getClubs } from "../../providers/apollo/queries";

export default function clubs() {
  const router = useRouter();
  const user = useQuery(currentUser).data.currentUser;

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
  if (loading) return <Loading />;

  let otherClubsCards = data.clubs.otherClubs.map((club) => (
    <div class="card text-center border-2">
      <figure class="">
        <img src={club.photo} class="rounded-xl h-56" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{club.name}</h2>
        <div class=" justify-end card-actions">
          <button class="btn " onClick={() => join(club._id)}>
            Join
          </button>
        </div>
      </div>
    </div>
  ));
  let myClubsCards = data.clubs.myClubs.map((club) => (
    <div
      class="card text-center border-2"
      onClick={() => router.push(`/clubs/${club.slug}`)}
    >
      <figure class="">
        <img src={club.photo} class="rounded-xl h-56 border-b-0 object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{club.name}</h2>
      </div>
    </div>
  ));
  return (
    <div className="container mx-auto">
      <Head>
        <title>Clubs</title>
      </Head>

      {user && (
        <>
          <div class="justify-between card-actions">
            <div className="text-4xl">My Clubs</div>

            <button class="btn " onClick={() => router.push(`/clubs/create`)}>
              Create
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4 ml-32 mr-32">
            {myClubsCards.length > 0 ? myClubsCards : "you have no clubs"}
          </div>
        </>
      )}
      <div className="text-4xl mt-4">Public Clubs</div>
      <div className="grid md:grid-cols-3 gap-4 mt-4 ml-32 mr-32">
        {otherClubsCards}
      </div>
    </div>
  );
}
