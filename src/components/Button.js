const Button = ({ children, style, ...rest }) => {
  const buttonStyle = {
    background: "#EBE645",
    padding: "1rem 2rem",
    color: "#000957",
    fontSize: 14,
    fontWeight: "bold",
    pointerEvents: "auto",
    border: 0,
    borderRadius: 10,
    cursor: "pointer",
  };
  const combineStyle = { ...buttonStyle, ...style };

  return (
    <button style={combineStyle} {...rest}>
      {children}
    </button>
  );
};

export default Button;
