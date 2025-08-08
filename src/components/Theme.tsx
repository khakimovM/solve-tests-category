import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Theme = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mavzu, setMavzu] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const setThemes = (e: React.FormEvent) => {
    e.preventDefault();
    const theme = inputValue.trim();
    if (!theme) return;
    localStorage.setItem(theme, JSON.stringify([]));
    setMavzu(theme);
    setInputValue("");
  };

  useEffect(() => {
    if (!mavzu) return;

    const allThemes = localStorage.getItem("allThemes");
    let temp: string[] = allThemes ? JSON.parse(allThemes) : [];
    temp.push(mavzu);
    localStorage.setItem("allThemes", JSON.stringify(temp));

    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 2000);
    return () => clearTimeout(timer);
  }, [mavzu]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          ✏️ Yangi test mavzusi qo‘shish
        </h2>

        <form onSubmit={setThemes} className="flex flex-col gap-4">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Masalan: JavaScript asoslari"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`px-5 py-2 rounded-lg shadow-md transition ${
              inputValue.trim()
                ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            ➕ Mavzu qo‘shish
          </button>
        </form>

        {showSuccess && (
          <div className="mt-4 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-lg text-center animate-fadeIn">
            ✅ Test muvaffaqiyatli qo‘shildi
          </div>
        )}

        <button
          onClick={() => navigate("/themes")}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          📋 Barcha mavzularni ko‘rish
        </button>
      </div>
    </div>
  );
};

export default Theme;
