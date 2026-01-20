// Load environment variables
require("dotenv").config();

const express = require("express");
const { BotFrameworkAdapter } = require("botbuilder");
const { handleDialogflow } = require("./dialogflow"); // your dialogflow logic

const app = express();
app.use(express.json());

// Bot Framework Adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID || "",
    appPassword: process.env.MICROSOFT_APP_PASSWORD || ""
});

// Error handler
adapter.onTurnError = async (context, error) => {
    console.error("Bot error:", error);
    await context.sendActivity("Sorry, something went wrong.");
};

// Bot endpoint for messages
app.post("/api/messages", async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === "message") {
            const userMessage = context.activity.text;
            try {
                const reply = await handleDialogflow(userMessage, context.activity.from.id);
                await context.sendActivity(reply);
            } catch (err) {
                console.error("Dialogflow error:", err);
                await context.sendActivity("Sorry, I couldn’t understand that.");
            }
        }
    });
});

// Start server on PORT from .env
const PORT = process.env.PORT || 3978;

app.listen(PORT, () => {
    console.log(`Bot running on http://localhost:${PORT}`);
});
