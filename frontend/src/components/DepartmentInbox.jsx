const DepartmentInbox = ({
  department,
  routedEmails,
  onBack,
  onDeleteEmail,
  onSendToDoctor,
}) => {
  const departmentEmails = routedEmails.filter(
    (email) => email.department === department
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 md:p-8 dark:bg-slate-950 dark:text-white">
      <div className="bg-linear-to-br from-teal-700 to-cyan-600 text-white p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center gap-5 mb-8">
        <button
          className="px-5 py-3 bg-white text-teal-700 rounded-2xl font-bold"
          onClick={onBack}
        >
          ← Back
        </button>

        <div>
          <h1 className="text-3xl font-extrabold">{department}</h1>
          <p className="mt-1 opacity-90">Total Emails: {departmentEmails.length}</p>
        </div>
      </div>

      {departmentEmails.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl text-center shadow-lg dark:bg-slate-900 dark:border dark:border-slate-700">
          <h2 className="text-2xl font-bold">No emails found</h2>
          <p className="text-slate-500 mt-2">
            Abhi is department me koi routed email nahi hai.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {departmentEmails.map((email) => (
            <div
              className="bg-white rounded-3xl p-6 shadow-lg border-l-8 border-cyan-600 dark:bg-slate-900 dark:border-t dark:border-r dark:border-b dark:border-slate-700"
              key={email.id}
            >
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <div>
                  <h2 className="text-2xl font-bold mb-3">{email.category}</h2>

                  <p>
                    <b>Priority:</b> {email.priority}
                  </p>

                  <p>
                    <b>Status:</b>{" "}
                    <span
                      className={
                        email.status === "Sent to Doctor"
                          ? "text-green-600 font-extrabold"
                          : "text-cyan-600 font-extrabold"
                      }
                    >
                      {email.status}
                    </span>
                  </p>

                  <p>
                    <b>Created:</b> {email.createdAt}
                  </p>

                  {email.sentAt && (
                    <p>
                      <b>Sent:</b> {email.sentAt}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <button
                    className="px-4 py-3 text-white bg-teal-700 rounded-2xl font-bold disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => onSendToDoctor(email.id)}
                    disabled={email.status === "Sent to Doctor"}
                  >
                    {email.status === "Sent to Doctor" ? "Sent" : "Send to Dr"}
                  </button>

                  <button
                    className="px-4 py-3 text-white bg-red-600 rounded-2xl font-bold"
                    onClick={() => onDeleteEmail(email.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-3">Email</h3>
                <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                  {email.emailText}
                </pre>
              </div>

              <div className="mt-5 bg-cyan-50 p-5 rounded-2xl dark:bg-slate-800">
                <p>
                  <b>Intent:</b> {email.intent}
                </p>
                <p className="mt-2">
                  <b>Reason:</b> {email.reason}
                </p>
                <p className="mt-2">
                  <b>Suggested Action:</b> {email.suggested_action}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentInbox;