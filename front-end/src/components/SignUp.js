import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");


    useEffect(() => {
        const authr = localStorage.getItem('user');
        if (authr) {
            navigate('/');
        }
    });

    const collectData = async () => {

        if (!name || !email || ! password) {
            setError(true);
            return false;

        }
      

        try {
            let result = await fetch('http://localhost:3000/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json();
            console.warn(result);
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
        } catch (error) {
            alert(error.message,);
        }
    }

    return (
        <div className="register">
            <h1 className="login-head">Registration</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
            {error && !name && <span className="invalid-input">Please enter Name</span>}
            <input className="inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
            {error && !email && <span className="invalid-input">Please enter Email</span>}
            
            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
            {error && !password && <span className="invalid-input">Please enter Password</span>}
           
            <button className="app-Button" type="button" onClick={collectData} >Sing Up</button>
        </div>
    )
}
export default SignUp;