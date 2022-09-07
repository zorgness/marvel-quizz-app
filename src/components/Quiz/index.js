import React, { Component } from 'react'
import Levels from '../Levels';
import {QuizMarvel} from './QuizMarvel'
import ProgressBarQuiz from '../ProgressBar';
import QuizOver from '../QuizOver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {

  levelNames: ["beginner", "confirmed", "expert"],
  quizLevel: 0,
  maxQuestion: 10,
  storedQuestion: [],
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

class Quiz extends Component {

  constructor(props) {
    super(props)

    this.state = initialState;
    this.storedQuestionRef = React.createRef();

  }


  loadQuestions = level =>  {
    const fetchArrayQuiz = QuizMarvel[0].quizz[level];

    if(fetchArrayQuiz.length >= this.state.maxQuestion ) {

      this.storedQuestionRef.current = fetchArrayQuiz;
      const newArray = fetchArrayQuiz.map(({answer, ...rest}) => rest )

      // const destructuredArray = fetchArrayQuiz.reduce((acc, val) => {
      //   Object.keys(val).forEach(key => (acc[key] = acc[key] || []).push(val[key]));
      //   return acc;
      // }, {});

      this.setState({storedQuestion: newArray})

    } else {
      console.log("not enough questions loaded")
    }
  }

  submitAnswer = (option) => {

    this.setState({userAnswer: option, btnDisabled: false})

  }

  gameOver = (option) => {
    this.setState({quizEnd: true})
  }

  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestion - 1) {

      this.gameOver();

    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))

    }

    const goodAnswer = this.storedQuestionRef.current[this.state.idQuestion].answer;
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

    if(this.state.storedQuestion !== prevState.storedQuestion) {

      this.setState({
        question: this.state.storedQuestion[this.state.idQuestion].question,
        options : this.state.storedQuestion[this.state.idQuestion].options,

      })

    }

    if(this.state.idQuestion !== prevState.idQuestion) {

      this.setState({
        question: this.state.storedQuestion[this.state.idQuestion].question,
        options : this.state.storedQuestion[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })

    }


    if(this.props.userData.username) {

      !this.state.welcomeMsg && notify(`Happy to see you here ${this.props.userData.username} Good luck!!!` , toast.info );

      if(!this.state.welcomeMsg) {
        this.setState({welcomeMsg: true});
      }



    }

  }


  render() {


    const displayOption = this.state.options.map((option, index) => {

      return (
        <p key={index}
        onClick={() => this.submitAnswer(option)}
        className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}>
        {option}</p>
      )
    });

  return this.state.quizEnd ?

   (

    <QuizOver />

  ): (
    <div>

      <ToastContainer position="bottom-right" newestOnTop />


      <Levels />
      <ProgressBarQuiz
      idQuestion={this.state.idQuestion}
      maxQuestion={this.state.maxQuestion}
       />


      <h2>{this.state.question}</h2>

        {displayOption}

      <button disabled={this.state.btnDisabled} onClick={this.nextQuestion} className="btnSubmit">
        {this.state.idQuestion < this.state.maxQuestion - 1 ? 'NEXT' : 'END'}
      </button>
    </div>
  )

  }


}

export default Quiz
