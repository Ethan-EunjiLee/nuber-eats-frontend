import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  // * 버튼을 클릭할 수 없는 경우 bg-gray-300 처리
  <button
    className={`text-lg font-medium focus:outline-none text-white py-4 transition-colors ${
      canClick
        ? "bg-lime-500 hover:bg-lime-700"
        : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
