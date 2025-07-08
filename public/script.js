// public/script.js

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${sender}`;
  msgDiv.textContent = `${sender === "user" ? "You" : "HB"}: ${text}`;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

sendBtn.onclick = async () => {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  userInput.value = "";

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    appendMessage(data.reply, "bot");
  } catch (err) {
    appendMessage("Something went wrong 💔", "bot");
    console.error(err);
  }
};
