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
    idQuestion: 0
  }

  loadQuestions = level =>  {
    const fetchArrayQuiz = QuizMarvel[0].quizz[level];
    if(fetchArrayQuiz.length >= this.state.maxQuestion ) {
      const newArray = fetchArrayQuiz.map(({answer, ...rest}) => rest )

      this.setState({storedQuestion: newArray})

    } else {
      console.log("not enough questions loaded")
    }
  }

  componentDidMount() {

    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {

    if(this.state.storedQuestion !== prevState.storedQuestion) {

      this.setState({
        question: this.state.storedQuestion[this.state.idQuestion].question,
        options : this.state.storedQuestion[this.state.idQuestion].options
      })

    }

  }


  render() {

    const displayOption = this.state.options.map((option, index) => {
      return (
        <p key={index} className="answerOptions">{option}</p>
      )
    })


  return (
    <div>


      <Levels />
      <ProgressBarQuiz />

      <h2>{this.state.question}</h2>

        {displayOption}

      <button className="btnSubmit">Next</button>
    </div>
  )

  }


}

export default Quiz
