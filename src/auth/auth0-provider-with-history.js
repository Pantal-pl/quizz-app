import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({children}) => {

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const apiId = process.env.REACT_APP_API_IDENTIFIER;

  const history = useNavigate();

  const onRedirectCallback = (appState) => {
    history(appState?.returnTo || "/gameTypes");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={"https://rsstudio.netlify.app"}
      onRedirectCallback={onRedirectCallback}
      audience={apiId}
      useRefreshTokens = 'true'
      cacheLocation="localstorage"
      scope="read:current_user update:current_user_metadata"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
