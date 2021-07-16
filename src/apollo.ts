import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

// * InMemoryCache의 typePolicies: 로컬 전용 필드 등록
// * read(): read함수가 정의된 필드는 쿼리 요청이 들어올 때 마다, 캐시는 해당 함수를 호출하여 필드값을 계산한다.

export const isLoggedInVar = makeVar(false); // * makeVar에 넣어준 false는 그냥 default값으로 지정해준거!

export const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // * 백엔드 URL
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              // return new Date();
              // * return Boolean(localStorage.getItem("token")); // * localStorage에 토큰이 있는 경우 logged in 되었다는 걸 알려준다.
              // return false;
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
