import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ThemeToggle from "./components/ThemeToggle";
import Hero from "./components/Hero";
import EmailInput from "./components/EmailInput";
import RoutingDepartments from "./components/RoutesD";
import ResultCard from "./components/ResCard";
import DepartmentInbox from "./components/DepartmentInbox";

function App() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingIndex, setGeneratingIndex] = useState(null);

  const [routedEmails, setRoutedEmails] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);
  const [darkMode, setDarkMode] = useState(false);


  const handleGenerateEmail = async (promptText, index = null) => {
    const finalPrompt = promptText || emailText;

    if (!finalPrompt.trim()) {
      alert("Please write a prompt first");
      return;
    }

    try {
      setGenerating(true);
      setGeneratingIndex(index);
      setResult(null);

      const res = await axios.post("http://localhost:5000/api/generate-email", {
        promptText: finalPrompt,
      });

      if (res.data.success) {
        setEmailText(res.data.email);
      }
    } catch (error) {
      console.log(error);
      alert("Email generate nahi ho paya");
    } finally {
      setGenerating(false);
      setGeneratingIndex(null);
    }
  };

  const handleAnalyze = async () => {
    if (!emailText.trim()) {
      alert("Please enter an email first");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post("http://localhost:5000/api/route-email", {
        emailText,
      });

      if (res.data.success) {
        const aiResult = res.data.result;

        setResult(aiResult);

        const newRoutedEmail = {
          id: Date.now(),
          emailText,
          intent: aiResult.intent,
          category: aiResult.category,
          department: aiResult.department,
          priority: aiResult.priority,
          reason: aiResult.reason,
          suggested_action: aiResult.suggested_action,
          status: "Routed",
          createdAt: new Date().toLocaleString(),
        };

        setRoutedEmails((prev) => [newRoutedEmail, ...prev]);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmail = (id) => {
    setRoutedEmails((prev) => prev.filter((email) => email.id !== id));
  };

  const handleSendToDoctor = (id) => {
    setRoutedEmails((prev) =>
      prev.map((email) =>
        email.id === id
          ? {
            ...email,
            status: "Sent to Doctor",
            sentAt: new Date().toLocaleString(),
          }
          : email
      )
    );
  };
  const departmentCounts = routedEmails.reduce((acc, email) => {
    acc[email.department] = (acc[email.department] || 0) + 1;
    return acc;
  }, {});

  if (selectedDepartment) {
    return (

      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-slate-100 text-slate-900 p-4 md:p-8 dark:bg-slate-950 dark:text-white">
          <div className="w-full flex justify-end mb-4">
            <ThemeToggle
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </div>

          <DepartmentInbox
            department={selectedDepartment}
            routedEmails={routedEmails}
            onBack={() => setSelectedDepartment(null)}
            onDeleteEmail={handleDeleteEmail}
            onSendToDoctor={handleSendToDoctor}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-100 text-slate-900 p-4 md:p-8 dark:bg-slate-950 dark:text-white">

        <div className="w-full flex justify-end mb-4">
          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>

        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <EmailInput
            emailText={emailText}
            setEmailText={setEmailText}
            handleGenerateEmail={handleGenerateEmail}
            handleAnalyze={handleAnalyze}
            loading={loading}
            generating={generating}
            generatingIndex={generatingIndex}
          />

          <RoutingDepartments
            counts={departmentCounts}
            onDepartmentClick={setSelectedDepartment}
          />
        </div>

        {result && (
          <div ref={resultRef}>
            <ResultCard result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;