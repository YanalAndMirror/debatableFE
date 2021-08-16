import React, { useState } from 'react';
import DropzoneUtil from '../components/utils/Dropzone';
import { CREATE_DEBATE } from '../providers/apollo/mutations';
import { useMutation, gql, useQuery } from '@apollo/client';
import { currentUser, getDebates, getUser } from '../providers/apollo/queries';
import { useRouter } from 'next/router';
import axios from 'axios';
export default function create() {
  const router = useRouter();
  const [debate, setDebate] = useState({ photo: null });
  const { data } = useQuery(currentUser);

  const [createDebate] = useMutation(CREATE_DEBATE);

  const handleChange = (event) => {
    setDebate({ ...debate, [event.target.name]: event.target.value });
  };
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target?.files[0]);
    const res = await axios.post(`http://localhost:4000/uploadImage`, formData);
    setDebate({ ...debate, photo: res.data });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      createDebate({
        variables: debate,
        update: (cache, { data: { createDebate } }) => {
          const data = cache.readQuery({
            query: getDebates,
          });
          if (data) {
            cache.writeQuery({
              query: getDebates,
              data: { debates: [...data.debates, createDebate] },
            });
          }
        },
      });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  if (!data.currentUser) {
    return <>You should be signed in to create a debate</>;
  }

  return (
    <div className="md:container md:mx-auto mt-36 ">
      <div class="form-control">
        <label class="label w-20">
          <span class="label-text">Title</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
          class="input input-bordered"
        />
      </div>
      <label class="label ">
        <span class="label-text">argue</span>
      </label>
      <textarea
        class="textarea h-24 textarea-bordered"
        style={{ width: '100%' }}
        placeholder="argue"
        onChange={handleChange}
        name="argue"
      ></textarea>
      <label class="label ">
        <span class="label-text">Image</span>
      </label>

      {debate.photo ? (
        <div class="m-6 indicator">
          <div class="indicator-item">
            <button
              class="btn btn-circle btn-xs md:btn-xs lg:btn-xs xl:btn-xs"
              onClick={() => setDebate({ ...debate, photo: null })}
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
            <img src={debate.photo} width="200px" />
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
      {/* <div className="float-right bg-gray-50"> */}
      <button class="btn btn-outline ml-2 mb-36 float-right">Cancel</button>
      {!debate.title || !debate.argue || !debate.photo ? (
        <button class="btn float-right btn-disabled" onClick="">
          Create Debate
        </button>
      ) : (
        <button class="btn float-right" onClick={handleSubmit}>
          Create Debate
        </button>
      )}

      {/* </div> */}
    </div>
  );
}
