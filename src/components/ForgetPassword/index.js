import React, { useState, useContext }from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

const ForgetPassword = props => {

  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.passwordReset(email)
    .then(() => {

      setError(null);
      setSuccess(`Check your email address ${email} to change your password`);
      setEmail("");

      setTimeout(() => {
        props.history.push('/login')
    }, 5000)

    })
    .catch(err =>{
      setError(err);
      setEmail("");

    })



  }

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                    {
                            success && <span
                                style={{
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}
                            >
                                {success}
                            </span>
                        }

                        {error && <span>{error.message}</span>}

                        <h2>Forget your password ?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Submit</button>

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">New on Marvel Quiz ? Register now.</Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ForgetPassword
