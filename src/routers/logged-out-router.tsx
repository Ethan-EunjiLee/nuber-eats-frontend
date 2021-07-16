// * React를 위한 Component 작성 시, 파일 확장자를 ts 대신 tsx로 작성해야 한다.

import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
  // * 로그인 버튼을 클릭한 reactvie variables로 설정한 isLoggedInVar의 값을 true로 변경시킨다.
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={onClick}> Click to login</button>
    </div>
  );
};
