const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    // Display user message
    addMessage(message, "user");

    // Display loading message
    const loading = addMessage("🤖 Thinking...", "bot");

    // Clear input box
    userInput.value = "";

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Remove loading message
        loading.remove();

        // Display AI response
        addMessage(data.reply, "bot");

    } catch (error) {

        // Remove loading message
        loading.remove();

        // Display error
        addMessage("❌ Error connecting to AI.", "bot");
    }
}

function addMessage(text, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (sender === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }

    messageDiv.innerText = text;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    // Return the created message element
    return messageDiv;
}