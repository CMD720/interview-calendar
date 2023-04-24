import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "styled-components";
import {Global} from "./components/styles";
import {theme } from "./components/theme";
import {setupStore} from "./redux/store";
import {Provider} from "react-redux";

const store = setupStore()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
    {/*<ThemeProvider theme={baseTheme}>*/}
        <Provider store={store}>
            <Global/>
            <App/>
        </Provider>
    </ThemeProvider>

    // </React.StrictMode>
);

reportWebVitals();
