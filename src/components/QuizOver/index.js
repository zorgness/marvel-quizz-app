import React, {useState, useEffect, Fragment} from 'react';
import Loader from '../Loader';
import Modal from '../Modal';
import axios from 'axios';
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
  const [openModal, setOpenModal] = useState(false);

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_PUBLIC;
  const HASH = process.env.REACT_APP_MARVEL_API_HASH;

  const id = 1009362 ;


  useEffect(() => {

    axios
    .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${HASH}`)
    .then( response => { console.log(response)}).catch( err => console.log(err) )

    setAsked(ref.current);
  }, [ref]);

  // console.log(data);

  const showModal = () => {
    setOpenModal(true);
  }

  const hideModal = () => {
    setOpenModal(false);

}

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
                <p className="failureMsg">Game Over!!! <FaThumbsDown size="48px"/></p>
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
            <button className="btnInfo" onClick={() => showModal()}>
            Infos
            </button>
        </td>
    </tr>
      )

  })
  ) : (
    <tr>
        <td colSpan="3" >
            <Loader
            loadingMsg="No Answer"
            styling={{textAlign: 'center', color: 'red'}} />
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

      <Modal showModal={openModal} hideModal={hideModal}>
                <h2 className="text-white">Comming soon</h2>

      </Modal>

    </Fragment>

  )
})

export default QuizOver
