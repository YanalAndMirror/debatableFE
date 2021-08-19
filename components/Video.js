import { useEffect, useRef } from "react";

const Video = ({ stream, muted }) => {
  const userVideo = useRef({});
  useEffect(() => {
    stream.addVideoElement(userVideo.current);
  }, [stream]);
  return (
    <>
      <video width="640" height="480" autoPlay ref={userVideo} muted={muted} />
      {JSON.parse(stream.stream.connection.data).clientData.username}
    </>
  );
};
export default Video;
