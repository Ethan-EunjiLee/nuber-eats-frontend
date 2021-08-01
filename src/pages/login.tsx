import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { ApolloError, gql, useMutation } from "@apollo/client";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import nuberLogo from "../images/uberEats.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

// * ts + useForm 통합해서 사용하려면 type을 보여줄 수 있도록 interface 설정 필요
interface ILoginForm {
  email: string;
  password: string;
}

/**
 * * mutation 이름을 설정해줄 수 있지만(Potato Mutation), 이 이름이 back-end로 넘어가는건 아니다. Front-End를 위한 영역
 * * $: Apollo에게 이게 변수라는 것을 알려주는 역할(변수마다 처음 1번만 적어주면 된다)
 * * 예전거
 * * mutation loginMutation($email: String!, $password: String!) {
 * *    login(input: { email: $email, password: $password }) {
 */
const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  // * react-hook-form useForm()을 이용해 react에서 form을 간단하게 구현
  const {
    register,
    getValues,
    formState: { errors, isValid }, //* errors를 이용하면 validation 후 message 출력 기능 구현 가능  */
    handleSubmit,
    watch, // * 실시간으로 변화를 감지
  } = useForm<ILoginForm>({
    mode: "onBlur", // * mode를 onBlur로 설정할 경우 포커스 나갈 때 마다 validation이 체크된다.
  });

  // * useMutation의 옵션으로 넣어줄 onCompleted 함수 구현
  const onCompleted = (loginMutationResult: loginMutation) => {
    const {
      login: { error, ok, token },
    } = loginMutationResult;
    if (ok) {
      console.log("token: ", token);
    }
  };

  // * useMutation의 옵션으로 넣어줄 onError 함수 구현
  // * ApolloError: 연결이 안되면 발생 => backend에서 request를 받아주지 않아서, 인증이 필요하거나, url이 잘못됐을 경우 등등
  // * backend에서 OutputDto에 만들어준 error가 아님
  const onError = (error: ApolloError) => {};

  // * useMutation의 파라미터로 mutation에 필요한 파라미터를 바로 넣어줄 수 있다.
  // * data: loginMutationResult => data 변수명을 loginMutationResult로 변경
  // * loading: mutation이 발생하면 loading은 true나 false 상태
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    // * BaseMutationOptions<TData,TVariables>.onCompleted?: ((data: loginMutation) => void) | undefined
    onCompleted,
    // * BaseMutationOptions<TData,TVariables>.onError?: ((error: ApolloError) => void) | undefined
    onError,
    // * 아래 항목으로 하면 실시간으로 바로바로 값이 변화한다.
    // * 여기에 넣거나 찐 Mutation 안에 넣거나 하면 된다.
    // variables: {
    //   loginInput: {
    // email: watch("email"), // * watch가 데이터 변화를 감지한다.
    // password: watch("password"),
    //   },
    // },
  });
  // * 이 배열의 첫 변수는 mutation function
  // * loading: mutation이 실행되고 있다는 의미
  // * data: 실제로 backend에서 넘어온 데이터

  const onSubmit = () => {
    // * mutation에 연결하면 성공하거나 실패할 때 까지 loading은 true 상태
    // * 즉 loading이 false인 경우에만(mutation연결 안 된 경우에만) id,pw를 제출하도록 설정한 것
    if (!loading) {
      console.log("getValues(): ", getValues());
      const { email, password } = getValues();
      // * codegen을 이용해 만들어준 interface를 useMutation의 type으로 설정해줬기 때문에 variables 타입들이 알아서 지정된다.
      loginMutation({
        // * 아래 항목은 원래 loginMutaion의 파라미터로 넣어준 값
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  // * lg:mt-28 => 큰 스크린용은 따로 설정
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {
              //** * 강의 버전과 달리 현재는 register에 이름을 반드시 적어주어야 한다. */
              ...register("email", {
                required: "Email is required",
              })
            }
            required //** * html에서 필수 처리 */
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
          {/*validation에서 걸러질 경우 메세지 출력*/}
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              //** * minLength: 최소 길이 */
              // minLength: 10,
            })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {/*validation에서 걸러질 경우 메세지 출력*/}
          {errors.password?.message && (
            // <span className="font-medium text-red-500">
            //   {errors.password?.message}
            // </span>
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"Password must be more than 10 chars"} />
            // <span className="font-medium text-red-500">
            //   Password must be more than 10 chars
            // </span>
          )}
          <Button canClick={isValid} loading={loading} actionText={"Log in"} />
          {/* backend 연결 후 넘어온 output에서 error값이 존재할 경우*/}
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
