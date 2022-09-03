import React, { useRef, useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom'

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
    <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={clearImg}>
        <Link className="btn-welcome" to="/signup" >Register</Link>
    </div>

    <div className="rightBox" onMouseOver={setRightImg} onMouseOut={clearImg}>
        <Link className="btn-welcome" to="/login" >Login</Link>
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
