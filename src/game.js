// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import filenames from './champSplashFileNames'
import champnames from './champnames.json'

import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, get, child} from "firebase/database";


const inputStyle = {
    fontSize: "28px",
    borderRadius: "11px",
    padding: "10px"
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase







const config = {
  apiKey: "AIzaSyD-l4xhHARU3rrVXjuW_7olQVmHzCkZJKM",
  authDomain: "lolproject-9564e.firebaseapp.com",
  databaseURL: "https://lolproject-9564e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lolproject-9564e",
  storageBucket: "lolproject-9564e.appspot.com",
  messagingSenderId: "610188733937",
  appId: "1:610188733937:web:b33f9ba4d4cd7eef736850",
  measurementId: "G-359RL33Z11"
};


function Game() {
    const [filename, setFilename] = useState("");
    const [champname, setChampname] = useState("");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [highscores, setHighscores] = useState([]);
    const [screenType, setScreenType] = useState('play');
    const [placement, setPlacement] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [databaseRef, setDatabaseRef] = useState({});
    console.log('rerender');



    function handleSubmitPlayerHighScore() {
      if (playerName.length>0) { //simple check to ensure player has entered text otherwise highscore will go through with no name
        console.log('submitting high score for : ', playerName);
        const database = getDatabase();
        let newHighscores = highscores; //load in array from state to modify with new high score
        newHighscores[placement-1][0] = playerName; //placement starts from 1, to get proper array index subtract 1
        newHighscores[placement-1][1] = score;
        setHighscores([...newHighscores]);
        console.log('logging',newHighscores);
        set(ref(database, "highscores"), newHighscores); //replace array in database with new array
      }
    }


    function fetchHighscores() {
      const databaseRef = ref(getDatabase());
      get(child(databaseRef, 'highscores')).then((snapshot)=> {
        console.log(snapshot.val());
        let fetchedScores = snapshot.val();
        setHighscores([...fetchedScores]) //display highscores
        console.log('score: ', score);
        for (let i = 0;i<fetchedScores.length;i++) { //iterate over, as soon as find a value it is higher than, replace that value.
          if (score > fetchedScores[i][1]) {
            console.log('placement: ',(i+1));
            setPlacement(i+1);
            break;
          }
        }
      });

    }

    useEffect(() => {
      const app = initializeApp(config);


      loadNewChamp()
      document.getElementsByTagName("input")[0].focus()

        // var query = database.ref("highscores");
        // query.on("value", function(snapshot) {
        //   setHighscores([...highscores,...snapshot]);
        //   console.log(snapshot);
        //   });


    }, {});

    const gameOver = () => {
        fetchHighscores();
        setScreenType('end');


    }


    const handleNewGame = () => {
      setPlacement(0);
      setLives(3);
      setScore(0);
      loadNewChamp();
      setScreenType('play');
    }

    const loadNewChamp = () => {
        const newFilename = filenames.splice(Math.floor(Math.random()*filenames.length),1)[0];
        setFilename(newFilename);
        console.log(newFilename);
        setChampname(newFilename.substring(0, newFilename.indexOf('_')))
    }

    const checkAnswer = (input) => {
        if (input === 'j4' || input === 'jarvan') {
            input = 'jarvaniv'
        } else if (input === 'wukong') {
            input = 'monkeyking'
        } else if (input === 'cassiopia' || input === 'casiopeia' || input === 'cassiopiea' || input === 'casiopia' || input === 'casiopea') {
            input = 'cassiopeia'
        } else if (input === 'tf') {
            input = 'twistedfate'
        } else if (input === 'naut') {
            input = 'nautilus'
        } else if (input === 'kha') {
            input = 'khazix'
        } else if (input === 'gankplank') {
            input = 'gangplank'
        }

        // fixedInput === "j4" ? fixedInput = "jarvaniv" : ''

        if (input === champname.toLowerCase().replace(/\s/g,'')) {
            return true
        } else if (input !== 'vi' && champnames.includes(input)) {
            return false
        }

        return null
    }

    function handleUpdateInput(event) {
        const cleanInput = event.target.value.toLowerCase().replace(/\s/g,'');
        const isAnswerCorrect = checkAnswer(cleanInput)

        if (isAnswerCorrect === true) {
            setScore(score + 1)

            event.target.classList.add("success")
            event.target.disabled = true

            setTimeout(() => {
                event.target.value = ""
                event.target.disabled = false
                event.target.classList.remove("success")
                event.target.focus()
            loadNewChamp()

            }, 500)


        } else if (isAnswerCorrect === false) {
            event.target.classList.add("error")
            event.target.disabled = true

            setTimeout(() => {
                event.target.value = ""
                event.target.disabled = false
                event.target.classList.remove("error")
                event.target.focus()

                if (lives === 1) {
                    gameOver()
                } else {
                    setLives(lives - 1)
                }



            }, 500)
        }
    }



if (screenType == 'play') {
    return (
        <div className="App">

            <div style={{
                "height": "10vh",
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "space-between",
                "fontSize": "40px",
                "fontWeight": 600,

            }}>
                <div>{score}</div>
                <div style={{display: 'flex'}}>
                    <div style={{width: "50px", opacity: lives >= 3 ? 1 : 0.3}}><svg style={{transform: "scale(2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                    <div style={{width: "50px", opacity: lives >= 2 ? 1 : 0.3}}><svg style={{transform: "scale(2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                    <div style={{width: "50px", opacity: lives >= 1 ? 1 : 0.3}}><svg style={{transform: "scale(2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                </div>
                </div>
            <div style={{"height": "70vh"}}>
                <img style={{ "height": "100%"}}src={`splash_art/${filename}`} />
            </div>
            <div style={{"height": "20vh"}}>
            <div style={{
                "display": "flex",
                "height": "20vh",
                "justify-content": "center",
                "align-items": "center"
            }}>
                <div>
                    <input placeholder="guess the champion" focus style={inputStyle} type="text" onChange={handleUpdateInput} />
                </div>
            </div>
            </div>
        </div>
    );
  } else {
    return (
      <div className="App">

          <div style={{
              "height": "10vh",
              "display": "flex",
              "alignItems": "center",
              "justifyContent": "space-between",
              "fontSize": "40px",
              "fontWeight": 600,

          }}>
              <div>{score}</div>
              <div style={{display: 'flex'}}>
                  <div style={{width: "50px", opacity: lives >= 3 ? 1 : 0.3}}><svg style={{transform: "scale(2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                  <div style={{width: "50px", opacity: lives >= 2 ? 1 : 0.3}}><svg style={{transform: "scale(2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                  <div style={{width: "50px", opacity: lives >= 1 ? 1 : 0.3}}><svg style={{transform: "scale(2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
              </div>
              </div>
          <div style={{"height": "70vh"}}>
          Game Over! The correct answer was {champname}. You made it through {score} out of 1481 splash arts.
          <div>
          Highscores:
          {highscores.map((player) =>
            <li>{player[0]} : {player[1]}</li>
          )}
          </div>
          </div>
                            <div style={{"height": "20vh"}}>
                            <div style={{
                                "display": "flex",
                                "height": "20vh",
                                "justify-content": "center",
                                "align-items": "center"
                            }}>
                            { placement !== 0 &&
                                <div>
                                You placed {placement}/10. Enter name for high score.
                                    <input placeholder=  "enter name" focus style={inputStyle} type="text" onChange={e => setPlayerName(e.target.value)} />
                                    <button onClick={()=>handleSubmitPlayerHighScore()}>
                                    Submit high score
                                    </button>
                                </div>
                            }
                            </div>
                            </div>
                            <button onClick={()=>handleNewGame()}>
                            Start new game
                            </button>
      </div>
    )
  }
}

export default Game;
