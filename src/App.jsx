import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Routes from "./Routes";
import "./theme.css";
import Navbar from "./Components/Navbar";
import Breadcrumbs from "./Components/Breadcrumbs";

export default function App() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <BrowserRouter>
            <Navbar
                onFilterToggle={() => setIsFilterOpen(prev => !prev)}
                isFilterOpen={isFilterOpen}
            />
            <main className="app-shell">
                <Breadcrumbs/>
                <Routes isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
            </main>
        </BrowserRouter>
    );
}