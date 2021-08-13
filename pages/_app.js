import { ApolloProvider } from "@apollo/client";
import "tailwindcss/tailwind.css";
import client from "../providers/apollo/client.js";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
