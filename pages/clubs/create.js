import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import instance from '../../components/utils/instance';
import { CREATE_CLUB } from '../../providers/apollo/mutations';
import { getClubs } from '../../providers/apollo/queries';

export default function createClubs() {
  const router = useRouter();

  const [createClub] = useMutation(CREATE_CLUB);
  const [club, setClub] = useState({ photo: null, inviteType: 'any' });
  const handleChange = (event) => {
    setClub({ ...club, [event.target.name]: event.target.value });
  };
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target?.files[0]);
    const res = await instance.post(`/uploadImage`, formData);
    setClub({ ...club, photo: res.data });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createClub({
      variables: club,
      update: (cache, { data: { createClub } }) => {
        let data;
        data = cache.readQuery({
          query: getClubs,
        });
        if (data) {
          cache.writeQuery({
            query: getClubs,
            data: {
              clubs: {
                ...data.clubs,
                myClubs: [...data.clubs.myClubs, createClub],
              },
            },
          });
        }
      },
    });
    router.push('/clubs');
  };
  return (
    <div className=" min-h-full">
      <div className="md:container md:mx-auto mt-36 text-base-content ">
        <div class="form-control ">
          <label class="label w-20">
            <span class="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            class="input input-bordered border-2"
          />
        </div>
        <div class="p-6 card border-2 w-1/6 mt-2">
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Public</span>
              <input
                type="radio"
                name="inviteType"
                checked={club.inviteType === 'any'}
                class="radio radio-secondary"
                value="any"
                onChange={handleChange}
              />
            </label>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Private</span>
              <input
                type="radio"
                name="inviteType"
                checked={club.inviteType === 'adminOnly'}
                class="radio radio-accent"
                value="adminOnly"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <label class="label ">
          <span class="label-text">Image</span>
        </label>

        {club.photo ? (
          <div class="m-6 indicator">
            <div class="indicator-item">
              <button
                class="btn btn-circle btn-xs md:btn-xs lg:btn-xs xl:btn-xs"
                onClick={() => setClub({ ...club, photo: null })}
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
            <div class="grid w-32 h-32  place-items-center">
              <img src={club.photo} width="200px" />
            </div>
          </div>
        ) : (
          <label>
            <input
              class="text-sm cursor-pointer w-36 hidden"
              type="file"
              onChange={uploadImage}
            />
            <div className="btn">Select</div>
          </label>
        )}
        <br />
        <button class="btn btn-outline ml-2 mb-36 float-right">Cancel</button>
        {!club.name || !club.photo ? (
          <button class="btn float-right btn-disabled" onClick="">
            Create Club
          </button>
        ) : (
          <button class="btn float-right" onClick={handleSubmit}>
            Create Club
          </button>
        )}
      </div>
    </div>
  );
}
