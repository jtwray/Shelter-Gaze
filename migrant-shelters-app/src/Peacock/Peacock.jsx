import React, { useState, useEffect } from "react";

const PeacockPage = () => {
  const [revealSections, setRevealSections] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sectionOffsets = Array.from(
        document.querySelectorAll(".feather")
      ).map((section) => section.offsetTop);
      const newRevealSections = sectionOffsets.filter(
        (offset) => scrollTop > offset - window.innerHeight / 2
      );
      setRevealSections(newRevealSections);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="feather"
        id="feather1"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(peacock-feather.jpg)",
          backgroundSize: "cover",
          clipPath: revealSections.includes(0)
            ? "polygon(50% 0, 0% 100%, 100% 100%, 50% 0)"
            : "polygon(0 0, 0% 100%, 100% 100%, 100% 0)",
          transition: "clip-path 1s ease-in-out",
        }}
      ></div>
      <div
        className="feather"
        id="feather2"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(peacock-feather.jpg)",
          backgroundSize: "cover",
          clipPath: revealSections.includes(1)
            ? "polygon(50% 0, 0% 100%, 100% 100%, 50% 0)"
            : "polygon(0 0, 0% 100%, 100% 100%, 100% 0)",
          transition: "clip-path 1s ease-in-out",
        }}
      ></div>
      <div
        className="feather"
        id="feather3"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(peacock-feather.jpg)",
          backgroundSize: "cover",
          clipPath: revealSections.includes(2)
            ? "polygon(50% 0, 0% 100%, 100% 100%, 50% 0)"
            : "polygon(0 0, 0% 100%, 100% 100%, 100% 0)",
          transition: "clip-path 1s ease-in-out",
        }}
      ></div>
      {/* Add more sections representing peacock feathers */}
    </div>
  );
};

const PeacockFeathers = () => {
  const [revealSections, setRevealSections] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sectionOffsets = Array.from(
        document.querySelectorAll(".feather")
      ).map((section) => section.offsetTop);
      const newRevealSections = sectionOffsets.filter(
        (offset) => scrollTop > offset - window.innerHeight / 2
      );
      setRevealSections(newRevealSections);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="feather"
        id="feather1"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "blue",
          clipPath: revealSections.includes(0)
            ? "polygon(50% 0, 0% 100%, 100% 100%, 50% 0)"
            : "polygon(0 0, 0% 100%, 100% 100%, 100% 0)",
          transition: "clip-path 1s ease-in-out",
        }}
      ></div>
      <div
        className="feather"
        id="feather2"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "red",
          clipPath: revealSections.includes(1)
            ? "polygon(50% 0, 0% 100%, 100% 100%, 50% 0)"
            : "polygon(0 0, 0% 100%, 100% 100%, 100% 0)",
          transition: "clip-path 1s ease-in-out",
        }}
      ></div>
      <div
        className="feather"
        id="feather3"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "green",
          clipPath: revealSections.includes(2)
            ? "polygon(50% 0, 0% 100%, 100% 100%, 50% 0)"
            : "polygon(0 0, 0% 100%, 100% 100%, 100% 0)",
          transition: "clip-path 1s ease-in-out",
        }}
      ></div>
      {/* Add more sections representing peacock feathers */}
    </div>
  );
};

