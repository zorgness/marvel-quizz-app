import React, {useState, useEffect, Fragment} from 'react'

const QuizOver = React.forwardRef((props, ref) => {

  const [asked, setAsked] = useState([]);

  useEffect(() => {
    setAsked(ref.current);
  }, []);

  const questionAnswer = (
    asked.map(question => {
      return (
        <tr key={question.id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td>
            <button
               className="btnInfo"
              //  onClick={ () => showModal(question.heroId)}
            >
            Infos
            </button>
        </td>
    </tr>
      )

  })
  )


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



      <div className="answerContainer">
        <table className="answers">

        <thead>
            <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Info</th>
            </tr>
        </thead>

        <tbody>

          {questionAnswer}

        </tbody>

        </table>
      </div>

    </Fragment>

  )
})

export default QuizOver
