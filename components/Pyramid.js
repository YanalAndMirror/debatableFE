import React from 'react';
import Xarrow from 'react-xarrows';

export default function Pyramid({ debate: { argues }, parent, changeParent }) {
  const root = argues.find((argue) => argue.parent === null);
  let thisParent;
  if (parent == null) thisParent = root._id;
  else thisParent = parent;
  let arguesArrays = [];
  while (thisParent) {
    const father = argues.find((argue) => argue._id === thisParent);
    const children = argues.filter((argue) => argue.parent === thisParent);
    arguesArrays.push(children);
    thisParent = father.parent;
  }
  arguesArrays.reverse();

  arguesArrays = arguesArrays.map((arguesArray) => {
    arguesArray.sort((a, b) => {
      if (a.argueType < b.argueType) {
        return -1;
      }
      if (a.argueType > b.argueType) {
        return 1;
      }
      return 0;
    });
    let argueLine = arguesArray.map((argue) => (
      <>
        <div
          className={
            argue.argueType === 'agree'
              ? 'tooltip tooltip-success tooltip-bottom transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 rounded-md w-10 h-5  border-success border-2 m-1.5'
              : 'tooltip tooltip-error tooltip-bottom transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 rounded-md w-10 h-5  border-error border-2 m-1.5'
          }
          id={argue._id}
          data-tip={argue.content}
          onClick={() => changeParent(argue._id)}
        />
        <Xarrow
          start={argue.parent}
          end={argue._id}
          showHead={false}
          strokeWidth={1}
          lineColor={argue.argueType === 'agree' ? '#009485' : '#FF5724'}
        />
      </>
    ));
    return <div class="flex justify-center">{argueLine}</div>;
  });
  return (
    <>
      <center>
        <div
          className="rounded-md w-10 h-5 border-neutral border-2 m-2"
          id={root._id}
          title={root.content}
          onClick={() => changeParent(null)}
        />
        {arguesArrays}
      </center>
    </>
  );
}
