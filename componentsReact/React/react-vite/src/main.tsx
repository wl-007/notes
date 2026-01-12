import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import {store} from "./stores";
import {Provider} from "react-redux";
import {router} from "./router";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
