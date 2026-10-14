
import "./Sidebar.css";
import { useThreads, useActiveThread } from "../context/ChatContext.jsx";

function Sidebar() {
    const {
        threads,
        createThread,
        deleteThread,
    } = useThreads();

    const {
        activeThreadId,
        switchThread,
    } = useActiveThread();

    const handleDeleteThread = async (e, threadId) => {
        e.stopPropagation();

        if (window.confirm("Delete this chat?")) {
            await deleteThread(threadId);
        }
    };

    return (
        <aside className="sidebar flex h-full min-h-0 flex-col px-2 py-3">
            <h2 className="mb-3 px-2 text-xl font-semibold text-white">
                Text 2 Visualization
            </h2>

            <button
                onClick={createThread}
                className="mb-6 w-full rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 transition hover:border-gray-400 hover:bg-[#202020]"
            >
                + New Chat
            </button>

            <section className="min-h-0 flex-1 overflow-y-auto">
                <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Recent
                </h3>

                <div className="space-y-1">
                    {threads.length === 0 ? (
                        <p className="px-3 text-sm text-gray-500">
                            No chats yet
                        </p>
                    ) : (
                        threads.map((thread) => (
                            <div
                                key={thread.threadId}
                                className={`group flex items-center gap-1 rounded-lg ${
                                    activeThreadId === thread.threadId
                                        ? "bg-[#292929]"
                                        : "hover:bg-[#202020]"
                                }`}
                            >
                                <button
                                    onClick={() =>
                                        switchThread(thread.threadId)
                                    }
                                    title={thread.title || "New Chat"}
                                    className="min-w-0 flex-1 truncate rounded-lg px-3 py-2.5 text-left text-sm text-gray-300"
                                >
                                    {thread.title || "New Chat"}
                                </button>

                                <button
                                    onClick={(e) =>
                                        handleDeleteThread(
                                            e,
                                            thread.threadId
                                        )
                                    }
                                    title="Delete chat"
                                    aria-label={`Delete ${thread.title || "chat"}`}
                                    className="mr-2 rounded p-1 text-gray-500 opacity-100 transition hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v12m-6 0h12a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </aside>
    );
}

export default Sidebar;
