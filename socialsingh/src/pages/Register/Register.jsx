import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import "./register.css"
import axios from "axios"

const Register = () => {
  const navigate = useNavigate()

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("passwords do not match")
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value
      }

      try {
        await axios.post("/auth/register", user);
        navigate("/")
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">socialSingh</h3>
          <span className="loginDesc">
            Connect with friends and the world here
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              type="email"
              ref={email}
            />
            <input
              placeholder="Password"
              required
              className="loginInput"
              type="password"
              minLength="6"
              ref={password}
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              type="password"
              ref={passwordAgain}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <span className="or">or</span>
            <button className="loginRegisterButton" onClick={() => { navigate("/login") }}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
