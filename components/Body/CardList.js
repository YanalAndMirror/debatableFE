import React from "react";
import CardItem from "./CardItem";

export default function CardList({ debates }) {
  debates = debates?.map((debate) => (
    <CardItem key={debate._id} debate={debate} />
  ));
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mt-4 ml-32 mr-32">
        {debates}
      </div>
    </>
  );
}
