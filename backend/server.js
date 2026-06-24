import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  temperature: 0,
});

function cleanJson(text) {
  return String(text)
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

app.post("/api/generate-email", async (req, res) => {
  try {
    const { promptText } = req.body;

    if (!promptText) {
      return res.status(400).json({
        success: false,
        message: "Prompt text is required",
      });
    }

    const emailGeneratePrompt = `
You are a professional hospital email writer.
Generate a complete professional hospital email based on this user prompt:
"${promptText}"
Use this format:
- Greeting
- Patient introduction
- Patient details
- Clear request
- Polite closing

Use these default patient details if not provided:
Name: Manish
Location: Gorakhpur, Uttar Pradesh
Contact Number: 1234567890

Make the email professional, polite, and clear.

Return only the email text.
Do not return JSON.
`;

    const response = await gemini.invoke([
      new HumanMessage(emailGeneratePrompt),
    ]);

    res.json({
      success: true,
      email: response.content,
    });
  } catch (error) {
    console.error("Email Generate Error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while generating email",
    });
  }
});

app.post("/api/route-email", async (req, res) => {
  try {
    const { emailText } = req.body;

    if (!emailText) {
      return res.status(400).json({
        success: false,
        message: "Email text is required",
      });
    }

    const systemPrompt = `
You are a hospital email routing AI.

Your task:
1. Read the hospital email.
2. Identify the intent.
3. Categorize the email.
4. Route it to the correct hospital department.
5. Decide priority level.

Categories allowed:
- Appointment
- Billing
- Lab Report
- Emergency
- General Query

Departments allowed:
- Appointment Desk
- Billing Department
- Lab Reports Department
- Emergency Department
- General Help Desk

Priority allowed:
- Low
- Medium
- High
- Critical

Return only valid JSON in this format:

{
  "intent": "",
  "category": "",
  "department": "",
  "priority": "",
  "reason": "",
  "suggested_action": ""
}
`;

    const response = await gemini.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(emailText),
    ]);

    const cleaned = cleanJson(response.content);

    let result;

    try {
      result = JSON.parse(cleaned);
    } catch (error) {
      result = {
        intent: "Unable to parse",
        category: "General Query",
        department: "General Help Desk",
        priority: "Medium",
        reason: response.content,
        suggested_action: "Human review required",
      };
    }

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("AI Routing Error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while routing email",
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});