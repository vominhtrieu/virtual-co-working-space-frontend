const Button = ({ children, ...rest }) => {
    return (
        <button class="main-btn" {...rest}>
            {children}
        </button>
    );
};

export default Button;
