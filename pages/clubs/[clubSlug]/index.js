import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import Body from "../../../components/Body/Body";
import useClipboard from "react-use-clipboard";

import { toast } from "react-toastify";

import {
  currentUser,
  getClub,
  getDebates,
} from "../../../providers/apollo/queries";
import Head from "next/head";
import Loading from "../../../components/Loading";

export default function club() {
  const router = useRouter();
  const { clubSlug } = router.query;
  const user = useQuery(currentUser).data.currentUser;
  const myClub = useQuery(getClub, {
    variables: { slug: clubSlug ?? " slug" },
  });

  const { loading, data } = useQuery(getDebates, {
    variables: { debatesClub: clubSlug },
  });
  const [isCopied, setCopied] = useClipboard(
    `${typeof window !== "undefined" ? window.location.protocol : ""}//${
      typeof window !== "undefined" ? window.location.host : ""
    }/invite/${myClub?.data?.club?.inviteLink}`
  );
  if (loading || myClub.loading) return <Loading />;
  return (
    <div className="container mx-auto">
      {" "}
      <Head>
        <title>{myClub.data.club.name}</title>
      </Head>
      <div className="justify-between card-actions">
        <div className="text-4xl">Club Debates</div>
        <div>
          <button
            className="btn "
            onClick={() => router.push(`/clubs/${clubSlug}/create`)}
          >
            Create
          </button>
          {myClub.data.club.admin === user?._id && (
            <button
              className="btn ml-2"
              onClick={() => {
                setCopied();
                toast("Copied to clipboard", {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }}
            >
              Invite
            </button>
          )}
        </div>
      </div>
      <Body debates={data.debates} />
    </div>
  );
}
