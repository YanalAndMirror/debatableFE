import React from "react";

import { useMutation, useQuery } from "@apollo/client";
import { currentUser, getRoom } from "../../providers/apollo/queries";
import { FiVideo } from "react-icons/fi";
import { FiVideoOff } from "react-icons/fi";
import { BsMic } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

import { FiMicOff } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { unstable_batchedUpdates } from "react-dom";
import Countdown from "react-countdown";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Video from "../../components/Video";
import instance from "../../components/utils/instance";
import { ADD_ROOM_VOTE, ROOMS_STATUE } from "../../providers/apollo/mutations";
import { toast } from "react-toastify";
import Head from "next/head";
import Loading from "../../components/Loading";
let openviduBrowser;
if (typeof window !== "undefined")
  openviduBrowser = require("openvidu-browser");
export default function profile() {
  const { data } = useQuery(currentUser);
  const router = useRouter();
  const { roomSlug } = router.query;
  const [addRoomVote] = useMutation(ADD_ROOM_VOTE);
  const [roomStatus] = useMutation(ROOMS_STATUE);

  const [OV, setOV] = useState(null);
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [join, setJoin] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [audioOff, setAudioOff] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [timer, setTimer] = useState({
    timestamp: Date.now(),
    time: 0,
    active: false,
  });
  const [input2, setInput2] = useState("");

  const [muted, setMuted] = useState({
    right: false,
    left: false,
    host: false,
  });

  const [allowed, setAllowed] = useState([]);
  const [users, setUsers] = useState([]);
  const mute = (side) => {
    session.signal({
      data: JSON.stringify({ side, action: !muted[side] }),
      type: "mute",
    });
  };
  const kick = (id) => {
    session.signal({
      data: id,
      type: "kick",
    });
  };
  const vote = (side) => {
    session.signal({
      data: JSON.stringify({ user: data.currentUser._id, side }),
      type: "vote",
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
    session.on("streamCreated", (event) => {
      let subscriber = session.subscribe(event.stream, undefined);
      setSubscribers((currentState) => [...currentState, subscriber]);
    });
    session.on("streamDestroyed", (event) => {
      event.preventDefault();
      setSubscribers((currentState) =>
        currentState.filter((s) => s !== event.stream.streamManager)
      );
    });
    session.on("connectionCreated", (event) => {
      setUsers((users) => [...users, event.connection]);
    });
    session.on("connectionDestroyed", (event) => {
      unstable_batchedUpdates(() => {
        setUsers((users) => users.filter((user) => user !== event.connection));
        setAllowed((allowed) =>
          allowed.filter((user) => {
            if (user.data && event.connection.data) {
              return (
                JSON.parse(user.data).clientData.userId !==
                JSON.parse(event.connection.data).clientData.userId
              );
            }
            return user.data ? true : false;
          })
        );
      });
    });
    session.on("signal:my-chat", (event) => {
      setChat((currentState) => [...currentState, event.data]);
    });
    session.on("signal:mute", (event) => {
      let muteAction = JSON.parse(event.data);
      setMuted((currentState) => ({
        ...currentState,
        [muteAction.side]: muteAction.action,
      }));
    });
    session.on("signal:muteMatch", (event) => {
      setMuted((currentState) =>
        !currentState.host ? JSON.parse(event.data) : currentState
      );
    });
    session.on("signal:stream", (event) => {
      setMuted((currentState) => ({
        ...currentState,
        [event.data]: !currentState[event.data],
      }));
    });
    session.on("signal:allow", (event) => {
      setAllowed((currentState) => [...currentState, event.data]);
    });
    session.on("signal:disallow", (event) => {
      setAllowed((currentState) =>
        currentState.filter((a) => a !== event.data)
      );
    });
    session.on("signal:vote", (event) => {
      let myVote = JSON.parse(event.data);
      console.log(myVote);
      setVotes((votes) => [
        ...votes.filter((vote) => vote.user !== myVote.user),
        myVote,
      ]);
    });
    session.on("signal:timer", (event) => {
      let myObj = JSON.parse(event.data);
      if (myObj.time > 0) setTimer({ ...myObj, active: true });
      else setTimer({ timestamp: Date.now(), time: 0, active: false });
    });
    return () => {
      if (!session) return;
      session.off("streamCreated");
      session.off("streamDestroyed");
      session.off("connectionCreated");
      session.off("connectionDestroyed");
      session.off("signal:my-chat");
      session.off("signal:mute");
      session.off("signal:muteMatch");
      session.off("signal:stream");
      session.off("signal:allow");
      session.off("signal:disallow");
      session.off("signal:vote");
      session.off("signal:timer");
    };
  }, [session]);
  useEffect(() => {
    if (session)
      router.events.on("routeChangeComplete", () => session.disconnect());
    return () => {
      router.events.off("routeChangeComplete", () => session.disconnect());
    };
  }, [session]);
  useEffect(() => {
    if (users.length > 0) {
      if (data.currentUser?._id === room.data.room.user) {
        if (!muted.host) {
          session.signal({
            data: JSON.stringify(muted),
            type: "muteMatch",
          });
        }
      }
    }
  }, [users]);
  const room = useQuery(getRoom, {
    variables: { slug: roomSlug ?? " slug" },
    onCompleted: (data) => {
      if (data.room && data.room.live) setVotes(data.room.vote);
      else router.push("/live");
    },
  });
  useEffect(() => {
    let interval;
    if (
      join &&
      room.data &&
      data.currentUser &&
      data.currentUser._id === room.data.room.user
    ) {
      interval = setInterval(() => {
        console.log("Host is alive");
        roomStatus({ variables: { slug: roomSlug, status: `${Date.now()}` } });
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [join]);
  if (!data || !room.data) return <Loading />;
  if (!room.data.room || !room.data.room.live) return <>Not Found</>;

  const debate = room.data?.room?.debate;
  let streams = [publisher, ...subscribers].filter((a) => a !== undefined);

  let host = streams.find(
    (stream) =>
      JSON.parse(stream.stream.connection.data).clientData.type === "host"
  );
  streams = streams.filter(
    (stream) =>
      JSON.parse(stream.stream.connection.data).clientData.type !== "host"
  );
  streams.sort((a, b) => {
    let myA = JSON.parse(a.stream.connection.data).clientData.username;
    let myB = JSON.parse(b.stream.connection.data).clientData.username;
    if (myA > myB) return 1;
    else if (myA < myB) return -1;
    else 0;
  });
  let rightDebater = streams[0];
  let leftDebater = streams[1];
  let thisHost = data.currentUser?._id === room.data.room.user;
  let rightVotes = votes.filter((vote) => vote.side === "right");
  let leftVotes = votes.filter((vote) => vote.side === "left");

  return join ? (
    <>
      <Head>
        <title>{debate.title}</title>
      </Head>

      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-72">
          <span>
            {users
              .filter((u) => {
                if (u && u.data) {
                  return JSON.parse(u.data).clientData.username !== "Guest";
                }
                return false;
              })
              .map((u) => {
                let thisUser = u?.data ? JSON.parse(u.data).clientData : "";
                console.log(u);
                return (
                  <div
                    className="flex mb-4 items-center border-1"
                    key={u.connectionId}
                  >
                    <span className="w-full text-grey-darkest">
                      {thisUser.username}{" "}
                      {thisUser.type === "host" ? (
                        <div className="badge badge-error">host</div>
                      ) : (
                        ""
                      )}
                    </span>
                    {thisHost &&
                      thisUser.username !== data.currentUser.username &&
                      (!allowed.includes(thisUser.userId) ? (
                        <button
                          className="flex-no-shrink  ml-1 btn btn-info btn-xs"
                          onClick={() =>
                            session.signal({
                              data: thisUser.userId,
                              type: "allow",
                            })
                          }
                        >
                          Set as a debator
                        </button>
                      ) : (
                        <button
                          className="flex-no-shrink  ml-1 btn btn-outline btn-xs btn-error"
                          onClick={() =>
                            session.signal({
                              data: thisUser.userId,
                              type: "disallow",
                            })
                          }
                        >
                          Set as a guest
                        </button>
                      ))}
                  </div>
                );
              })}
          </span>
          <div className="modal-action">
            <label htmlFor="my-modal-2" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
      <span className="text-3xl ml-4">
        {debate.title}{" "}
        <label
          htmlFor="my-modal-2"
          className="badge badge-info modal-button cursor-pointer"
        >
          <AiFillEye />
          {users.length}
        </label>
      </span>
      <div
        className="grid grid-cols-4 gap-2 w-screen"
        style={{ height: "86vh" }}
      >
        <div className=" col-span-3 border-2 bg-neutral">
          <div
            className={
              leftDebater && rightDebater
                ? "grid grid-cols-2 gap-1 h-full"
                : "grid grid-cols-1 gap-1 h-full"
            }
          >
            {leftDebater && (
              <>
                <Video
                  stream={leftDebater}
                  muted={muted.left}
                  isMe={publisher === leftDebater}
                  thisHost={thisHost}
                  mute={mute}
                  kick={kick}
                  side={"left"}
                  vote={vote}
                />{" "}
              </>
            )}
            {rightDebater && (
              <>
                <Video
                  stream={rightDebater}
                  muted={muted.right}
                  isMe={publisher === rightDebater}
                  thisHost={thisHost}
                  mute={mute}
                  kick={kick}
                  side={"right"}
                  vote={vote}
                />{" "}
              </>
            )}
          </div>
        </div>
        <div className="border-2 p-3">
          <div className="grid grid-rows-10 gap-1 h-full">
            <div className="flex justify-between items-center row-span-1">
              <button
                className="btn btn-success m-1"
                onClick={() => vote("left")}
              >
                {leftDebater?.stream?.connection?.data
                  ? JSON.parse(leftDebater.stream.connection.data).clientData
                      .username
                  : "Left"}
                <div className="badge ml-2 badge-outline">
                  {leftVotes.length}
                </div>
              </button>
              Vote
              <button
                className="btn btn-error m-1"
                onClick={() => vote("right")}
              >
                {rightDebater?.stream?.connection?.data
                  ? JSON.parse(rightDebater.stream.connection.data).clientData
                      .username
                  : "Right"}
                <div className="badge ml-2 badge-outline">
                  {rightVotes.length}
                </div>
              </button>
            </div>
            <div className=" row-span-1">
              {timer.active && (
                <Countdown
                  date={
                    +timer.timestamp + Math.floor(timer.time) * 60 * 1000 - 1000
                  }
                  onComplete={() =>
                    setTimer({ timestamp: Date.now(), time: 0, active: false })
                  }
                  renderer={(props) => (
                    <>
                      <span className="font-mono text-4xl countdown flex justify-center">
                        {+props.hours > 0 && (
                          <>
                            <span style={{ "--value": props.hours }}></span>:
                          </>
                        )}
                        {+props.minutes > 0 && (
                          <>
                            <span style={{ "--value": props.minutes }}></span>:
                          </>
                        )}
                        {<span style={{ "--value": props.seconds }}></span>}
                        <ImCancelCircle
                          size={15}
                          onClick={() => {
                            session.signal({
                              data: JSON.stringify({
                                timestamp: Date.now(),
                                time: 0,
                              }),
                              type: "timer",
                            });
                          }}
                          className="cursor-pointer"
                        />
                      </span>
                    </>
                  )}
                />
              )}
              {thisHost && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    session.signal({
                      data: JSON.stringify({
                        timestamp: Date.now(),
                        time: +input2,
                      }),
                      type: "timer",
                    });
                    setInput2("");
                  }}
                >
                  <div className="form-control">
                    <label className="label"></label>
                    <div className="relative">
                      <input
                        className="w-full pr-16 input input-secondary input-bordered"
                        type="number"
                        value={input2}
                        placeholder="timer (m)"
                        onChange={(e) => setInput2(e.target.value)}
                      />
                      <button className="absolute top-0 right-0 rounded-l-none btn">
                        Set
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="row-span-3">
              {host ? (
                <Video
                  stream={host}
                  muted={muted.host}
                  isMe={publisher === host}
                  side="host"
                />
              ) : (
                <></>
              )}
            </div>
            <div className="flex border-2 justify-center items-center space-x-4">
              {(thisHost ||
                (data.currentUser && allowed.includes(data.currentUser._id))) &&
                (!publisher ? (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      let publisher = OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: undefined,
                        publishAudio: true,
                        publishVideo: true,
                        resolution: "640x480",
                        frameRate: 30,
                        insertMode: "APPEND",
                        mirror: false,
                      });
                      session.publish(publisher);
                      setPublisher(publisher);
                      session.on("signal:kick", (event) => {
                        if (event.data === data.currentUser._id) {
                          toast.error("you have been kicked", {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                          publisher.stream.disposeWebRtcPeer();
                          publisher.stream.disposeMediaStream();
                          session.unpublish(publisher);
                          setPublisher();
                        }
                      });
                    }}
                  >
                    Stream
                  </button>
                ) : (
                  <></>
                ))}
              {publisher && (
                <>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      publisher.stream.disposeWebRtcPeer();
                      publisher.stream.disposeMediaStream();
                      session.unpublish(publisher);
                      setPublisher();
                    }}
                  >
                    Leave
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      publisher.publishAudio(!publisher.stream.audioActive);
                      setAudioOff(!audioOff);
                    }}
                  >
                    {audioOff ? <FiMicOff /> : <BsMic />}
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
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
            <div className="row-span-5 h-full">
              <div className="overflow-auto h-5/6">
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  session.signal({
                    data: JSON.stringify({
                      input,
                      user: data.currentUser.username,
                    }),
                    type: "my-chat",
                  });
                  setInput("");
                }}
              >
                <div className="form-control">
                  <label className="label"></label>
                  <div className="flex space-x-2">
                    <input
                      placeholder="Chat"
                      className="w-full input input-bordered"
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={!data.currentUser}
                    />
                    <button
                      className="btn"
                      type="submit"
                      disabled={!data.currentUser}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex h-72 w-full">
      <button
        onClick={async () => {
          let token = await instance.post("/openViduToken", {
            room: roomSlug,
          });
          if (token) {
            resetThenJoin();

            session.connect(token.data, {
              clientData: {
                type:
                  data.currentUser?._id === room.data.room.user
                    ? "host"
                    : "debater",
                username: data.currentUser
                  ? data.currentUser.username
                  : "Guest",
                userId: data.currentUser ? data.currentUser._id : 0,
              },
            });
          }
        }}
        className="btn btn-wide btn-lg animate-pulse m-auto bg-blue-500 border-none"
      >
        Join as {data.currentUser ? data.currentUser.username : "Guest"}
      </button>
    </div>
  );
}
