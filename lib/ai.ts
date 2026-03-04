//path: lib/ai.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeSentiment = async (reviews: string[]) => {
  try {
    const prompt = `
Analyze the following movie audience reviews.

Return ONLY valid JSON in this format:

{
  "sentiment": "Positive | Mixed | Negative",
  "summary": "2-3 sentence summary of audience opinion"
}

Reviews:
${reviews.join("\n")}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    try {
      return JSON.parse(text);
    } catch {
      return {
        sentiment: "Mixed",
        summary: text || "Could not parse AI response.",
      };
    }
  } catch (error) {
    console.error("Gemini error:", error);

    return {
      sentiment: "Mixed",
      summary: "AI analysis unavailable.",
    };
  }
};