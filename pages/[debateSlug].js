import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { BsArrowUpDown } from "react-icons/bs";
import VotingBar from "../components/Debate/VotingBar";
import ArgueModal from "../components/Debate/ArgueModal";
import { getDebate } from "../providers/apollo/queries";
import { useEffect, useState } from "react";
import { CREATE_ARGUE, VOTE_ARGUE } from "../providers/apollo/mutations";
import FadeIn from "react-fade-in";
import Pyramid from "../components/Pyramid";
export default function Home() {
  console.log("generate");
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [input, setInput] = useState(null);
  const { debateSlug, path } = router.query;
  const { loading, data } = useQuery(getDebate, {
    variables: { slug: debateSlug },
  });
  const [parent, setParent] = useState(path ?? null);
  useEffect(() => {
    if (parent != path) setParent(path);
  }, [path]);

  const [vote] = useMutation(VOTE_ARGUE);
  const [createArgue] = useMutation(CREATE_ARGUE);
  if (loading) return <>loading</>;
  const doVote = (argue, value) => {
    vote({
      variables: { argue, value },
    });
  };

  let mainArgue = data.debate.argues.find(
    (argue) =>
      (!parent && argue.parent == parent) || (parent && parent === argue._id)
  );
  const addArgue = () => {
    createArgue({
      variables: {
        argue: {
          content,
          parent: mainArgue._id,
          argueType: input,
          debate: data.debate._id,
        },
      },
      update: (cache, { data: { createArgue } }) => {
        const data = cache.readQuery({
          query: getDebate,
          variables: { slug: debateSlug },
        });
        if (data) {
          cache.writeQuery({
            query: getDebate,
            data: {
              debate: {
                ...data.debate,
                argues: [...data.debate.argues, createArgue],
              },
            },
          });
        }
      },
    });
    setInput(null);
    setContent(null);
  };
  const changeParent = (argueId) => {
    setParent(argueId);
    if (argueId) router.push(debateSlug + "?path=" + argueId);
  };

  let agreeArgues = data.debate.argues
    .filter(
      (argue) => argue.parent === mainArgue._id && argue.argueType === "agree"
    )
    .map((argue) => (
      <div className="card shadow rounded-none">
        <div onClick={() => changeParent(argue._id)} className="card-body">
          <div className="card-actions float-right">
            <BsArrowUpDown />
            {argue.votes.number > 0 &&
              argue.votes.amount / argue.votes.number +
                "/5 by " +
                argue.votes.number +
                " users"}
          </div>
          <VotingBar argue={argue} doVote={doVote} color="green" />

          <p>{argue.content}</p>
        </div>
      </div>
    ));
  let disagreeArgues = data.debate.argues
    .filter(
      (argue) =>
        argue.parent === mainArgue._id && argue.argueType === "disagree"
    )
    .map((argue) => (
      <div className="card shadow rounded-none">
        <div onClick={() => changeParent(argue._id)} className="card-body">
          <div className="card-actions float-right">
            <BsArrowUpDown />
            {argue.votes.number > 0 &&
              argue.votes.amount / argue.votes.number +
                "/5 by " +
                argue.votes.number +
                " users"}
          </div>
          <VotingBar argue={argue} doVote={doVote} color="red" />

          <p>{argue.content}</p>
        </div>
      </div>
    ));
  console.log(
    "w-full pr-16 input input-" +
      (input === "agree" ? "success" : "error") +
      " input-bordered"
  );
  return (
    <>
      <Pyramid
        debate={data.debate}
        parent={parent}
        changeParent={changeParent}
      />
      <div className="md:container md:mx-auto bg-white">
        <div className="card shadow rounded-none">
          <FadeIn>
            <div className="card-body">
              <div className="card-actions float-right">
                <BsArrowUpDown />
                {mainArgue.votes.number > 0 &&
                  mainArgue.votes.amount / mainArgue.votes.number +
                    "/5 by " +
                    mainArgue.votes.number +
                    " users"}
              </div>
              <VotingBar argue={mainArgue} color="green" doVote={doVote} />

              <h2 className="card-title">{mainArgue.content}</h2>
            </div>
          </FadeIn>

          <div className="card-body">
            <div className="grid grid-cols-2 divide-x h-full">
              <div className="text-green-600 ">
                <div className="justify-between flex">
                  <div
                    onClick={() => setInput(input !== "agree" ? "agree" : null)}
                  >
                    I Agree
                  </div>
                  <div className="mr-2">
                    <ArgueModal agree="true" />
                  </div>
                </div>
              </div>
              <div className="text-red-600 pl-4">
                {" "}
                <div className="justify-between flex">
                  <div
                    onClick={() =>
                      setInput(input !== "disagree" ? "disagree" : null)
                    }
                  >
                    I Disagree
                  </div>
                  <div className="mr-2">
                    <ArgueModal agree="false" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {input && (
            <div class="form-control">
              <div class="relative">
                <input
                  value={content}
                  type="text"
                  placeholder="Argue"
                  class={
                    input === "agree"
                      ? "w-full pr-16 input input-success  input-bordered"
                      : "w-full pr-16 input input-error input-bordered"
                  }
                  onChange={(e) => setContent(e.target.value)}
                />
                <button
                  onClick={addArgue}
                  class={
                    input === "agree"
                      ? "absolute top-0 right-0 rounded-l-none btn btn-success"
                      : "absolute top-0 right-0 rounded-l-none btn btn-error"
                  }
                >
                  {input}
                </button>
              </div>
            </div>
          )}
        </div>
        <div class="grid grid-cols-2 gap-0">
          <div style={{ padding: 0, borderRight: 0 }}>{agreeArgues}</div>
          <div style={{ padding: 0 }}>{disagreeArgues}</div>
        </div>
      </div>
    </>
  );
}
