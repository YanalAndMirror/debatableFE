import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { userVar } from "../providers/apollo/vars";
import { USER_LOGIN } from "../providers/apollo/mutations";
import { USER_SIGNUP } from "../providers/apollo/mutations";

import Cookies from "js-cookie";
import { Tab } from "@headlessui/react";

export default function Login() {
  const [signIn] = useMutation(USER_LOGIN, {
    onCompleted(data) {
      console.log(data);
      if (data.signin !== null) {
        Cookies.set("token", data.signin.token);
        userVar(data.signin.user);
        setInput({ username: null, password: null });
      } else {
        alert("error");
      }
    },
  });

  const [signup] = useMutation(USER_SIGNUP, {
    onCompleted(data) {
      console.log(data);

      if (data.signup !== null) {
        Cookies.set("token", data.signup.token);
        userVar(data.signup.user);
        setInput({ username: null, password: null });
      } else {
        alert("error");
      }
    },
  });

  const [input, setInput] = useState({ username: "", password: "" });

  const handelSignin = (e) => {
    e.preventDefault();
    try {
      signIn({ variables: input });
    } catch (e) {
      console.log(e);
    }
  };
  const handelSignup = (e) => {
    e.preventDefault();
    try {
      signup({ variables: input });
    } catch (e) {
      console.log(e);
    }
  };

  const handelChangeSignin = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handelChangeSignup = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Tab.Group>
        <Tab.List>
          <Tab
            className={({ selected }) =>
              selected ? "tab tab-bordered tab-active" : "tab tab-bordered"
            }
          >
            Login
          </Tab>
          <Tab
            className={({ selected }) =>
              selected ? "tab tab-bordered tab-active" : "tab tab-bordered"
            }
          >
            Signup
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <form onSubmit={handelSignin}>
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
                  onChange={handelChangeSignin}
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
                  onChange={handelChangeSignin}
                />
              </li>
              <li>
                <button className="btn mt-4">Sign in</button>
              </li>
            </form>
          </Tab.Panel>
          <Tab.Panel>
            {" "}
            <form onSubmit={handelSignup}>
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
                  onChange={handelChangeSignup}
                />
              </li>
              <li>
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  value={input.email}
                  type="text"
                  placeholder="Email"
                  name="email"
                  class="input input-bordered"
                  onChange={handelChangeSignup}
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
                  onChange={handelChangeSignup}
                />
              </li>
              <li>
                <button className="btn mt-4">Sign up</button>
              </li>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
