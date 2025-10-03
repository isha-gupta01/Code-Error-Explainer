import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});
export async function getErrorExplanationGen(errorMessage) {
    try {
        const prompt = `Explain this code error in simple and human readable form in 4 lines:
Error: ${errorMessage}

Format:
Language:
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
    }
    catch (err) {
        console.error("Gemini API call failed:", err);
        throw err; // let server handle the fallback
    }
}
//# sourceMappingURL=geminiClient.js.map