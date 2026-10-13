import Chatwindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <div className="flex h-screen overflow-hidden bg-[#212121]">
            <Sidebar />

            <main className="min-w-0 flex-1">
                <Chatwindow />
            </main>
        </div>
    );
}

export default App;