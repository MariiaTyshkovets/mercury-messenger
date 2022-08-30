import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const SignUp = ({users}) => {
    
    const [phone, setPhone] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [repasswordShown, setRepasswordShown] = useState(false);
    const [state, setState] = useState({username: "", password: "", repassword: ""});
    const [validation, setValidation] = useState({username: false, password: false, repassword: false})
    const [error, setError] = useState({username: "", password: "", repassword: ""});
    
    const navigate = useNavigate();

    const eye = <FontAwesomeIcon icon={faEye} />;

    const addNewUser = (e) => {

        e.preventDefault();

        const data = {
            userName: state.username,
            phone: phone,
            password: state.password,
            isOnline: false
        }

        const config = {
            method: "post",
            url: "https://mercury-messanger.herokuapp.com/users/",
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }

        axios(config).then(res => console.log(res))
        .catch(err => {
            navigate("/mercury-messenger/error", {state: {error: err.message}})
        }).finally(() => {
            navigate("/mercury-messenger/", { replace: true })
        })
    }

    const inputChange = (event) => {
        setState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const setStateError = (name, message) => {
        setError((prevState) => {
            return {
                ...prevState,
                [name]: message  
            }
        })
    }

    const setStateValid = (name, message) => {
        setValidation((prevState) => {
            return {
                ...prevState,
                [name]: message
            }
        })
    }

    const checkInput = (nameOfInput, value) => {
        const patternUsername = /^[a-zA-Z0-9_.]+$/;

        switch (nameOfInput) {
            case 'repassword':
                if (state.password === state.repassword) {
                    setStateValid(nameOfInput, true); 
                    setStateError(nameOfInput, '');
                } else {
                    setStateValid(nameOfInput, false);
                    setStateError(nameOfInput, 'The password and re-password do not match');
                }
                break;
            case 'password':
                if (patternUsername.test(value)) {
                    setStateValid(nameOfInput, true); 
                    setStateError(nameOfInput, '');
                } else {
                    setStateValid(nameOfInput, false);
                    setStateError(nameOfInput, `The ${nameOfInput} should be written only in Latin letters and numbers`);
                }
                break;
            default:
                if (users.filter(item => item.userName === value)[0] || !patternUsername.test(value)) {
                    setStateValid(nameOfInput, false);
                    setStateError(nameOfInput, `The ${nameOfInput} should be unique and written only in Latin. You can use ".", "_" and numbers too.`)
                } else{
                    setStateValid(nameOfInput, true);
                    setStateError(nameOfInput, ''); 
                }
                break;
        }
    }

    const validationInputs = (event) => {

        const nameOfInput = event.target.name;
        const value = state[nameOfInput];

        if (value === "") {
            setStateError(nameOfInput, `The input cannot be empty!`);
        } else {
            checkInput(nameOfInput, value);
        } 
    }

    const isFormValid = () => {
        let isValid = (validation.username) 
        ? (validation.password) 
        ? (validation.repassword) 
        ? true : false : false : false;
        return isValid
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleRepassword = () => {
        setRepasswordShown(!repasswordShown);
    };

    return (          
        <section className="registration"> 
            <div className="sign-up">
                <div className="sign-up__title">
                    <h3>Sign Up to Mercury</h3>
                </div>
                <form className="sign-up__form">
                    <label htmlFor="username"> 
                        <span>Username</span> <br />
                        <input type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter your username"
                            value={state.username}
                            onChange={inputChange} 
                            onBlur={validationInputs}
                            required
                        />
                    </label>
                    <p className="error">{error.username}</p>
                    <label htmlFor="phone"> 
                        <span>Phone</span> <br />
                        <PhoneInput
                            placeholder="Enter phone number"
                            name="phone"
                            value={state.phone}
                            onChange={setPhone}
                            onBlur={validationInputs}
                            required
                        />
                    </label>
                    <p className="error"></p>
                    <label htmlFor="password" className="password"> 
                        <span>Password</span> <br />
                        <div className='password__input'>
                            <input 
                                type={passwordShown ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                placeholder="Enter the password"
                                value={state.password}
                                onChange={inputChange} 
                                onBlur={validationInputs}
                                required
                            />
                            <i onClick={togglePassword}>{eye}</i>
                        </div>
                    </label>
                    <p className="error">{error.password}</p>
                    <label htmlFor="repassword" className="repassword"> 
                        <span>Re-password</span> <br />
                        <div className='repassword__input'>
                            <input 
                                type={repasswordShown ? "text" : "password"} 
                                name="repassword" 
                                id="repassword" 
                                placeholder="Repeat your password"
                                value={state.repassword}
                                onChange={inputChange} 
                                onBlur={validationInputs}
                                required
                            />
                            <i onClick={toggleRepassword}>{eye}</i>
                        </div>
                    </label>
                    <p className="error">{error.repassword}</p>
                    <button type="button" className="btn" onClick={addNewUser} disabled={!isFormValid()}>Sign Up</button>
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