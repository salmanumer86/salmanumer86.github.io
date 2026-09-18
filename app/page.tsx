import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Effects } from "@/components/Effects";
import { Icon } from "@/components/Icons";
import { ContactForm } from "@/components/ContactForm";
import { Testimonials, type Testimonial } from "@/components/Testimonials";
import { JobCard, PostCard } from "@/components/Cards";
import { getAll, getJobs, isJobOpen } from "@/lib/content";
import { site } from "@/lib/site";

const testimonials: Testimonial[] = [
  {
    quote: [
      "I had the pleasure of working with Salman and was genuinely impressed by his professionalism, communication skills, and dedication as a Business Developer. He consistently handled client interactions with confidence, maintained strong relationships, and delivered excellent results with a strategic approach.",
      "Reliable, hardworking, and highly focused on achieving goals efficiently. His ability to understand client needs and contribute to business growth makes him a valuable professional to work with.",
    ],
    relation: "Client",
    name: "Mohsin Mukhtar",
    role: "Founder & LinkedIn Growth Coach",
    avatar: "/avatars/mohsin.jpg",
  },
  {
    quote: [
      "I've had the pleasure of working with Salman and can confidently say he is a highly skilled and dedicated Frontend Developer. He has a strong command of modern frontend technologies and consistently delivers clean, responsive, and user-friendly interfaces.",
      "Detail-oriented, creative, and always willing to go the extra mile. He works well in collaborative environments, communicates effectively, and approaches challenges with a problem-solving mindset.",
    ],
    relation: "Worked on the same team",
    name: "Haider Ali",
    role: "Full Stack Developer · React, Next.js, Rails",
    avatar: "/avatars/haider.jpg",
  },
  {
    quote: [
      "I highly recommend Salman for his professionalism, dedication, and strong work ethic. He consistently demonstrates excellent communication and interpersonal skills while handling recruitment responsibilities efficiently.",
      "Salman has a great ability to connect with candidates and understand hiring needs, making him a valuable asset to any organization. It has been a pleasure working with him.",
    ],
    relation: "Client",
    name: "Fazal Karim",
    role: "Senior Full Stack Engineer · React, Rails, AWS",
    avatar: "/avatars/fazal.jpg",
  },
  {
    quote: [
      "I highly recommend Salman for his professionalism, communication skills, and dedication to his work. He is highly organized, supportive, and always approaches tasks with a positive attitude.",
      "Salman has a strong understanding of recruitment and professional networking, making him an excellent resource for both candidates and organizations. A great experience collaborating with him.",
    ],
    relation: "Client",
    name: "Rizwana Naeem",
    role: "SEO Content Writer & eCommerce Content Manager",
    avatar: "/avatars/rizwana.jpg",
  },
  {
    quote: [
      "I have known Salman as my university fellow and brother for many years. He is a hardworking, honest, and supportive person who is always willing to help others.",
      "Salman is dedicated to his work and learns quickly. I highly recommend him and wish him success in his career.",
    ],
    relation: "Mentor",
    name: "Talha Khizar Hafiz",
    role: "Lecturer & Research Scholar, Islamic Studies",
    avatar: "/avatars/talha.jpg",
  },
];

const services = [
  { no: "01", ic: "◎", title: "Tech Talent Sourcing & Screening", body: "Finding, vetting, and shortlisting software engineers who match your stack, seniority, and team culture, not just keywords on a résumé." },
  { no: "02", ic: "</>", title: "Hiring Frontend & Full-Stack Developers", body: "Specialist support for hiring React, Next.js, and React Native talent. I speak the language, so I filter signal from noise before you spend interview time." },
  { no: "03", ic: "✎", title: "Résumé / CV Review & Optimization", body: "Sharpening developer résumés so they clear the screening bar, with clear impact, the right keywords, and a story that recruiters and hiring managers act on." },
  { no: "04", ic: "in", title: "LinkedIn Profile Improvement", body: "Positioning developers to be found and taken seriously, with a headline, summary, and experience that turn profile views into real conversations." },
  { no: "05", ic: "➜", title: "Job-Search Guidance for Developers", body: "Practical coaching for engineers navigating the market: where to apply, how to interview, and how to evaluate an offer that's actually right for you." },
  { no: "06", ic: "⇄", title: "Hiring Partnerships & Outsourcing", body: "Building long-term partnerships between companies and skilled development teams, so you get a reliable talent pipeline instead of one-off, transactional hires." },
];

