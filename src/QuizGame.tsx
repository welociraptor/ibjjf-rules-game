import { useEffect, useState } from "react";

// Example questions array (replace with your actual JSON array)
const questions: Question[] = [
  { question: "Submission techniques stretching legs apart", correctAnswer: 0 },
  { question: "Choke with spinal lock", correctAnswer: 1 },
  { question: "Straight foot lock", correctAnswer: 1 },
  {
    question: "Forearm choke using the sleeve (Ezequiel choke)",
    correctAnswer: 1,
  },
  { question: "Frontal guillotine choke", correctAnswer: 1 },
  { question: "Omoplata", correctAnswer: 1 },
  { question: "Triangle (pulling head)", correctAnswer: 1 },
  { question: "Arm triangle", correctAnswer: 1 },
  {
    question:
      "Lock inside the closed guard with legs compressing kidneys or ribs",
    correctAnswer: 2,
  },
  { question: "Wrist lock", correctAnswer: 2 },
  {
    question:
      "Single leg takedown while the attacking athlete has his head outside his opponents body.",
    correctAnswer: 2,
  },
  { question: "Bicep slicer", correctAnswer: 3 },
  { question: "Calf slicer", correctAnswer: 3 },
  { question: "Knee bar", correctAnswer: 3 },
  { question: "Toe hold", correctAnswer: 3 },
  {
    question:
      "In straight foot lock, turning in the direction of foot not under attack.",
    correctAnswer: 3,
  },
  { question: "Heel hook", correctAnswer: 4 },
  { question: "Locks twisting the knees.", correctAnswer: 4 },
  { question: "Knee Reaping", correctAnswer: 4 },
  {
    question: "In toe hold, applying outward pressure on the foot",
    correctAnswer: 4,
  },
  { question: "Slam", correctAnswer: 5 },
  { question: "Spinal lock without choke", correctAnswer: 5 },
  { question: "Scissor Takedown", correctAnswer: 5 },
  { question: "Bending fingers backwards", correctAnswer: 5 },
  {
    question:
      "Grab the opponents belt and throws him to the floor on his head when defending a single leg situation while his opponents head is on the outside of his body.",
    correctAnswer: 5,
  },
  {
    question:
      "Suplex takedown technique, landing with the opponent’s head or neck on the ground.",
    correctAnswer: 5,
  },
];

type Question = {
  question: string;
  correctAnswer: Answer;
};

const categoryMap = {
  0: "4 to 12 years old",
  1: "13 to 15 years old",
  2: "16 & 17 years old (all ranks) and white belts (Adult to Master 7)",
  3: "Adult to Master 7 (blue & purple belts)",
  4:
    "Adult to Master 7\n" +
    "(brown & black\n" +
    "belts) except\n" +
    "Adult No Gi",
  5: "Adult (brown & black belts) No Gi",
};

type Answer = 0 | 1 | 2 | 3 | 4 | 5;

function Feedback({ isCorrect }: { isCorrect: boolean }) {
  const feedbackStyle = {
    color: isCorrect ? "green" : "red",
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "10px",
  };

  return <p style={feedbackStyle}>{isCorrect ? "Correct!" : "Incorrect!"}</p>;
}

function QuizGame() {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0],
  );
  const [scoreHistory, setScoreHistory] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<boolean>(true);

  const shuffle = () => {
    for (let i = questions.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Swap the current element with the element at the random index
      [questions[i], questions[randomIndex]] = [
        questions[randomIndex],
        questions[i],
      ];
    }
  };

  const resetGame = () => {
    shuffle();
    setQuestionNumber(1);
    setCurrentQuestion(questions[0]);
    setScoreHistory([]);
  };

  // Load the first random question
  useEffect(() => {
    shuffle();
    setCurrentQuestion(questions[0]);
  }, []);

  // Function to handle user answer
  const handleAnswer = (answer: Answer) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setFeedback(isCorrect);

    // Update score history
    setScoreHistory((prev) => {
      const newHistory = [...prev, isCorrect];
      return newHistory.slice(-100); // Keep only the last 100 tries
    });

    // Show a new question
    setCurrentQuestion(questions[questionNumber]);

    setQuestionNumber(questionNumber + 1);
  };

  // Calculate correct/incorrect counts
  const correctCount = scoreHistory.filter((s) => s).length;
  const incorrectCount = scoreHistory.length - correctCount;

  const possibleAnswers: Answer[] = [0, 1, 2, 3, 4, 5];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>IBJJF Technical Fouls</h1>

      {questionNumber <= questions.length && (
        <>
          <h3>{currentQuestion.question}</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {possibleAnswers.map((num) => (
              <button
                key={num}
                onClick={() => handleAnswer(num)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1em",
                  cursor: "pointer",
                }}
              >
                {categoryMap[num]}
              </button>
            ))}
          </div>
          {questionNumber > 1 && (
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              <Feedback isCorrect={feedback} />
            </p>
          )}
        </>
      )}

      {questionNumber > questions.length && (
        <>
          <button
            onClick={() => resetGame()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Reset game
          </button>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        {questionNumber <= questions.length && (
          <p>
            <strong>
              {questionNumber} / {questions.length}
            </strong>
          </p>
        )}
        <p>
          Correct: {correctCount} | Incorrect: {incorrectCount}
        </p>
      </div>
    </div>
  );
}

export default QuizGame;
