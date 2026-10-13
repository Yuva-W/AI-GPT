import { useState } from "react";

function Chat() {
    const [message, setMessage] = useState("");

    return (
        <div className="relative flex h-full flex-col items-center justify-center px-5">

            <div className="mb-5 text-center">
                { message.length == 0 ? <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                    Start your New Chat ...
                </h1>
                 : <p>hello</p>}
                
                <p className="mt-3 text-sm text-gray-400">
                    What would you like to explore today?
                </p>
            </div>

        </div>
    );
}

export default Chat;


// import { useState } from "react";
// import ChatWindow from "./ChatWindow";
// import { sendMessage } from "../services/api";

// function Chat() {
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [threadId] = useState(() => crypto.randomUUID());

//     const handleSend = async (message) => {
//         if (loading || !message.trim()) return;

//         setMessages((prev) => [
//             ...prev,
//             { role: "user", content: message },
//         ]);

//         setLoading(true);

//         try {
//             const data = await sendMessage(threadId, message);

//             setMessages((prev) => [
//                 ...prev,
//                 {
//                     role: "assistant",
//                     content: data.reply,
//                 },
//             ]);
//         } catch (error) {
//             setMessages((prev) => [
//                 ...prev,
//                 {
//                     role: "assistant",
//                     content: `Error: ${error.message}`,
//                 },
//             ]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="relative flex h-full min-h-0 flex-col">
//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto px-5 py-6">
//                 {messages.length === 0 ? (
//                     <div className="flex h-full flex-col items-center justify-center text-center">
//                         <h1 className="text-3xl font-medium text-white sm:text-4xl">
//                             Start your New Chat ...
//                         </h1>

//                         <p className="mt-3 text-sm text-gray-400">
//                             What would you like to explore today?
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="mx-auto w-full max-w-3xl space-y-6">
//                         {messages.map((msg, index) => (
//                             <div
//                                 key={index}
//                                 className={`flex ${
//                                     msg.role === "user"
//                                         ? "justify-end"
//                                         : "justify-start"
//                                 }`}
//                             >
//                                 <div
//                                     className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 leading-7 ${
//                                         msg.role === "user"
//                                             ? "bg-[#303030] text-white"
//                                             : "text-gray-100"
//                                     }`}
//                                 >
//                                     {msg.content}
//                                 </div>
//                             </div>
//                         ))}

//                         {loading && (
//                             <p className="text-sm text-gray-400">
//                                 AI is thinking...
//                             </p>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Input */}
//             <div className="w-full px-4 pb-3 pt-2">
//                 <ChatWindow
//                     onSend={handleSend}
//                     loading={loading}
//                 />

//                 <p className="mt-2 text-center text-xs text-gray-500">
//                     AI can make mistakes. Check important information.
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Chat;