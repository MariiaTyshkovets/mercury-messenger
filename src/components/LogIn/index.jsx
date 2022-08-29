import 'react-phone-number-input/style.css';
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

const LogIn = () => {

    const [value, setValue] = useState();

    const navigate = useNavigate();
    
    return (
        <section className="login">
            <div className="sign-in">
                <div className="sign-in__title">
                    <h3>Sign In to Mercury</h3>
                    <p>Please enter your phone and password</p>
                </div>
                <form className="sign-in__form">
                    <label htmlFor="phone"> 
                        <span>Phone</span> <br />
                        <PhoneInput 
                            placeholder="Enter phone number"
                            value={value}
                            onChange={setValue}
                        />
                    </label>
                    <label htmlFor="password"> 
                        <span>Password</span> <br />
                        <input type="password" name="password" id="password" placeholder="Enter your password" required/>
                    </label><br />
                    <button type="button" className="btn" onClick={() => navigate("chats")}>Sign In</button>
                </form>
            </div>
            <div className="connection">
                <div className="connection__item">
                    <img src={require("../../assets/images/google.png")} alt="Google icon" /> 
                    <span>Continue with Google</span>
                </div>
                <div className="connection__item">
                    <img src={require("../../assets/images/fb.png")} alt="Facebook icon" /> 
                    <span>Continue with Facebook</span>  
                </div>
            </div>
            <footer>
                Don't have an account?
                <Link to="sign-up"><span> Sing Up</span></Link>
            </footer>
        </section>
    )     
}   

export default LogIn;