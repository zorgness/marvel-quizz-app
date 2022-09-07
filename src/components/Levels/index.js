import React from 'react'
import CapitalizeFirestletter from '../../utils/CapitalizeFirstLetter'

const Levels = ({levelNames, quizLevel}) => {

  const levelName = levelNames[quizLevel];

  return (
    <div className="levelsContainer">
      <h2 className="headingLevels">{CapitalizeFirestletter(levelName)}</h2>
    </div>
  )
}

export default Levels
