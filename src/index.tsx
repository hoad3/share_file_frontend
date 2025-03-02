import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './output.css'
import { Provider } from "react-redux";
import {router} from "./Router/Router";
import {RouterProvider} from "react-router-dom";
import {SnackbarProvider} from "notistack";

import {store} from "./redux/store";

const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <SnackbarProvider maxSnack={3}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </SnackbarProvider>
        </React.StrictMode>
    );
}
