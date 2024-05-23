import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY.",
      {
        status: 400,
      },
    );
  }
  
  /**
   * #1 - Rate limit the API to 20 requests per day.
   * This is because we have a live production example. 
   * Change this to a higher value if you're running your own instance.
   */
  const REQUESTS_PER_DAY = 20;

  /**
   * #2 – Manage limits in the KV store
   * As we're deploying to Vercel, we can use the KV store to rate limit the API.
   * Change this if you want to use a different rate limiting strategy.
   */

  if (process.env.NODE_ENV != "development" && process.env.KV_REST_API_TOKEN) {
    const ip_address = req.headers.get("x-forwarded-for");
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(REQUESTS_PER_DAY, "1d"),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `pilcrow_editor_ratelimit_${ip_address}`,
    );

    if (!success) {
      return new Response("You have reached your request limit.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  /**
   * #3 – Get the prompt from the request
   * The users prompt is sent in the request body.
   * We prefix this with some context for the AI.
   */
  let { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Use the GPT-3.5 model. Alternative: "gpt-4.0-turbo".
    messages: [
      {
        role: "system",
        content:
          // This prompt seems to give the best results.
          "You are a reliable AI writing assistant. " +
          "Take the text and suggest the next sentence." +
          "Give more weight/priority to the later characters than the beginning ones. " +
          "Limit your response to no more than 200 characters and make sure to construct complete sentences.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    // Leave these
    stream: true,
    n: 1,
    
    // Play with these
    temperature: 0.7,  
    frequency_penalty: 1.0,
    presence_penalty: 0, 
  });

    
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
