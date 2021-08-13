import { FaRegComments } from "react-icons/fa";
import VotingBar from "../components/Debate/VotingBar";
import ArgueModal from "../components/Debate/ArgueModal";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const my_query = gql`
  query {
    currentUser @client {
      _id
      username
    }
  }
`;
export default function Debate() {
  let [isOpen, setIsOpen] = useState(false);
  const { loading, data } = useQuery(my_query);
  if (loading) return <>loading</>;
  console.log(data);
  return (
    <>
      {data?.currentUser ? data.currentUser.username : "NOT LOGGED IN"}
      <div className="md:container md:mx-auto bg-white">
        <div className="card shadow rounded-none">
          <div className="card-body">
            <div className="card-actions float-right">
              <FaRegComments /> 64
            </div>
            <VotingBar />
            <h2 className="card-title">Do God Exist</h2>
            <p>Rerum reiciendis beatae tenetur excepturi</p>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 divide-x h-full">
              <div className="text-green-600 ">
                <div className="justify-between flex">
                  <div>I Agree</div>
                  <div className="mr-2">
                    <ArgueModal agree="true" />
                  </div>
                </div>
              </div>
              <div className="text-red-600 pl-4">
                {" "}
                <div className="justify-between flex">
                  <div>I Disagree</div>
                  <div className="mr-2">
                    <ArgueModal agree="false" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table w-full ">
          <tr>
            <td style={{ padding: 0, borderRight: 0 }}>
              <div className="card shadow rounded-none">
                <div className="card-body">
                  <div className="card-actions float-right">
                    <FaRegComments /> 64
                  </div>
                  <progress
                    className="progress progress-success w-1/6"
                    value="70"
                    max="100"
                  ></progress>
                  <p>Rerum reiciendis beatae tenetur excepturi</p>
                </div>
              </div>
            </td>
            <td style={{ padding: 0 }}>
              <div className="card shadow rounded-none">
                <div className="card-body">
                  <div className="card-actions">
                    <FaRegComments /> 64
                  </div>
                  <progress
                    className="progress progress-success w-1/6"
                    value="70"
                    max="100"
                  ></progress>
                  <p>Rerum reiciendis beatae tenetur excepturi</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
