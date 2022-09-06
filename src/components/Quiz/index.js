import React, { Component } from 'react'
import Levels from '../Levels';
import {QuizMarvel} from './QuizMarvel'
import ProgressBarQuiz from '../ProgressBar';

class Quiz extends Component {

  state = {
    levelNames: ["beginner", "confirmed", "expert"],
    quizLevel: 0,
    maxQuestion: 10,
    storedQuestion: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0
  }

  storedQuestionRef = React.createRef();

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

  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestion - 1) {
      console.log("maxQuestion reached");
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

  }


  render() {

    const displayOption = this.state.options.map((option, index) => {
      return (
        <p key={index}
        onClick={() => this.submitAnswer(option)}
        className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}>
        {option}</p>
      )
    })


  return (
    <div>


      <Levels />
      <ProgressBarQuiz />

      <h2>{this.state.question}</h2>

        {displayOption}

      <button disabled={this.state.btnDisabled} onClick={this.nextQuestion} className="btnSubmit">Next</button>
    </div>
  )

  }


}

export default Quiz
