import React from "react";
import { USE_INVITE_LINK } from "../../providers/apollo/mutations";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

export default function invite() {
  const router = useRouter();

  const { invite } = router.query;
  const useInviteLinkInviteLink = invite;
  let test = "";
  const [joinClub] = useMutation(USE_INVITE_LINK, {
    onCompleted(data) {
      if (!data.useInviteLink) router.push(`/clubs/`);
      else router.push(`/clubs/${data.useInviteLink.slug}`);
    },
  });

  joinClub({
    variables: { useInviteLinkInviteLink },
  });

  return <div>{test}</div>;
}
