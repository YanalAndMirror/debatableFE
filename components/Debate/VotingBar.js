import React from 'react';
import Rating from 'react-rating';
import { useQuery } from '@apollo/client';
import { currentUser } from '../../providers/apollo/queries';

export default function VotingBar({ argue, doVote, color }) {
  const user = useQuery(currentUser).data.currentUser;
  return (
    <div className="dropdown dropdown-hover dropdown-top ">
      <div tabindex="0">
        <progress
          className={
            color === 'green'
              ? `progress progress-success w-1/6`
              : `progress progress-error w-1/6`
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
        tabindex="0"
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
                  Neither{' '}
                </div>,
                <div className="badge badge-outline rounded-none ">Agree</div>,
                <div className="badge badge-outline rounded-none ">
                  Strongly agree
                </div>,
              ]}
              fullSymbol={[
                <div
                  className={`badge badge-outline rounded-none bg-${color}-100`}
                >
                  Strongly disagree
                </div>,
                <div
                  className={`badge badge-outline rounded-none bg-${color}-200`}
                >
                  Disagree
                </div>,
                <div
                  className={`badge badge-outline rounded-none bg-${color}-300`}
                >
                  Neither{' '}
                </div>,
                <div
                  className={`badge badge-outline rounded-none bg-${color}-400`}
                >
                  Agree
                </div>,
                <div
                  className={`badge badge-outline rounded-none bg-${color}-500`}
                >
                  Strongly agree
                </div>,
              ]}
              onChange={(e) => doVote(argue._id, e)}
            />
          ) : (
            'You need to be signed in to vote'
          )}
        </li>
      </ul>
    </div>
  );
}
