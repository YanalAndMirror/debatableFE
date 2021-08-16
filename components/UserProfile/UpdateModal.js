import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, gql, useQuery } from '@apollo/client';
import { USER_UPDATE } from '../../providers/apollo/mutations';

export default function UpdateModal({ user }) {
  const [updateUser] = useMutation(USER_UPDATE);

  const [profile, setProfile] = useState({
    username: user?.username,
    email: user?.email,
    photo: user?.photo,
  });
  console.log('modal', profile);
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateUser({
        variables: profile,
      });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target?.files[0]);
    const res = await axios.post(`http://localhost:4000/uploadImage`, formData);
    setProfile({ ...profile, photo: res.data });
  };

  return (
    <div>
      <label for="update-modal">
        <div className="justify-center card-actions rounded-none">
          <div className="btn btn-outline rounded-none">Edit Profile</div>
        </div>
      </label>
      <input type="checkbox" id="update-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username:</span>
              </label>
              <input
                type="text"
                value={profile?.username}
                placeholder="username"
                class="input input-bordered"
                onChange={handleChange}
              />
            </div>
            {profile?.photo ? (
              <div class="m-6 indicator">
                <div class="indicator-item">
                  <button
                    class="btn btn-circle btn-xs md:btn-xs lg:btn-xs xl:btn-xs"
                    onClick={() => setProfile({ ...profile, photo: null })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-1 h-1 stroke-current md:w-6 md:h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="grid w-32 h-32 bg-base-300 place-items-center">
                  <img src={profile?.photo} width="200px" />
                </div>
              </div>
            ) : (
              <label>
                <input
                  class="text-sm cursor-pointer w-36 hidden"
                  type="file"
                  onChange={uploadImage}
                />
                Photo: <div className="btn mt-1">Select</div>
              </label>
            )}
          </p>
          <div className="modal-action">
            <label
              for="update-modal"
              className="btn mt-1"
              onClick={handleSubmit}
            >
              Update
            </label>
            <label for="update-modal" className="btn btn-outline mt-1">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
