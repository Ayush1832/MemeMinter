import { Configuration, OpenAIApi } from "openai";
import config from "../config/config.js";

const openai = new OpenAIApi(new Configuration({ apiKey: config.openAiApiKey }));

export async function generateMeme(prompt) {
  try {
    const imageResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    const captionResponse = await openai.createCompletion({
      model: "gpt-4",
      prompt: `Generate a witty caption for a meme about: ${prompt}`,
      max_tokens: 20,
    });

    return {
      imageUrl: imageResponse.data.data[0].url,
      caption: captionResponse.data.choices[0].text.trim(),
    };
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate meme.");
  }
}
