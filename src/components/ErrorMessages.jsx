import React from "react";

const ErrorMessages = ({ error }) => {
  return (
    <>{error && <p className="text-red-500 text-sm text-center mt-2 font-bold">{error}</p>}</>
  );
};

export default ErrorMessages;
