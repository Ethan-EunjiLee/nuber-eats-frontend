import React from "react";
import { LoggedOutRouter } from "./routers/logged-out-router";
import { gql, useQuery } from "@apollo/client";

// * 쿼리안에 들어간 isLoggedIn은 typepolices의 쿼리문에서 적어준 isLoggedIn과 철자가 똑같아야 한다.
// * @client:: graphQL이 서버가 아니라 로컬 캐시한테 가서 정보를 얻어온다.
const IS_LOOGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

function App() {
  const { data } = useQuery(IS_LOOGED_IN);
  console.log("data: ", data);
  return <LoggedOutRouter />;
}

export default App;
