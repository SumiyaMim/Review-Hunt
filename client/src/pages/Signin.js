import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import "./Signin.css"
import axios from "axios";
import {baseUrl, token} from "../config/constants";
import {toast} from "react-toastify";

const Signin = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(
            `${baseUrl}/api/customers?populate=*&fields[0]=email&fields[1]=name&fields[2]=type&filters[email][$eq]=${state.email}&filters[password][$eq]=${state.password}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `Bearer ${token}`
                }
            }
        ).then((res) => {
            if (res?.data?.data?.length) {
                localStorage.setItem("user", JSON.stringify(res.data.data[0]))
                toast.success("Successful");
                navigate("/");
                setTimeout(() => {
                    window.location.reload()
                }, 200)
            } else {
                toast.error("invalid email or password");
            }
        })
    }

    return (
        <div className='container-signin'>
            <br></br>
            <h2>Sign in</h2>
            <p>Enter your details below to continue</p><br></br><br></br>
            <form onSubmit={handleSubmit}>
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
                <button className='signin-btn' type="submit">SIGN IN</button>
            </form>
            <div class="create">
                <Link to="/Signup">
                    <li>Create an Account</li>
                </Link>
            </div>
        </div>
    )
}

export default Signin
