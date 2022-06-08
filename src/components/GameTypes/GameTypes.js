import { Link } from "react-router-dom";

import React from "react";
import { useEffect } from "react";
import "../../css/GameTypes.css";
import GameTypeButton from "./GameTypeButton";

import { Provider, useMutation } from "urql";
import Navbar from "../Navbar/Navbar";

const GameTypes = ({ client }) => {
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const apiId = process.env.REACT_APP_API_IDENTIFIER;
  let JWT = JSON.parse(
    localStorage.getItem(
      `@@auth0spajs@@::${clientId}::${apiId}::openid profile email read:current_user update:current_user_metadata offline_access`
    )
  );

  client.fetchOptions = () => {
    return {
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${JWT.body.id_token}`,
      },
    };
  };

  const InserUser = `mutation MyMutation {
    insert_users(objects: {}) {
      returning {
        user_id  
        exp 
        created 
      }
    }
  }
  `;

  const [insertUserResult, insertUser] = useMutation(InserUser);

  useEffect(() => {
    insertUser();
  }, []);
  return (
    <Provider value={client}>
      <Navbar />
      <section className="gameTypes">
        <Link to="/gameTypes/randomCountry/gameScreen">
          <GameTypeButton type="RandomCountry" />
        </Link>
        <Link to="/gameTypes/selectCountry">
          <GameTypeButton type="SelectCountry" />
        </Link>
        <Link to="/gameTypes/selectContinent">
          <GameTypeButton type="SelectContinent" />
        </Link>
      </section>
    </Provider>
  );
};

export default GameTypes;
