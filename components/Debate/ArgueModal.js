import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AiFillPlusSquare } from 'react-icons/ai';

export default function ArgueModal({ agree }) {
  const [argue, setArgue] = useState({});
  const handleChange = (event) => {
    setArgue({ ...argue, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <label for="my-modal-2">
        <AiFillPlusSquare size="34px" />
      </label>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p>
            <label class="label ">
              <span class="label-text">Argue</span>
            </label>
            <textarea
              style={{ width: '100%' }}
              class="textarea h-24 textarea-bordered w-max"
              placeholder="argue"
              onChange={handleChange}
              name="argue"
            ></textarea>
          </p>
          <div className="modal-action">
            <label for="my-modal-2" className="btn btn-primary">
              Post
            </label>
            <label for="my-modal-2" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
