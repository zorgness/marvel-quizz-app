import React from 'react'
import Levels from '../Levels';

const Quiz = ({userData}) => {

  const {username} = userData;

  return (
    <div>
      <h2>{username}</h2>

      <Levels />
    </div>
  )
}

export default Quiz
