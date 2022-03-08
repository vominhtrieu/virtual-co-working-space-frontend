import 'antd/dist/antd.css';
import "./Login.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { Row, Col} from 'antd';
import { faGlobe, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiFacebookFill, 
    RiGithubFill,
    RiGoogleFill, 
    RiLinkedinFill,
    RiTwitterLine
 } from "react-icons/ri";

 type FormData = {
    email: string,
    password: string,
  };

const Login=()=>{
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit(data => console.log(data));
  
    return (
        <>
            <FontAwesomeIcon
                style={{
                    color: "#DDDDDD",
                    float: "right",
                    marginTop: "20px",
                    marginRight: "40px",
                    fontSize: "20px"
                }}
                icon={faGlobe} />

            <div style={{ clear: "right" }}>
            </div>

            <Row justify="space-around" style={{ marginTop: "100px" }}>
                <Col span={6}>
                    <form onSubmit={onSubmit}>
                        <h1 style={{ color: "white", textAlign: "left", fontSize: "30px" }}>Login</h1>
                        <div className="input-form">
                            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "10px", color: "#DDDDDD" }} />
                            {/* <input type="text" placeholder="Email" id="username" required /> */}
                            <input type="text" placeholder="Email"{...register("email",{required:true,minLength: 6,pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}/>
                        </div>
                        {errors.email && <span style={{color:"red"}}>Email is valid</span>}

                        <div className="input-form">
                            <FontAwesomeIcon icon={faKey} style={{ marginRight: "10px", color: "#DDDDDD" }} />
                            {/* <input type="password" placeholder="Password" id="password" required /> */}
                            <input type="password" placeholder="Password" {...register("password",{required:true,minLength: 6})}/>
                        </div>
                        {errors.password && <span style={{color:"red"}}>Password is valid</span>}
                        <div className="input-text">
                            <a style={{ textAlign: "left" }}>Forgot password?</a>
                        </div>


                        <button type="submit" className="btn-login">Log In</button>

                        <div className="input-text">
                            <a>Not a member? <b>Register now.</b> </a>
                        </div>

                        <div className="bar">
                            <div className="left-bar"></div>
                            <span className="text-bar">or</span>
                            <div className="right-bar"></div>
                        </div>

                        <div className="social">
                            <div className="fb">
                                <RiFacebookFill/>
                            </div>
                            <div className="git">
                                <RiGithubFill/>
                            </div>
                            <div className="gg">
                                <RiGoogleFill/>
                            </div>
                            <div className="in">
                                <RiLinkedinFill/>
                            </div>
                            <div className="twitter">
                                <RiTwitterLine/>
                            </div>
                        </div>
                    </form>
                </Col>
                <Col span={10}>
                    <img width="80%" src="./images/login.svg" alt="" />
                </Col>
            </Row>
        </>
    );
}

export default Login;