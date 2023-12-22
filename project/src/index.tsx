import { createRoot } from "react-dom/client";
import Start from "./Start";
import "./css/tailwind.css";
import { BrowserRouter } from "react-router-dom";

const DOM = createRoot(document.getElementById("root") as HTMLElement);

DOM.render(
    <BrowserRouter>
        <Start />
    </BrowserRouter>
    );
