import React, { useEffect, useState } from "react";
import { useWindow } from "../hooks/useWindow";
import { getWordOfTheDay, isValidWord } from "../services/request";
import Instructions from "./Instructions";
import Keyboard from "./Keyboard";
import Modal from "./Modal";
import RowCompleted from "./RowCompleted";
import RowCurrent from "./RowCurrent";
import RowEmpty from "./RowEmpty";
import "./styles.css";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

const GameStatus = {
  Playing: 1,
  Won: 2,
  Lost: 3,
};

const Worlde = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState("");
  const [turn, setTurn] = useState(1);
  const [currentWord, setCurrentWord] = useState("");
  const [completedWords, setCompletedWords] = useState([]);
  const [gameStatus, setGameStatus] = useState(GameStatus.Playing);
  const [modal, setModal] = useState(true);

  useEffect(() => {
    setWordOfTheDay(getWordOfTheDay());
  }, []);

  const onKeyPressed = (key) => {
    if (gameStatus !== GameStatus.Playing) {
      return;
    }

    if (key === "BACKSPACE" && currentWord.length > 0) {
      onDelete();
      return;
    }
    if (key === "ENTER" && currentWord.length === 5 && turn <= 6) {
      onEnter();
      return;
    }
    if (currentWord.length >= 5) return;
    if (keys.includes(key)) {
      onInput(key);
      return;
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    onKeyPressed(key);
  };

  const onInput = (letter) => {
    const newWord = currentWord + letter;
    setCurrentWord(newWord);
  };

  const onDelete = () => {
    const newWord = currentWord.slice(0, -1);
    setCurrentWord(newWord);
  };

  const onEnter = async () => {
    // Ganó el usuario
    if (currentWord === wordOfTheDay) {
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus(GameStatus.Won);
      return;
    }
    // Perdió el usuario
    if (turn === 6) {
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus(GameStatus.Lost);
      return;
    }
    // Validar que la palabra si exista
    const validWord = await isValidWord(currentWord);
    if (currentWord.length === 5 && !validWord) {
      alert("Not a valid Word");
      return;
    }
    setCompletedWords([...completedWords, currentWord]);
    setTurn(turn + 1);
    setCurrentWord("");
  };

  useWindow("keydown", handleKeyDown);

  const changeVisibility = () => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
      <header>
        <h1 className="title">Wordle</h1>
        <svg
          onClick={changeVisibility}
          xmlns="http://www.w3.org/2000/svg"
          height="28"
          viewBox="4 4 24 24"
          width="28"
          data-testid="icon-help"
        >
          <path
            fill="#fff"
            d="M14.8333 23H17.1666V20.6667H14.8333V23ZM15.9999 4.33334C9.55992 4.33334 4.33325 9.56001 4.33325 16C4.33325 22.44 9.55992 27.6667 15.9999 27.6667C22.4399 27.6667 27.6666 22.44 27.6666 16C27.6666 9.56001 22.4399 4.33334 15.9999 4.33334ZM15.9999 25.3333C10.8549 25.3333 6.66659 21.145 6.66659 16C6.66659 10.855 10.8549 6.66668 15.9999 6.66668C21.1449 6.66668 25.3333 10.855 25.3333 16C25.3333 21.145 21.1449 25.3333 15.9999 25.3333ZM15.9999 9.00001C13.4216 9.00001 11.3333 11.0883 11.3333 13.6667H13.6666C13.6666 12.3833 14.7166 11.3333 15.9999 11.3333C17.2833 11.3333 18.3333 12.3833 18.3333 13.6667C18.3333 16 14.8333 15.7083 14.8333 19.5H17.1666C17.1666 16.875 20.6666 16.5833 20.6666 13.6667C20.6666 11.0883 18.5783 9.00001 15.9999 9.00001Z"
          ></path>
        </svg>
      </header>
      {modal && <Instructions changeVisibility={changeVisibility} />}
      {gameStatus === GameStatus.Won ? (
        <Modal
          type="won"
          completedWords={completedWords}
          solution={wordOfTheDay}
        />
      ) : gameStatus === GameStatus.Lost ? (
        <Modal
          type="lost"
          completedWords={completedWords}
          solution={wordOfTheDay}
        />
      ) : null}
      <div className="main-container">
        {completedWords.map((word, i) => (
          <RowCompleted key={i} word={word} solution={wordOfTheDay} />
        ))}
        {gameStatus === GameStatus.Playing ? (
          <RowCurrent word={currentWord} />
        ) : null}
        {Array.from(Array(6 - turn)).map((_, i) => (
          <RowEmpty key={i} />
        ))}
      </div>
      <Keyboard keys={keys} onKeyPressed={onKeyPressed} onInput={onInput} />
    </React.Fragment>
  );
};

export default Worlde;
