import { samples } from "../datasample/sample.js";

const EmailInput = ({
  emailText,
  setEmailText,
  handleGenerateEmail,
  handleAnalyze,
  loading,
  generating,
  generatingIndex,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg dark:bg-slate-900 dark:border dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        📩 Incoming Email / Prompt
      </h2>

      <textarea
        className="w-full h-64 resize-y p-4 text-base border-2 border-slate-300 rounded-2xl outline-none mb-4 leading-relaxed focus:border-cyan-600 bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:placeholder:text-slate-400"
        placeholder="Write prompt here: book appointment with cardiologist for Manish..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />

      <div className="flex flex-col md:flex-row gap-3">
        <button
          className="flex-1 px-4 py-4 text-base font-bold text-teal-700 bg-cyan-50 border border-cyan-300 rounded-2xl hover:bg-cyan-100 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-slate-800 dark:text-cyan-300 dark:border-cyan-700 dark:hover:bg-slate-700"
          onClick={() => handleGenerateEmail(emailText)}
          disabled={generating}
          type="button"
        >
          {generating && generatingIndex === null
            ? "Generating Email..."
            : "✨ Generate Email"}
        </button>

        <button
          className="flex-1 px-4 py-4 text-base font-bold text-white bg-linear-to-br from-teal-700 to-cyan-600 rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleAnalyze}
          disabled={loading}
          type="button"
        >
          {loading ? "Analyzing..." : "Analyze & Route Email"}
        </button>
      </div>

      <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Example prompt:{" "}
          <b>Book appointment with cardiologist for Manish in Gorakhpur.</b>
        </p>
      </div>

      <h3 className="mt-6 mb-3 text-xl font-bold dark:text-white">
        Sample Prompts
      </h3>

      <div className="flex flex-col gap-3">
        {samples.map((sample, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl dark:bg-slate-800 dark:border-slate-700"
          >
            <div>
              <h4 className="mb-1 text-slate-900 font-bold dark:text-white">
                {sample.title}
              </h4>

              <p className="text-sm text-slate-500 dark:text-slate-300">
                {sample.text}
              </p>
            </div>

            <button
              className="px-3 py-2 text-sm font-bold whitespace-nowrap text-white bg-cyan-600 rounded-xl hover:bg-cyan-700 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => handleGenerateEmail(sample.text, index)}
              disabled={generatingIndex === index}
              type="button"
            >
              {generatingIndex === index ? "Generating..." : "Generate Email"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailInput;