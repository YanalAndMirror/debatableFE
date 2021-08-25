import { useEffect, useRef, useState } from "react";
import { BsMic } from "react-icons/bs";
import { FiMicOff } from "react-icons/fi";
const Video = ({ stream, muted, mute, thisHost, side, kick, vote }) => {
  const userVideo = useRef({});
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState({
    muted: false,
    number: 100,
  });
  useEffect(() => {
    if (stream) stream.addVideoElement(userVideo.current);
    console.log("here");
  }, [stream]);
  useEffect(() => {
    userVideo.current.volume = volume.muted ? 0 : volume.number / 100;
  }, [volume]);
  if (!stream) return <></>;
  return (
    <>
      <div style={{ position: "relative" }}>
        <video
          style={{ position: "relative", "z-index": 0 }}
          id="video"
          autoPlay
          ref={userVideo}
          muted={muted}
        />
        <div style={{ position: "absolute", top: 0, left: 0, "z-index": 1 }}>
          <ul class="menu px-3 shadow-lg bg-base-100 rounded-box horizontal">
            <li>
              <a>
                <BsMic />
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-body">
        <h2 class="card-title">
          {JSON.parse(stream.stream.connection.data).clientData.username}
        </h2>
        <div class="justify-center card-actions">
          {thisHost && (
            <>
              <button
                class="mr-1 ml-1 btn btn-outline btn-xs"
                onClick={() => {
                  mute(side);
                  setIsMuted(!isMuted);
                }}
              >
                {muted ? <BsMic /> : <FiMicOff />}
              </button>
              <button
                class="btn btn-outline btn-xs"
                onClick={() =>
                  kick(
                    JSON.parse(stream.stream.connection.data).clientData.userId
                  )
                }
              >
                Kick
              </button>{" "}
            </>
          )}
          <input
            onChange={(e) => {
              setVolume({
                ...volume,
                number: +e.target.value,
              });
            }}
            type="range"
            max="100"
            value={volume.number}
            class="range range-xs"
          />
          <button
            onClick={() => {
              setVolume({
                ...volume,
                muted: !volume.muted,
              });
            }}
          >
            {volume.muted ? "unmute" : "mute"} for me
          </button>
          <button
            onClick={() => {
              vote(side);
            }}
          >
            vote
          </button>
        </div>
      </div>
    </>
  );
};
export default Video;
