interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className='main-btn' onClick={onClick}>
      {children}
    </button>
  );
};
// const Button = ({ children, style, ...rest }) => {
//     const buttonStyle = {
//         background: "#EBE645",
//         padding: "0.75rem 1rem",
//         color: "#000957",
//         fontSize: 14,
//         fontWeight: "bold",
//         pointerEvents: "auto",
//         border: 0,
//         borderRadius: 10,
//         cursor: "pointer",
//         boxShadow: "4px 4px black",
//     };
//     const combineStyle = { ...buttonStyle, ...style };

//     return (
//         <button style={combineStyle} {...rest}>
//             {children}
//         </button>
//     );
//     }

export default Button;