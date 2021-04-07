import clsx from "clsx";
import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps { 
  disabled?: boolean; 
  color?: 'green' | 'grey'; 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button : React.FC<ButtonProps> = ({ children, disabled, color, onClick, className }) => {
  const colors = {
    green: styles.buttonGreen,
    gray: styles.buttonGray,
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(className, styles.button, colors[color])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
