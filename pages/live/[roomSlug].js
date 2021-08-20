import React from "react";
import { useQuery } from "@apollo/client";
import { currentUser, getRoom } from "../../providers/apollo/queries";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Video from "../../components/Video";
import instance from "../../components/utils/instance";
let openviduBrowser;
if (typeof window !== "undefined")
  openviduBrowser = require("openvidu-browser");
export default function profile() {
  const { data } = useQuery(currentUser);
  const router = useRouter();
  const { roomSlug } = router.query;

  const [OV, setOV] = useState(null);
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);

  const [join, setJoin] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState(null);
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
      type: "mute",
    });
  };
  const kick = (id) => {
    session.signal({
      data: id,
      type: "kick",
    });
  };
  useEffect(() => {
    if (!OV) {
      if (openviduBrowser) setOV(new openviduBrowser.OpenVidu());
    } else setSession(OV.initSession());
  }, [OV]);
  useEffect(async () => {
    if (session) session.disconnect();
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
      setUsers((users) => users.filter((user) => user !== event.connection));
    });
    session.on("signal:my-chat", (event) => {
      setChat((currentState) => [...currentState, event.data]);
    });
    session.on("signal:mute", (event) => {
      setMuted((currentState) => ({
        ...currentState,
        [event.data]: !currentState[event.data],
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
  }, [session]);
  const room = useQuery(getRoom, {
    variables: { slug: roomSlug },
  });
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

  if (!data || !room.data) return <>loading</>;
  if (!room.data.room) return <>Not Found</>;
  let streams = [publisher, ...subscribers].filter((a) => a !== undefined);
  streams.sort();
  let host = streams.find(
    (stream) =>
      JSON.parse(stream.stream.connection.data).clientData.type === "host"
  );
  streams = streams.filter(
    (stream) =>
      JSON.parse(stream.stream.connection.data).clientData.type !== "host"
  );
  let rightDebater = streams[0];
  let leftDebater = streams[1];
  let thisHost = data.currentUser?._id === room.data.room.user;

  return (
    <div class="container mx-auto">
      {join ? (
        <div class="grid grid-cols-4  gap-6">
          <div>
            {leftDebater && (
              <Video
                stream={leftDebater}
                muted={publisher === leftDebater ? true : muted.left}
                thisHost={thisHost}
                mute={mute}
                kick={kick}
                side={"left"}
              />
            )}
          </div>
          <div></div>
          <div>
            {rightDebater && (
              <Video
                stream={rightDebater}
                muted={publisher === rightDebater ? true : muted.right}
                thisHost={thisHost}
                mute={mute}
                kick={kick}
                side={"right"}
              />
            )}
          </div>
          <div class="row-span-3">
            <div class="overflow-visible h-24 ...">
              {chat.map((a) => {
                a = JSON.parse(a);
                return (
                  <>
                    {a.user} : {a.input}
                    <br />
                  </>
                );
              })}
              {users
                .filter(
                  (u) => JSON.parse(u.data).clientData.username !== "Guest"
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
                            class="btn btn-outline btn-xs"
                            onClick={() =>
                              session.signal({
                                data: thisUser.userId,
                                type: "allow",
                              })
                            }
                          >
                            Allow
                          </button>
                        ) : (
                          <button
                            class="btn btn-outline btn-xs btn-error"
                            onClick={() =>
                              session.signal({
                                data: thisUser.userId,
                                type: "disallow",
                              })
                            }
                          >
                            disallow
                          </button>
                        ))}
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
              <div class="form-control">
                <label class="label"></label>
                <div class="flex space-x-2">
                  <input
                    placeholder="Search"
                    class="w-full input input-primary input-bordered"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={!data.currentUser}
                  />
                  <button
                    class="btn btn-primary"
                    type="submit"
                    disabled={!data.currentUser}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="bg-white"></div>
          <div>
            {host && (
              <Video
                stream={host}
                muted={publisher === host ? true : muted.host}
              />
            )}
          </div>
          <div class="bg-white"></div>

          {(thisHost ||
            (data.currentUser && allowed.includes(data.currentUser._id))) &&
            (!publisher ? (
              <button
                class="btn btn-outline btn-primary"
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
                      alert("you have been kicked");
                      publisher.stream.disposeWebRtcPeer();
                      publisher.stream.disposeMediaStream();
                      session.unpublish(publisher);
                      setPublisher();
                    }
                  });
                }}
              >
                STREAM
              </button>
            ) : (
              <button
                class="btn btn-outline btn-primary"
                onClick={() => {
                  publisher.stream.disposeWebRtcPeer();
                  publisher.stream.disposeMediaStream();
                  session.unpublish(publisher);
                  setPublisher();
                }}
              >
                Stop Stream
              </button>
            ))}
          {publisher && (
            <>
              <button
                class="btn btn-outline btn-primary"
                onClick={() => {
                  publisher.publishAudio(!publisher.stream.audioActive);
                }}
              >
                myStream : {publisher.stream.audioActive ? "Mute" : "Umute"}
              </button>
              <button
                class="btn btn-outline btn-primary"
                onClick={() => {
                  publisher.publishVideo(!publisher.stream.videoActive);
                }}
              >
                myStream :{" "}
                {publisher.stream.videoActive
                  ? "Remove Video"
                  : "Bring Back Video"}
              </button>
            </>
          )}
          <button
            class="btn btn-outline btn-secondary"
            onClick={() => setMuted({ right: false, left: false, host: false })}
          >
            Mute all
          </button>
        </div>
      ) : (
        <div class="flex h-screen">
          <div class="m-auto">
            <button
              onClick={async () => {
                let token = await instance.post("/openViduToken", {
                  room: roomSlug,
                });
                if (token) {
                  setJoin(true);
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
              class="btn btn-wide btn-lg"
            >
              Join as {data.currentUser ? data.currentUser.username : "Guest"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
