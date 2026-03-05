// path: lib/ai.ts
import { GoogleGenAI } from "@google/genai";
import type { Sentiment } from "@/types/movie";

// Client automatically picks GEMINI_API_KEY from env
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const analyzeSentiment = async (reviews: string[]): Promise<Sentiment> => {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not configured");
    return {
      sentiment: "Mixed",
      summary: "AI analysis unavailable. API key not configured.",
    };
  }

  if (!reviews || reviews.length === 0) {
    return {
      sentiment: "No Reviews",
      summary: "No audience reviews found for this movie.",
    };
  }

  try {
    const prompt = `
Analyze the following movie audience reviews and provide sentiment analysis.

Return ONLY valid JSON in this exact format (no markdown, no code blocks):

{
  "sentiment": "Positive | Mixed | Negative",
  "summary": "2-3 sentence summary of audience opinion"
}

Reviews:
${reviews.slice(0, 5).join("\n\n---\n\n")}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text?.trim() || "";

    // Clean response (remove markdown fences etc.)
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Ensure valid JSON boundaries
    const jsonStart = cleanedText.indexOf("{");
    const jsonEnd = cleanedText.lastIndexOf("}");
    const safeJson = cleanedText.slice(jsonStart, jsonEnd + 1);

    try {
      const parsed = JSON.parse(safeJson);
      if (parsed.sentiment && parsed.summary) {
        return {
          sentiment: parsed.sentiment,
          summary: parsed.summary,
        };
      }
      throw new Error("Invalid response structure");
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return {
        sentiment: "Mixed",
        summary: safeJson || "Could not parse AI response.",
      };
    }
  } catch (error: Error) {
    console.error("Gemini API error:", error.message || error);
    return {
      sentiment: "Mixed",
      summary: "AI analysis temporarily unavailable. Please try again later.",
    };
  }
};