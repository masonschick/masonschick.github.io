import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Experience = {
  organization: string;
  role: string;
  location: string;
  dates: string;
  logo: string;
  logoAlt: string;
  logoClass?: string;
  bullets: string[];
};

type Project = {
  title: string;
  summary: string;
  details: string[];
  stack: string[];
  links: { label: string; href: string }[];
  image: string;
  imageAlt: string;
};

const experiences: Experience[] = [
  {
    organization: "Bank of America",
    role: "Quantitative Analyst",
    location: "Chicago, Illinois",
    dates: "July 2025 - Present",
    logo: "/company-logos/bank-of-america-mark.svg",
    logoAlt: "Bank of America mark",
    logoClass: "square-logo",
    bullets: ["Enterprise Financial Risk: Liquidity Analytics"]
  },
  {
    organization: "JPMorgan Chase & Co.",
    role: "Global Markets Analyst",
    location: "New York, New York",
    dates: "June 2024 - August 2024",
    logo: "/company-logos/chase-mark.svg",
    logoAlt: "Chase mark",
    logoClass: "square-logo",
    bullets: ["Credit Research: Consumer, Food, Retail"]
  },
  {
    organization: "Decision Modeling, Inc.",
    role: "Software Quality Analyst",
    location: "Goshen, New York",
    dates: "May 2023 - August 2023",
    logo: "/company-logos/dmi.png",
    logoAlt: "Decision Modeling, Inc. logo",
    logoClass: "dmi-logo",
    bullets: []
  }
];

const projects: Project[] = [
  {
    title: "Markets Research Platform",
    summary:
      "A research platform for turning market information into structured notes, analytical frameworks, data studies, and decision-ready views.",
    details: [
      "Connects market notes, mental models, research artifacts, public-data charting, and prediction-market signals in one system.",
      "Built around recurring workflows that link macro data, company analysis, policy expectations, and changing market narratives.",
      "The private operating environment stays separate from the public portfolio surface."
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    links: [{ label: "Live project", href: "https://info-os-sand.vercel.app/" }],
    image: "/project-images/info-os-light.png",
    imageAlt: "Light interface preview of the Markets Research Platform"
  },
  {
    title: "Cup Chase",
    summary:
      "A deployed fantasy hockey product with live data, league workflows, and a small group of active users.",
    details: [
      "Built around the actual league workflow: standings, roster context, player research, and manager-facing decisions.",
      "Uses production-oriented pieces like authentication, database-backed state, and deployment through Vercel.",
      "The public version will keep the interesting product shape while removing private league data."
    ],
    stack: ["Next.js", "Supabase", "Vercel", "TypeScript"],
    links: [{ label: "Live project", href: "https://hockey-eight.vercel.app/" }],
    image: "/project-images/cup-chase.png",
    imageAlt: "Light interface preview of the Cup Chase fantasy hockey dashboard"
  },
  {
    title: "Personal Dashboard",
    summary:
      "A local operating dashboard for goals, training, and daily focus, including marathon preparation workflows.",
    details: [
      "Combines planning, habit tracking, and progress review into a personal command center.",
      "Used as a real training tool for marathon preparation rather than as a purely demo-oriented app.",
      "The public version will use dummy data and a simpler surface so the structure is visible without exposing personal logs."
    ],
    stack: ["React", "Python", "FastAPI", "Local data"],
    links: [],
    image: "/project-images/personal-dashboard-v2.png",
    imageAlt: "Light interface preview of the Personal Dashboard training workspace"
  },
  {
    title: "Deck of Cards",
    summary:
      "A simple first coding project that marks the beginning of the software-building thread.",
    details: [
      "Kept intentionally modest: it shows the starting point before the larger app and dashboard work.",
      "Useful as a timestamped artifact of learning in public and getting comfortable shipping small interfaces."
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    links: [{ label: "GitHub", href: "https://github.com/masonschick/Deck-of-cards" }],
    image: "/project-images/deck-of-cards.png",
    imageAlt: "Light interface preview of the Deck of Cards browser project"
  }
];

const skills = [
  "Python",
  "pandas",
  "Plotly",
  "Excel",
  "Financial modeling",
  "Bloomberg Terminal",
  "Risk analytics",
  "Data visualization",
  "React",
  "Next.js",
  "Supabase",
  "Vercel"
];

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="tag-filter link-chip" href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
      {children}
    </a>
  );
}

