import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { ApolloError, gql, useMutation } from "@apollo/client";
import nuberLogo from "../images/uberEats.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { UserRole } from "../__generated__/globalTypes";

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole; // * backend에서 오는 enum
}

// * $: apollo에 이게 변수라는 걸 알려준다.
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    // * 기본값 설정
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const onError = (error: ApolloError) => {};

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onError,
  });

  const onSubmit = () => {};

  console.log("watch: ", watch());

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
            })}
            required
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
            })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"Password must be more than 10 chars"} />
          )}
          <select {...register("role", { required: true })} className="input">
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={isValid}
            loading={false}
            actionText={"Create Account"}
          />
        </form>
        <div>
          Already have an account??
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