const PeacockAnimation = () => {
  const [spread, setSpread] = useState(false); // State to track if the feathers are spread or not

  return (
    <div className="container">
      <div className="background"></div> {/* Background content */}
      <div className="foreground">
        {/* SVG Peacock with hole */}
        <svg
          className={spread ? "peacock spread" : "peacock"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
        >
          {/* Peacock shape */}
          <path
            fill="url(#featherPattern)"
            d="M500 100 L700 200 L800 400 L900 600 L800 700 L700 800 L500 900 L300 800 L200 700 L100 600 L200 400 L300 200 Z"
          />
          {/* Hole in the foreground */}
          <clipPath id="hole">
            <path d="M500 100 L700 200 L800 400 L900 600 L800 700 L700 800 L500 900 L300 800 L200 700 L100 600 L200 400 L300 200 Z" />
          </clipPath>
          <rect x="0" y="0" width="1000" height="1000" fill="url(#hole)" />
          {/* Feather pattern */}
          <defs>
            <pattern
              id="featherPattern"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
            >
              <image
                xlinkHref="feather.png"
                x="0"
                y="0"
                width="100"
                height="100"
              />
            </pattern>
          </defs>
        </svg>
        {/* Button to trigger animation */}
        <button onClick={() => setSpread(!spread)}>
          {spread ? "Close Feathers" : "Spread Feathers"}
        </button>
      </div>
    </div>
  );
};
// import "./index.css"
import "./PeacockAnimation.css"; // Import CSS file for styling

const PeacockAnimation2 = () => {
  const [expanded, setExpanded] = useState(false);

  // Function to handle click event and expand the feathers
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="peacock-container">
      <div
        className={`foreground-sheet ${expanded ? "expanded" : ""}`}
        onClick={handleClick}
      >
        {/* Peacock SVG */}
        <svg className="peacock-svg" viewBox="0 0 200 200">
          {/* Peacock feathers */}
          <circle cx="50" cy="100" r="10" fill="blue" />
          <circle cx="60" cy="90" r="15" fill="green" />
          {/* Add more feathers here */}
        </svg>
      </div>
      {/* Background content */}
      <div className="background-content">
        {/* Include your background image or content here */}
        <img src="background-image.jpg" alt="Background" />
      </div>
    </div>
  );
};

import "./PeacockAnimation3.css"; // Import CSS file for styling

const PeacockAnimation3 = () => {
  const [expanded, setExpanded] = useState(false);

  // Function to handle click event and expand the feathers
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="peacock-container">
      <div
        className={`foreground-sheet ${expanded ? "expanded" : ""}`}
        onClick={handleClick}
      >
        {/* Peacock SVG */}
        <svg className="peacock-svg" viewBox="0 0 100 100">
          {/* Peacock feathers */}
          <circle cx="30" cy="50" r="5" fill="blue" />
          <circle cx="35" cy="45" r="5" fill="blue" />
          <circle cx="35" cy="55" r="5" fill="blue" />
          <circle cx="40" cy="40" r="5" fill="blue" />
          <circle cx="40" cy="50" r="5" fill="blue" />
          <circle cx="40" cy="60" r="5" fill="blue" />
          <circle cx="45" cy="35" r="5" fill="blue" />
          <circle cx="45" cy="45" r="5" fill="blue" />
          <circle cx="45" cy="55" r="5" fill="blue" />
          <circle cx="45" cy="65" r="5" fill="blue" />
          <circle cx="50" cy="50" r="5" fill="blue" />
          <circle cx="55" cy="50" r="5" fill="blue" />
        </svg>
      </div>
      {/* Background content */}
      <div className="background-content">
        {/* Include your background image or content here */}
        <img
          src="https://www.icolorpalette.com/download/shades/009193_color_shades.jpg"
          alt="Background"
        />
      </div>
    </div>
  );
};

// import './PeacockAnimation.css'; // Import CSS file for styling

