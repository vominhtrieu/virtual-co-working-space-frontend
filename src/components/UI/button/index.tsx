import {ButtonProps} from "./types";

const Button = (props: ButtonProps) => {
    const {className, children, type, variant, onClick,disabled, style = {}} = props;
    return (
        <button 
            style={style} 
            className={`btn btn--${variant} btn--${className}`} 
            onClick={onClick} 
            type={type}
            disabled={disabled}
            >
            {children}
        </button>
    );
};

export default Button;
