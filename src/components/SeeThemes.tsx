import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SeeThemes = () => {
  const [themes, setThemes] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("allThemes");
    if (!stored) return;
    setThemes(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 h-[90vh] flex flex-col">
        {/* Sarlavha va Ortga qaytish tugmasi */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center flex-1">
            📋 Barcha mavzular
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow transition"
          >
            ⬅ Asosiy sahifa
          </button>
        </div>

        {themes.length === 0 ? (
          <p className="text-gray-500 text-center">
            Hali hech qanday mavzu yo‘q
          </p>
        ) : (
          <ul className="space-y-4 overflow-y-auto pr-2 flex-1">
            {themes.map((theme, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <span className="font-medium text-gray-800 text-lg mb-3 sm:mb-0">
                  {theme}
                </span>

                <div className="flex gap-3">
                  <Link
                    to={`/themes/${encodeURIComponent(theme)}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition text-sm"
                  >
                    ➕ Test qo‘shish
                  </Link>
                  <Link
                    to={`/themes/test/${encodeURIComponent(theme)}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition text-sm"
                  >
                    📝 Test yechish
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SeeThemes;
