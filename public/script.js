// Function to handle API testing from the UI
async function testApi(endpoint, promptId) {
    const responseArea = document.getElementById('json-response');
    const promptInput = document.getElementById(promptId).value;
    
    responseArea.innerText = "Processing Empire Request...";

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                prompt: promptInput || "Hello Empire!", 
                key: "EMPIRE_ADMIN" // We will replace this with real keys later
            })
        });
        
        const data = await response.json();
        // Display the pretty JSON result
        responseArea.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        responseArea.innerText = "Error: Empire Server is offline or busy.";
        console.error(error);
    }
}

// Function to copy endpoint URL to clipboard
function copyUrl(url) {
    navigator.clipboard.writeText(url);
    alert("Empire Endpoint Copied!");
}
