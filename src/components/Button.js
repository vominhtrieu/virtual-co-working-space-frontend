const Button = ({ children, ...rest }) => {
    return (
        <button className="main-btn" {...rest}>
            {children}
        </button>
    );
};

export default Button;
