import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId="997780934199-n74m8ul0rlojq3s3dfpb3t9edtfdbdsj.apps.googleusercontent.com"
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);