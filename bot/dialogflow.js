const dialogflow = require("dialogflow");
const uuid = require("uuid");
const fs = require("fs");
const axios = require("axios");

// Path to your downloaded JSON key from Google Cloud
const CREDENTIALS = './dialogflow-key.json';
const PROJECT_ID = JSON.parse(fs.readFileSync(CREDENTIALS)).project_id;

// Create a new session client
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: CREDENTIALS
});

async function handleDialogflow(message, sessionId = uuid.v4()) {
    // Create a session path
    const sessionPath = sessionClient.sessionPath(PROJECT_ID, sessionId);

    // Dialogflow request
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'en-US'
            }
        }
    };

    try {
        // Send message to Dialogflow
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;

        // Check if Dialogflow recognized an intent
        if (result.intent) {
          
            if (result.intent.displayName === "OrderStatus") {
            
                const response = await axios.get("http://127.0.0.1:8000/order/123");
                return `Your order status is: ${response.data.status}`;
            }

  
            if (result.intent.displayName === "TalkToAgent") {
                return "Connecting you to a human agent. Please wait...";
            }

           
            return result.fulfillmentText || "Sorry, I didn't understand that.";
        } else {
            return "Sorry, I didn't understand that.";
        }
    } catch (error) {
        console.error("Dialogflow error:", error);
        return "Oops! Something went wrong.";
    }
}

module.exports = { handleDialogflow };
