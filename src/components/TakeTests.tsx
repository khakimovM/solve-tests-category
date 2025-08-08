import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const TakeTest = () => {
  const { themeName } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(themeName || "");
    if (!stored) return;
    setQuestions(JSON.parse(stored));
  }, [themeName]);

  const handleAnswer = (qIndex: number, selected: string) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = selected;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct++;
      }
    });
    setResult(correct);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 justify-center p-6 flex flex-col items-center">
      <div className="w-full max-h-[90vh] overflow-y-scroll max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {themeName} testlari
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            ⬅ Ortga
          </button>
        </div>

        {questions.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">
            ❌ Bu mavzuga hozircha test mavjud emas.
          </p>
        ) : (
          <>
            {questions.map((q, i) => {
              const variants = ["A", "B", "C", "D"];
              return (
                <div
                  key={i}
                  className="mb-6 border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <p className="font-medium mb-3">
                    {i + 1}. {q.question}
                  </p>
                  <div className="flex flex-col gap-2">
                    {q.options.map((opt, j) => (
                      <label
                        key={j}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`q-${i}`} // har bir savol uchun unique
                          value={variants[j]} // "A", "B", "C", "D"
                          checked={answers[i] === variants[j]}
                          onChange={() => handleAnswer(i, variants[j])}
                          className="accent-green-500"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
              onClick={calculateResult}
            >
              Natijani ko‘rish
            </button>

            {result !== null && (
              <p className="mt-4 text-green-600 font-semibold text-lg">
                Siz {questions.length} ta savoldan {result} tasiga to‘g‘ri javob
                berdingiz.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TakeTest;
