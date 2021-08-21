import { useEffect, useRef, useState } from 'react';
import { BsMic } from 'react-icons/bs';
import { FiMicOff } from 'react-icons/fi';
const Video = ({ stream, muted, mute, thisHost, side, kick }) => {
  const userVideo = useRef({});
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    if (stream) stream.addVideoElement(userVideo.current);
  }, [stream]);
  if (!stream) return <></>;
  return (
    <>
      <div class="card text-center shadow-2xl">
        <figure class="px-10 pt-10">
          <video
            width="640"
            height="480"
            autoPlay
            ref={userVideo}
            muted={muted}
            class="rounded-xl"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {' '}
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
                      JSON.parse(stream.stream.connection.data).clientData
                        .userId
                    )
                  }
                >
                  Kick
                </button>{' '}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Video;
