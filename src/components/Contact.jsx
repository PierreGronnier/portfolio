import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Send, Mail, Copy, Check } from "lucide-react";
import MaltIcon from "../assets/Malt_logo.svg";
import "../styles/contact.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdayladv";
const EMAIL = "pierre.gronnier@gmail.com";

const GithubIcon = ({ size = 20 }) => (
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

const UpworkIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

const LINKS = [
  {
    label: "GitHub",
    handle: "@PierreGronnier",
    href: "https://github.com/PierreGronnier",
    icon: GithubIcon,
    accent: "#6366f1",
  },
  {
    label: "Upwork",
    handle: "Pierre Gronnier",
    href: "https://www.upwork.com/freelancers/~votre-id",
    icon: UpworkIcon,
    accent: "#14a800",
  },
  {
    label: "Malt",
    handle: "pierre-gronnier",
    href: "https://www.malt.fr/profile/pierregronnier",
    icon: () => <img src={MaltIcon} alt="Malt" width={20} height={20} />,
    accent: "#fc5151",
  },
];

const SocialCard = ({ link, delay }) => {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const Icon = link.icon;

  return (
    <a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-card${inView ? " social-card--visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, "--card-accent": link.accent }}
    >
      <div className="social-card__icon">
        <Icon size={20} />
      </div>
      <div className="social-card__text">
        <span className="social-card__label">{link.label}</span>
        <span className="social-card__handle">{link.handle}</span>
      </div>
      <span className="social-card__arrow">→</span>
    </a>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  const { ref: headerRef, inView: headerVisible } = useInView({
    threshold: 0.2,
  });
  const { ref: contentRef, inView: contentVisible } = useInView({
    threshold: 0.1,
  });
  const { ref: footerRef, inView: footerVisible } = useInView({
    threshold: 0.2,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact">
      <div
        ref={headerRef}
        className={`contact-header${headerVisible ? " contact-header--visible" : ""}`}
      >
        <p className="contact-eyebrow">GET IN TOUCH</p>
        <h2 className="contact-title">
          Let's <span>work</span> together
        </h2>
        <p className="contact-subtitle">
          Whether it's a web app, WordPress integration, full redesign, or just
          a question, I'm open to any project and always happy to discuss or
          help.
        </p>
      </div>

      <div ref={contentRef} className="contact-layout">
        <div className="contact-info">
          <div
            className={`contact-availability${contentVisible ? " contact-availability--visible" : ""}`}
          >
            <div className="availability-inner">
              <div className="availability-pulse-ring" />
              <span className="availability-dot" />
            </div>
            <div className="availability-content">
              <span className="availability-title">Available</span>
              <span className="availability-sub">
                Open to new projects/opportunities
              </span>
            </div>
          </div>

          <div
            className={`contact-email-block${contentVisible ? " contact-email-block--visible" : ""}`}
          >
            <div className="contact-email-icon">
              <Mail size={18} />
            </div>
            <div>
              <p className="contact-email-label">EMAIL</p>
              <p className="contact-email-value">{EMAIL}</p>
            </div>
            <button
              className={`contact-copy-btn${copied ? " contact-copy-btn--copied" : ""}`}
              onClick={handleCopyEmail}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          <div className="contact-socials">
            {LINKS.map((link, i) => (
              <SocialCard
                key={link.label}
                link={link}
                delay={contentVisible ? i * 100 : 0}
              />
            ))}
          </div>
        </div>

        <div
          className={`contact-form-wrapper${contentVisible ? " contact-form-wrapper--visible" : ""}`}
        >
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">NAME</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John Doe"
                  autoComplete="off"
                />
              </div>

              <div className="form-field">
                <label className="form-label">EMAIL</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="john@company.com"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Tell me about your project, ask me a question..."
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                "Sending..."
              ) : (
                <>
                  <Send size={15} />
                  Send message
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="contact-success-msg">
                ✔ Message sent successfully. I'll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="contact-error-msg">
                ✖ Something went wrong. Try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>

      <div
        ref={footerRef}
        className={`contact-footer${footerVisible ? " contact-footer--visible" : ""}`}
      >
        <p className="contact-footer__text">
          Made by <span>Pierre Gronnier</span> — {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default Contact;
