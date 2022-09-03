import React from 'react'
import batman from '../../images/batman.png'

const ErrorPage = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 className="text-center">Wrong Page...</h2>

        <img src={batman} alt="error page"/>
      </div>
    </div>
  )
}

export default ErrorPage
