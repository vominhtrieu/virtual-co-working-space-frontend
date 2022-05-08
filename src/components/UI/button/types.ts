import React from "react";

export interface ButtonProps {
  disabled?:boolean;
  children: React.ReactNode;
  className?:string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "primary" | "outlined";
  style?: React.CSSProperties;
}
