import React from "react";
import "../styles/hero.css";
import raccoonImg from "../assets/raccoon.png";
import portraitImg from "../assets/portrait.jpg";

const Hero = () => {
  const techTags = [
    { name: "HTML", top: "5%", left: "15%" },
    { name: "CSS", top: "15%", right: "10%" },
    { name: "REACT", bottom: "25%", left: "5%" },
    { name: "NODE.JS", bottom: "10%", right: "15%" },
    { name: "PRISMA", top: "45%", right: "-5%" },
    { name: "EXPRESS", top: "50%", left: "-5%" },
    { name: "JS", bottom: "5%", left: "30%" },
  ];

  return (
    <section id="hero" className="hero">
      <div className="tags-layer">
        {techTags.map((tag, i) => (
          <div
            key={i}
            className="floating-tag"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {tag.name}
          </div>
        ))}
      </div>

      <div className="hero-content tracking-in-expand">
        <div className="hero-text">
          <p
            style={{
              fontFamily: "Orbitron",
              color: "var(--accent)",
              fontWeight: "bold",
              marginBottom: "10px",
              fontSize: "0.8rem",
              letterSpacing: "2px",
            }}
          >
            FRENCH CREATIVE DEVELOPER
          </p>
          <h1 className="hero-name">
            Bonjour, I'm <br />
            <span>Pierre Gronnier</span>
          </h1>
          <p className="hero-desc">
            Building digital experiences with elegance and modern full-stack
            technologies.
          </p>
          <div
            style={{
              marginTop: "1rem",
              fontFamily: "Orbitron",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
            }}
          >
            📍 BASED IN FRANCE
          </div>
        </div>

        <div className="hero-image-stack">
          <div className="img-container portrait-box">
            <img
              src={portraitImg}
              alt="Pierre Portrait"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <span className="img-label">HUMAN_ENTITY</span>
          </div>

          <div className="img-container raccoon-box">
            <img
              src={raccoonImg}
              alt="Github Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <span className="img-label">GITHUB_AVATAR</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
