const API_URL = "http://localhost:8000";

const sendMessage = async (threadId, message) => {
    const response =  await fetch(`${API_URL}/chat`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ threadId, message })
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.error || "Failed to get AI response");
    }
    
    return data;
}

export default sendMessage;