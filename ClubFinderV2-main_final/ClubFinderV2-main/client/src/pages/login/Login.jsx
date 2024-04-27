import "./login.scss"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";

const Login = () => {
    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    });

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    const {login} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/Explore");

        } catch (err) {
            setErr(err.response.data);
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1> ClubFinder.</h1>
                    <p>
                        Welcome to ClubFinder. Login to get Started
                    </p>
                    <span> Create an account with us </span>
                    <Link to="/register">
                        <button> Register</button>
                    </Link>
                    
                </div>

                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleLogin}> Login </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;