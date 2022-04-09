import axios from "axios";

export const getQuestion = async (difficulty) => {
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=1&type=multiple&difficulty=${difficulty}`
  );
  return response.data.results;
};
