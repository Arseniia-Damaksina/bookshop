import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";
import quotes from "../data.js";

const HomePage = () => {
  const [randomQuote, setRandomQuote] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    };
    getRandomQuote();
  }, []);

  return (
    <div className="pageContainer">
      <div className="backgroundContainer"></div>
      <div className="contentContainer">
        <div className="quotes">
          <div className="quote">{randomQuote.quote}</div>
          <div className="author">{randomQuote.author}</div>
        </div>
        <div className="buttonDiv">
          <button onClick={() => navigate("/bookstore")}>Go to Books</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
