import 'react-phone-number-input/style.css';
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const LogIn = ({users}) => {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const eye = <FontAwesomeIcon icon={faEye} />;

    const checkPhoneAndPassword = () => {
        let user = users.filter(item => item.phone === phone && item.password === password);
        if (user[0]) {
            sessionStorage.setItem("id", user[0].id)
            navigate("chats");
        } else {
            setError("The entered password or phone number is incorrect!");
        }
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };
    
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
                            value={phone}
                            onChange={setPhone}
                            required
                        />
                    </label>
                    <label htmlFor="password"> 
                        <span>Password</span> <br />
                        <div className='password__input'>
                            <input type={passwordShown ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => {setPassword(e.target.value); setError("")}}
                                onClick={checkPhoneAndPassword} 
                                required
                            />
                            <i onClick={togglePassword}>{eye}</i>
                        </div>
                    </label><br />
                    <p className='error'>{error}</p>
                    <button type="submit" className="btn" onClick={checkPhoneAndPassword}>Sign In</button>
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
                <Link to="sign-up"><span> Sign Up</span></Link>
            </footer>
        </section>
    )     
}   

export default LogIn;