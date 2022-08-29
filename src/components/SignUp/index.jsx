import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [value, setValue] = useState();
    
    const navigate = useNavigate();

    return (          
        <section className="registration"> 
            <div className="sign-up">
                <div className="sign-up__title">
                    <h3>Sign Up to Mercury</h3>
                </div>
                <form className="sign-up__form">
                    <label htmlFor="username"> 
                        <span>Username</span> <br />
                        <input type="text" name="username" id="username" placeholder="Enter your username" required/>
                    </label>
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
                        <input type="password" name="password" id="password" placeholder="Enter the password" required/>
                    </label>
                    <label htmlFor="repassword"> 
                        <span>Re-password</span> <br />
                        <input type="password" name="repassword" id="repassword" placeholder="Repeat your password" required/>
                    </label><br />
                    <button type="button" className="btn" onClick={() => navigate("/mercury-messenger/", { replace: true })}>Sign Up</button>
                </form>
            </div>
            <footer>
                Back to
                <Link to="/mercury-messenger/"><span> Sing In</span></Link>
            </footer>
        </section>
    )     
}   

export default SignUp;