
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useActiveThread, useChat } from "../context/ChatContext.jsx";

function Chat() {
    const { messages } = useActiveThread();
    const { sendMessage, loading, error } = useChat();

    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const content = message.trim();

        if (!content || loading) return;

        setMessage("");
        await sendMessage(content);
    };

    return (
        <div className="flex h-full min-h-0 flex-col bg-[#212121]">
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            Start your New Chat ...
                        </h1>

                        <p className="mt-3 text-sm text-gray-400">
                            What would you like to explore today?
                        </p>
                    </div>
                ) : (
                    <div className="mx-auto w-full max-w-3xl space-y-6">
                        {messages.map((msg, index) => (
                            <div
                                key={`${msg.role}-${index}`}
                                className={`flex ${
                                    msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[90%] break-words rounded-2xl px-4 py-3 text-sm leading-7 sm:max-w-[85%] ${
                                        msg.role === "user"
                                            ? "whitespace-pre-wrap bg-[#303030] text-white"
                                            : "bg-[#2a2a2a] text-gray-100"
                                    }`}
                                >
                                    {msg.role === "user" ? (
                                        msg.content
                                    ) : (
                                        <ReactMarkdown>
                                            {msg.content || ""}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <p className="text-sm text-gray-400">
                                AI is thinking...
                            </p>
                        )}

                        {error && (
                            <p className="rounded-lg bg-red-950/40 p-3 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <div className="w-full px-4 pb-3 pt-2">
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-3xl border border-[#414141] bg-[#303030] p-3 shadow-lg transition focus-within:border-gray-500"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask anything..."
                        disabled={loading}
                        className="min-w-0 flex-1 bg-transparent px-2 py-2 text-base text-white outline-none placeholder:text-gray-400"
                    />

                    <button
                        type="submit"
                        disabled={!message.trim() || loading}
                        className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>

                <p className="mt-3 text-center text-xs text-gray-500">
                    AI can make mistakes. Check important information.
                </p>
            </div>
        </div>
    );
}

export default Chat;
