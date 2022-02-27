// import React, { useState } from "react";
import 'antd/dist/antd.css';
import "./styles.css";
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import { faGlobe, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiFacebookFill, 
    RiGithubFill,
    RiGoogleFill, 
    RiLinkedinFill,
    RiTwitterLine
 } from "react-icons/ri";


function Login() {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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
                    <form>
                        <h1 style={{ color: "white", textAlign: "left", fontSize: "30px" }}>Login</h1>
                        <div className="input-form">
                            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "10px", color: "#DDDDDD" }} />
                            <input type="text" placeholder="Email" id="username" required />
                        </div>

                        <div className="input-form">
                            <FontAwesomeIcon icon={faKey} style={{ marginRight: "10px", color: "#DDDDDD" }} />
                            <input type="password" placeholder="Password" id="password" required />
                        </div>

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