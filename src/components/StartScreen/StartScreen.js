import "../../css/StartScreen.css";
import MainButton from "./MainButton";
import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
const StartScreen = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="startScreen">
      <h1>Country Quizz</h1>
      <MainButton
        text="Log in!"
        type="green"
        action={() => loginWithRedirect()}
      />
      <MainButton
        text="Sign up!"
        type="white"
        action={() =>
          loginWithRedirect({
            screen_hint: "signup",
          })
        }
      />
    </div>
  );
};

export default StartScreen;
