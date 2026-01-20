//tested with hardcode
const axios = require("axios");

async function handleDialogflow(message) {

    if (message.toLowerCase().includes("order")) {
        const response = await axios.get("http://127.0.0.1:8000/order/123");
        return `Your order status is: ${response.data.status}`;
    }

    if (message.toLowerCase().includes("agent")) {
        return "Connecting you to a human agent. Please wait...";
    }

    return "Sorry, I didn’t understand that. Can you rephrase?";
}

module.exports = { handleDialogflow };
