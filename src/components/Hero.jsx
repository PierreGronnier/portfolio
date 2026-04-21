import React, { useState } from "react";
import { MapPin } from "lucide-react";
import "../styles/hero.css";
import raccoonImg from "../assets/raccoon.png";
import portraitImg from "../assets/portrait.jpg";

const CV_PLACEHOLDER = "/cv-pierre-gronnier.pdf";

const Hero = () => {
  const techTags = [
    { name: "HTML", top: "18%", left: "8%" },
    { name: "CSS", top: "18%", right: "6%" },
    { name: "REACT", bottom: "5%", left: "3%" },
    { name: "NODE.JS", bottom: "12%", right: "8%" },
    { name: "PRISMA", top: "48%", right: "-2%" },
    { name: "EXPRESS", top: "52%", left: "-5%" },
    { name: "JS", bottom: "8%", left: "35%" },
    { name: "WORDPRESS", bottom: "8%", left: "60%" },
    { name: "GIT", top: "15%", left: "60%" },
  ];

  const [flipped, setFlipped] = useState(false);

  const handleStackClick = () => setFlipped((f) => !f);

  const handleFrontAction = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = CV_PLACEHOLDER;
    link.download = "CV_Pierre_Gronnier.pdf";
    link.click();
  };

  const handleBackAction = (e) => {
    e.stopPropagation();
    window.open(
      "https://github.com/PierreGronnier",
      "_blank",
      "noopener noreferrer",
    );
  };

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
          <p className="hero-eyebrow">FULLSTACK DEVELOPER</p>
          <h1 className="hero-name">
            Bonjour, I'm <br /> <span>Pierre Gronnier</span>
          </h1>
          <p className="hero-desc">
            I build web applications, from database to interface, to meet my
            clients needs.
          </p>

          <div className="hero-location">
            <MapPin size={14} strokeWidth={2.5} /> BASED IN FRANCE
          </div>

          <a
            href={CV_PLACEHOLDER}
            download="CV_Pierre_Gronnier.pdf"
            className="cv-btn"
          >
            Download CV
          </a>
        </div>

        <div
          className={`hero-image-stack ${flipped ? "flipped" : ""}`}
          onClick={handleStackClick}
        >
          <div className="img-container portrait-box">
            <span className="img-label">PROFILE_PICTURE</span>
            <img src={portraitImg} alt="Pierre Portrait" />
            <button className="face-action" onClick={handleFrontAction}>
              Download CV
            </button>
          </div>
          <div className="img-container raccoon-box">
            <span className="img-label">GITHUB_AVATAR</span>
            <img src={raccoonImg} alt="Github Avatar" />
            <button
              className="face-action github-action"
              onClick={handleBackAction}
            >
              View GitHub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
