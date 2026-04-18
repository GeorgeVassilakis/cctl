import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoUrl from "../assets/CCTL_LOGO.svg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const missionWords =
  "CCTL Northeastern examines and challenges the ways corporate power impacts people's lives, while giving students a place to study systemic injustice through education, discussion, public writing, and collective action.";

const workCards = [
  {
    title: "Start from the structures nearest to students.",
    body: "The lab asks how corporate power shapes campus life, housing, work, media, and the institutions that organize everyday choices before those choices are ever called individual.",
    accent: "var(--tone-paper)",
  },
  {
    title: "Use discussion as a route into action.",
    body: "Weekly meetings are not meant to end in analysis for its own sake. The lab treats reading, conversation, publishing, and organizing as connected parts of the same project.",
    accent: "var(--tone-red-soft)",
  },
  {
    title: "Write for people outside the room.",
    body: "The public-facing model matters: essays, interviews, and explainers should be accessible to students, organizers, and readers who are not already inside legal or academic jargon.",
    accent: "var(--tone-ink-soft)",
  },
];

const portfolioItems = [
  {
    kicker: "Discussion theme",
    title: "Corporate career funnel",
    body: "What is gained and lost when higher education prepares students to become polished workers for corporate institutions?",
  },
  {
    kicker: "Discussion theme",
    title: "Attention economy",
    body: "How do platforms train people to return, comply, and surrender attention even when the harms are visible?",
  },
  {
    kicker: "Published work",
    title: "Boston's negligent landlords",
    body: "A local case study showing how housing harm is produced through ownership structures, incentives, and legal insulation.",
  },
  {
    kicker: "Published work",
    title: "Path away from BigLaw",
    body: "An interview-driven piece on institutional pressure, corporate legal careers, and why students look for routes away from BigLaw.",
  },
];

const accordionItems = [
  {
    title: "Meetings",
    text: "Weekly meetings create a space for students to debate and exchange ideas about the role of corporate power in society, then carry those conversations into future projects.",
  },
  {
    title: "Writing",
    text: "The lab's writing should make corporate power legible in plain language through essays, interviews, and case studies grounded in everyday life.",
  },
  {
    title: "Collective action",
    text: "The public mission is not only to diagnose power but to help students contribute to systemic change through education, discussion, and collective action.",
  },
];

const marqueeItems = [
  "Critical Corporate Theory Lab",
  "Northeastern University",
  "Corporate power",
  "Systemic change",
  "Collective action",
  "Public writing",
  "Systemic Justice Project",
];

/*
<design_plan>
Python RNG Execution:
seed = 542
hero = "Artistic Asymmetry"; font = "Outfit"
components = ["Inline Typography Images", "Horizontal Accordions", "Infinite Marquee"]; gsap = ["Scroll Pinning (GSAP Split)", "Scrubbing Text Reveals"]

AIDA Check:
Navigation present.
Attention = asymmetrical hero.
Interest = 5-card dense bento plus accordions.
Desire = pinned split section and scrubbed mission text.
Action = high-contrast join/footer section.

Hero Math Verification:
Primary H1 wrapper max-width is min(92vw, 1150px) with a 23ch cap on the line box.
Typography scale clamps between 3.4rem and 8.75rem so the headline stays within 2-3 lines on desktop.
No stamp icons or cheap pill tags are placed under the hero.

Bento Density Verification:
Desktop grid uses 5 columns x 4 rows = 20 cells total with grid-auto-flow: dense.
Card spans are 3x2 + 2x2 + 2x1 + 3x1 + 5x1 = 6 + 4 + 2 + 3 + 5 = 20 cells.
No empty cells remain on the desktop matrix.

Label Sweep & Button Check:
No SECTION 01 / ABOUT US style labels exist.
Primary buttons use black-on-paper or paper-on-black contrast only.
</design_plan>
*/

