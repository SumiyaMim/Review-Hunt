import React, {useState} from 'react'
import "./Signup.css"
import axios from "axios";
import {baseUrl, token} from "../config/constants"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        type: "personal",
        name: "",
        email: "",
        password: "",
        photo: []
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(
            `${baseUrl}/api/customers`,
            {
                "data": state
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `Bearer ${token}`
                }
            }
        ).then((res) => {
            // toast("Successful");
            navigate("/signin")
        })
    }

    return (
        <div className='container-signup'>
            <br></br>
            <h2>Create Account</h2>
            <p>Please fill in this form to create an account</p><br></br>
            <h4>Account Type</h4>
            <form onSubmit={handleSubmit}>
                <div className='checkbox'>
                    <input
                        type="radio"
                        id="signup_check"
                        name="signup_check"
                        onChange={() => setState(({...state, type: "personal"}))}
                    /> Personal

                    <input
                        type="radio"
                        id="signup_check"
                        name="signup_check"
                        onChange={() => setState(({...state, type: "business"}))}
                    /> Business
                </div>

                {state.type === "personal" ? (
                <>
                <input
                type="text"
                id="name"
                placeholder="Name"
                required
                value={state.name}
                onChange={(event) => setState(({ ...state, name: event.target.value }))}
                />
                </>
                ) : (
                <>
                <input
                type="text"
                id="company_name"
                placeholder="Company Name"
                required
                value={state.name}
                onChange={(event) => setState(({ ...state, name: event.target.value }))}
                />
                </>
                )}

                <br></br>
                <input
                    type="email"
                    id='email'
                    placeholder='Email'
                    required
                    onChange={(event) => setState(({...state, email: event.target.value}))}
                />
                <br></br>
                <input
                    type="password"
                    id='pass'
                    placeholder='Password'
                    required
                    onChange={(event) => setState(({...state, password: event.target.value}))}
                />
                <br></br>
                <button className='signup-btn' type="submit">SIGN UP</button>
            </form>
        </div>
    )
}

export default Signup
