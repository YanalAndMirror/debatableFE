import { FaRegComments } from 'react-icons/fa';
import { AiFillPlusSquare } from 'react-icons/ai';
import VotingBar from '../components/VotingBar';
export default function Debate() {
  return (
    <>
      <div className="md:container md:mx-auto">
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
                    <AiFillPlusSquare size="34px" />
                  </div>
                </div>
              </div>
              <div className="text-red-600 pl-4">
                {' '}
                <div className="justify-between flex">
                  <div>I Disagree</div>
                  <div className="mr-2">
                    <AiFillPlusSquare size="34px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table w-full">
          <tr>
            <td>
              <div className="card shadow rounded-none w-3/6">
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
          </tr>
          <tr>
            <td>
              <div className="card shadow rounded-none w-3/6 float-right">
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
