import React from "react";

const SearchBox = ({type, onChange, className, value, placeholder,onFocus,onBlur }) => {
  return (
    <div className="text-center">
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default SearchBox;
