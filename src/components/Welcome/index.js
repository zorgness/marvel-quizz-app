import React, {useState, useEffect, useContext} from 'react'
import Logout from '../Logout';
import Quiz from '../Quiz';
import { FirebaseContext } from '../Firebase'
import Spinner from 'react-bootstrap/Spinner';


const Welcome = (props) => {

  const firebase = useContext(FirebaseContext)

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {

    let listener = firebase.auth.onAuthStateChanged(user => {
      user ? setUserSession(user) : props.history.push("/");
    })

    if (!!userSession) {
    // !!userSession same as userSession !== null

    firebase.user(userSession.uid)
    .get()
    .then(doc => {
      if(doc && doc.exists) {

        const myData = doc.data();
        setUserData(myData);

      }
    }).catch( error => {
      console.log(error);
  })

    return () => {
      listener()
    };
  }



  },[userSession, firebase, props.history])


  return userSession === null ? (<div className='loader'> <Spinner animation="grow" variant="danger" /> </div>

  ) : (
        <div className="quiz-bg">
          <div className="container">

              <Logout />
              <Quiz userData={userData}/>
          </div>
      </div>
  );

}

export default Welcome;
