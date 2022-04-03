export interface ButtonProps {
  children: React.ReactNode;
  className?:string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "primary" | "outlined";
}
