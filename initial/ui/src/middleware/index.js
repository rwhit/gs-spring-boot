const forbiddenWords = ["spam", "money"];

export const containsForbiddenWords = text => {
  const foundWord = forbiddenWords.filter(word =>
    text.includes(word)
  );

  return foundWord.length > 0;
}
