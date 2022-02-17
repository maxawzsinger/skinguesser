// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import filenames from './champSplashFileNames'
import champnames from './champnames.json'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const inputStyle = {
    fontSize: "28px",
    borderRadius: "11px",
    padding: "10px"
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD-l4xhHARU3rrVXjuW_7olQVmHzCkZJKM",
//   authDomain: "lolproject-9564e.firebaseapp.com",
//   databaseURL: "https://lolproject-9564e-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "lolproject-9564e",
//   storageBucket: "lolproject-9564e.appspot.com",
//   messagingSenderId: "610188733937",
//   appId: "1:610188733937:web:b33f9ba4d4cd7eef736850",
//   measurementId: "G-359RL33Z11"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// var database = app.database();





function Game() {
    const [filename, setFilename] = useState("");
    const [champname, setChampname] = useState("");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [highscores, setHighscores] = useState([]);

    useEffect(() => {
        loadNewChamp()
        document.getElementsByTagName("input")[0].focus()

        // var query = database.ref("highscores");
        // query.on("value", function(snapshot) {
        //   setHighscores([...highscores,...snapshot]);
        //   console.log(snapshot);
        //   });


    }, {});

    const gameOver = () => {
        alert(`Game Over! \n\nThe correct answer was ${champname}.\n\nYou made it through ${score} out of 1481 splash arts.`)
        setLives(3)
        setScore(0)
        loadNewChamp()
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
}

export default Game;
