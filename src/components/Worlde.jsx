import React, { useEffect, useState } from "react";
import { useWindow } from "../hooks/useWindow";
import { getWordOfTheDay, isValidWord } from "../services/request";
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

  return (
    <React.Fragment>
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
