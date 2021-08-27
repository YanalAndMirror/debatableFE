import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { userVar } from "./vars";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: process.env.BACKEND + "/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token");

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
    if (token) {
      operation.setContext({
        headers: {},
      });
    }
    return forward(operation);
  },
});
export default client;
