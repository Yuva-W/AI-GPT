import "./Sidebar.css";
import { useState } from "react";

function sidebar() {
    const [activeItem, setActiveItem] = useState("Text to Visualize");

    const recentChats = [
        "Build AI Clone",
        "Deep Dive Overview",
        "GPT Clone",
    ];

    return ( 
        <div className="sidebar px-2 py-2">

            <h2 className="mb-2 px-2 text-xl font-semibold">
                GPT 
            </h2>

            <button className="w-full mb-8 rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 transition hover:border-gray-400 hover:bg-[#202020]">
                New Chat
            </button>

            <section className="flex-1 overflow-y-auto">
            <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Recent
            </h3>

            <div className="space-y-1">
                {recentChats.map((chat) => (
                    <button
                        key={chat}
                        onClick={() => setActiveItem(chat)}
                        className={`w-full truncate rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            activeItem === chat
                                ? "bg-[#292929]"
                                : "text-gray-300 hover:bg-[#202020]"
                        }`}
                    >
                        {chat}
                    </button>
                ))}
            </div>
        </section>
        </div>
     );
}

export default sidebar;