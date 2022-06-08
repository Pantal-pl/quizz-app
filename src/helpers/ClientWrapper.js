import { createClient, Provider } from "urql";
import App from "../App";
import React  from 'react';
function ClientWrapper() {
  const client = createClient({
    url: "https://secure-doberman-69.hasura.app/v1/graphql",
    requestPolicy: 'cache-and-network',
  });

  return (
    <Provider value={client}>
      <App client={client}/>
    </Provider>
  );
}

export default ClientWrapper;