function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="artifact resume-row">
      <div className="artifact-main">
        <div className="artifact-heading">
          <div className="experience-title-row">
            <img className={`company-logo ${item.logoClass || ""}`} src={item.logo} alt={item.logoAlt} />
            <div>
              <h3 className="artifact-title">{item.organization}</h3>
              <p className="role-line">
                {item.role} · {item.location}
              </p>
              {item.bullets.length > 0 ? (
                <ul className="detail-list experience-detail-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <aside className="artifact-side">
        <p className="date">{item.dates}</p>
      </aside>
    </article>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const primaryLink = project.links[0];

  return (
    <article className="artifact project-card has-image">
      <div className="artifact-main">
        <div className="artifact-heading">
          <h3 className="artifact-title">
            {primaryLink ? (
              <a className="project-title-link" href={primaryLink.href} target="_blank" rel="noreferrer">
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="summary">{project.summary}</p>
        </div>
        <div className="tagbar compact-tags" aria-label={`${project.title} stack`}>
          {project.stack.map((item) => (
            <span className="tag-filter static-chip" key={item}>
              {item}
            </span>
          ))}
        </div>
        <ul className="detail-list project-detail-list">
          {project.details.slice(0, 1).map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
      <aside className="artifact-side project-side">
        <div className="project-image-frame">
          <img className="project-image" src={project.image} alt={project.imageAlt} />
        </div>
      </aside>
    </article>
  );
}

function App() {
  return (
    <>
      <main className="shell">
        <section className="intro-panel" aria-labelledby="resume-heading">
          <div className="intro-copy">
            <h1 id="resume-heading">Mason Schick</h1>
            <div className="tagbar intro-links" aria-label="Primary links">
              <LinkButton href="/resume/Resume_6-1-26.pdf">Resume PDF</LinkButton>
              <LinkButton href="https://github.com/masonschick">GitHub</LinkButton>
              <LinkButton href="https://www.linkedin.com/in/mason-schick/">LinkedIn</LinkButton>
              <LinkButton href="mailto:masoncschick@gmail.com">Email</LinkButton>
            </div>
            <div className="resume-facts">
              <p>
                <span>Location</span>
                Chicago, Illinois
              </p>
              <p>
                <span>Education</span>
                Lehigh University, B.S. Business and Economics
              </p>
              <p>
                <span>Focus</span>
                Financial markets, risk analytics, data visualization, AI-enabled workflows
              </p>
            </div>
          </div>
          <img className="profile-photo" src="/profile/mason-headshot.jpeg" alt="Portrait of Mason Schick" />
        </section>

        <section className="section-block" aria-labelledby="experience-heading">
          <div className="section-heading">
            <h2 id="experience-heading">Experience</h2>
          </div>
          <div className="artifact-list">
            {experiences.map((experience) => (
              <ExperienceItem item={experience} key={experience.organization} />
            ))}
          </div>
        </section>

        <section className="section-block education-grid" aria-labelledby="education-heading">
          <div className="section-heading">
            <h2 id="education-heading">Education</h2>
          </div>
          <article className="artifact education-card">
            <div className="artifact-main">
              <div className="experience-title-row">
                <img className="company-logo education-logo" src="/education/lehigh-logo.jpg" alt="Lehigh University athletics logo" />
                <div>
                  <h3 className="artifact-title">Lehigh University</h3>
                  <p className="role-line">B.S. in Business and Economics · Bethlehem, Pennsylvania</p>
                  <ul className="detail-list experience-detail-list">
                    <li>Major: Finance · Minors: Entrepreneurship, Financial Technology</li>
                  </ul>
                </div>
              </div>
            </div>
            <aside className="artifact-side">
              <p className="date">Class of 2025</p>
            </aside>
          </article>
          <article className="artifact education-card">
            <div className="artifact-main">
              <div className="experience-title-row">
                <img className="company-logo education-logo" src="/education/ridgewood-logo.png" alt="Ridgewood High School seal" />
                <div>
                  <h3 className="artifact-title">Ridgewood High School</h3>
                  <p className="role-line">Ridgewood, New Jersey</p>
                  <ul className="detail-list experience-detail-list">
                    <li>Interests: Ice Hockey</li>
                  </ul>
                </div>
              </div>
            </div>
            <aside className="artifact-side">
              <p className="date">Class of 2021</p>
            </aside>
          </article>
        </section>

        <section className="section-block" aria-labelledby="projects-heading">
          <div className="section-heading">
            <h2 id="projects-heading">Projects</h2>
          </div>
          <div className="artifact-list">
            {projects.map((project) => (
              <ProjectItem project={project} key={project.title} />
            ))}
          </div>
        </section>

        <section className="section-block closing-grid" aria-labelledby="skills-heading">
          <div className="section-heading">
            <h2 id="skills-heading">Tools I reach for</h2>
          </div>
          <div className="tagbar skill-list" aria-label="Skills">
            {skills.map((skill) => (
              <span className="tag-filter static-chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
