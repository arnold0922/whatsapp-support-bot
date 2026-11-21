# Brew & Bean – WhatsApp-style AI Support Bot (Demo)

A chat demo for a coffee shop. The bot answers common FAQs and hands the conversation over to a human when it can't help.

## Run it
No install or server needed. Open `index.html` in any browser.
(Or run `npx serve .` and open the link it prints.)

## What it does
- **5 FAQs:** opening hours, menu & prices, delivery & pickup, Wi-Fi & seating, loyalty card.
- **Quick replies:** tap a topic, or type a question in your own words.
- **Simulated AI:** keyword matching with a "typing…" delay. No API key, free, and it always works.
- **Human handoff:** if the bot can't match the question, it offers to connect you to a person. Typing "human", "agent" or "staff" also connects you right away. A support agent (simulated) then joins the chat.
- **Reset chat:** starts a fresh conversation.

## Files
| File | Purpose |
|---|---|
| `index.html` | Page layout |
| `styles.css` | Navy / warm orange / white theme |
| `faq.js` | Knowledge base: questions, keywords and answers |
| `app.js` | Chat logic: matching, typing indicator, handoff |

## Key decisions
- **Simulated AI over a real model:** the brief allows it, and it makes the demo free, fast and reliable.
- **The handoff is always one tap away:** a "Talk to a human" button appears after every answer, so the customer never gets stuck.
- **Content is kept apart from logic:** to change the FAQs you only edit `faq.js`.

## AI tools used
- Claude Code helped plan and write the code.

## What I would improve next
- Replace keyword matching with an LLM that answers from the same knowledge base, and hands off when it isn't confident.
- Connect to the real WhatsApp Business API and a support inbox for live agents.
- Save chat history and pass a summary of the chat to the agent.
