import { useInView } from "react-intersection-observer";
import { Code2, Server, GraduationCap, Briefcase } from "lucide-react";
import "../styles/about.css";

const skills = {
  Frontend: ["React", "JavaScript", "HTML", "CSS"],
  Backend: ["Node.js", "Express", "Prisma", "PostgreSQL"],
  Tools: ["Git", "Vite", "REST APIs", "WordPress"],
};

const timeline = [
  {
    year: "2020",
    label: "DUT Informatique",
    detail:
      "Two-year technical degree in Computer Science. In the second year I picked the web specialization and realized pretty fast that building things for the browser was what I wanted to do.",
    icon: GraduationCap,
  },
  {
    year: "Internship",
    label: "CompuCraft — Frontend Developer Intern",
    detail:
      "Built a full invoice-generation website for this association from the ground up. First real taste of shipping something people actually use.",
    icon: Briefcase,
  },
  {
    year: "2022",
    label: "Licence Pro STS — Réseaux & Télécommunications",
    detail:
      "Bachelor's degree (Bac+3) in Science, Technology and Health, majoring in Networks, IT and Telecommunications. Broadened my understanding of software architecture and infrastructure.",
    icon: GraduationCap,
  },
  {
    year: "Internship",
    label: "Codalem — Fullstack Developer Intern",
    detail:
      "Worked on components for their internal tooling. Good experience navigating an existing codebase, understanding constraints, and delivering work inside a real product.",
    icon: Briefcase,
  },
  {
    year: "Now",
    label: "The Odin Project + Freelance",
    detail:
      "After my degree I kept sharpening my skills through The Odin Project, one of the most serious open-source web curriculums out there. Today I work as a freelance developer, building web applications for clients.",
    icon: Code2,
  },
];

const TimelineItem = ({ item, index }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.15 });
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className={`timeline-item ${inView ? "timeline-item--visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="timeline-year">{item.year}</div>
      <div className="timeline-connector">
        <div className="timeline-dot">
          <Icon size={10} />
        </div>
        {index < timeline.length - 1 && <div className="timeline-line" />}
      </div>
      <div className="timeline-content">
        <h4 className="timeline-label">{item.label}</h4>
        <p className="timeline-detail">{item.detail}</p>
      </div>
    </div>
  );
};

const AboutCard = ({ icon: Icon, title, children, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`about-card ${inView ? "about-card--visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="about-card__icon">
        <Icon size={22} />
      </div>
      <h3 className="about-card__title">{title}</h3>
      <div className="about-card__body">{children}</div>
    </div>
  );
};

const About = () => {
  const { ref: headRef, inView: headVisible } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="about">
      <div
        ref={headRef}
        className={`about-header ${headVisible ? "about-header--visible" : ""}`}
      >
        <p className="about-eyebrow">WHO AM I</p>
        <h2 className="about-title">
          The <span>full picture</span>
        </h2>
        <p className="about-subtitle">
          Fullstack developer, 23 years old, based in France. I'm at the
          beginning of my career, eager to learn, quick to adapt, and focused on
          understanding what my clients actually need.
        </p>
      </div>

      <div className="about-grid">
        <AboutCard icon={Code2} title="The Story" delay={0}>
          <p>
            My father works in IT, and I grew up with a computer in my hands
            before I even knew what programming was. That environment naturally
            pulled me toward tech, and when it came time to choose a direction,
            computer science was the obvious call.
          </p>
          <p>
            What drew me specifically to web development was something simple: I
            like building things that are useful to other people. More than the
            code itself, what drives me is understanding what someone needs and
            finding the right way to deliver it. Listening well is half the job.
          </p>
          <p>
            Today I work as a <strong>freelance fullstack developer</strong>.
            I'm still early in my career, but I learn fast, I take feedback
            well, and I care about the quality of what I ship. My goal is to
            grow project by project, always putting my clients needs first.
          </p>
        </AboutCard>

        <AboutCard icon={Server} title="Tech Stack" delay={100}>
          <div className="skill-groups">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="skill-group">
                <span className="skill-group__label">{group}</span>
                <div className="skill-group__tags">
                  {items.map((s) => (
                    <span key={s} className="skill-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="about-stack-note">
            My stack of choice is <strong>Node.js + Express</strong> on the
            server, <strong>React</strong> on the client, and{" "}
            <strong>Prisma + PostgreSQL</strong> for the database. I also work
            with <strong>WordPress</strong> for clients who need a CMS-based
            solution.
          </p>
        </AboutCard>
      </div>

      <div className="about-timeline">
        <p
          className="about-eyebrow"
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          EDUCATION & EXPERIENCE
        </p>
        {timeline.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default About;
