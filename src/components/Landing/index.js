import React, { useRef, useEffect, useState, Fragment } from 'react'

const Landing = () => {

  const wolverineRef = useRef(null)

  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    wolverineRef.current.classList.add('startingImg')

    setTimeout(() => {

      wolverineRef.current.classList.remove('startingImg')
      setShowBtn(true)

    }, 3000);
  }, [])

  const setLeftImg = () => {
    wolverineRef.current.classList.add('leftImg');

  }

  const setRightImg = () => {
    wolverineRef.current.classList.add('rightImg');
  }

  const clearImg = () => {

    if( wolverineRef.current.classList.contains("leftImg")) {
      wolverineRef.current.classList.remove("leftImg");
    } else if( wolverineRef.current.classList.contains("rightImg")) {
      wolverineRef.current.classList.remove("rightImg");
    }
  }

  const displayBtn = showBtn && (

  <Fragment>
    <div className="leftBox">
        <button onMouseOver={setLeftImg} onMouseOut={clearImg} className="btn-welcome">Register</button>
    </div>

    <div className="rightBox">
      <button onMouseOver={setRightImg} onMouseOut={clearImg} className="btn-welcome">Login</button>
    </div>
  </Fragment>
  );

  return (
    <main ref={wolverineRef} className='welcomePage'>

      {displayBtn}

    </main>
  )
}

export default Landing
