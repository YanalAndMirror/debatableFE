import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { currentUser, getRoom } from '../../providers/apollo/queries';
import { FiVideo } from 'react-icons/fi';
import { FiVideoOff } from 'react-icons/fi';
import { BsMic } from 'react-icons/bs';
import { FiMicOff } from 'react-icons/fi';
import { unstable_batchedUpdates } from 'react-dom';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Video from '../../components/Video';
import instance from '../../components/utils/instance';
import { Link } from '@material-ui/core';
import { ADD_ROOM_VOTE } from '../../providers/apollo/mutations';
let openviduBrowser;
if (typeof window !== 'undefined')
  openviduBrowser = require('openvidu-browser');
export default function profile() {
  const { data } = useQuery(currentUser);
  const router = useRouter();
  const { roomSlug } = router.query;
  const [addRoomVote] = useMutation(ADD_ROOM_VOTE);
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [join, setJoin] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState(null);
  const [audioOff, setAudioOff] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const [muted, setMuted] = useState({
    right: false,
    left: false,
    host: false,
  });

  const [allowed, setAllowed] = useState([]);
  const [users, setUsers] = useState([]);
  const mute = (side) => {
    session.signal({
      data: side,
      type: 'mute',
    });
  };
  const kick = (id) => {
    session.signal({
      data: id,
      type: 'kick',
    });
  };
  const vote = (side) => {
    session.signal({
      data: JSON.stringify({ user: data.currentUser._id, side }),
      type: 'vote',
    });
    addRoomVote({ variables: { slug: roomSlug, side } });
  };
  const resetThenJoin = () => {
    unstable_batchedUpdates(() => {
      setSubscribers([]);
      setUsers([]);
      setMuted({
        right: false,
        left: false,
        host: false,
      });
      setChat([]);
      setAllowed([]);
      setJoin(true);
    });
  };
  useEffect(() => {
    if (!OV) {
      if (openviduBrowser) setOV(new openviduBrowser.OpenVidu());
    } else setSession(OV.initSession());
  }, [OV]);
  useEffect(() => {
    session?.disconnect();
    setJoin(false);
  }, [data]);
  useEffect(async () => {
    if (!session) return;
    session.on('streamCreated', (event) => {
      let subscriber = session.subscribe(event.stream, undefined);
      setSubscribers((currentState) => [...currentState, subscriber]);
    });
    session.on('streamDestroyed', (event) => {
      event.preventDefault();
      setSubscribers((currentState) =>
        currentState.filter((s) => s !== event.stream.streamManager)
      );
    });
    session.on('connectionCreated', (event) => {
      setUsers((users) => [...users, event.connection]);
    });
    session.on('connectionDestroyed', (event) => {
      setUsers((users) => users.filter((user) => user !== event.connection));
      setAllowed((allowed) =>
        allowed.filter(
          (user) =>
            JSON.parse(user.data).clientData.userId !==
            JSON.parse(event.connection.data).clientData.userId
        )
      );
    });
    session.on('signal:my-chat', (event) => {
      setChat((currentState) => [...currentState, event.data]);
    });
    session.on('signal:mute', (event) => {
      setMuted((currentState) => ({
        ...currentState,
        [event.data]: !currentState[event.data],
      }));
    });
    session.on('signal:muteMatch', (event) => {
      setMuted((currentState) =>
        !currentState.host ? JSON.parse(event.data) : currentState
      );
    });
    session.on('signal:stream', (event) => {
      setMuted((currentState) => ({
        ...currentState,
        [event.data]: !currentState[event.data],
      }));
    });
    session.on('signal:allow', (event) => {
      setAllowed((currentState) => [...currentState, event.data]);
    });
    session.on('signal:disallow', (event) => {
      setAllowed((currentState) =>
        currentState.filter((a) => a !== event.data)
      );
    });
    session.on('signal:vote', (event) => {
      let myVote = JSON.parse(event.data);
      console.log(myVote);
      setVotes((votes) => [
        ...votes.filter((vote) => vote.user !== myVote.user),
        myVote,
      ]);
    });
    return () => {
      if (!session) return;
      session.off('streamCreated');
      session.off('streamDestroyed');
      session.off('connectionCreated');
      session.off('connectionDestroyed');
      session.off('signal:my-chat');
      session.off('signal:mute');
      session.off('signal:muteMatch');
      session.off('signal:stream');
      session.off('signal:allow');
      session.off('signal:disallow');
      session.off('signal:vote');
    };
  }, [session]);
  useEffect(() => {
    if (session)
      router.events.on('routeChangeComplete', () => session.disconnect());
    return () => {
      router.events.off('routeChangeComplete', () => session.disconnect());
    };
  }, [session]);
  const room = useQuery(getRoom, {
    variables: { slug: roomSlug },
    onCompleted: (data) => {
      setVotes(data.room.vote);
    },
  });
  const debate = room.data?.room?.debate;
  useEffect(() => {
    if (users.length > 0) {
      if (data.currentUser?._id === room.data.room.user) {
        if (!muted.host) {
          session.signal({
            data: JSON.stringify(muted),
            type: 'muteMatch',
          });
        }
      }
    }
  }, [users]);

  if (!data || !room.data) return <>loading</>;
  if (!room.data.room) return <>Not Found</>;
  let streams = [publisher, ...subscribers].filter((a) => a !== undefined);
  streams.sort((a, b) => {
    if (
      JSON.parse(a.stream.connection.data).clientData.userId >
      JSON.parse(b.stream.connection.data).clientData.userId
    )
      return 1;
    else -1;
  });
  let host = streams.find(
    (stream) =>
      JSON.parse(stream.stream.connection.data).clientData.type === 'host'
  );
  streams = streams.filter(
    (stream) =>
      JSON.parse(stream.stream.connection.data).clientData.type !== 'host'
  );
  let rightDebater = streams[0];
  let leftDebater = streams[1];
  let thisHost = data.currentUser?._id === room.data.room.user;
  let rightVotes = votes.filter((vote) => vote.side === 'right');
  let leftVotes = votes.filter((vote) => vote.side === 'left');
  return (
    <div class="container m-6">
      {join ? (
        <div
          class="grid grid-cols-4  gap-6 border-2 p-4"
          style={{ height: '90vh' }}
        >
          <div>
            {leftDebater && (
              <>
                <Video
                  stream={leftDebater}
                  muted={publisher === leftDebater ? true : muted.left}
                  thisHost={thisHost}
                  mute={mute}
                  kick={kick}
                  side={'left'}
                  vote={vote}
                />{' '}
              </>
            )}
          </div>
          <div></div>
          <div>
            {rightDebater && (
              <>
                <Video
                  stream={rightDebater}
                  muted={publisher === rightDebater ? true : muted.right}
                  thisHost={thisHost}
                  mute={mute}
                  kick={kick}
                  side={'right'}
                  vote={vote}
                />{' '}
              </>
            )}
          </div>
          <div class="row-span-3 border-2 p-4 h-96">
            <center className="flex justify-between">
              <button
                className="btn bg-green-500 m-1"
                onClick={() => vote('left')}
              >
                Left
                <div class="badge ml-2 badge-outline">{leftVotes.length}</div>
              </button>
              Vote
              <button
                className="btn bg-red-500 m-1"
                onClick={() => vote('right')}
              >
                Right
                <div class="badge ml-2 badge-outline">{rightVotes.length}</div>
              </button>
            </center>
            Original debate: <br />
            <Link href={`/${debate.slug}`}>
              <div class="card card-side border-2  w-full">
                <figure>
                  <img className="h-32 w-32" src={debate.photo} />
                </figure>
                <div class="card-body">
                  <h3 class="card-title">{debate.title}</h3>
                </div>
              </div>
            </Link>
            <div class="overflow-visible ...">
              Participants:
              <br />
              {users
                .filter(
                  (u) => JSON.parse(u.data).clientData.username !== 'Guest'
                )
                .map((u) => {
                  let thisUser = JSON.parse(u.data).clientData;

                  return (
                    <>
                      {thisUser.username}
                      {thisHost &&
                        thisUser.username !== data.currentUser.username &&
                        (!allowed.includes(thisUser.userId) ? (
                          <button
                            class="ml-1 btn btn-outline btn-xs"
                            onClick={() =>
                              session.signal({
                                data: thisUser.userId,
                                type: 'allow',
                              })
                            }
                          >
                            Set as a debator
                          </button>
                        ) : (
                          <button
                            class="ml-1 btn btn-outline btn-xs btn-error"
                            onClick={() =>
                              session.signal({
                                data: thisUser.userId,
                                type: 'disallow',
                              })
                            }
                          >
                            Set as a guest
                          </button>
                        ))}
                      <br />
                    </>
                  );
                })}
              <div class="divider"></div>
              <div class="overflow-auto h-72">
                {chat.map((a) => {
                  a = JSON.parse(a);
                  return (
                    <>
                      {a.user} : {a.input}
                      <br />
                    </>
                  );
                })}
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                session.signal({
                  data: JSON.stringify({
                    input,
                    user: data.currentUser.username,
                  }),
                  type: 'my-chat',
                });
                setInput('');
              }}
            >
              <div class="form-control">
                <label class="label"></label>
                <div class="flex space-x-2">
                  <input
                    placeholder="Chat"
                    class="w-full input input-bordered"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={!data.currentUser}
                  />
                  <button
                    class="btn"
                    type="submit"
                    disabled={!data.currentUser}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div></div>
          <div>
            {host && (
              <Video
                stream={host}
                muted={publisher === host ? true : muted.host}
                side="host"
              />
            )}
          </div>
          <div></div>

          {(thisHost ||
            (data.currentUser && allowed.includes(data.currentUser._id))) &&
            (!publisher ? (
              <button
                class="btn btn-outline"
                onClick={() => {
                  let publisher = OV.initPublisher(undefined, {
                    audioSource: undefined,
                    videoSource: undefined,
                    publishAudio: true,
                    publishVideo: true,
                    resolution: '640x480',
                    frameRate: 30,
                    insertMode: 'APPEND',
                    mirror: false,
                  });
                  session.publish(publisher);
                  setPublisher(publisher);
                  session.on('signal:kick', (event) => {
                    if (event.data === data.currentUser._id) {
                      alert('you have been kicked');
                      publisher.stream.disposeWebRtcPeer();
                      publisher.stream.disposeMediaStream();
                      session.unpublish(publisher);
                      setPublisher();
                    }
                  });
                }}
              >
                Join
              </button>
            ) : (
              <button
                class="btn btn-outline"
                onClick={() => {
                  publisher.stream.disposeWebRtcPeer();
                  publisher.stream.disposeMediaStream();
                  session.unpublish(publisher);
                  setPublisher();
                }}
              >
                Leave
              </button>
            ))}
          {publisher && (
            <>
              <button
                class="btn btn-outline"
                onClick={() => {
                  publisher.publishAudio(!publisher.stream.audioActive);
                  setAudioOff(!audioOff);
                }}
              >
                {audioOff ? <FiMicOff /> : <BsMic />}
              </button>
              <button
                class="btn btn-outline"
                onClick={() => {
                  publisher.publishVideo(!publisher.stream.videoActive);
                  setVideoOff(!videoOff);
                }}
              >
                {videoOff ? <FiVideoOff /> : <FiVideo />}
              </button>
            </>
          )}
        </div>
      ) : (
        <div class="flex h-screen">
          <div class="m-auto">
            <button
              onClick={async () => {
                let token = await instance.post('/openViduToken', {
                  room: roomSlug,
                });
                if (token) {
                  resetThenJoin();

                  session.connect(token.data, {
                    clientData: {
                      type:
                        data.currentUser?._id === room.data.room.user
                          ? 'host'
                          : 'debater',
                      username: data.currentUser
                        ? data.currentUser.username
                        : 'Guest',
                      userId: data.currentUser ? data.currentUser._id : 0,
                    },
                  });
                }
              }}
              class="btn btn-wide btn-lg"
            >
              Join as {data.currentUser ? data.currentUser.username : 'Guest'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
