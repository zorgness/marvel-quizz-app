import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import {FirebaseContext} from '../Firebase'

const SignUp = (props) => {

  const firebase = useContext(FirebaseContext)

  const data = {
    "username" : "",
    "email" : "",
    "password" : "",
    "confirmPassword" : "",
  }

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('');

  const handleChange = e => {

    setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    const {email, password} = loginData;
    firebase.signupUser(email, password)
    .then(() => {
      setLoginData({...data})
      props.history.push("/welcome")
    }).catch (err => {
      setError(err);
      setLoginData({...data})
    })
  }

  const {username, email, password, confirmPassword} = loginData

  const displayBtn = username !== '' || email !== '' || password !== '' ||  password !== confirmPassword
  ? <button>Submit</button> : <button disabled>Submit</button>

  const errorMsg = error !== '' && <span>{error.message}</span>;


  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup">

        </div>
          <div className="formBoxRight">

            <div className="formContent">

            {errorMsg}

            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input onChange={handleChange} value={username} type="text" id="username" autoComplete="off" required />
                <label htmlFor='username'>Username</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor='email'>Email</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                <label htmlFor='password'>Password</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                <label htmlFor='confirm-password'>Confirm Password</label>
              </div>

              {displayBtn}
            </form>

              <div className="linkContainer">
                  <Link className="simpleLink" to="/login">Already register? Login</Link>
                  <br/>
                  <Link className="simpleLink" to="/forgetpassword">Forget your password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default SignUp
