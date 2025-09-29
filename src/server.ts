import express from "express";
import { getErrorExplanationGen } from "./geminiClient.js";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

app.post("/explain", async (req, res) => {
  const { error } = req.body;

  try {
    const explanation = await getErrorExplanationGen(error);

    // If Gemini returns empty or undefined
    if (!explanation || explanation.includes("Failed to generate")) {
      return res.json({
        explanation:
          "Sorry, Gemini could not generate an explanation at the moment. Please try again later."
      });
    }

    res.json({ explanation });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.json({
      explanation:
        "Sorry, we couldn’t get an explanation right now. Please try again later."
    });
  }
});

app.listen(3000, () => console.log("API running at http://localhost:3000"));
