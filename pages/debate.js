import { FaRegComments } from 'react-icons/fa';
import { AiFillPlusSquare } from 'react-icons/ai';
export default function Debate() {
  return (
    <>
      <div class="md:container md:mx-auto">
        <div class="card shadow rounded-none">
          <div class="card-body">
            <div className="card-actions float-right">
              <FaRegComments /> 64
            </div>
            <progress
              class="progress progress-success w-1/6"
              value="70"
              max="100"
            ></progress>
            <h2 class="card-title">Do God Exist</h2>
            <p>Rerum reiciendis beatae tenetur excepturi</p>
          </div>
          <div class="card-body">
            <div class="grid grid-cols-2 divide-x h-full">
              <div className="text-green-600 ">
                <div class="justify-between flex">
                  <div>I Agree</div>
                  <div className="mr-2">
                    <AiFillPlusSquare size="34px" />
                  </div>
                </div>
              </div>
              <div className="text-red-600 pl-4">
                {' '}
                <div class="justify-between flex">
                  <div>I Disagree</div>
                  <div className="mr-2">
                    <AiFillPlusSquare size="34px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table w-full">
          <tr>
            <td>
              <div class="card shadow rounded-none w-3/6">
                <div class="card-body">
                  <div className="card-actions float-right">
                    <FaRegComments /> 64
                  </div>
                  <progress
                    class="progress progress-success w-1/6"
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
              <div class="card shadow rounded-none w-3/6 float-right">
                <div class="card-body">
                  <div className="card-actions">
                    <FaRegComments /> 64
                  </div>
                  <progress
                    class="progress progress-success w-1/6"
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
