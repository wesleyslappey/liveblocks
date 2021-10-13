import React from "react";
import ReactDOM from "react-dom";
import { createClient } from "@liveblocks/client";
import { LiveblocksProvider } from "@liveblocks/react";
import "./reset.css";
import "./index.css";
import App from "./App";

const client = createClient({
  publicApiKey: "pk_YOUR_PUBLIC_KEY", // REPLACE WITH YOUR PUBLIC KEY
});

ReactDOM.render(
  <React.StrictMode>
    <LiveblocksProvider client={client}>
      <App />
    </LiveblocksProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
