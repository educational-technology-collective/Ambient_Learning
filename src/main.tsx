import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { isPlatform } from "@ionic/react";

const container = document.getElementById("root");
const root = createRoot(container!);
const isPhone = isPlatform("hybrid");
const callBackUri = isPhone
  ? "ionic.srs://dev-cra0zttj8xlwi6sh.us.auth0.com/capacitor/ionic.srs/callback/"
  : "http://localhost:8100";

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-cra0zttj8xlwi6sh.us.auth0.com"
      clientId="FL6nEaabdViQCGWXTsfGl0DVwKfBnBNy"
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: callBackUri,
        audience: "https://auth0-jwt-authorizer",
        // scope:'openid profile email offline_access',
        // ignoreCache: true
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
