import React, {useState, useEffect, Fragment} from 'react';
import Loader from '../Loader';
import Modal from '../Modal';
import capitalizeFirestletter from '../../utils/CapitalizeFirstLetter';
// import axios from 'axios';
import { FaTrophy, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const QuizOver = React.forwardRef((props, ref) => {

  const {
    levelNames,
    score,
    maxQuestion,
    quizLevel,
    percent,
    loadLevelQuestions
} = props;

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_PUBLIC;
  const HASH = process.env.REACT_APP_MARVEL_API_HASH;


//   GIVE BACK ALL THE DATA IN LOCALSTORAGE

//   const allStorage = () =>  {
//     let values = [],
//         keys = Object.keys(localStorage),
//         i = keys.length;
//     while ( i-- ) {
//         values.push(JSON.parse(localStorage.getItem(keys[i])) );
//     }
//     return values;
// }

  useEffect(() => {

    if ( localStorage.getItem('marvelStorageDate')) {
      const date = localStorage.getItem('marvelStorageDate');
      checkDataAgeToCleanLocaleStorage (date);
  }

    setAsked(ref.current);
  }, [ref]);

  const checkDataAgeToCleanLocaleStorage = date => {
    const today = new Date(Date.now()).getDate();
    const dataDate = new Date(parseInt(date)).getDate()

    if (today - dataDate <= 7) {
      localStorage.clear()
      localStorage.setItem('marvelStorageDate', Date.now());
    }

  }

  const fetchData = async url => {

    try {

    const response = await fetch(url);

      if(!response.ok) {
        throw new Error('no response from server');
      }

      const fetchedData = await response.json();
      setCharacterInfos(fetchedData);
      setLoading(false);

      return fetchedData;

    }

    catch (err) {
      console.error(err.message);
    }
  }

  // SAME FUNCTION WITH AXIOS

  // const fetchedDataAxios = url => {
  //    axios
  //   .get(url)
  //   .then(response => {
  //     setCharacterInfos(response.data);
  //     })
  //   .catch( err => console.log(err) )
  // }

  const showModal =  async id => {

    setOpenModal(true);

    if (localStorage.getItem(id)) {

      const storage =  JSON.parse(localStorage.getItem(id))

      console.log('localStorage')

      if (Object.keys(storage).length === 0) {
        console.log(storage)
      } else {

        setCharacterInfos(storage);

        setLoading(false);
      }



    } else {

    const response =  await fetchData(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${HASH}`)

    await localStorage.setItem(id, JSON.stringify(response));

    if ( !localStorage.getItem('marvelStorageDate') ) {
      localStorage.setItem('marvelStorageDate', Date.now());
    }
  }

}


  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);

}

  const averageGrade = maxQuestion / 2;

  const decision = score >= averageGrade ? (

    <Fragment>
      <div className="stepsBtnContainer">
      {
        quizLevel < levelNames.length ?
        (

          <Fragment>
            <p className="successMsg"><FaThumbsUp  size="48px"/> Bravo, go on next level</p>
              <button
                  className="btnResult success"
                  onClick={() => loadLevelQuestions(quizLevel)}
                  >
                  Next level
              </button>
          </Fragment>

        ) : (

          <Fragment>
                    <p className="successMsg">
                      <FaTrophy  size="48px"/> Your an Expert!!! <FaTrophy  size="48px"/>
                    </p>
                    <button
                        className="btnResult gameOver"
                        onClick={() => loadLevelQuestions(0)}
                        >
                        Home
                    </button>
          </Fragment>

        )
      }
      </div>

        <div className="percentage">
            <div className="progressPercent">Success: {percent} %</div>
            <div className="progressPercent">Score: {score}/{maxQuestion}</div>
        </div>

    </Fragment>

  ) : (
    <Fragment>
            <div className="stepsBtnContainer">
                <p className="failureMsg"><FaThumbsDown size="48px"/> Game Over!!! NUL!!!</p>
            </div>

            <div className="percentage">
                <div className="progressPercent">Success: {percent} %</div>
                <div className="progressPercent">Score: {score}/{maxQuestion}</div>
            </div>
    </Fragment>
  );


  const questionAnswer = score >= averageGrade ?  (
    asked.map(question => {

      return (
        <tr key={question.id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td>
            <button className="btnInfo" onClick={() => showModal(question.heroId)}>
            Infos
            </button>
        </td>
    </tr>
      )

  })
  ) : (
    <tr>
        <td colSpan="3" >
            <Loader
            loadingMsg="No Answer"
            styling={{textAlign: 'center', color: 'red'}} />
        </td>
    </tr>
)

const resultInModal = !loading ?
(
    <Fragment>
        <div className="modalHeader">
            <h2>{characterInfos.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
           <div className="comicImage">
                <img
                    src={characterInfos.data.results[0].thumbnail.path+'.'+characterInfos.data.results[0].thumbnail.extension}
                    alt={characterInfos.data.results[0].name}
                />

                <p>{characterInfos.attributionText}</p>
           </div>
           <div className="comicDetails">
                <h3>Description</h3>
                {
                    characterInfos.data.results[0].description ?
                    <p>{characterInfos.data.results[0].description}</p>
                    : <p>No description...</p>
                }
                <h3>More infos</h3>
                {
                    characterInfos.data.results[0].urls &&
                    characterInfos.data.results[0].urls.map( (url, index) => {
                        return <a
                            key={index}
                            href={url.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          {capitalizeFirestletter(url.type)}
                        </a>
                    })
                }
           </div>
        </div>
        <div className="modalFooter">
            <button className="modalBtn" onClick={hideModal}>Close</button>
        </div>
    </Fragment>
)
:
(
    <Fragment>
        <div className="modalHeader">
            <h2>Loading ...</h2>
        </div>
        <div className="modalBody">
            <Loader />
        </div>
    </Fragment>
)


  return (
    <Fragment>

      { decision }

      <div className="answerContainer">
        <table className="answers">

        <thead>
            <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Info</th>
            </tr>
        </thead>

        <tbody>

          {questionAnswer}

        </tbody>

        </table>
      </div>

      <Modal showModal={openModal} hideModal={hideModal}>
            { resultInModal }
      </Modal>

    </Fragment>

  )
})

export default QuizOver
