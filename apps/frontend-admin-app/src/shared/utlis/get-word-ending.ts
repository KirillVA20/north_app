export const getWordEnding = (
  word: string,
  count: number,
  endingList: [string, string, string]
): string => {
  if (endingList) {
    const countEnding = count % 10;

    if (countEnding === 1) return `${word}${endingList[0]}`;
    if (countEnding > 1 && countEnding < 5) return `${word}${endingList[1]}`;

    return `${word}${endingList[2]}`;
  }

  return count === 1 ? word : count > 1 && count < 5 ? `${word}a` : `${word}ов`;
};
