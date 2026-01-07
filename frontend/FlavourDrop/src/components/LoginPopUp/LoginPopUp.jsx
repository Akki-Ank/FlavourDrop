import React, { useState } from 'react'
import "./LoginPopUp.css"
import { assets } from '../../assets/assets'
import API from '../../utils/api'

const LoginPopUp = ({ setShowLogin, setToken }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    let url = currState === "Login" ? "/api/user/login" : "/api/user/register";

    const payload =
      currState === "Login"
        ? { email, password }
        : { name, email, password };

    const res = await API.post(url, payload);

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setShowLogin(false);

      // Clear fields
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert(res.data.message || "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    alert("Server error. Try again later.");
  }
};


  return (
    <div className='login-popup' role="dialog" aria-modal="true">
      <form className="login-popup-container" onSubmit={onSubmitHandler}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null :
            <input
              type="text"
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          }

          <input
            type="email"
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-popup-conditions">
          <input type="checkbox" required />
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>

        {currState === "Login"
          ? <p className='signss'>Create a new Account? <span onClick={() => setCurrState("Sign Up")}>Sign Up</span></p>
          : <p className='loginss'>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopUp;
