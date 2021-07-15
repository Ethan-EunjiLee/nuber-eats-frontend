import { ApolloClient, InMemoryCache } from "@apollo/client";

// * InMemoryCache의 typePolicies: 로컬 전용 필드 등록
// * read(): read함수가 정의된 필드는 쿼리 요청이 들어올 때 마다, 캐시는 해당 함수를 호출하여 필드값을 계산한다.

export const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // * 백엔드 URL
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return new Date();
            },
          },
        },
      },
    },
  }),
});
