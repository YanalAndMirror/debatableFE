import { useEffect, useRef, useState } from "react";
import { BsMic } from "react-icons/bs";
import { FiMicOff } from "react-icons/fi";
import { CgRemove } from "react-icons/cg";
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";

const Video = ({ stream, muted, mute, thisHost, side, kick, isMe }) => {
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
      <div className="relative flex items-center justify-center h-full  overflow-hidden">
        <span className="absolute top-0 left-0 flex  z-40  bg-black bg-opacity-25 text-white text-2xl">
          {(!stream.stream.audioActive || muted) && <FiMicOff />}
          {JSON.parse(stream.stream.connection.data).clientData.username}
        </span>
        <ul className="relative z-30  menu px-3 mt-48 shadow-lg bg-base-100 rounded-box horizontal transition-opacity duration-1000 ease-out opacity-0 hover:opacity-100">
          {thisHost && (
            <>
              <li>
                <a
                  onClick={() => {
                    mute(side);
                    setIsMuted(!isMuted);
                  }}
                >
                  {muted ? (
                    <FiMicOff color="red" title="unmute for everyone" />
                  ) : (
                    <BsMic
                      color="red"
                      title="mute for everyone"
                      title="mute for everyone"
                    />
                  )}
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    kick(
                      JSON.parse(stream.stream.connection.data).clientData
                        .userId
                    )
                  }
                >
                  <CgRemove title="kick" color="red" />
                </a>
              </li>
            </>
          )}

          <li>
            <a>
              <span
                onClick={() => {
                  setVolume({
                    ...volume,
                    muted: !volume.muted,
                  });
                }}
              >
                {volume.muted ? (
                  <FiVolumeX />
                ) : volume.number > 60 ? (
                  <FiVolume2 />
                ) : volume.number > 15 ? (
                  <FiVolume1 />
                ) : (
                  <FiVolume />
                )}
              </span>
              <input
                onChange={(e) => {
                  setVolume({
                    muted: false,
                    number: +e.target.value,
                  });
                }}
                type="range"
                max="100"
                value={volume.number}
                className="range range-xs"
              />
            </a>
          </li>
        </ul>

        <video
          className="absolute z-10 w-full h-full"
          autoPlay
          ref={userVideo}
          muted={muted || isMe}
        />
      </div>
    </>
  );
};
export default Video;
