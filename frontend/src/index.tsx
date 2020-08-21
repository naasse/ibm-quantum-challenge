/******************************************************************************\
 * Name: index.tsx
 *
 * Purpose: Entrypoint into the application.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const title = "IBM Pokedex Application";

ReactDOM.render(
    <React.StrictMode>
        <App title={title}/>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
