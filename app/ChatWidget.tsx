"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

 async function sendMessage() {
  if (!input.trim()) return;

  const userMessage = { role: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setMessages((prev) => [...prev, { role: "bot", text: "..." }]);

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });
  const data = await res.json();

  setMessages((prev) => [
    ...prev.slice(0, -1),
    { role: "bot", text: data.reply },
  ]);
}

    return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {open ? (
        <div
          style={{
            width: "300px",
            height: "400px",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            background: "var(--card-bg)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              padding: "12px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              color: "var(--text)",
            }}
          >
            <strong>Bana sor</strong>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: "8px", textAlign: m.role === "user" ? "right" : "left" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    background: m.role === "user" ? "var(--accent-1)" : "var(--bubble-bot)",
                    color: "var(--text)",
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ padding: "12px", borderTop: "1px solid var(--border)", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Bir soru yaz..."
              style={{
                flex: 1,
                padding: "6px 10px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--bg)",
                color: "var(--text)",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "var(--accent-1)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              Gönder
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--accent-1)",
            color: "white",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          💬
        </button>
      )}
    </div>
  );
}