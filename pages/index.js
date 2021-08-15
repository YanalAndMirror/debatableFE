import Body from "../components/Body/Body";
import Header from "../components/Header";
import client from "../providers/apollo/client";
import { getDebates } from "../providers/apollo/queries";

export default function Home({ debates }) {
  return (
    <>
      <Header />
      <Body debates={debates} />
    </>
  );
}
export async function getServerSideProps() {
  const { data } = await client.query({
    query: getDebates,
  });

  return {
    props: {
      debates: data.debates,
    },
  };
}
