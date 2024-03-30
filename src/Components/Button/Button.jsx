import React from "react";
import { twMerge } from "tailwind-merge";
import { ArrowRight } from "react-feather";

import Spinner from "@/Components/Spinner/Spinner";

const Button = ({
  className,
  children,
  onClick,
  disabled = false,
  outlineButton,
  redButton,
  cancelButton,
  withArrow,
  useSpinnerWhenDisabled = false,
  whiteSpinner = false,
  ...inputProps
}) => {
  const classes = {
    red: ` text-white border-red-500 bg-red-500`,
    outline: `border-primary bg-white text-black`,
    cancel: ` bg-slate-100 text-black  border-slate-100`,
    disabled: ` bg-slate-400 text-black border-slate-400 active:transform-none cursor-not-allowed `,
  };

  return (
    <button
      type={inputProps.type || "button"}
      onClick={(event) => (onClick ? onClick(event) : "")}
      disabled={disabled ? true : false}
      className={twMerge(`bg-primary text-white border-primary 
       ${
         redButton
           ? classes.red
           : outlineButton
           ? classes.outline
           : cancelButton
           ? classes.cancel
           : disabled
           ? classes.disabled
           : ""
       } m-1 border-2 flex gap-2 items-center px-4 py-2 rounded-md active:scale-[.98] transition duration-200 text-base max-sm:text-sm max-sm:py-1 max-sm:px-3 ${
        className || ""
      }`)}
      {...inputProps}
    >
      {children}
      {useSpinnerWhenDisabled && disabled ? (
        <Spinner small white={redButton} />
      ) : withArrow ? (
        <ArrowRight className={`h-4 w-4 max-sm:h-3 max-sm:w-3`} />
      ) : (
        ""
      )}
    </button>
  );
};

export default Button;
