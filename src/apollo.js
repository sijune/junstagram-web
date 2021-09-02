import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const isDarkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  //isLoggedInVar(false);
  history?.replace();
  window.location.reload();
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  isDarkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  isDarkModeVar(false);
};

const httpLink = createHttpLink({
  // 빌드 시 NODE_ENV와 함께 빌드된다.
  // 개발 시엔 로컬 url
  // 운영 시엔 heroku url
  uri:
    process.env.NODE_ENV === "production"
      ? "https://justagram-backend.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

//token설정을 추가적으로 해야한다. link: Apollo 클라이언트가 데이터 소스와 소통하는 방식
//Request에 몇가지 항목 추가
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    //cache에 저장 시 User 오브젝트는 username 기준으로 캐시 업데이트
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
  link: authLink.concat(httpLink),
});
