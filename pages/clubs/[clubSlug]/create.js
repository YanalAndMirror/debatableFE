import React, { useState } from "react";
import { CREATE_DEBATE } from "../../../providers/apollo/mutations";
import { useMutation, useQuery } from "@apollo/client";
import {
  currentUser,
  getClub,
  getDebates,
  getTags,
} from "../../../providers/apollo/queries";
import { useRouter } from "next/router";
import Select from "react-select";
import instance from "../../../components/utils/instance";
export default function create() {
  const { loading, data } = useQuery(getTags);
  const [selectState, setSelectState] = useState(false);
  const [debate, setDebate] = useState({ photo: null, tags: [] });
  const [createDebate] = useMutation(CREATE_DEBATE);
  const router = useRouter();
  const { clubSlug } = router.query;
  const myClub = useQuery(getClub, {
    variables: { slug: clubSlug },
  });
  if (loading || myClub.loading) return <>Loading</>;
  if (clubSlug !== "public" && !myClub.data.club) return <>403</>;

  const options = data.tags.map((tag) => {
    return {
      value: tag._id,
      label: tag.title,
    };
  });

  const handleChange = (event) => {
    setDebate({ ...debate, [event.target.name]: event.target.value });
  };
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target?.files[0]);
    const res = await instance.post(`/uploadImage`, formData);
    setDebate({ ...debate, photo: res.data });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      createDebate({
        variables: { ...debate, club: myClub.data.club?._id },
        update: (cache, { data: { createDebate } }) => {
          let data;
          if (!myClub.data.club) {
            data = cache.readQuery({
              query: getDebates,
              variables: {
                debatesStart: 0,
                debatesAmount: 9,
                debatesOrder: "hot",
              },
            });
            if (data && data.debates.length < 9) {
              cache.writeQuery({
                query: getDebates,
                variables: {
                  debatesStart: 0,
                  debatesAmount: 9,
                  debatesOrder: "hot",
                },
                data: { debates: [...data.debates, createDebate] },
              });
            }
          } else {
            data = cache.readQuery({
              query: getDebates,
              variables: {
                debatesStart: 0,
                debatesAmount: 9,
                debateClub: myClub.data.club._id,
              },
            });
            if (data && data.debates.length < 9) {
              cache.writeQuery({
                query: getDebates,
                variables: {
                  debatesStart: 0,
                  debatesAmount: 9,
                  debateClub: myClub.data.club._id,
                },
                data: { debates: [...data.debates, createDebate] },
              });
            }
          }
        },
      });
      if (!myClub.data.club) {
        router.push("/");
      } else router.push(`/clubs/${myClub.data.club.slug}/`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className=" min-h-full">
      <div className="md:container md:mx-auto mt-36 text-base-content">
        {myClub.data.club && (
          <label class="label w-20">
            <span class="label-text">CLUB : {myClub.data.club.name}</span>
          </label>
        )}
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
          style={{ width: "100%" }}
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
            <div class="grid w-32 h-32  place-items-center">
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
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={options}
          className="mt-4"
          isDisabled={selectState}
          isClearable="true"
          onChange={(value) => {
            setDebate({ ...debate, tags: value.map((v) => v.value) });
            if (debate["tags"].length > 1) {
              setSelectState(true);
            }
          }}
        />
        <br />
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
      </div>
    </div>
  );
}
