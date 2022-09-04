import React, {Fragment} from 'react'

const ProgressBarQuiz = () => {
  return (
    <Fragment>

        <div className="percentage">
            <div className="progressPercent">Question: </div>
            <div className="progressPercent">Progress: </div>
        </div>

        <div className="progress" style={{height: '28px'}}>
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </Fragment>

  )
}

export default ProgressBarQuiz
