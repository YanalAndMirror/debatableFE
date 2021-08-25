import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Body from '../../../components/Body/Body';
import useClipboard from 'react-use-clipboard';
import { JOIN_CLUB } from '../../../providers/apollo/mutations';

import { toast } from 'react-toastify';

import {
  currentUser,
  getClub,
  getDebates,
} from '../../../providers/apollo/queries';

export default function club() {
  const router = useRouter();
  const { clubSlug } = router.query;
  const user = useQuery(currentUser).data.currentUser;
  const myClub = useQuery(getClub, {
    variables: { slug: clubSlug },
  });
  const [joinClub] = useMutation(JOIN_CLUB);

  const { loading, data } = useQuery(getDebates, {
    variables: { debatesClub: clubSlug },
  });
  const [isCopied, setCopied] = useClipboard(
    `http://localhost:3000/invite/${myClub?.data?.club?.inviteLink}`
  );
  if (loading || myClub.loading) return <>Loading</>;
  console.log(myClub.data.club);
  console.log(user);
  return (
    <div className="container mx-auto">
      <div class="justify-between card-actions">
        <div className="text-4xl">Club Debates</div>
        <div>
          <button
            class="btn "
            onClick={() => router.push(`/clubs/${clubSlug}/create`)}
          >
            Create
          </button>
          {myClub.data.club.admin === user?._id && (
            <button
              class="btn ml-2"
              onClick={() => {
                setCopied();
                toast('Copied to clipboard', {
                  position: 'bottom-center',
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
