import { useEffect, useRef } from "react";

const Video = ({ stream, muted, mute, thisHost, side, kick }) => {
  const userVideo = useRef({});
  useEffect(() => {
    if (stream) stream.addVideoElement(userVideo.current);
  }, [stream]);
  if (!stream) return <></>;
  return (
    <>
      <video width="640" height="480" autoPlay ref={userVideo} muted={muted} />
      {JSON.parse(stream.stream.connection.data).clientData.username}
      {thisHost && (
        <>
          <button class="btn btn-outline btn-xs" onClick={() => mute(side)}>
            mute
          </button>
          ||
          <button
            class="btn btn-outline btn-xs"
            onClick={() =>
              kick(JSON.parse(stream.stream.connection.data).clientData.userId)
            }
          >
            kick
          </button>
        </>
      )}
    </>
  );
};
export default Video;
