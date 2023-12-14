import "preact/debug";
import "preact/devtools";
import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { isPlatform } from "@ionic/react";

const container = document.getElementById("root");
const root = createRoot(container!);
const isPhone = isPlatform("hybrid");
const callBackUri = isPhone
  ? "com.etc.ambientlearning://ambient-learning.us.auth0.com/capacitor/com.etc.ambientlearning/callback/"
  : "http://localhost:8100";

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="ambient-learning.us.auth0.com"
      clientId="ZjoTnJ5njIZk4iSTq3DpGHVuVUTQKiTF"
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: callBackUri,
        audience: "https://ambient-aws-api-paladin",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
