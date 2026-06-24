const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-3 rounded-2xl font-bold shadow-lg bg-white text-slate-900 border border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700"
      type="button"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;