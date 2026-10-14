import { ChatProvider } from "./context/ChatContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Chat from "./components/Chat.jsx";

function App() {
    return (
        <ChatProvider>
            <div className="flex h-screen overflow-hidden bg-[#212121] text-white">
                <Sidebar />
                <main className="min-w-0 flex-1">
                    <Chat />
                </main>
            </div>
        </ChatProvider>
    );
}

export default App;