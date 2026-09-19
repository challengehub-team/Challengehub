import { useLocation } from "react-router-dom";

const Corrections = () => {
  const { state } = useLocation();
  const { questions, currentAnswers } = state;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Corrections</h1>

      {questions.map((q, i) => {
        const correct = q.correct_answer;
        const user = currentAnswers[i];

        return (
          <div key={i} className="mb-6 p-4 border rounded">
            <h2 className="font-semibold mb-2">{q.question}</h2>
            <p>Your Answer: <span className="text-red-600">{user}</span></p>
            <p>Correct Answer: <span className="text-green-600">{correct}</span></p>
          </div>
        );
      })}
    </div>
  );
};

export default Corrections;