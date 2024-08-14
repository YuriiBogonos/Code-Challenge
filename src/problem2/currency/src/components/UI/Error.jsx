import React from "react";

export const Error = ({ children, className }) => {
  return (
    <div
      class={"w-full p-4 mb-4 sm:text-xl text-red-800 rounded-lg bg-red-200/90 " + className}
      role="alert"
    >
      {children}
    </div>
  );
};
