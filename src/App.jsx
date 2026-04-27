import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import "./theme.css";

export default function App() {
    return (
        <BrowserRouter>
            <main className="app-shell">
                <Routes />
            </main>
        </BrowserRouter>
    );
}