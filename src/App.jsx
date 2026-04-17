import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import "./global.css";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <span className="loader-percentage">{progress}%</span>
      <p
        style={{
          fontFamily: "Orbitron",
          letterSpacing: "5px",
          fontSize: "0.8rem",
          marginTop: "10px",
        }}
      >
        INITIALIZING SYSTEMS...
      </p>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar visible={true} />
          <Hero />
        </>
      )}
    </>
  );
}

export default App;
