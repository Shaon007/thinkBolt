export const runtime = 'edge';

export async function POST(req) {
  const { messages } = await req.json();

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "system",
          content: `You are a concise and friendly blog assistant for a website that publishes content in three main categories: Lifestyle, Technology, and Startup.
- When users ask questions, answer clearly and helpfully.
- If they request summaries, provide a short summary suitable for a blog.
- If they want to write or generate a blog, create engaging content under one of the three categories (Lifestyle, Technology, or Startup).
- Only introduce yourself if explicitly asked.
Avoid long-winded intros and focus on clarity and usefulness.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1024,
      stream: true
    })
  });

  if (!response.ok) {
    return new Response(await response.text(), { status: response.status });
  }

  return new Response(response.body, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
