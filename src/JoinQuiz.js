import React, { useEffect } from 'react';
import './App.css'

function JoinQuiz() {
  useEffect(() => {
    document.getElementById('page-container').style.display = 'none';
  }, []);

  // Add your JoinQuiz component code here
  return (
    <div>
      <h1>PLAY WITH FRIENDS</h1>
        <textarea placeholder="ENTER THE CODE" id="code-txt"></textarea><br></br>
        <button id="code-btn">Submit</button>
            <div id="quiz-container">
            <span id="question-txt"></span>
            <div className="options">
            <span id="option-a-id">
            <input  className="options-cl"type="radio"></input>
            </span>
            </div>
            <div className="options">
            <span id="option-b-id">
            <input  className="options-cl"type="radio"></input>
            </span>
            </div>
            <div className="options">
            <span id="option-c-id">
            <input  className="options-cl"type="radio"></input>
            </span>
            </div>
            <div className="options">
            <span id="option-d-id">
            <input  className="options-cl"type="radio"></input>
            </span>
            </div>
            <button id="submit-btn">Submit and attempt next question</button>
            </div>
                <div id="display-time"></div>

    </div>
  );
}

export default JoinQuiz;
