import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeSentiment = async (reviews: string[]) => {
  try {
    const prompt = `
Analyze the following movie audience reviews.

Provide:
1. Overall sentiment (Positive, Mixed, or Negative)
2. A short summary (4-5 sentences)

Reviews:
${reviews.join("\n")}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    return response.choices[0].message?.content || "No response from AI.";
  } catch (error) {
    console.error("OpenAI error:", error);
    return "AI analysis unavailable.";
  }
};