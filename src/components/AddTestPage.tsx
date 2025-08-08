import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const AddTestPage = () => {
  const { themeName } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
  const [correct, setCorrect] = useState("A");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeName) return;

    const newTest = {
      question,
      options: [options.A, options.B, options.C, options.D],
      correctAnswer: correct,
    };

    const stored = localStorage.getItem(themeName);
    const prevTests = stored ? JSON.parse(stored) : [];
    prevTests.push(newTest);
    localStorage.setItem(themeName, JSON.stringify(prevTests));

    setQuestion("");
    setOptions({ A: "", B: "", C: "", D: "" });
    setCorrect("A");
    alert("✅ Test muvaffaqiyatli qo‘shildi!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex justify-center items-start py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {themeName} mavzusiga test qo‘shish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Savol:
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {["A", "B", "C", "D"].map((opt) => (
            <div key={opt}>
              <label className="block text-gray-700 font-medium mb-1">
                Variant {opt}:
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                value={options[opt as keyof typeof options]}
                onChange={(e) =>
                  setOptions({ ...options, [opt]: e.target.value })
                }
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              To‘g‘ri javob:
            </label>
            <select
              value={correct}
              onChange={(e) => setCorrect(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            >
              ⬅ Ortga
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              ➕ Testni qo‘shish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestPage;
