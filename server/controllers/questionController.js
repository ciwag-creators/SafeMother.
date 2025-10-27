import Question from "../models/Question.js";

export const askQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("userId", "name");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const answerQuestion = async (req, res) => {
  const { id } = req.params;
  const { answer, answeredBy } = req.body;
  try {
    const updated = await Question.findByIdAndUpdate(id, { answer, answeredBy }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
