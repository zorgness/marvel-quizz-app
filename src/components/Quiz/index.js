import React, { Component } from 'react'
import Levels from '../Levels';
import {QuizMarvel} from './QuizMarvel'
import ProgressBarQuiz from '../ProgressBar';
import QuizOver from '../QuizOver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronRight, FaCheck } from "react-icons/fa";

const initialState = {

  levelNames: ["beginner", "confirmed", "expert"],
  quizLevel: 0,
  maxQuestion: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  welcomeMsg: false,
  quizEnd: false,
  percent: null

};

const notify = (message, style )=> {

      style( message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

}

const levelNames = ["beginner", "confirmed", "expert"];

class Quiz extends Component {

  constructor(props) {
    super(props)

    this.state = initialState;
    this.storedQuestionsRef = React.createRef();

  }


  loadQuestions = level =>  {

    const fetchArrayQuiz = QuizMarvel[0].quizz[level];

    if(fetchArrayQuiz.length >= this.state.maxQuestion ) {

      this.storedQuestionsRef.current = fetchArrayQuiz;
      const newArray = fetchArrayQuiz.map(({answer, ...rest}) => rest );

      // const destructuredArray = fetchArrayQuiz.reduce((acc, val) => {
      //   Object.keys(val).forEach(key => (acc[key] = acc[key] || []).push(val[key]));
      //   return acc;
      // }, {});

      this.setState({storedQuestions: newArray})

    } else {
      console.log("not enough questions loaded")
    }
  }

  submitAnswer = (option) => {

    this.setState({userAnswer: option, btnDisabled: false})

  }

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = percent => {

    if (percent >= 50) {
      this.setState({
      quizLevel: this.state.quizLevel + 1,
      percent: percent,


    })
    } else {
      this.setState({
        percent: percent,

      })

    }

  }

  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestion - 1) {

        this.setState({quizEnd: true})

    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))

    }

    const goodAnswer = this.storedQuestionsRef.current[this.state.idQuestion].answer;
    if(this.state.userAnswer === goodAnswer) {
      this.setState(prevState => ({
        score: prevState.score + 1
      }))
      notify("Bravo + 1", toast.success)
    } else {
      notify("Wrong answer", toast.error)
    }
  }

  componentDidMount() {

    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {

    const {
      maxQuestion,
      storedQuestions,
      idQuestion,
      quizEnd,
      score
  } = this.state;


    if(storedQuestions !== prevState.storedQuestions) {

      this.setState({
        question: storedQuestions[idQuestion].question,
        options : storedQuestions[idQuestion].options,

      })

    }

    if(idQuestion !== prevState.idQuestion) {

      this.setState({
        question: storedQuestions[idQuestion].question,
        options : storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })

    }

    if ( quizEnd !== prevState.quizEnd ) {
      const gradepercent = this.getPercentage(maxQuestion, score);
      this.gameOver(gradepercent);
  }


    if(this.props.userData.username) {

      !this.state.welcomeMsg && notify(`Happy to see you here ${this.props.userData.username} Good luck!!!` , toast.info );

      if(!this.state.welcomeMsg) {
        this.setState({welcomeMsg: true});
      }
    }
  }

  loadLevelQuestions = level => {
    this.setState({...initialState, quizLevel: level});

    this.loadQuestions(levelNames[level]);
}


  render() {

    const {
      quizLevel,
      maxQuestion,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent
  } = this.state;


    const displayOption = options.map((option, index) => {

      return (
        <p key={index}
        onClick={() => this.submitAnswer(option)}
        className={`answerOptions ${userAnswer === option ? "selected" : null}`}>
       {userAnswer === option ?  <FaCheck />  : <FaChevronRight /> }  {option}</p>
      )
    });

  return quizEnd ?

   (

    <QuizOver
        ref={this.storedQuestionsRef}
        levelNames={levelNames}
        score={score}
        maxQuestion={maxQuestion}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
    />

  ): (
    <div>

      <ToastContainer position="bottom-right" newestOnTop />


      <Levels
        levelNames={levelNames}
        quizLevel={quizLevel}
      />

      <ProgressBarQuiz
      idQuestion={idQuestion}
      maxQuestion={maxQuestion}
       />


      <h2>{question}</h2>

        {displayOption}

      <button disabled={btnDisabled}
       onClick={this.nextQuestion}
       className="btnSubmit">
        {idQuestion < maxQuestion - 1 ? 'NEXT' : 'END'}
      </button>
    </div>
  )

  }


}

export default Quiz
