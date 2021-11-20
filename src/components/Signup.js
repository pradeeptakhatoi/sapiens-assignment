import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

async function signupUser(data) {
    return fetch('http://localhost:8080/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export default function Signup() {
    const navigate = useNavigate();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await signupUser({
                email: username,
                password
            });
            console.log(res);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>&nbsp;&nbsp;
                    <span>Already have an account? <Link to="/login">Login</Link></span>
                </div>
            </form>
        </div>
    )
}
