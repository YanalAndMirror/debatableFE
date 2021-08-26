import React from "react";
import Rating from "react-rating";
import { useQuery } from "@apollo/client";
import { currentUser } from "../../providers/apollo/queries";

export default function VotingBar({ argue, doVote, color, main }) {
  const user = useQuery(currentUser).data.currentUser;
  return (
    <div className="dropdown dropdown-hover dropdown-top ">
      <div tabIndex="0">
        <progress
          className={
            main === true && !argue.argueType
              ? `progress w-2/6`
              : argue.argueType === "agree"
              ? `progress progress-success w-2/6`
              : `progress progress-error w-2/6`
          }
          value={
            argue.votes.number > 0
              ? (argue.votes.amount / argue.votes.number) * 20
              : 50
          }
          max="100"
        ></progress>
      </div>
      <ul
        tabIndex="0"
        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-max"
      >
        <li>
          {user ? (
            <Rating
              emptySymbol={[
                <div className="badge badge-outline rounded-none">
                  Strongly disagree
                </div>,
                <div className="badge badge-outline rounded-none">
                  Disagree
                </div>,
                <div className="badge badge-outline rounded-none">
                  Neither{" "}
                </div>,
                <div className="badge badge-outline rounded-none ">Agree</div>,
                <div className="badge badge-outline rounded-none ">
                  Strongly agree
                </div>,
              ]}
              fullSymbol={[
                <div
                  className={
                    color === "green"
                      ? `badge badge-outline rounded-none bg-green-100`
                      : `badge badge-outline rounded-none bg-red-100`
                  }
                >
                  Strongly disagree
                </div>,
                <div
                  className={
                    color === "green"
                      ? `badge badge-outline rounded-none bg-green-200`
                      : `badge badge-outline rounded-none bg-red-200`
                  }
                >
                  Disagree
                </div>,
                <div
                  className={
                    color === "green"
                      ? `badge badge-outline rounded-none bg-green-300`
                      : `badge badge-outline rounded-none bg-red-300`
                  }
                >
                  Neither{" "}
                </div>,
                <div
                  className={
                    color === "green"
                      ? `badge badge-outline rounded-none bg-green-400`
                      : `badge badge-outline rounded-none bg-red-400`
                  }
                >
                  Agree
                </div>,
                <div
                  className={
                    color === "green"
                      ? `badge badge-outline rounded-none bg-green-500`
                      : `badge badge-outline rounded-none bg-red-500`
                  }
                >
                  Strongly agree
                </div>,
              ]}
              onChange={(e) => doVote(argue._id, e)}
            />
          ) : (
            "You need to be signed in to vote"
          )}
        </li>
      </ul>
    </div>
  );
}
