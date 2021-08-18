import { useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { getTags } from "../providers/apollo/queries";

export default function Header() {
  const { loading, data } = useQuery(getTags);
  if (loading) return <>Loading</>;
  const myTags = data.tags.map((tag) => (
    <Link href={"tag/" + tag.title}>
      <div className="badge badge-outline m-2">{tag.title}</div>
    </Link>
  ));
  return (
    <center>
      <div className="card lg:card-side text-base-content">
        <div className="card-body">
          <div className="card-title text-2xl">Explore Debates</div>
          <p>
            {myTags}
            <a href="#">See more...</a>
          </p>
        </div>
      </div>
      <div className="divider"></div>
    </center>
  );
}
