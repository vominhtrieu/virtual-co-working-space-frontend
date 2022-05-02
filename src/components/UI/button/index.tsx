import {ButtonProps} from "./types";

const Button = (props: ButtonProps) => {
    const {className, children, type, variant, onClick, style = {}} = props;
    return (
        <button style={style} className={`btn btn--${variant} btn--${className}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;
