const ResultCard = ({ result }) => {
  const getPriorityClass = (priority) => {
    if (priority === "Critical") return "border-red-600 bg-red-50";
    if (priority === "High") return "border-orange-600";
    if (priority === "Medium") return "border-cyan-600";
    return "border-green-600";
  };

  return (
    <div
      className={`mt-8 bg-white rounded-3xl p-6 shadow-lg border-l-8 dark:bg-slate-900 dark:border-t dark:border-r dark:border-b dark:border-slate-700 ${getPriorityClass(
  result.priority

      )}`}
    >
      <h2 className="text-2xl font-bold mb-4">✅ AI Routing Result</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-slate-500 mb-2">Intent</p>
          <h3 className="font-bold">{result.intent}</h3>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-slate-500 mb-2">Category</p>
          <h3 className="font-bold">{result.category}</h3>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-slate-500 mb-2">Department</p>
          <h3 className="font-bold">{result.department}</h3>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-slate-500 mb-2 dark:text-slate-300">Priority</p>
          <h3 className="font-bold">{result.priority}</h3>
        </div>
      </div>

      <div className="mt-5 bg-slate-50 p-4 rounded-2xl dark:bg-slate-800">
        <p>
          <b>Reason:</b> {result.reason}
        </p>

        <p className="mt-2">
          <b>Suggested Action:</b> {result.suggested_action}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;