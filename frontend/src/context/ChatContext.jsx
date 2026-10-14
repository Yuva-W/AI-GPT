
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef,
} from "react";

import {
    getThreads,
    getThread,
    deleteThread as deleteThreadApi,
    sendMessage as sendMessageApi,
} from "../services/api.js";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const [threads, setThreads] = useState([]);
    const [activeThreadId, setActiveThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const requestId = useRef(0);
    const activeThreadRef = useRef(null);
    const loadingRef = useRef(false);

    const fetchThreads = useCallback(async () => {
        try {
            const data = await getThreads();
            setThreads(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Failed to load conversations");
        }
    }, []);

    useEffect(() => {
        fetchThreads();
    }, [fetchThreads]);

    const createThread = useCallback(() => {
        const threadId = crypto.randomUUID();

        requestId.current++;
        activeThreadRef.current = threadId;

        setActiveThreadId(threadId);
        setMessages([]);
        setError("");
    }, []);

    const setActiveThread = useCallback(async (threadId) => {
        const currentRequest = ++requestId.current;

        activeThreadRef.current = threadId;
        setActiveThreadId(threadId);
        setError("");

        const existingThread = threads.find(
            (thread) => thread.threadId === threadId
        );

        setMessages(existingThread?.messages || []);

        try {
            const thread = await getThread(threadId);

            if (requestId.current === currentRequest) {
                setMessages(thread.messages || []);
            }
        } catch (err) {
            if (requestId.current === currentRequest) {
                setError(err.message || "Failed to load conversation");
            }
        }
    }, [threads]);

    const sendMessage = useCallback(async (content) => {
        const text = content.trim();

        if (!text || loadingRef.current) return;

        const threadId =
            activeThreadRef.current || crypto.randomUUID();

        const currentRequest = ++requestId.current;

        activeThreadRef.current = threadId;
        loadingRef.current = true;

        setActiveThreadId(threadId);
        setError("");
        setLoading(true);

        setMessages((prev) => [
            ...prev,
            { role: "user", content: text },
        ]);

        try {
            const data = await sendMessageApi(threadId, text);

            if (!data.reply) {
                throw new Error("The backend returned no AI reply");
            }

            if (activeThreadRef.current === threadId) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.reply },
                ]);
            }

            await fetchThreads();
        } catch (err) {
            if (activeThreadRef.current === threadId) {
                setError(err.message || "Failed to send message");
            }
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }

        return currentRequest;
    }, [fetchThreads]);

    const deleteThread = useCallback(async (threadId) => {
        try {
            await deleteThreadApi(threadId);

            setThreads((prev) =>
                prev.filter((thread) => thread.threadId !== threadId)
            );

            if (activeThreadRef.current === threadId) {
                requestId.current++;
                activeThreadRef.current = null;

                setActiveThreadId(null);
                setMessages([]);
                setError("");
            }
        } catch (err) {
            setError(err.message || "Failed to delete conversation");
        }
    }, []);

    const value = {
        threads,
        activeThreadId,
        messages,
        loading,
        error,
        fetchThreads,
        createThread,
        setActiveThread,
        sendMessage,
        deleteThread,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error(
            "useChatContext must be used inside ChatProvider"
        );
    }

    return context;
}

export function useThreads() {
    const {
        threads,
        fetchThreads,
        createThread,
        deleteThread,
    } = useChatContext();

    return { threads, fetchThreads, createThread, deleteThread };
}

export function useActiveThread() {
    const {
        activeThreadId,
        messages,
        setActiveThread,
    } = useChatContext();

    return {
        activeThreadId,
        messages,
        switchThread: setActiveThread,
    };
}

export function useChat() {
    const { sendMessage, loading, error } = useChatContext();

    return { sendMessage, loading, error };
}
