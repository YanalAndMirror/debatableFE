import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import Body from "../../../components/Body/Body";
import {
  currentUser,
  getClub,
  getDebates,
} from "../../../providers/apollo/queries";

export default function club() {
  const router = useRouter();
  const { clubSlug } = router.query;
  const user = useQuery(currentUser).data.currentUser;
  const myClub = useQuery(getClub, {
    variables: { slug: clubSlug },
  });
  const { loading, data } = useQuery(getDebates, {
    variables: { debatesClub: clubSlug },
  });
  if (loading || myClub.loading) return <>Loading</>;
  console.log(data);
  return (
    <>
      <div className="text-4xl">Club Debates</div>
      <button
        class="btn btn-outline btn-primary"
        onClick={() => router.push(`/clubs/${clubSlug}/create`)}
      >
        Create
      </button>
      <Body debates={data.debates} />
    </>
  );
}
