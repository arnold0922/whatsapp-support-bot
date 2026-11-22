// Chat logic: simulated AI that matches FAQs by keywords and hands off to a human.
const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("composer");
const inputEl = document.getElementById("input");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let mode = "bot"; // "bot" or "human" (after handoff)
let busy = false;

// ---------- Matching ----------
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter(Boolean);
}

function findFaq(text) {
  const words = tokenize(text);
  let best = null;
  let bestScore = 0;
  for (const faq of FAQS) {
    const score = faq.keywords.filter((k) => words.some((w) => w === k || w.startsWith(k))).length;
    if (score > bestScore) {
      best = faq;
      bestScore = score;
    }
  }
  return best;
}

function hasAny(text, keywords) {
  return tokenize(text).some((w) => keywords.includes(w));
}

function wantsHuman(text) {
  const words = tokenize(text);
  return HUMAN_KEYWORDS.some((k) => words.includes(k));
}

// ---------- Rendering ----------
function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function addMessage(text, from, sender) {
  const row = document.createElement("div");
  row.className = `row ${from}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (sender) {
    const name = document.createElement("div");
    name.className = "sender";
    name.textContent = sender;
    bubble.appendChild(name);
  }
  const body = document.createElement("div");
  body.className = "text";
  body.textContent = text;
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = timeNow() + (from === "user" ? "  ✓✓" : "");
  bubble.append(body, meta);
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  scrollDown();
  return row;
}

function addSystemNote(text) {
  const note = document.createElement("div");
  note.className = "system";
  note.textContent = text;
  messagesEl.appendChild(note);
  scrollDown();
}

function addButtons(options) {
  const wrap = document.createElement("div");
  wrap.className = "quick";
  for (const opt of options) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = opt.label;
    btn.className = opt.primary ? "primary" : "";
    btn.addEventListener("click", () => {
      if (busy) return;
      wrap.remove();
      opt.onClick();
    });
    wrap.appendChild(btn);
  }
  messagesEl.appendChild(wrap);
  scrollDown();
}

function scrollDown() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function setStatus(text) {
  statusEl.textContent = text;
}

// Shows a typing indicator, then runs the reply.
function reply(fn, delay = 900) {
  busy = true;
  setStatus("typing…");
  const typing = document.createElement("div");
  typing.className = "row bot";
  typing.innerHTML = '<div class="bubble typing"><span></span><span></span><span></span></div>';
  messagesEl.appendChild(typing);
  scrollDown();
  setTimeout(() => {
    typing.remove();
    setStatus(mode === "human" ? `${BUSINESS.agentName} · Support team` : "AI assistant · online");
    busy = false;
    fn();
  }, delay);
}

// ---------- Flows ----------
function faqButtons() {
  return FAQS.map((f) => ({ label: f.label, onClick: () => handleUser(f.label, f) }))
    .concat([{ label: "Talk to a human", primary: true, onClick: () => handleUser("I'd like to talk to a human") }]);
}

function offerHandoff(reason) {
  addMessage(reason, "bot");
  addButtons([
    { label: "Yes, connect me", primary: true, onClick: () => { addMessage("Yes, connect me", "user"); startHandoff(); } },
    { label: "No, show the FAQs", onClick: () => { addMessage("No, show the FAQs", "user"); reply(() => { addMessage("Sure! Pick a topic:", "bot"); addButtons(faqButtons()); }); } },
  ]);
}

function startHandoff() {
  mode = "human";
  reply(() => {
    addMessage("Connecting you with our team now. A barista will reply in a moment ☕", "bot");
    addSystemNote(`${BUSINESS.agentName} from Brew & Bean joined the chat`);
    reply(() => {
      addMessage(
        `Hi! I'm ${BUSINESS.agentName}. I've read your conversation so far. How can I help you today?`,
        "bot",
        `${BUSINESS.agentName} (Support)`
      );
    }, 1600);
  });
}

function handleUser(text, knownFaq) {
  if (busy || !text.trim()) return;
  addMessage(text, "user");

  // After the handoff, a "person" answers (simulated).
  if (mode === "human") {
    reply(() => addMessage(
      "Thanks for the details! I'm checking this for you and will follow up shortly. (Demo: this is where a real team member takes over.)",
      "bot",
      `${BUSINESS.agentName} (Support)`
    ), 1400);
    return;
  }

  if (wantsHuman(text)) {
    startHandoff();
    return;
  }

  const faq = knownFaq || findFaq(text);
  reply(() => {
    if (faq) {
      addMessage(faq.answer, "bot");
      addButtons([
        { label: "Ask something else", onClick: () => reply(() => { addMessage("Of course! Pick a topic or type your question:", "bot"); addButtons(faqButtons()); }, 500) },
        { label: "Talk to a human", primary: true, onClick: () => { addMessage("I'd like to talk to a human", "user"); startHandoff(); } },
      ]);
    } else if (hasAny(text, GREETING_KEYWORDS)) {
      addMessage(`Hi! 👋 Welcome to ${BUSINESS.name}. What can I help you with today?`, "bot");
      addButtons(faqButtons());
    } else if (hasAny(text, THANKS_KEYWORDS)) {
      addMessage("You're welcome! ☕ Anything else I can help with?", "bot");
      addButtons(faqButtons());
    } else {
      offerHandoff("Sorry, I'm not sure about that one. Would you like me to connect you with a member of our team?");
    }
  });
}

function start() {
  messagesEl.innerHTML = "";
  mode = "bot";
  busy = false;
  setStatus("AI assistant · online");
  addSystemNote("Today");
  addMessage(`Hi there! 👋 Welcome to ${BUSINESS.name}. I'm the virtual assistant. Ask me a question or choose a topic below.`, "bot");
  addButtons(faqButtons());
  inputEl.value = "";
  inputEl.focus();
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = inputEl.value;
  if (busy || !text.trim()) return;
  messagesEl.querySelectorAll(".quick").forEach((q) => q.remove());
  inputEl.value = "";
  handleUser(text);
});

resetBtn.addEventListener("click", start);

start();
