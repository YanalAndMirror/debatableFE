import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { userVar } from "./vars";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      "x-access-token": token,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          currentUser: {
            read() {
              return userVar();
            },
          },
        },
      },
    },
  }),
  request: (operation, forward) => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      operation.setContext({
        headers: {},
      });
    }
    return forward(operation);
  },
});
export default client;
