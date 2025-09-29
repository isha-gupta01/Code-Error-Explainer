import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

export async function getErrorExplanationGen(errorMessage: string) {
    try {
        const prompt = `Explain this code error in simple terms in 5-6 lines:
Error: ${errorMessage}

Format:
Category:
Explanation:
Fix:
`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        if (!response?.text) {
            // Force an error so server can handle it
            throw new Error("Gemini returned empty response");
        }

        return response.text;
    } catch (err) {
        console.error("Gemini API call failed:", err);
        throw err; // let server handle the fallback
    }
}
