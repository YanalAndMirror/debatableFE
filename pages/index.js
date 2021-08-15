import { useQuery } from "@apollo/client";
import Body from "../components/Body/Body";
import Header from "../components/Header";
import client from "../providers/apollo/client";
import { getDebates } from "../providers/apollo/queries";

export default function Home() {
  const { loading, data } = useQuery(getDebates);
  if (loading) return <>loading</>;
  return (
    <>
      <Header />
      <Body debates={data.debates} />
    </>
  );
}
