const API_URL = "";

const getThreads = async () => {
    const response = await fetch(`${API_URL}/threads`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch threads");
    }

    return data;
};

const getThread = async (threadId) => {
    const response = await fetch(
        `${API_URL}/threads/${threadId}`
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch thread");
    }

    return data;
};

const deleteThread = async (threadId) => {
    const response = await fetch(
        `${API_URL}/threads/${threadId}`,
        {
            method: "DELETE",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to delete thread");
    }

    return data;
};

const sendMessage = async (threadId, message) => {
    const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ threadId, message }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
    }

    return data;
};

export { getThreads, getThread, deleteThread, sendMessage };