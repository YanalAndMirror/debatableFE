import "tailwindcss/tailwind.css";

/**
 * @octowl
 *
 * Consider moving the apollo setup code into it's own file:
 * e.g. providers/apollo.js
 *
 * export default function Apollo({children}) {
 *  const client = new ApolloClient({
 *    uri: 'http://localhost:4000/graphql',
 *    cache: new InMemoryCache(),
 *  });
 *  return <ApolloProvider client={client}>{children}<ApolloProvider>
 * }
 *
 * Then you can import the whole provider here:
 *
 * import Apollo from '../providers/apollo.js'
 *
 * <Apollo>
 *  <Nav>
 *  <Component {...pageProps} />
 * </Apollo>
 *
 * This way as your apollo code gets more complex (which it might)
 * it won't pollute _app.js
 */
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Nav from "../components/Nav";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
