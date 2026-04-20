import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Clock } from "lucide-react";
import "../styles/projects.css";
import nidusImg from "../assets/nidus.png";
import artFinderImg from "../assets/artfinder.png";
import blogApiImg from "../assets/blogAPI.png";
import cineImg from "../assets/cine.png";
import driveImg from "../assets/drive.png";
import restaurantImg from "../assets/restaurant.avif";

const GithubIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const projects = [
  {
    id: "nidus",
    index: "01",
    name: "Nidus",
    tagline: "Your own private messaging space",
    description:
      "Register, build your profile, add friends, start private conversations or create group chats. Avatars are uploaded to Cloudinary, auth runs on JWT access tokens with HTTP-only refresh cookies, and the UI polls for new messages every 3 seconds since WebSockets were out of scope.",
    tags: [
      "React",
      "Zustand",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Cloudinary",
    ],
    category: "Fullstack App",
    github: "https://github.com/PierreGronnier/odin-nidus",
    demo: "https://odin-nidus.vercel.app/",
    status: "live",
    accent: "#c99d78",
    screenshot: nidusImg,
  },
  {
    id: "restaurant",
    index: "02",
    name: "Restaurant Site",
    tagline: "WooCommerce · Stripe · WordPress",
    description:
      "A polished restaurant website with online ordering, Stripe payment integration and a full CMS. Currently in progress, expect a beautiful result.",
    tags: ["WordPress", "WooCommerce", "Stripe", "PHP", "CSS"],
    category: "WordPress · E-commerce",
    github: null,
    demo: null,
    status: "wip",
    accent: "#ec4899",
    screenshot: restaurantImg,
  },
  {
    id: "artfinder",
    index: "03",
    name: "Art Finder",
    tagline: "Where's Waldo, but on paintings",
    description:
      "Hunt for hidden characters inside real paintings by Bruegel, Bosch and Qing dynasty artists. Right-click to drop a targeting box, pick a character, and the server checks your coordinates server-side. Sessions are timed on the backend so nobody can cheat their score.",
    tags: [
      "React",
      "React Router",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
    ],
    category: "Fullstack App",
    github: "https://github.com/PierreGronnier/odin-waldo",
    demo: "https://odin-waldo-v4if.vercel.app/",
    status: "live",
    accent: "#5966f8",
    screenshot: artFinderImg,
  },
  {
    id: "blogapi",
    index: "04",
    name: "Blog API",
    tagline: "One API, two completely different frontends",
    description:
      "A headless blog backend powering two separate React apps: a public reader with anonymous and authenticated comments, and a private admin panel with TinyMCE rich text editing, publish/draft toggling, and comment moderation. JWT auth with role-based access control throughout.",
    tags: [
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "React",
      "TinyMCE",
    ],
    category: "API · Backend",
    github: "https://github.com/PierreGronnier/odin-blogAPI",
    demo: "https://odin-blog-api-lcjt.vercel.app/",
    status: "live",
    accent: "#a52438",
    screenshot: blogApiImg,
  },
  {
    id: "fileuploader",
    index: "05",
    name: "File Uploader",
    tagline: "A stripped-down Google Drive, from scratch",
    description:
      "Session-based authentication via Passport.js, nested folder trees, file uploads with Multer, and shareable public links with configurable expiry. Anyone with the link can browse and download without an account. The extra credit share feature is fully implemented.",
    tags: [
      "Node.js",
      "Express",
      "Prisma",
      "Passport.js",
      "Multer",
      "EJS",
      "PostgreSQL",
    ],
    category: "API · Backend",
    github: "https://github.com/PierreGronnier/odin-drive",
    demo: "https://odin-drive-elh1.onrender.com/",
    status: "live",
    accent: "#7c95e0",
    screenshot: driveImg,
  },
  {
    id: "cineinventory",
    index: "06",
    name: "Cine Inventory",
    tagline: "CRUD for a fictional movie store",
    description:
      "Browse movies and genres, add new entries, edit existing ones, and delete with admin password protection. A search page lets you filter by title, director, genre, year, price range and stock. Every write operation requires a password so the live demo stays clean.",
    tags: ["Node.js", "Express", "PostgreSQL", "EJS", "HTML", "CSS"],
    category: "Inventory App · Frontend",
    github: "https://github.com/PierreGronnier/odin-inventoryApp",
    demo: "https://odin-cineinventoryapp.onrender.com/",
    status: "live",
    accent: "#f9d371",
    screenshot: cineImg,
  },
];

const MAX_TAGS = window.matchMedia("(max-width: 768px)").matches ? 3 : 5;

