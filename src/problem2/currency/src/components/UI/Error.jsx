import React from "react";

export const Error = ({ children, className }) => {
  return (
    <p className={"text-red-500 font-bold text-2xl " + className}>{children}</p>
  );
};
