import React from "react";

const Button = ({ text, className, onClick, isLoading }) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {isLoading ? (
          <div className="w-4 h-4 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin text-center"></div>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default Button;
