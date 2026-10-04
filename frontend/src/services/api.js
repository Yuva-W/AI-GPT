const API_URL = "http://localhost:8000";

const sendMessage = async (message) => {
    const response =  await fetch(`${API_URL}/new`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "message": message
        })
    });

    if (!response.ok){
        throw new Error("Failed to send message");
    }
    
    return response.json();
}

export default sendMessage;