function WordReveal({ text }) {
  return (
    <p className="revealText">
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="revealWord"
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}

function App() {
  const [activeIssue, setActiveIssue] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const revealRef = useRef(null);
  const pinSectionRef = useRef(null);
  const pinLabelRef = useRef(null);
  const pinCardsRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      gsap.from(".heroFade", {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.from(".marqueeTrack", {
        opacity: 0,
        duration: 1.1,
        delay: 0.2,
        ease: "power2.out",
      });

      const revealWords = gsap.utils.toArray(".revealWord");
      if (revealWords.length) {
        gsap.set(revealWords, { opacity: 0.14 });
        gsap.to(revealWords, {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: revealRef.current,
            start: "top 72%",
            end: "bottom 40%",
            scrub: true,
          },
        });
      }

      mm.add("(min-width: 960px)", () => {
        const cards = gsap.utils.toArray(".pinCard");

        ScrollTrigger.create({
          trigger: pinSectionRef.current,
          start: "top top+=120",
          end: () => `+=${pinCardsRef.current.offsetHeight - pinLabelRef.current.offsetHeight}`,
          pin: pinLabelRef.current,
          scrub: false,
        });

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.28, scale: 0.88, y: 80 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "bottom 45%",
                scrub: true,
              },
            },
          );
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <main
      ref={rootRef}
      className="siteShell"
    >
      <div className="ambient ambientLeft" />
      <div className="ambient ambientRight" />

      <header className="topBar">
        <nav className="navPill">
          <div className="navBrand">
            <div className="navLogoBadge">
              <img
                src={logoUrl}
                alt="Critical Corporate Theory Lab logo"
              />
            </div>
            <div>
              <p className="navWhisper">the</p>
              <p className="navTitle">Critical Corporate Theory Lab</p>
              <p className="navSubtitle">at Northeastern University</p>
            </div>
          </div>
          <div className="navLinks">
            <a href="#mission">Mission</a>
            <a href="#work">Themes</a>
            <a href="#join">Structure</a>
          </div>
          <button
            type="button"
            className={`mobileMenuButton ${mobileMenuOpen ? "isOpen" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-section-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        <div
          id="mobile-section-nav"
          className={`mobileMenuPanel ${mobileMenuOpen ? "isOpen" : ""}`}
        >
          <a
            href="#mission"
            onClick={() => setMobileMenuOpen(false)}
          >
            Mission
          </a>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
          >
            Themes
          </a>
          <a
            href="#join"
            onClick={() => setMobileMenuOpen(false)}
          >
            Structure
          </a>
        </div>
      </header>

      <section className="marqueeBand">
        <div className="marqueeTrack">
          {Array.from({ length: 2 }).map((_, loopIndex) => (
            <div
              key={loopIndex}
              className="marqueeGroup"
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${loopIndex}-${item}`}
                  className="marqueeItem"
                >
                  <img
                    src={logoUrl}
                    alt=""
                    aria-hidden="true"
                  />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section
        ref={heroRef}
        className="heroSection"
      >
        <div className="heroCopy">
          <p className="heroIntro heroFade">
            <span>the</span> Critical Corporate Theory Lab <em>presents...</em>
          </p>
          <div className="heroTitleWrap heroFade">
            <h1 className="heroTitle">
              Study how corporate power shapes the lives of students and their communities.
            </h1>
          </div>
          <p className="heroLead heroFade">
            Affiliated with the Systemic Justice Project and the Critical
            Corporate Theory Lab at Harvard Law School, CCTL Northeastern brings
            students together to examine corporate power, produce public-facing
            work, and build a language for systemic change.
          </p>
          <div className="heroActions heroFade">
            <a
              href="#mission"
              className="buttonPrimary"
            >
              Read the mission
            </a>
            <a
              href="#work"
              className="buttonGhost"
            >
              Current themes
            </a>
          </div>
        </div>

        <div className="heroArt heroFade">
          <div className="heroPoster heroPosterPrimary">
            <div className="posterHeader">
              <span>the</span>
              <strong>CRITICAL CORPORATE THEORY LAB</strong>
              <em>presents...</em>
            </div>
            <div className="posterStatement">
              <p className="posterQuestion">
                How does corporate power affect the lives of students?
              </p>
              <div className="posterMeta">
                <div>
                  <p className="cardKicker">Meeting</p>
                  <h3>Tuesdays, 7:00 to 8:00 PM</h3>
                </div>
                <div>
                  <p className="cardKicker">Location</p>
                  <h3>209 Hastings Hall</h3>
                </div>
                <div>
                  <p className="cardKicker">Format</p>
                  <h3>Discussion, writing, collective action</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="heroPoster heroPosterAccent">
            <p className="posterKicker">Affiliation</p>
            <p className="affiliationNote">
              In affiliation with the <strong>Systemic Justice Project</strong> at
              <strong> Harvard Law School</strong>.
            </p>
          </div>
        </div>
      </section>

      <section
        id="mission"
        ref={revealRef}
        className="missionSection"
      >
        <div className="sectionHeading">
          <p className="eyebrow">Mission</p>
          <h2>
            Examine corporate power, name systemic injustice, and turn study
            into public work.
          </h2>
        </div>
        <WordReveal text={missionWords} />
      </section>

      <section
        id="work"
        className="bentoSection"
      >
        <div className="sectionHeading sectionHeadingSplit">
          <div>
            <p className="eyebrow">Themes and work</p>
            <h2>
              The lab studies the systems that train, discipline, and profit
              from everyday life.
            </h2>
          </div>
          <p className="sectionAside">
            Public material from Northeastern frames the lab around education,
            discussion, public writing, and collective action. The themes below
            turn that mission into a homepage structure.
          </p>
        </div>

        <div className="bentoGrid">
          <article className="bentoCard bentoManifesto">
            <p className="cardKicker">Core mission</p>
            <h3>
              Expose the influence of corporate power on the lives of students
              and the communities around them.
            </h3>
            <p>
              Northeastern's public description centers education, discussion,
              and collective action. The homepage uses that line as a thesis and
              builds outward from it.
            </p>
          </article>

          <article className="bentoCard bentoVisual">
            <div className="visualCaption visualCaptionStatic">
              <p className="cardKicker">Field of concern</p>
              <h3>Campus institutions are one site where corporate power becomes visible.</h3>
              <p>
                CCTL treats the university as part of a wider corporate and legal
                landscape, not as a neutral setting outside of it.
              </p>
            </div>
          </article>

          <article className="bentoCard bentoSchedule">
            <p className="cardKicker">Meeting rhythm</p>
            <h3>Tuesdays, 7:00 to 8:00 PM. 209 Hastings Hall.</h3>
          </article>

          <article className="bentoCard bentoTopics">
            <div className="topicsList">
              {portfolioItems.map((item) => (
                <div key={item.title}>
                  <p className="cardKicker">{item.kicker}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="bentoCard bentoStrip">
            <div className="stripHeading">
              <p className="cardKicker">Working method</p>
              <h3>
                <span>Read together.</span>
                <span className="inlineLogo">
                  <img
                    src={logoUrl}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <span>Publish publicly. Organize collectively.</span>
              </h3>
            </div>
          </article>
        </div>
      </section>

      <section className="accordionSection">
        <div className="sectionHeading">
          <p className="eyebrow">Areas of work</p>
          <h2>
            The lab needs room for discussion, publication, and pathways into
            action.
          </h2>
        </div>

        <div className="accordionRow">
          {accordionItems.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`issuePanel ${activeIssue === index ? "isActive" : ""}`}
              onMouseEnter={() => setActiveIssue(index)}
              onFocus={() => setActiveIssue(index)}
              onClick={() => setActiveIssue(index)}
            >
              <div className="issuePanelOverlay" />
              <div className="issuePanelContent">
                <p className="cardKicker">{item.title}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section
        className="pinSection"
        ref={pinSectionRef}
      >
        <div
          className="pinLabel"
          ref={pinLabelRef}
        >
          <p className="eyebrow">Current questions</p>
          <h2>
            The public face of the lab should hold live questions, not just
            announcements.
          </h2>
          <p>
            The posters already work by naming a question directly: AI in higher
            education, the attention economy, the corporate career funnel. The
            site should preserve that habit of inquiry.
          </p>
        </div>

        <div
          className="pinCards"
          ref={pinCardsRef}
        >
          {workCards.map((card) => (
            <article
              key={card.title}
              className="pinCard"
              style={{ "--card-accent": card.accent }}
            >
              <p className="cardKicker">Working principle</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="join"
        className="ctaSection"
      >
        <div className="ctaPanel">
          <p className="heroIntro">
            <span>the</span> Critical Corporate Theory Lab <em>at Northeastern</em>
          </p>
          <h2>
            A first public structure for convening students, publishing work,
            and building collective analysis.
          </h2>
          <p>
            This version is organized around what CCTL already appears to be:
            a student lab focused on corporate power, systemic injustice,
            accessible public writing, and weekly discussion-heavy meetings.
          </p>
          <div className="heroActions">
            <a
              href="#mission"
              className="buttonPrimary"
            >
              Read the mission
            </a>
            <a
              href="#work"
              className="buttonGhost"
            >
              Review the themes
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
