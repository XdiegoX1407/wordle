import { WORDS } from "./words";

const getWords = () => {
    return WORDS;
};

const getDayOfTheYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const getWordOfTheDay = () => {
  const words = getWords();
  const wordOfTheDay = words[getDayOfTheYear()];
  return wordOfTheDay.toUpperCase();
};

export const isValidWord = async (word) => {
    try {
      const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const response = await fetch(URL);
      if (response.status !== 200) throw new Error("Request failed");
      const data = await response.json();
  
      return data.length;
    } catch (error) {
      return false;
    }
    /* const words = getWords();
    return words.includes(word.toLowerCase()); */
}