import React, { useState, useEffect, useRef } from "react";
import GameTable from "./GameTable"; // Import GameTable component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Constants
const VALID_NUMBER_ERROR = "Please enter a valid number";
const CONGRATULATIONS_MESSAGE = "Congratulations! You guessed it right!";
const TOO_HIGH_MESSAGE = "Too high, guess again";
const TOO_LOW_MESSAGE = "Too low, guess again";

const NumberGameFeatures = () => {
  const [guess, setGuess] = useState("");
  const [range, setRange] = useState(10);
  const [attempts, setAttempts] = useState(3);
  const [history, setHistory] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [canAnswer, setCanAnswer] = useState(true);
  const [selectedRange, setSelectedRange] = useState(0);
  const [currentRange, setCurrentRange] = useState(range);
  const [inputCount, setInputCount] = useState(0);
  const [inputNumber, setInputNumber] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, canAnswer]);

  let userGuess;
  let randomNumber;

  const handleInputChange = (e) => {
    if (!canAnswer) return;
    const input = e.target.value.replace(/[^\d]/g, "");
    setGuess(input);
    setInputCount(inputCount + 1);
    setInputNumber(input);
  };

  const handleArrowKeyPress = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newGuess = Math.min(
        Math.max(Number(guess) + step, 1),
        currentRange
      );
      setGuess(newGuess.toString());
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && canAnswer) {
      e.preventDefault();
      if (!guess || isNaN(guess)) {
        showToast(VALID_NUMBER_ERROR, "error");
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!canAnswer) return;
    if (!guess || isNaN(guess)) {
      showToast(VALID_NUMBER_ERROR, "error");
      return;
    }
  
    userGuess = parseInt(guess);
    randomNumber = Math.floor(Math.random() * range) + 1;
  
    let result;
    if (userGuess === randomNumber) {
      result = "Correct!";
      showToast(CONGRATULATIONS_MESSAGE, "success");
    } else if (userGuess > randomNumber) {
      result = TOO_HIGH_MESSAGE;
      showToast(result, "warning");
    } else {
      result = TOO_LOW_MESSAGE;
      showToast(result, "warning");
    }
  
    setHistory([...history, { guess: userGuess, result }]);
    setAttempts(attempts - 1);
    setGuess("");
  
    if (attempts === 1 || userGuess === randomNumber) {
      setShowConfirmModal(true);
      setCanAnswer(false);
      setGameOver(true);
    } else {
      setCanAnswer(true);
    }
  };

  const handleRangeChange = (e) => {
    const newRange = Number(e.target.value);
    setSelectedRange(newRange);
    setCurrentRange(newRange);
    const ratio = newRange / 1000;
    const sliderticks = e.target.parentElement.querySelector(".sliderticks");
    const newSliderValue = ratio * e.target.value;
    if (sliderticks) {
      sliderticks.style.left = `${newSliderValue}px`;
    }

    // Focus on the input when dragging the range slider
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleResetGame = () => {
    setGuess("");
    setAttempts(3);
    setHistory([]);
    setShowConfirmModal(false);
    setGameOver(false);
    setCanAnswer(true);
  };

  const handleConfirmDelete = () => {
    setHistory([]);
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const showToast = (message, type) => toast[type](message);

  return (
    <div>
      <ToastContainer />
      <div className="formGame">
        <h2>Chào mừng bạn đến với trò chơi đoán số</h2>
        <h2 className="lead">
          Bạn cần tìm kiếm một số từ 1 đến {selectedRange}
        </h2>
        <div className="wrapper">
          <div className="range">
            <div className="range-slider">
              <label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="1"
                  id="range"
                  list="tickmarks"
                  onChange={handleRangeChange}
                />
                {selectedRange}
              </label>
              <div className="sliderticks">
                <span>0</span>
                <span>200</span>
                <span>400</span>
                <span>600</span>
                <span>800</span>
                <span>1000</span>
              </div>
            </div>
          </div>
        </div>
        <br />
        {canAnswer && (
          <div>
            <h3 className="inputNumber">Hãy Thử Nhập 1 Số</h3>
            <input
              value={guess}
              type="number"
              onChange={handleInputChange}
              onKeyDown={handleArrowKeyPress}
              onKeyPress={handleEnterKeyPress}
              className="fomrNumberInput"
              ref={inputRef}
            />
          </div>
        )}
        <br />
        <div className="formHistory">
          <p>Attempts left: {attempts} / 3</p>
          <h3>History</h3>
          {/* Sử dụng GameTable component để hiển thị bảng */}
          <GameTable history={history} inputCount={inputCount} inputNumber={inputNumber} />
          {showConfirmModal && (
            <div className="confirm-modal">
              <p>Are you sure you want to delete the game history?</p>
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          )}
          {gameOver && (
            <div className="game-over-modal">
              <p>Do you want to play again ?</p>
              <button onClick={handleResetGame} className="btnAgain">Play Again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberGameFeatures;
