import "../../css/GameScreen.css";
import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import { useQuery } from "urql";
import Loader from "../Loader";
import Error from "../Error";
import { useNavigate, useLocation } from "react-router-dom";
const GameScreen = ({ c1, c2, c3 }) => {
  const [randomNumber, setRandomNumber] = useState(0);

  const location = useLocation();
  const whatType = location.state;

  let userChoice;
  let type;
  let source;
  let points = 0;

  let isoInput = useRef(null);
  let currencyInput = useRef(null);
  let prefixInput = useRef(null);
  let continentInput = useRef(null);
  let capitolInput = useRef(null);
  let launguageInput = useRef(null);
  let checkboxOne = useRef(null);
  let checkboxTwo = useRef(null);
  let checkboxThree = useRef(null);

  let ISO_CodeAnswer;
  let currencyAnswer;
  let prefixAnswer;
  let continentAnswer;
  let capitalAnswer;
  let launguageAnswer;
  let flagAnswer;


  if (whatType) {
    userChoice = location.state.userChoice;
    type = location.state.type;
  }

  const countryQuery = `query MyQuery {
    countries(filter: {code: {eq: "${c1.toUpperCase()}"}}) {
      code
      native
      name
      currency
      capital
      phone
      continent {
        name
      }
      languages {
        name
      }
    }
  }
  `;

  const countryQueryByContinent = `query MyQuery {
    continent(code: "${userChoice}") {
      countries {
        code
        capital
        currency
        name
        native
        phone
        languages {
          name
        }
        continent {
          name
        }
      }
    }
  }
  `;

  const countryQueryByCountry = `query MyQuery {
    country(code: "${userChoice}") {
      capital
      code
      currency
      name
      native
      phone
      languages {
        name
      }
      continent {
        name
      }
    }
  }
  
  `;


  const [result, reexecuteQuery] = useQuery({
    query:
      type === "Continent"
        ? countryQueryByContinent
        : type === "Country"
        ? countryQueryByCountry
        : countryQuery,
    pause: true,
  });

  const { fetching, error, data } = result;

  const [timeLeft, setTimeLeft] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();

  // const randomStyle = ["row-reverse", "row"];
  // let randomStyleForFlags = randomStyle[Math.floor(Math.random() * randomStyle.length)].toLocaleLowerCase();

 
  useEffect(() => {
    reexecuteQuery();
  }, []);

  useEffect(() => {
    if(data && userChoice === "Continent") {
      setRandomNumber(
        Math.floor(Math.random() * data.continent.countries.length)
      );
    }
}, [data]);

  if (fetching) {
    return <Loader />;
  } else if (error) {
    console.log(error);
    return <Error errorInfo={error} />;
  }

  if (data) {
    source =
      type === "Continent"
        ? data.continent.countries[randomNumber]
        : type === "Country"
        ? data.country
        : data.countries[0];

  }


  const saveUserAnswer = () => {
    ISO_CodeAnswer = isoInput.current.value.toUpperCase();
    currencyAnswer = currencyInput.current.value.toUpperCase();
    prefixAnswer = prefixInput.current.value;
    continentAnswer = continentInput.current.value;
    capitalAnswer = capitolInput.current.value;
    launguageAnswer = launguageInput.current.value;
    if (checkboxOne.current.checked) {
      flagAnswer = `<img src='https://flagcdn.com/128x96/${checkboxOne.current.value.toLowerCase()}.webp' />`;
    } else if (checkboxTwo.current.checked) {
      flagAnswer = `<img src='https://flagcdn.com/128x96/${checkboxTwo.current.value.toLowerCase()}.webp' />`;
    } else {
      flagAnswer = `<img src='https://flagcdn.com/128x96/${checkboxThree.current.value.toLowerCase()}.webp' />`;
    }
  };

  const checkUserAnswers = (e) => {
    // const pickRandomCountry = Math.floor(Math.random() * data.continent.countries.length())
    window.scrollTo(0, 0);
    e.preventDefault();
    isoInput.current.value.toUpperCase() === source.code && points++;
    currencyInput.current.value.toUpperCase() === source.currency && points++;
    prefixInput.current.value === source.phone && points++;
    continentInput.current.value === source.continent.name && points++;
    capitolInput.current.value.toLowerCase() === source.capital.toLowerCase() &&
      points++;
    launguageInput.current.value === source.languages[0].name && points++;
    if (checkboxOne.current.checked) {
      checkboxOne.current.value.toUpperCase() === source.code && points++;
    } else if (checkboxTwo.current.checked) {
      checkboxTwo.current.value.toUpperCase() === source.code && points++;
    } else {
      checkboxThree.current.value.toUpperCase() === source.code && points++;
    }
    saveUserAnswer();
    setIsDone(true);
    let ISO_CodeCorrect = source.code;
    let currencyCorrect = source.currency;
    let prefixCorrect = source.phone;
    let continentCorrect = source.continent.name;
    let capitalCorrect = source.capital;
    let launguageCorrect = source.languages[0].name;
    let flagCorrect = `<img src='https://flagcdn.com/128x96/${source.code.toLowerCase()}.webp' />`;

    navigate("/gameTypes/resultScreen", {
      state: {
        points: points,
        time: timeLeft,
        type: type,
        answers: [
          ISO_CodeAnswer,
          currencyAnswer,
          prefixAnswer,
          continentAnswer,
          capitalAnswer,
          launguageAnswer,
          flagAnswer,
        ],
        correctAnswer: [
          ISO_CodeCorrect,
          currencyCorrect,
          prefixCorrect,
          continentCorrect,
          capitalCorrect,
          launguageCorrect,
          flagCorrect,
        ],
      },
    });
  };

  return (
    <div className="questions">
      <h1>{data && source.name}</h1>

      <ProgressBar
        type="sec"
        passChildData={setTimeLeft}
        checkIsDone={isDone}
      />
      <form>
        <label htmlFor="ISO">
          <p> ISO code</p>
          <input
            type="text"
            placeholder="Enter ISO code..."
            name="ISO"
            ref={isoInput}
          />
        </label>

        <label htmlFor="Currnecy">
          <p>Currnecy ISO code</p>
          <input
            type="text"
            placeholder="Enter currnecy..."
            name="Currnecy"
            ref={currencyInput}
          />
        </label>

        <label htmlFor="Number prefix">
          <p>Number prefix</p>
          <input
            type="number"
            placeholder="Enter number prefix..."
            name="Number prefix"
            ref={prefixInput}
          />
        </label>

        <label htmlFor="Continent">
          <p>Continent</p>
          <input
            type="text"
            placeholder="Enter continent..."
            name="Continent"
            ref={continentInput}
          />
        </label>

        <label htmlFor="Capitol">
          <p>Capitol</p>
          <input
            type="text"
            placeholder="Enter Capitol..."
            name="Capitol"
            ref={capitolInput}
          />
        </label>

        <label htmlFor="Main launguage">
          <p>Main launguage</p>
          <input
            type="text"
            placeholder="Enter main launguage..."
            name="Main launguage"
            ref={launguageInput}
          />
        </label>

        <br />
        {/* <fieldset style={{flexDirection:randomStyleForFlags}}> */}
        <fieldset>
          <legend>Select flag for {data && source.name}</legend>
          <label>
            <input
              id="c1"
              type="radio"
              name="country"
              value={
                data &&
                (type === "Country"
                  ? source.code.toLowerCase()
                  : type === "Continent"
                  ? source.code.toLowerCase()
                  : c1)
              }
              ref={checkboxOne}
            />
            <img
              src={`https://flagcdn.com/128x96/${
                data &&
                (type === "Country"
                  ? source.code.toLowerCase()
                  : type === "Continent"
                  ? source.code.toLowerCase()
                  : c1)
              }.webp`}
            />
          </label>

          <label>
            <input
              id="c2"
              type="radio"
              name="country"
              value={c2}
              ref={checkboxTwo}
            />
            <img src={`https://flagcdn.com/128x96/${c2}.webp`} />
          </label>

          <label>
            <input
              id="c3"
              type="radio"
              name="country"
              value={c3}
              ref={checkboxThree}
            />
            <img src={`https://flagcdn.com/128x96/${c3}.webp`} />
          </label>
        </fieldset>
        <button type="submit" onClick={checkUserAnswers}>
          Done &gt;
        </button>
      </form>
    </div>
  );
};

export default GameScreen;
