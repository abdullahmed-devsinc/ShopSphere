import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import "./theme.css";
import Navbar from "./Components/Navbar";

export default function App() {
    return (
        <BrowserRouter>
            <main className="app-shell">
                <Navbar />
                <Routes />
            </main>
        </BrowserRouter>
    );
}