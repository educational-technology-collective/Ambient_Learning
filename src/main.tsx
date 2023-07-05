import React from 'react';
import { createRoot } from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain='dev-uynheb4nra1vcpvi.us.auth0.com'
    clientId='6kW2AbhIw4SnHkeYjYIQOFAEYvIwKRyt'
    useRefreshTokens={true}
    useRefreshTokensFallback={false}
    authorizationParams={{
      redirect_uri:'ionic.srs://dev-uynheb4nra1vcpvi.us.auth0.com/capacitor/ionic.srs/callback'
    }}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);