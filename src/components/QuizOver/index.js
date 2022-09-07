import React, {useState, useEffect, Fragment} from 'react'
import { FaTrophy, FaThumbsUp, FaThumbsDown } from "react-icons/fa";



const QuizOver = React.forwardRef((props, ref) => {

  const {
    levelNames,
    score,
    maxQuestion,
    quizLevel,
    percent,
    loadLevelQuestions
} = props;

  const [asked, setAsked] = useState([]);


  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  const averageGrade = maxQuestion / 2;

  const decision = score >= averageGrade ? (

    <Fragment>
      <div className="stepsBtnContainer">
      {
        quizLevel < levelNames.length ?
        (

          <Fragment>
            <p className="successMsg">Bravo, go on next level <FaThumbsUp  size="48px"/></p>
            <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizLevel)}
                >
                Next level
            </button>
          </Fragment>

        ) : (

          <Fragment>
                    <p className="successMsg">
                      Your an Expert!!! <FaTrophy  size="48px"/>
                    </p>
                    <button
                        className="btnResult gameOver"
                        onClick={() => loadLevelQuestions(0)}
                        >
                        Home
                    </button>
          </Fragment>

        )
      }
      </div>

      <div className="percentage">
            <div className="progressPercent">Success: {percent} %</div>
            <div className="progressPercent">Score: {score}/{maxQuestion}</div>
        </div>

    </Fragment>

  ) : (
    <Fragment>
            <div className="stepsBtnContainer">
                <p className="failureMsg">Game Over!!! <FaThumbsDown size="88px"/></p>
            </div>

            <div className="percentage">
                <div className="progressPercent">Success: {percent} %</div>
                <div className="progressPercent">Score: {score}/{maxQuestion}</div>
            </div>
    </Fragment>
  );



  const questionAnswer = score >= averageGrade ?  (
    asked.map(question => {
      return (
        <tr key={question.id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td>
            <button className="btnInfo">
            Infos
            </button>
        </td>
    </tr>
      )

  })
  ) : (
    <tr>
        <td colSpan="3" style={{textAlign: 'center', color: 'red'}}>
            No answer
        </td>
    </tr>
)


  return (
    <Fragment>

      { decision }

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
