import React, {Fragment} from 'react'

const QuizOver = React.forwardRef((props, ref) => {

  console.log(ref)
  return (
    <Fragment>
      <div className="stepsBtnContainer">
        <p className="successMsg">Success, go on next level!</p>
        <button className="btnResult success">Next level</button>
      </div>

      <div className="percentage">
        <div className="progressPercent">Success:</div>
        <div className="progressPercent">Score:</div>
      </div>

      <hr/>

      <p>Rigth Answer</p>

    </Fragment>

  )
})

export default QuizOver
