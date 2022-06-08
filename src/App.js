import GameScreen from "./components/GameScreen/GameScreen";
import GameTypes from "./components/GameTypes/GameTypes";
import ResultScreen from "./components/ResultScreen/ResultScreen";
import SelectScreen from "./components/SelectScreen/SelectScreen";
import StartScreen from "./components/StartScreen/StartScreen";
import Loader from "./components/Loader";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";
import React  from 'react';
function App({ client }) {
  const countriesCode = [
    "AD",
    "AE",
    "AF",
    "AG",
    "AI",
    "AL",
    "AM",
    "AO",
    "AQ",
    "AR",
    "AS",
    "AT",
    "AU",
    "AW",
    "AX",
    "AZ",
    "BA",
    "BB",
    "BD",
    "BE",
    "BF",
    "BG",
    "BH",
    "BI",
    "BJ",
    "BL",
    "BM",
    "BN",
    "BO",
    "BQ",
    "BR",
    "BS",
    "BT",
    "BV",
    "BW",
    "BY",
    "BZ",
    "CA",
    "CC",
    "CD",
    "CF",
    "CG",
    "CH",
    "CI",
    "CK",
    "CL",
    "CM",
    "CN",
    "CO",
    "CR",
    "CU",
    "CV",
    "CW",
    "CX",
    "CY",
    "CZ",
    "DE",
    "DJ",
    "DK",
    "DM",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "EH",
    "ER",
    "ES",
    "ET",
    "FI",
    "FJ",
    "FK",
    "FM",
    "FO",
    "FR",
    "GA",
    "GB",
    "GD",
    "GE",
    "GF",
    "GG",
    "GH",
    "GI",
    "GL",
    "GM",
    "GN",
    "GP",
    "GQ",
    "GR",
    "GS",
    "GT",
    "GU",
    "GW",
    "GY",
    "HK",
    "HM",
    "HN",
    "HR",
    "HT",
    "HU",
    "ID",
    "IE",
    "IL",
    "IM",
    "IN",
    "IO",
    "IQ",
    "IR",
    "IS",
    "IT",
    "JE",
    "JM",
    "JO",
    "JP",
    "KE",
    "KG",
    "KH",
    "KI",
    "KM",
    "KN",
    "KP",
    "KR",
    "KW",
    "KY",
    "KZ",
    "LA",
    "LB",
    "LC",
    "LI",
    "LK",
    "LR",
    "LS",
    "LT",
    "LU",
    "LV",
    "LY",
    "MA",
    "MC",
    "MD",
    "ME",
    "MF",
    "MG",
    "MH",
    "MK",
    "ML",
    "MM",
    "MN",
    "MO",
    "MP",
    "MQ",
    "MR",
    "MS",
    "MT",
    "MU",
    "MV",
    "MW",
    "MX",
    "MY",
    "MZ",
    "NA",
    "NC",
    "NE",
    "NF",
    "NG",
    "NI",
    "NL",
    "NO",
    "NP",
    "NR",
    "NU",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PF",
    "PG",
    "PH",
    "PK",
    "PL",
    "PM",
    "PN",
    "PR",
    "PS",
    "PT",
    "PW",
    "PY",
    "QA",
    "RE",
    "RO",
    "RS",
    "RU",
    "RW",
    "SA",
    "SB",
    "SC",
    "SD",
    "SE",
    "SG",
    "SH",
    "SI",
    "SJ",
    "SK",
    "SL",
    "SM",
    "SN",
    "SO",
    "SR",
    "SS",
    "ST",
    "SV",
    "SX",
    "SY",
    "SZ",
    "TC",
    "TD",
    "TF",
    "TG",
    "TH",
    "TJ",
    "TK",
    "TL",
    "TM",
    "TN",
    "TO",
    "TR",
    "TT",
    "TV",
    "TW",
    "TZ",
    "UA",
    "UG",
    "UM",
    "US",
    "UY",
    "UZ",
    "VA",
    "VC",
    "VE",
    "VG",
    "VI",
    "VN",
    "VU",
    "WF",
    "WS",
    "XK",
    "YE",
    "YT",
    "ZA",
    "ZM",
    "ZW",
  ];

  let randomCountriesCodeFirst =
    countriesCode[
      Math.floor(Math.random() * countriesCode.length)
    ].toLocaleLowerCase();

  let randomCountriesCodeSecond =
    countriesCode[
      Math.floor(Math.random() * countriesCode.length)
    ].toLocaleLowerCase();

  let randomCountriesCodeThird =
    countriesCode[
      Math.floor(Math.random() * countriesCode.length)
    ].toLocaleLowerCase();

  const { isAuthenticated, isLoading } = useAuth0();
  let navigate = useNavigate();
  let location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  isAuthenticated === true && location.pathname === "/"
    ? navigate("/gameTypes")
    : console.log("");

  return (
    <div id="app">
      <Routes>
        <Route path="/" exact element={<StartScreen />} />

        <Route path="/gameTypes/*">
          <Route
            index={true}
            element={
              <ProtectedRoute Component={<GameTypes client={client} />} />
            }
          />
          <Route
            path="resultScreen"
            element={<ProtectedRoute Component={<ResultScreen client={client} />} />}
          />
          <Route
            path="randomCountry/gameScreen"
            element={
              <ProtectedRoute
                Component={
                  <GameScreen
                    c1={randomCountriesCodeFirst}
                    c2={randomCountriesCodeSecond}
                    c3={randomCountriesCodeThird}
                  />
                }
              />
            }
          />
          <Route
            path="selectCountry"
            element={
              <ProtectedRoute Component={<SelectScreen type="Country" />} />
            }
          />
          <Route
            path="selectContinent"
            element={
              <ProtectedRoute Component={<SelectScreen type="Continent" />} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
