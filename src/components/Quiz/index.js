import React from 'react'

const Quiz = ({userData}) => {

  const {username} = userData;

  return (
    <div>
      <h2>{username}</h2>
    </div>
  )
}

export default Quiz