const TagTooltip = ({
  tags,
  accent,
  anchorRef,
  visible,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!visible || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
  }, [visible, anchorRef]);

  if (!visible) return null;

  return createPortal(
    <div
      className="tags-tooltip"
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        transform: "translateX(-50%) translateY(calc(-100% - 10px))",
        "--tag-accent": accent,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="tags-tooltip__item"
          style={{ "--tag-accent": accent }}
        >
          {tag}
        </span>
      ))}
      <span className="tags-tooltip__arrow" />
    </div>,
    document.body,
  );
};

const TagList = ({ tags, accent }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const moreRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setTooltipOpen(false);
    }, 150);
  };

  const visibleTags = tags.slice(0, MAX_TAGS);
  const hiddenTags = tags.slice(MAX_TAGS);

  return (
    <div className="project-tags">
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className="project-tag"
          style={{ "--tag-accent": accent }}
        >
          {tag}
        </span>
      ))}
      {hiddenTags.length > 0 && (
        <>
          <span
            ref={moreRef}
            className="project-tag project-tag--more"
            style={{ "--tag-accent": accent }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            +{hiddenTags.length}
          </span>
          <TagTooltip
            tags={hiddenTags}
            accent={accent}
            anchorRef={moreRef}
            visible={tooltipOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </>
      )}
    </div>
  );
};

const ExpandableDescription = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const pRef = useRef(null);

  const checkClamped = useCallback(() => {
    const el = pRef.current;
    if (!el) return;
    el.style.webkitLineClamp = "unset";
    el.style.overflow = "visible";
    const fullHeight = el.scrollHeight;
    el.style.webkitLineClamp = "";
    el.style.overflow = "";
    const clampedHeight = el.clientHeight;
    setIsClamped(fullHeight > clampedHeight + 2);
  }, []);

  useEffect(() => {
    checkClamped();
    const observer = new ResizeObserver(checkClamped);
    if (pRef.current) observer.observe(pRef.current);
    return () => observer.disconnect();
  }, [checkClamped]);

  return (
    <div className="project-description-wrapper">
      <p
        ref={pRef}
        className={`project-description${expanded ? " project-description--expanded" : ""}`}
      >
        {text}
      </p>
      {(isClamped || expanded) && (
        <button
          className="project-desc-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className={`project-card${inView ? " project-card--visible" : ""}${project.status === "wip" ? " project-card--wip" : ""}`}
      style={{
        transitionDelay: `${(index % 2) * 120}ms`,
        "--project-accent": project.accent,
      }}
    >
      <div
        className="project-card__glow"
        style={{
          background: `radial-gradient(ellipse at top left, ${project.accent}22 0%, transparent 65%)`,
        }}
      />

      {project.screenshot && (
        <div className="project-screenshot">
          <img
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            className="project-screenshot__img"
          />
          <div
            className="project-screenshot__overlay"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, ${project.accent}18 100%)`,
            }}
          />
        </div>
      )}

      <div className="project-card__header">
        <div className="project-card__meta">
          <span className="project-index" style={{ color: project.accent }}>
            {project.index}
          </span>
          <span className="project-category">{project.category}</span>
        </div>
        {project.status === "wip" ? (
          <span className="project-badge project-badge--wip">
            <Clock size={10} /> WIP
          </span>
        ) : (
          <span className="project-badge project-badge--live">LIVE</span>
        )}
      </div>

      <h3 className="project-name" style={{ color: project.accent }}>
        {project.name}
      </h3>
      <p className="project-tagline">{project.tagline}</p>

      <ExpandableDescription text={project.description} />

      <TagList tags={project.tags} accent={project.accent} />

      <div className="project-actions">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn project-btn--ghost"
          >
            <GithubIcon size={14} /> Code
          </a>
        ) : (
          <span className="project-btn project-btn--disabled">
            <GithubIcon size={14} /> Soon
          </span>
        )}
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn project-btn--solid"
            style={{
              background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`,
            }}
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        ) : (
          <span className="project-btn project-btn--disabled">
            <ExternalLink size={14} /> Coming Soon
          </span>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const { ref: headerRef, inView: headerVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="projects" className="projects">
      <div
        ref={headerRef}
        className={`projects-header${headerVisible ? " projects-header--visible" : ""}`}
      >
        <p className="projects-eyebrow">WHAT I BUILT</p>
        <h2 className="projects-title">
          Selected <span>Projects</span>
        </h2>
        <p className="projects-subtitle">
          A mix of personal projects and The Odin Project assignments, each one
          a chance to learn something new and ship something real.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