const PeacockAnimation4 = () => {
  const [expanded, setExpanded] = useState(false);

  // Function to handle click event and expand the feathers
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="peacock-container">
      <div
        className={`foreground-sheet ${expanded ? "expanded" : ""}`}
        onClick={handleClick}
      >
        {/* Peacock SVG */}
        <svg className="peacock-svg" viewBox="0 0 100 100">
          {/* Peacock feathers */}
          <circle cx="50" cy="50" r="3" fill="blue" />
          <circle cx="48" cy="50" r="3" fill="blue" />
          <circle cx="46" cy="50" r="3" fill="blue" />
          <circle cx="44" cy="50" r="3" fill="blue" />
          <circle cx="42" cy="50" r="3" fill="blue" />
          <circle cx="40" cy="50" r="3" fill="blue" />
          <circle cx="38" cy="50" r="3" fill="blue" />
          <circle cx="36" cy="50" r="3" fill="blue" />
          <circle cx="34" cy="50" r="3" fill="blue" />
          <circle cx="32" cy="50" r="3" fill="blue" />
          <circle cx="30" cy="50" r="3" fill="blue" />
          <circle cx="28" cy="50" r="3" fill="blue" />
        </svg>
      </div>
      {/* Background content */}
      <div className="background-content">
        {/* Include your background image or content here */}
        <img src="background-image.jpg" alt="Background" />
      </div>
    </div>
  );
};

const PeacockAnimation5 = () => {
  const [expanded, setExpanded] = useState(false);

  // Function to handle click event and expand the feathers
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="peacock-container">
      <div
        className={`foreground-sheet ${expanded ? "expanded" : ""}`}
        onClick={handleClick}
      >
        {/* Peacock SVG */}
        <svg className="peacock-svg" viewBox="0 0 100 100">
          {/* Peacock feathers */}
          <circle cx="50" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="48" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="46" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="44" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="42" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="40" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="38" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="36" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="34" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="32" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="30" cy="50" r={expanded ? "30" : "5"} fill="blue" />
          <circle cx="28" cy="50" r={expanded ? "30" : "5"} fill="blue" />
        </svg>
      </div>
      {/* Background content */}
      <div className="background-content">
        {/* Include your background image */}
        <img
          src="https://www.icolorpalette.com/download/shades/009193_color_shades.jpg"
          alt="Background"
        />
      </div>
    </div>
  );
};

const PeacockComponent = () => {
  const featherStyles = {
    position: "absolute",
    width: "100%",
    height: "100%",
    clipPath:
      "polygon(50% 99%, 69% 88%, 69% 64%, 74% 42%, 71% 23%, 52% 1%, 40% 21%, 35% 41%, 43% 64%, 40% 90%)",
    background: "radial-gradient(circle at center, indigo, orange, red)",
    transformOrigin: "50% 100%",
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div style={featherStyles}></div>
      <div style={{ ...featherStyles, transform: "rotate(-30deg)" }}></div>
      <div style={{ ...featherStyles, transform: "rotate(-60deg)" }}></div>
      <div style={{ ...featherStyles, transform: "rotate(-90deg)" }}></div>
      <div style={{ ...featherStyles, transform: "rotate(-120deg)" }}></div>
      <div style={{ ...featherStyles, transform: "rotate(-150deg)" }}></div>
      <div style={{ ...featherStyles, transform: "rotate(-180deg)" }}></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        Hello, I'm a peacock
      </div>
    </div>
  );
};
 

const PeacockAnimation6= () => {
  const [expanded, setExpanded] = useState(false);

  // Function to handle click event and toggle the feathers
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Peacock feathers */}
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            clipPath: 'polygon(50% 99%, 69% 88%, 69% 64%, 74% 42%, 71% 23%, 52% 1%, 40% 21%, 35% 41%, 43% 64%, 40% 90%)',
            background: 'radial-gradient(circle, indigo, orange, red)',
            transformOrigin: '50% 100%',
            transform: expanded ? `rotate(${-30 * index}deg)` : 'rotate(0deg)',
            transition: 'transform 0.5s ease-in-out',
          }}
        />
      ))}
      {/* Center text */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'white',
          textShadow: 'rgba(0, 0, 0, 0.5) 2px 2px 4px',
        }}
        onClick={handleClick}
      >
        Hello, I'm a peacock
      </div>
    </div>
  );
};

 

export {
  PeacockPage,
  PeacockFeathers,
  PeacockComponent,
  PeacockAnimation,
  PeacockAnimation2,
  PeacockAnimation3,
  PeacockAnimation4,
  PeacockAnimation5,
  PeacockAnimation6,
};
