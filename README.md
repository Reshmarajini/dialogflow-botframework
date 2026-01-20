What i learned from this Project
I build a enterprise chatbot that can answer questions like:
“Where is my order?”,“Create a support ticket”,“Talk to a human agent”

index.js → Entry point. This is where messages arrive and are sent to the logic handler.
dialogflow.js → Keeps logic separate so it’s easy to maintain (decides how to respond to messages)
main.py → Simulates a real backend (database/API).
intents.md & entities.md → Shows how bot understands users. This is a key concept in enterprise bots.

HOW THE FLOW WORKS
User types message → Bot Framework receives it (index.js)
Bot Framework sends message to handler (dialogflow.js)
Handler checks message content → decides reply
If order-related → call backend API (main.py)
If human agent → reply “Connecting to agent”
If unknown → reply fallback
Reply goes back to Bot Framework → sent to user
Emulator displays conversation