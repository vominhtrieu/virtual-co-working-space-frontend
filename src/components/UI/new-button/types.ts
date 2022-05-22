import React from "react";

export interface NewButtonProps {
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "primary" | "secondary" | "outlined";
  content: string;
  icon?: React.ReactNode;
}
