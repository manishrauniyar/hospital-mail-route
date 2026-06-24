const departments = [
  {
    category: "Appointment",
    department: "Appointment Desk",
  },
  {
    category: "Billing",
    department: "Billing Department",
  },
  {
    category: "Lab Report",
    department: "Lab Reports Department",
  },
  {
    category: "Emergency",
    department: "Emergency Department",
  },
  {
    category: "General Query",
    department: "General Help Desk",
  },
];

const RoutingDepartments = ({ counts = {}, onDepartmentClick }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg dark:bg-slate-900 dark:border dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4">⚙️ Routing Departments</h2>

      {departments.map((item, index) => (
        <button
          key={index}
          className="w-full flex justify-between items-center gap-4 p-4 mb-3 rounded-2xl bg-slate-50 border border-slate-200 text-left hover:bg-cyan-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
          onClick={() => onDepartmentClick(item.department)}
          type="button"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-extrabold">
              {index + 1}
            </span>

            <div>
              <span className="text-slate-500 dark:text-slate-300">{item.category}</span>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {counts[item.department] || 0} emails
              </p>
            </div>
          </div>

          <b className="text-slate-900 dark:text-white">{item.department}</b>
        </button>
      ))}
    </div>
  );
};

export default RoutingDepartments;