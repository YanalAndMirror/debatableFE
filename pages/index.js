import Head from "next/head";
import Body from "../components/Body/Body";
import Header from "../components/Header";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { userVar } from "../providers/vars";

const my_query = gql`
  query Query {
    user {
      _id
      username
      email
      photo
    }
  }
`;
export default function Home() {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}
