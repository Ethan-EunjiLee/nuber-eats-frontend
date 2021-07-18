import React from "react";
import { LoggedOutRouter } from "./routers/logged-out-router";
import { useReactiveVar } from "@apollo/client";
import { LoggedInRouter } from "./routers/logged-in-router";
import { isLoggedInVar } from "./apollo";

function App() {
  // * gql로 query문 사용하지 않아도 useReactiveVar를 이용해 값 가져올 수 있다.
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log("isLoggedIn: ", isLoggedIn);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;

/////////////////////////////////////////////////////////////////////////////////////

// * 쿼리안에 들어간 isLoggedIn은 typepolices의 쿼리문에서 적어준 isLoggedIn과 철자가 똑같아야 한다.
// * @client:: graphQL이 서버가 아니라 클라이언트 단에 있는 isLoggedIn 필드을 사용한다.(로컬 캐시한테 가서 정보를 얻어온다.)
// const IS_LOOGED_IN = gql`
//   query isLoggedIn {
//     isLoggedIn @client
//   }
// `;

// * 앱은 언제나 유저가 로그인 상태인지 물어보고 로그인되지 않은 상태라면 logged out router를 출력
// function App() {
//   const {
//     data: { isLoggedIn },
//   } = useQuery(IS_LOOGED_IN);
//   console.log("isLoggendIn: ", isLoggedIn);
//   return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
// }
//
// export default App;
