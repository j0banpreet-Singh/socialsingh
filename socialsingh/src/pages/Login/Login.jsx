import "./login.css"
import { useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { loginHandler } from "../../apiCalls"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginHandler({username:email.current.value,password:password.current.value},dispatch);
  }

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginLeft">
          <h3 className="loginLogo">SinghSocial</h3>
          <span className="desc">Connect with your loved ones on SinghSocial</span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick}>
            <div className="loginForm">
              <input
                type="text"
                className="loginInput"
                placeholder="email"
                ref={email}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="password"
                ref={password}
              />
              <button className="loginButton">Log In</button>
              <span className="forgotPassword">Forgot password?</span>
              <button 
              className="registerButton"
              onClick={()=>{navigate("/register")}}
              >Create a new Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
