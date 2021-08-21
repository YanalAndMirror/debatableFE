import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { BsArrowUpDown } from 'react-icons/bs';
import VotingBar from '../components/Debate/VotingBar';
import { getDebate, getUser } from '../providers/apollo/queries';
import { AiFillPlusSquare } from 'react-icons/ai';
import { ShareSocial } from 'react-share-social';
import { useEffect, useState } from 'react';
import {
  CREATE_ARGUE,
  VOTE_ARGUE,
  FOLLOW_DEBATE,
  CREATE_ROOM,
} from '../providers/apollo/mutations';
import FadeIn from 'react-fade-in';
import Pyramid from '../components/Pyramid';
export default function Home() {
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [input, setInput] = useState(null);
  const [room, setRoom] = useState({});
  const [follow, setFollow] = useState('follow');
  const { debateSlug, path } = router.query;
  const { loading, data } = useQuery(getDebate, {
    variables: { slug: debateSlug },
  });
  const followed = useQuery(getUser).data?.user?.followed;
  const [parent, setParent] = useState(path ?? null);
  useEffect(() => {
    if (parent != path) setParent(path);
  }, [path]);

  const [vote] = useMutation(VOTE_ARGUE);
  const [createArgue] = useMutation(CREATE_ARGUE);
  const [followDebate] = useMutation(FOLLOW_DEBATE);
  const [createRoom] = useMutation(CREATE_ROOM);

  if (loading) return <>loading</>;
  const doVote = (argue, value) => {
    vote({
      variables: { argue, value },
    });
  };

  let mainArgue = data.debate.argues.find(
    (argue) =>
      (!parent && argue.parent == parent) || (parent && parent === argue._id)
  );
  const handleFollowDebate = () => {
    setFollow('followed');
    followDebate({
      variables: {
        followDebate: data?.debate._id,
      },
    });
  };
  const handleCreateRoom = () => {
    createRoom({
      variables: {
        debate: data?.debate._id,
        title: data?.debate.slug,
      },
    });
    router.push(`/live/${data?.debate.slug}`);
  };
  const addArgue = () => {
    createArgue({
      variables: {
        argue: {
          content,
          parent: mainArgue._id,
          argueType: input,
          debate: data.debate._id,
        },
      },
      update: (cache, { data: { createArgue } }) => {
        const data = cache.readQuery({
          query: getDebate,
          variables: { slug: debateSlug },
        });
        if (data) {
          cache.writeQuery({
            query: getDebate,
            data: {
              debate: {
                ...data.debate,
                argues: [...data.debate.argues, createArgue],
              },
            },
          });
        }
      },
    });
    setInput(null);
    setContent(null);
  };
  const changeParent = (argueId) => {
    setParent(argueId);
    if (argueId) router.push(debateSlug + '?path=' + argueId);
  };

  let agreeArgues = data.debate.argues
    .filter(
      (argue) => argue.parent === mainArgue._id && argue.argueType === 'agree'
    )
    .map((argue) => (
      <FadeIn>
        <div className="card shadow rounded-none text-base-content">
          <div onClick={() => changeParent(argue._id)} className="card-body">
            <div className="card-actions float-right">
              <BsArrowUpDown />
              {argue.votes.number > 0
                ? argue.votes.amount / argue.votes.number +
                  '/5 by ' +
                  argue.votes.number +
                  ' users'
                : 0}
            </div>
            <VotingBar argue={argue} doVote={doVote} color="green" />

            <p>{argue.content}</p>
          </div>
        </div>
      </FadeIn>
    ));
  let disagreeArgues = data.debate.argues
    .filter(
      (argue) =>
        argue.parent === mainArgue._id && argue.argueType === 'disagree'
    )
    .map((argue) => (
      <FadeIn>
        <div className="card shadow rounded-none text-base-content">
          <div onClick={() => changeParent(argue._id)} className="card-body">
            <div className="card-actions float-right">
              <BsArrowUpDown />
              {argue.votes.number > 0
                ? argue.votes.amount / argue.votes.number +
                  '/5 by ' +
                  argue.votes.number +
                  ' users'
                : 0}
            </div>
            <VotingBar argue={argue} doVote={doVote} color="red" />

            <p>{argue.content}</p>
          </div>
        </div>
      </FadeIn>
    ));
  return (
    <>
      <Pyramid
        debate={data.debate}
        parent={parent}
        changeParent={changeParent}
      />
      <div className="md:container md:mx-auto text-base-content">
        <div className="card shadow rounded-none">
          <FadeIn>
            <div className="card-body">
              <div className="card-actions">
                <div className="justify-between flex w-full">
                  <div className="flex items-center">
                    <BsArrowUpDown />
                    {mainArgue.votes.number > 0
                      ? mainArgue.votes.amount / mainArgue.votes.number +
                        '/5 by ' +
                        mainArgue.votes.number +
                        ' users'
                      : 0}
                  </div>
                  <div>
                    <button className="btn m-1" onClick={handleCreateRoom}>
                      Create Live Debate
                    </button>
                    <button className="btn" onClick={handleFollowDebate}>
                      {followed?.includes(data?.debate._id)
                        ? 'followed'
                        : follow}
                    </button>
                    <div class="dropdown dropdown-end">
                      <div tabindex="0" class="m-1 btn">
                        Share
                      </div>
                      <ul
                        tabindex="0"
                        class="shadow menu dropdown-content bg-base-100 rounded-box w-24"
                      >
                        <li>
                          <ShareSocial
                            url="url_to_share.com"
                            socialTypes={[
                              'facebook',
                              'twitter',
                              'reddit',
                              'email',
                            ]}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <VotingBar argue={mainArgue} color="green" doVote={doVote} />

              <h2 className="card-title">{mainArgue.content}</h2>
            </div>
          </FadeIn>

          <div className="card-body">
            <div className="grid grid-cols-2 divide-x h-full">
              <div className="text-green-600 ">
                <div className="justify-between flex">
                  I Agree
                  <div
                    className="mr-2 cursor-pointer"
                    onClick={() => setInput(input !== 'agree' ? 'agree' : null)}
                  >
                    <AiFillPlusSquare size="34px" />
                  </div>
                </div>
              </div>
              <div className="text-red-600 pl-4">
                {' '}
                <div className="justify-between flex">
                  I Disagree
                  <div
                    className="mr-2 cursor-pointer"
                    onClick={() =>
                      setInput(input !== 'disagree' ? 'disagree' : null)
                    }
                  >
                    <AiFillPlusSquare size="34px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {input && (
            <div class="form-control">
              <div class="relative">
                <input
                  value={content}
                  type="text"
                  placeholder="Argue"
                  class={
                    input === 'agree'
                      ? 'w-full pr-16 input input-success  input-bordered'
                      : 'w-full pr-16 input input-error input-bordered'
                  }
                  onChange={(e) => setContent(e.target.value)}
                />
                <button
                  onClick={addArgue}
                  class={
                    input === 'agree'
                      ? 'absolute top-0 right-0 rounded-l-none btn btn-success'
                      : 'absolute top-0 right-0 rounded-l-none btn bg-red-600 hover:bg-red-600'
                  }
                >
                  {input}
                </button>
              </div>
            </div>
          )}
        </div>
        <div class="grid grid-cols-2 gap-0">
          <div style={{ padding: 0, borderRight: 0 }}>{agreeArgues}</div>
          <div style={{ padding: 0 }}>{disagreeArgues}</div>
        </div>
      </div>
    </>
  );
}
