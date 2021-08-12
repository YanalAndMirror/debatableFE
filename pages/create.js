import React, { useState } from 'react';
import DropzoneUtil from '../components/utils/Dropzone';

export default function create() {
  const [debate, setDebate] = useState({});
  const handleChange = (event) => {
    setDebate({ ...debate, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
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
        <span class="label-text">Description</span>
      </label>
      <textarea
        class="textarea h-24 textarea-bordered"
        style={{ width: '100%' }}
        placeholder="description"
        onChange={handleChange}
        name="description"
      ></textarea>
      <label class="label ">
        <span class="label-text">Image</span>
      </label>

      <DropzoneUtil setDebate={setDebate} debate={debate} />
      <br />
      {/* <div className="float-right bg-gray-50"> */}
      <button class="btn ml-2 mb-36 float-right">Cancel</button>
      <button class="btn btn-primary float-right" onClick={handleSubmit}>
        Create Debate
      </button>

      {/* </div> */}
    </div>
  );
}
