import { GoogleGenAI } from "@google/genai";
import type { CartItem } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development if the env var isn't set.
  // In a real production environment, the key should always be available.
  console.warn("API_KEY environment variable not set. Gemini API will not function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = 'gemini-2.5-flash';

export const getSmartAssistantResponse = async (
  prompt: string,
  chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[],
  cartItems: CartItem[]
) => {
  if (!API_KEY) {
    return "I'm sorry, my AI brain is offline at the moment. Please try again later.";
  }

  const cartContext = cartItems.length > 0 
    ? `Current cart items: ${cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ')}.`
    : 'The user has an empty cart.';

  try {
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `You are a cheerful and helpful shopping assistant for an online grocery store called SwiftCart. Your goal is to help users with their shopping. ${cartContext} Keep your responses concise and friendly.`,
      },
      history: chatHistory,
    });
    
    const result = await chat.sendMessage({ message: prompt });
    return result.text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "I'm having a little trouble thinking right now. Please try asking me something else.";
  }
};
