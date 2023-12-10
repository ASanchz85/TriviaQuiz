export default function getRandomQuestions(originalArray, numItems) {
  const randomIndex = Math.floor(
    Math.random() * (originalArray.length - numItems + 1)
  );
  const newArray = originalArray.slice(randomIndex, randomIndex + numItems);

  return newArray;
}
