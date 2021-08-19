import React from "react";
import { useQuery } from "@apollo/client";
import { getUser } from "../providers/apollo/queries";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Video from "../components/Video";
let openviduBrowser;
if (typeof window !== "undefined")
  openviduBrowser = require("openvidu-browser");

const OPENVIDU_SERVER_URL = "https://localhost:4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";
export default function profile() {
  // live demo
  const { data } = useQuery(getUser);
  //const router = useRouter();
  //const { room } = router.query;
  const room = "AaAa312x"; //hard coded

  // OpenVidu
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);

  // Room hooks
  const [join, setJoin] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState(null);
  const [muted, setMuted] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!OV) {
      if (openviduBrowser) setOV(new openviduBrowser.OpenVidu());
    } else setSession(OV.initSession());
  }, [OV]);
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
      setUsers((users) => [
        ...users,
        JSON.parse(event.connection.data).clientData.username,
      ]);
    });
    session.on("connectionDestroyed", (event) => {
      setUsers((users) =>
        users.filter(
          (user) =>
            user !== JSON.parse(event.connection.data).clientData.username
        )
      );
    });
    session.on("signal:my-chat", (event) => {
      setChat((currentState) => [...currentState, event.data]);
    });
  }, [session]);
  const createToken = async (sessionId) => {
    const data = JSON.stringify({ customSessionId: sessionId });
    let startSession;
    try {
      startSession = await axios.post(
        OPENVIDU_SERVER_URL + "/openvidu/api/sessions",
        data,
        {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      startSession = { data: { id: sessionId } };
    }

    const getToken = await axios.post(
      OPENVIDU_SERVER_URL +
        "/openvidu/api/sessions/" +
        startSession.data.id +
        "/connection",
      {},
      {
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      }
    );
    return getToken.data.token;
  };

  if (!data) return <>loading</>;
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
  return (
    <div class="container mx-auto">
      {join ? (
        <div class="grid grid-cols-4  gap-6">
          <div>
            {leftDebater && <Video stream={leftDebater} muted={muted} />}
          </div>
          <div></div>
          <div>
            {rightDebater && <Video stream={rightDebater} muted={muted} />}
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
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                session.signal({
                  data: JSON.stringify({ input, user: data.user.username }),
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
                    disabled={!data.user}
                  />
                  <button
                    class="btn btn-primary"
                    type="submit"
                    disabled={!data.user}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="bg-white"></div>
          <div>{host && <Video stream={host} muted={muted} />}</div>
          <div class="bg-white"></div>

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
            }}
          >
            STREAM
          </button>
          {publisher && (
            <>
              <button
                class="btn btn-outline btn-primary"
                onClick={() => {
                  publisher.publishAudio(!publisher.stream.audioActive);
                }}
              >
                Audio
              </button>
              <button
                class="btn btn-outline btn-primary"
                onClick={() => {
                  publisher.publishVideo(!publisher.stream.videoActive);
                }}
              >
                Video
              </button>
            </>
          )}
          <button
            class="btn btn-outline btn-secondary"
            onClick={() => setMuted(!muted)}
          >
            Mute ALL
          </button>
        </div>
      ) : (
        <div class="flex h-screen">
          <div class="m-auto">
            <button
              onClick={async () => {
                setJoin(true);
                let token = await createToken(room);
                session.connect(token, {
                  clientData: {
                    type: data.user ? "host" : "debater",
                    username: data.user ? data.user.username : "Guest",
                  },
                });
              }}
              class="btn btn-wide btn-lg"
            >
              Join {room}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
