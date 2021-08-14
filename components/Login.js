import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { userVar } from "../providers/apollo/vars";
import { USER_LOGIN } from "../providers/apollo/mutations";
import Cookies from "js-cookie";

export default function Login() {
  const [signIn, { loading, data, error }] = useMutation(USER_LOGIN);
  const [input, setInput] = useState({ username: "", password: "" });
  const handelSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("login");
      signIn({ variables: input });
    } catch (e) {
      console.log(e);
    }
  };
  if (!loading && data && input.username) {
    if (data.signin.token !== null) {
      console.log(data.signin.token);
      Cookies.set("token", data.signin.token);
      userVar(data.signin.user);
      setInput({ username: null, password: null });
    } else {
      //error
    }
  }
  const handelChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handelSubmit}>
      <li>
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          value={input.username}
          type="text"
          placeholder="username"
          name="username"
          class="input input-bordered"
          onChange={handelChange}
        />
      </li>
      <li>
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          value={input.password}
          type="password"
          placeholder="password"
          name="password"
          class="input input-bordered"
          onChange={handelChange}
        />
      </li>
      <li>
        <button className="btn mt-4">Sign in</button>
      </li>
      <li>
        <button className="btn mt-4">Sign up</button>
      </li>
    </form>
  );
}
