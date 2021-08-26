import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { userVar } from "../providers/apollo/vars";
import { USER_LOGIN } from "../providers/apollo/mutations";
import { USER_SIGNUP } from "../providers/apollo/mutations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Tab } from "@headlessui/react";
import client from "../providers/apollo/client";
import { getClubs, getUser } from "../providers/apollo/queries";

export default function Login() {
  const refetch = async () => {
    await client.refetchQueries({
      include: [getUser, getClubs],
    });
  };
  const [signIn] = useMutation(USER_LOGIN, {
    onCompleted(data) {
      if (data.signin !== null) {
        Cookies.set("token", data.signin.token);
        userVar(data.signin.user);
        refetch();
        setInput({ username: null, password: null });
      } else {
        toast.error("Please check your username/password!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  const [signup] = useMutation(USER_SIGNUP, {
    onCompleted(data) {
      if (data.signup !== null) {
        Cookies.set("token", data.signup.token);
        userVar(data.signup.user);
        refetch();
        setInput({ username: null, password: null });
      } else {
        toast.error("Please Check Your Username,Password,Email", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
            <form onSubmit={handelSignin} className="text-base-content">
              <li>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  value={input.username}
                  type="text"
                  placeholder="username"
                  name="username"
                  className="input input-bordered"
                  onChange={handelChangeSignin}
                />
              </li>
              <li>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  value={input.password}
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  onChange={handelChangeSignin}
                />
              </li>
              <li>
                {!input.password || !input.username ? (
                  <button className="btn mt-4 btn-disabled">Sign in</button>
                ) : (
                  <button className="btn mt-4">Sign in</button>
                )}
              </li>
            </form>
          </Tab.Panel>
          <Tab.Panel>
            {" "}
            <form onSubmit={handelSignup} className="text-base-content">
              <li>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  value={input.username}
                  type="text"
                  placeholder="username"
                  name="username"
                  className="input input-bordered"
                  onChange={handelChangeSignup}
                />
              </li>
              <li>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  value={input.email}
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                  onChange={handelChangeSignup}
                />
              </li>
              <li>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  value={input.password}
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  onChange={handelChangeSignup}
                />
              </li>
              <li>
                {!input.password || !input.username || !input.email ? (
                  <button className="btn mt-4 btn-disabled">Sign up</button>
                ) : (
                  <button className="btn mt-4">Sign up</button>
                )}
              </li>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
