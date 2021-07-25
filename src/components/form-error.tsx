import React from "react";

interface IFromErrorProps {
  errorMessage: string;
}

// * React.FC: React FunctionalComponent의 약자
export const FormError: React.FC<IFromErrorProps> = ({ errorMessage }) => (
  <span className="font-medium text-red-500">{errorMessage}</span>
);
