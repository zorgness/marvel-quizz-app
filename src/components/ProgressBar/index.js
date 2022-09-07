import React, {Fragment} from 'react'

const ProgressBarQuiz = ({idQuestion, maxQuestion}) => {

  const getWith = (totalQuestion, currentQuestionId) => {
    return (100 / totalQuestion) * currentQuestionId;
  }

  const progressPercent = getWith(maxQuestion, idQuestion + 1);
  return (
    <Fragment>

        <div className="percentage">
            <div className="progressPercent">{`Question: ${idQuestion + 1}/${maxQuestion}`}</div>
            <div className="progressPercent">{`Progress: ${progressPercent}%`}</div>
        </div>

        <div className="progress" style={{height: '28px'}}>
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{width: `${progressPercent}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </Fragment>

  )
}

export default ProgressBarQuiz
