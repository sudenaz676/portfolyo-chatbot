import { NextResponse } from "next/server";
import profile from "@/data/profile.json";

export async function POST(request: Request) {
  const { message } = await request.json();

  const systemContext = `Sen ${profile.name} adına konuşan bir portföy asistanısın.
Sadece aşağıdaki bilgilere dayanarak cevap ver, uydurma bilgi verme:

${JSON.stringify(profile, null, 2)}

Kısa ve samimi cevaplar ver.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `${systemContext}\n\nZiyaretçinin sorusu: ${message}` }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  console.log("Gemini cevabı:", JSON.stringify(data));
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Üzgünüm, şu an cevap veremiyorum.";

  return NextResponse.json({ reply });
}