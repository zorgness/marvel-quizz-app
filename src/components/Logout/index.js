import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import ReactToolTip from 'react-tooltip'

const Logout = () => {

  const firebase = useContext(FirebaseContext)

  const [checked, setChecked] = useState(false)


  useEffect(() => {
    if(checked) {
      console.log('logout')
      firebase.signoutUser()
    }


  }, [checked, firebase])

  const handleChange = e => {

    setChecked(e.target.checked)

  }


  return (
    <div className="logoutContainer">
      <label className='switch'>
        <input  type="checkbox"
        onChange={handleChange}
         checked={checked}/>
        <span className='slider round text-success' data-tip="logout"></span>
      </label>
      <ReactToolTip
                place="left"
                effect="solid"
            />
    </div>
  )
}

export default Logout
