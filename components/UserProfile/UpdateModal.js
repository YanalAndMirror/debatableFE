import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import { USER_UPDATE } from '../../providers/apollo/mutations';
import { useRouter } from 'next/dist/client/router';
import { Dialog } from '@headlessui/react';
export default function UpdateModal({ user, isOpen, setIsOpen }) {
  const [updateUser] = useMutation(USER_UPDATE);
  let completeButtonRef = useRef(null);
  const router = useRouter();
  const [profile, setProfile] = useState({
    photo: user?.photo,
  });
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
    setIsOpen(false);
  };
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target?.files[0]);
    const res = await axios.post(`http://localhost:4000/uploadImage`, formData);
    setProfile({ ...profile, photo: res.data });
  };

  return (
    <div>
      <div className="justify-center">
        <div className="btn btn-outline" onClick={() => setIsOpen(!isOpen)}>
          Edit Profile
        </div>
        {isOpen && (
          <div className="w-3/6 md:container md:mx-auto border-2 rounded mt-2">
            <p className="p-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username:</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  class="input input-bordered"
                  onChange={handleChange}
                />
                <label class="label">
                  <span class="label-text">Email:</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  class="input input-bordered"
                  onChange={handleChange}
                />
                <label class="label">
                  <span class="label-text">New password:</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
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
                  <span class="label-text">Photo:</span>
                  <br /> <div className="btn mt-1">Select</div>
                </label>
              )}

              <br />
              <label className="btn mt-1" onClick={handleSubmit}>
                Update
              </label>
            </p>
          </div>
        )}
      </div>{' '}
    </div>
  );
}