const timeline = [
  {
    date: "Sep 2023 — Present",
    title: "Business Development Specialist",
    co: "Jazzari",
    now: true,
    body: [
      "Handling the commercial side: finding clients, understanding what they need built, and matching them with engineers who can build it. Sourcing, screening and shortlisting developers, and building outsourcing partnerships with companies in Pakistan and abroad.",
      "I also work hands-on in the frontend codebase — React, Next.js and React Native on Firebase — which is where the technical judgement comes from.",
    ],
  },
  { date: "Nov 2018 — Aug 2023", title: "Family Business Operations", co: "Events Management", body: ["Stepped away from formal employment to look after the family events management business — day-to-day operations, client coordination, vendor and supplier relationships, and general administration."] },
  { date: "Oct 2016 — Nov 2018", title: "Assistant General Manager, Operations", co: "Duraflow Plastics Pvt Ltd", body: ["Led day-to-day operations and team coordination for a manufacturing operation in Lahore."] },
  { date: "Nov 2014 — Dec 2015", title: "Assistant General Manager", co: "Alif Industry SMC (TURKPLAST)", body: ["Managed operations and business functions for an industrial manufacturer in Lahore."] },
  { date: "Mar 2012 — Apr 2014", title: "Back Office Assistant", co: "Al Masraf", body: ["Supported back-office banking operations in Dubai, United Arab Emirates."] },
  { date: "Mar 2003 — Oct 2007", title: "Database Administrator", co: "DESCON", body: ["Administered and maintained database systems for a leading engineering group in Lahore, where my technical career began."] },
];

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/headshot.jpg`,
  jobTitle: site.jobTitle,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  worksFor: { "@type": "Organization", name: site.company },
  address: { "@type": "PostalAddress", addressLocality: site.location.city, addressCountry: site.location.countryCode },
  sameAs: [site.linkedin],
  knowsAbout: ["Technical Recruiting", "Business Development", "React", "Next.js", "React Native", "Firebase"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of the Punjab" },
};

export default function Home() {
  const latest = [...getAll("blog"), ...getAll("advice")].sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1)).slice(0, 3);
  const openJobs = getJobs().filter((j) => isJobOpen(j.meta)).slice(0, 3);
  const hasContent = latest.length > 0 || openJobs.length > 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <Nav />
      <Effects />

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Tech Recruiter · Business Development</span>
            <h1 className="hero-title">
              Connecting companies with the <span className="gold">right</span> engineering talent.
            </h1>
            <p className="hero-sub">
              I help startups and growing companies hire skilled software engineers faster, and I guide developers toward the roles where they&apos;ll do their best work. A recruiter who writes code himself.
            </p>
            <div className="hero-cta">
              <a className="btn btn-gold" href="#contact">
                Let&apos;s talk hiring →
              </a>
              <a className="btn btn-ghost" href="#services">
                View what I do
              </a>
            </div>
            <div className="hero-trust">
              <span className="tdot" />
              <span>
                <b>3 years</b> writing React alongside the recruiting
              </span>
            </div>
            <div className="hero-loc">
              <span className="dot" /> Based in Lahore, Pakistan · Open to collaborations worldwide
            </div>
          </div>
          <div className="portrait">
            <div className="frame">
              <img className="photo" src="/headshot.jpg" alt="Salman Umer, Tech Recruiter & Business Development Specialist" width="300" height="300" fetchPriority="high" />
            </div>
            <span className="badge">
              <span className="bdot" />
              Recruiter <em className="grow">who codes</em>
            </span>
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="stats">
        <div className="stats-inner">
          <div className="stat">
            <b data-count="3" data-suffix=" yrs">3 yrs</b>
            <span>Writing React</span>
          </div>
          <div className="stat">
            <b>Dual</b>
            <span>Recruiter + developer</span>
          </div>
          <div className="stat">
            <b data-count="3">3</b>
            <span>Languages spoken</span>
          </div>
          <div className="stat">
            <b>Jazzari</b>
            <span>Business development</span>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="section light" id="about">
        <div className="wrap about-grid reveal">
          <div>
            <span className="eyebrow">About</span>
            <h2 className="sec-title">
              Hiring is about people <span className="em">and</span> product. I understand both.
            </h2>
            <div className="about-body">
              <p>
                I help startups and growing companies hire the right tech talent faster, and I guide developers toward the opportunities where they&apos;ll thrive. With experience across both <strong>technical and non-technical recruitment</strong>, I know what companies actually need and what separates a strong candidate from an average one.
              </p>
              <p>
                What makes my approach different is that I write code alongside the recruiting — <strong>React, Next.js and React Native</strong>, hands-on, week to week. I&apos;m not going to claim I can grade a senior engineer&apos;s architecture. What I can do is read their repo, follow the conversation, and ask a second question instead of nodding at a buzzword. That&apos;s usually enough to keep the wrong people off your shortlist, which is where most of the value in screening sits.
              </p>
              <p>Before recruiting I spent years in operations and database administration, running teams and processes rather than writing job specs. That&apos;s where the read on people comes from.</p>
              <p>
                At <strong>Jazzari</strong>, I focus on business development and building lasting hiring partnerships between companies and skilled developers.
              </p>
            </div>
          </div>
          <aside className="about-card">
            <h3>At a glance</h3>
            <div className="row"><span>Role</span><b>Tech Recruiter &amp; BD Specialist</b></div>
            <div className="row"><span>Company</span><b>Jazzari</b></div>
            <div className="row"><span>Based in</span><b>Lahore, Pakistan</b></div>
            <div className="row"><span>Hands-on</span><b>React · Next.js · React Native</b></div>
            <div className="row"><span>Also</span><b>Frontend Developer</b></div>
            <div className="row"><span>Status</span><b><span className="live">●</span> Open to collaborations</b></div>
          </aside>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section light" id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow center">What I help with</span>
            <h2 className="sec-title">Recruiting, business development &amp; career guidance</h2>
            <p>End-to-end support for the two sides of tech hiring: the companies who need talent, and the developers looking for their next move.</p>
          </div>
          <div className="svc-grid stagger-grid">
            {services.map((s) => (
              <div className="svc" key={s.no}>
                <span className="no">{s.no}</span>
                <div className="ic">{s.ic}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ME / RECRUITER WHO CODES */}
      <section className="section codes" id="approach">
        <div className="wrap codes-grid reveal">
          <div>
            <span className="eyebrow">Why work with me</span>
            <h2 className="sec-title">A recruiter who writes code.</h2>
            <p className="lead">
              Most tech recruiters screen on keywords, because that&apos;s all they can do. I build with React and Next.js myself, so when a candidate explains what they did, I can tell whether the explanation holds together. I won&apos;t pretend to be a senior engineer. I&apos;ll just make sure you&apos;re not interviewing someone who can&apos;t answer a follow-up.
            </p>
            <div className="skillset">
              <div className="group">
                <h4>Development</h4>
                <div className="chips">
                  {["React.js", "Next.js", "React Native", "Firebase", "JavaScript"].map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>
              <div className="group">
                <h4>Recruiting &amp; Business Development</h4>
                <div className="chips">
                  {["Talent Sourcing", "Technical Screening", "Negotiation", "Interpersonal Communication", "Partnership Building"].map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="code-window" aria-hidden="true">
            <div className="bar"><i /><i /><i /><span>shortlist.js</span></div>
            <pre>
              <span className="k">const</span> candidate = {"{"}{"\n"}
              {"  "}role: <span className="s">&quot;Frontend Engineer&quot;</span>,{"\n"}
              {"  "}stack: [<span className="s">&quot;React&quot;</span>, <span className="s">&quot;Next.js&quot;</span>, <span className="s">&quot;TypeScript&quot;</span>],{"\n"}
              {"  "}repoReviewed: <span className="k">true</span>,{"\n"}
              {"}"};{"\n\n"}
              <span className="c">// I read the repo, not just the CV</span>{"\n"}
              <span className="k">const</span> <span className="p">shortlist</span> = (people, needs) =&gt;{"\n"}
              {"  "}people.<span className="p">filter</span>((c) =&gt;{"\n"}
              {"    "}needs.<span className="p">every</span>((n) =&gt; c.stack.<span className="p">includes</span>(n)){"\n"}
              {"    "}&amp;&amp; c.repoReviewed{"\n"}
              {"  "});{"\n\n"}
              <span className="p">shortlist</span>([candidate], [<span className="s">&quot;React&quot;</span>]); <span className="c">// ✓</span>
              <span className="cursor" />
            </pre>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section light" id="experience">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Career</span>
            <h2 className="sec-title">From databases to operations to tech recruiting</h2>
            <p>A path through database administration, operations leadership and family business before tech recruiting — which is where the read on both people and process comes from.</p>
          </div>
          <div className="timeline stagger-grid">
            {timeline.map((t) => (
              <div className={`tl-item${t.now ? " now" : ""}`} key={t.title + t.co}>
                <div className="tl-date">{t.date}</div>
                <h3>
                  {t.title} <span className="co">· {t.co}</span> {t.now && <span className="tl-tag">Current</span>}
                </h3>
                {t.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section light" id="testimonials" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow center">Recommendations</span>
            <h2 className="sec-title">What people say about working with me</h2>
            <p>
              A few words from colleagues, clients, and mentors I&apos;ve had the pleasure of working with — as shared on{" "}
              <a href={`${site.linkedin}/details/recommendations/`} target="_blank" rel="noopener" style={{ color: "var(--eyebrow)" }}>
                LinkedIn
              </a>
              .
            </p>
          </div>
          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* LATEST WRITING + OPEN ROLES */}
      {hasContent && (
        <section className="section" id="latest">
          <div className="wrap">
            <div className="sec-head center reveal">
              <span className="eyebrow center">From the blog</span>
              <h2 className="sec-title">Latest writing &amp; open roles</h2>
              <p>Notes on hiring, career advice for developers, and the positions I&apos;m sourcing for right now.</p>
            </div>
            {latest.length > 0 && (
              <div className="post-grid stagger-grid">
                {latest.map((e) => (
                  <PostCard key={e.meta.section + e.meta.slug} meta={e.meta} />
                ))}
              </div>
            )}
            {openJobs.length > 0 && (
              <div className="post-grid stagger-grid" style={{ marginTop: 22 }}>
                {openJobs.map((e) => (
                  <JobCard key={e.meta.slug} meta={e.meta} />
                ))}
              </div>
            )}
            <div className="hero-cta" style={{ justifyContent: "center" }}>
              <Link className="btn btn-ghost" href="/blog/">All articles</Link>
              <Link className="btn btn-ghost" href="/advice/">Career advice</Link>
              <Link className="btn btn-ghost" href="/jobs/">Open roles</Link>
            </div>
          </div>
        </section>
      )}

      {/* LANGUAGES + EDUCATION */}
      <section className="section" id="languages">
        <div className="wrap le-grid reveal">
          <div>
            <span className="eyebrow">Languages</span>
            <h2 className="sec-title">Fluent across three languages</h2>
            <div className="langs" style={{ marginTop: 26 }}>
              {[
                ["Urdu", "100%", "Native / Bilingual"],
                ["Punjabi", "92%", "Full Professional"],
                ["English", "85%", "Professional Working"],
              ].map(([name, w, lvl]) => (
                <div className="lang-row" key={name}>
                  <span className="name">{name}</span>
                  <span className="meter"><i data-w={w} /></span>
                  <span className="lvl">{lvl}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">Education</span>
            <div className="edu-card" style={{ marginTop: 26 }}>
              <div className="ic">🎓</div>
              <h3>University of the Punjab, Lahore</h3>
              <div className="deg">Bachelor&apos;s Degree, Sociology</div>
              <div className="yr">Aug 2014 — Jul 2016</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-grid reveal">
          <div className="contact-left">
            <span className="eyebrow">Get in touch</span>
            <h2>
              Let&apos;s connect the <span className="gold">right</span> people.
            </h2>
            <p>Hiring software engineers, looking for tech talent support, or a developer seeking your next opportunity? Send a message and I&apos;ll get back to you.</p>
            <div className="contact-methods">
              <a className="cmethod" href={`mailto:${site.email}`}>
                <span className="ic"><Icon name="i-gmail" /></span>
                <span className="txt"><small>Email</small><span>{site.email}</span></span>
              </a>
              <a className="cmethod" href={`https://wa.me/${site.phone.replace("+", "")}`} target="_blank" rel="noopener">
                <span className="ic"><Icon name="i-whatsapp" /></span>
                <span className="txt"><small>WhatsApp</small><span>{site.phoneDisplay}</span></span>
              </a>
              <a className="cmethod" href={site.linkedin} target="_blank" rel="noopener">
                <span className="ic"><Icon name="i-linkedin" /></span>
                <span className="txt"><small>LinkedIn</small><span>/in/salmanumer</span></span>
              </a>
              <div className="cmethod as-static">
                <span className="ic"><Icon name="i-pin" /></span>
                <span className="txt"><small>Location</small><span>Lahore, Pakistan</span></span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
