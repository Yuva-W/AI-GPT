import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import { useState } from 'react'

function Chatwindow() {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        console.log(message);
        setMessage("");
    };

    return ( 
        <div className="chatWindow flex flex-col items-center justify-center">
            <Chat />

            <div>
                <form
                onSubmit={handleSubmit}
                className="flex w-3xl items-center gap-3 rounded-3xl border border-[#414141] bg-[#303030] p-3 shadow-lg transition focus-within:border-gray-500"
            >
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything..."
                    className="min-w-0 flex-1 bg-transparent px-2 py-2 text-base text-white outline-none placeholder:text-gray-400"
                />

                <button
                    type="submit"
                    disabled={!message.trim()}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Send
                </button>
            </form>

            <p className="mt-3 text-center text-xs text-gray-500">
                AI can make mistakes. Check important information.
            </p>
            </div>

        </div>
        
     );
}

export default Chatwindow;