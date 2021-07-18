// * React를 위한 Component 작성 시, 파일 확장자를 ts 대신 tsx로 작성해야 한다.

import React from "react";
import { useForm } from "react-hook-form";

// * ts와 useForm을 통합하기 위한 작업물
interface IForm {
  email: string;
  password: string;
}

/**
 * * register
 * * input, select 요소를 등록하고, react hook form의 validation을 적용할 수 있게 해준다.
 * * 강의와 react hook form 버전이 달라, ref 없이 {...register}만 해당 input에 넣는 것만으로도 사용 할 수 있다.
 */

export const LoggedOutRouter = () => {
  // * 로그인 버튼을 클릭한 reactvie variables로 설정한 isLoggedInVar의 값을 true로 변경시킨다.
  // const onClick = () => {
  //   isLoggedInVar(true);
  // };
  // * react-hook-form을 이용해 react의 form을 간단한게 구현 가능
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }, // * 강의에서는 errors라고만 해도 출력이 됐었....
  } = useForm<IForm>();
  const onSubmit = () => {
    console.log("onSubmit: ", watch());
  };
  const onInvalid = () => {
    console.log("cannot create account");
  };

  // * 에러 타입이 달라질 때 마다 새로 호출된다.
  console.log("errors: ts", errors.email?.message);
  console.log("errors.email?.type: ", errors.email?.type);
  console.log("error.email: ", errors.email);

  // * type을 submit으로 지정하지 않아도 버튼을 클릭하면 자동으로 submit처리가 된다.... 신기하네
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            // * 구 방식: ref={register}
            // * 강의와 달리, 현재 버전에는 register로 이름이 등록된 경우에만 watch를 통해 볼 수 있다.
            {...register("email", {
              required: "This is required", // * => html의 required와 별개로 작동, true 대신에 에러 메세지 입력 가능
              // * validate는 parameter로 해당 input이 입력받은 값을 넘겨준다.
              // validate: (email: string) => {
              //   return email.includes("@gmail.com");
              //   // * gmail인 경우만 받아준다. => gmail이 아닌 경우 onInvalid로 넘어간다.
              // },
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/, // * 위와 동일
            })}
            name="email"
            type="email"
            placeholder="email"
          />
          {
            /**
             * * interface를 이용해 ts와 통합한 경우 각 항목들만 따로 가져와 errors에서 호출할 수 있다.
             * * ex:errors.email
             * * 아래 예시: errors.email의 message값이 있을 경우 해당 내용을 출력한다.
             * * 현재 email은 required 부분에만 message를 넣어놓았기 때문에 아래 경우는 required인데도 입력되지 않은 경우가 해당된다.
             */

            errors.email?.message && (
              <span className="font-bold text-red-600">
                {errors.email?.message}
              </span>
            )
          }
          {
            /**
             * * 아래 예시: errors.email의 type이 pattern과 일치할 경우
             * * (pattern 때문에 문제가 발생한 경우) "Only Gmail Allowed" 출력
             */
            errors.email?.type === "pattern" && (
              <span className="font-bold text-red-600">Only Gmail Allowed</span>
            )
          }
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
