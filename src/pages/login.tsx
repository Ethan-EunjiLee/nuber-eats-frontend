import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { gql, useMutation } from "@apollo/client";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

// * ts + useForm 통합해서 사용하려면 type을 보여줄 수 있도록 interface 설정 필요
interface ILoginForm {
  email: string;
  password: string;
}

/**
 * * mutation 이름을 설정해줄 수 있지만(Potato Mutation), 이 이름이 back-end로 넘어가는건 아니다. Front-End를 위한 영역
 * * $: Apollo에게 이게 변수라는 것을 알려주는 역할(변수마다 처음 1번만 적어주면 된다)
 */
const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
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
    formState: { errors }, //* errors를 이용하면 validation 후 message 출력 기능 구현 가능  */
    handleSubmit,
  } = useForm<ILoginForm>();

  const [loginMutation, { data }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION);
  // * 이 배열의 첫 변수는 mutation function
  // * loading: mutation이 실행되고 있다는 의미
  // * data: 실제로 backend에서 넘어온 데이터

  const onSubmit = () => {
    console.log("getValues(): ", getValues());
    const { email, password } = getValues();
    // * codegen을 이용해 만들어준 interface를 useMutation의 type으로 설정해줬기 때문에 variables 타입들이 알아서 지정된다.
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <span className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
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
          <button className="btn mt-3">Login</button>
        </form>
      </div>
    </span>
  );
};
