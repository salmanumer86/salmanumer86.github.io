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
  { no: "01", ic: "⇄", title: "Business Development & Client Partnerships", body: "Connecting companies with technology talent and software development opportunities. Personal introductions based on real working relationships, not cold lists." },
  { no: "02", ic: "◎", title: "Software Development Outsourcing", body: "Matching businesses with reliable development teams in Pakistan, and helping software companies find the right clients. I stay involved after the contract is signed." },
  { no: "03", ic: "</>", title: "Tech Recruitment & Talent Sourcing", body: "Sourcing, screening and shortlisting frontend and full-stack engineers (React, Next.js, React Native) who match your stack, seniority and team, not just keywords." },
  { no: "04", ic: "✚", title: "Technology Hiring Support", body: "Helping startups, founders and CTOs build stronger technical teams, from a single senior hire to a full team. Every shortlist is checked properly before it reaches you." },
  { no: "05", ic: "in", title: "LinkedIn Profile Optimization", body: "Helping developers and founders get found and taken seriously on LinkedIn. A clear headline, summary and experience section that turn profile views into real conversations." },
  { no: "06", ic: "✎", title: "CV Optimization & Career Guidance", body: "Improving developer CVs so they get past screening, plus practical advice on where to apply, how to interview and how to judge an offer." },
];

const audiences = [
  "Startups and growing companies",
  "Founders and business owners",
  "CTOs and engineering leaders",
  "HR & talent acquisition teams",
  "Software development companies",
  "Companies seeking reliable outsourcing partners",
];

const timeline = [
  {
    date: "Sep 2023 — Present",
    title: "Business Development Specialist",
    co: "Jazzari",
    now: true,
    body: [
      "Jazzari is a software services company. I handle the commercial side: finding clients, understanding what they need built, and matching them with engineers who can build it. I source, screen and shortlist engineers for client roles, build outsourcing and hiring partnerships with companies in Pakistan and abroad, and run the hiring process from first call to start date.",
      "Three years of writing frontend code at Jazzari is what got me into business development, and it's what makes me good at it. When a client describes what they want built, I can hear what they actually need, tell whether the scope matches the budget, and push back on a timeline that won't hold. Clients stay because the first conversation was honest.",
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
  knowsAbout: ["Business Development", "B2B Partnerships", "Software Outsourcing", "Lead Generation", "Technical Recruiting", "React", "Next.js", "React Native"],
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
            <span className="eyebrow">Business Development · Tech Recruitment · Partnerships</span>
            <h1 className="hero-title">
              Connecting companies with the <span className="gold">right</span> talent, teams and partnerships.
            </h1>
            <p className="hero-sub">
              I help companies hire software engineers, outsource development and build long-term technology partnerships. I also write code myself, so I know who delivers.
            </p>
            <div className="hero-cta">
              <a className="btn btn-gold" href="#contact?topic=Hiring%20software%20engineers">
                Let&apos;s talk hiring →
              </a>
              <a className="btn btn-ghost" href="#contact?topic=Partnership%20%2F%20outsourcing">
                Explore a partnership
              </a>
            </div>
            <div className="hero-trust">
              <span className="tdot" />
              <span>
<b>12K+ network</b> · working relationships with reputable software companies in Pakistan
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
              Hiring &amp; <em className="grow">partnerships</em>
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
            <b data-count="12" data-suffix="K+">12K+</b>
            <span>Professional network</span>
          </div>
          <div className="stat">
            <b data-count="5">5</b>
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
              People, product <span className="em">and</span> partnerships. I work on all three.
            </h2>
            <div className="about-body">
              <p>
                I connect companies with the right technology talent and help build <strong>partnerships that create long-term business opportunities</strong>. I work with companies looking to hire software engineers, strengthen their technical teams, outsource development, or build reliable technology partnerships.
              </p>
              <p>
                What makes my approach different is that I write code alongside the recruiting: <strong>React, Next.js and React Native</strong>, hands-on, week to week. I&apos;m not going to claim I can grade a senior engineer&apos;s architecture. What I can do is read their repo, follow the conversation, and ask a second question instead of nodding at a buzzword. That&apos;s usually enough to keep the wrong people off your shortlist, which is where most of the value in screening sits.
              </p>
              <p>I&apos;m also passionate about helping developers navigate the job market through CV optimization, LinkedIn positioning, and career opportunities.</p>
              <p>Before recruiting I spent years in operations and database administration, running teams and processes rather than writing job specs. That&apos;s where the read on people comes from.</p>
              <p>
                At <strong>Jazzari Software Solutions</strong>, I focus on business development and building connections between companies, technology talent, and software development opportunities.
              </p>
            </div>
            <div className="audiences">
              <h4>Who I work with</h4>
              <ul>
                {audiences.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="about-card">
            <h3>At a glance</h3>
            <div className="row"><span>Role</span><b>BD &amp; Tech Recruitment Specialist</b></div>
            <div className="row"><span>Company</span><b>Jazzari Software Solutions</b></div>
            <div className="row"><span>Based in</span><b>Lahore, Pakistan</b></div>
            <div className="row"><span>Hands-on</span><b>React · Next.js · React Native</b></div>
            <div className="row"><span>Focus</span><b>Hiring · Outsourcing · Partnerships</b></div>
            <div className="row"><span>Status</span><b><span className="live">●</span> Open to collaborations</b></div>
          </aside>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section light" id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow center">What I do</span>
            <h2 className="sec-title">Business development, hiring &amp; outsourcing</h2>
            <p>Support for companies that need talent, teams or partners, and for the developers and software houses on the other side.</p>
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
            <p>A path through database administration, operations management and the family business before tech recruiting. That is where my understanding of people and process comes from.</p>
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
              A few words from colleagues, clients and mentors I have worked with, as shared on{" "}
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
            <h2 className="sec-title">Five languages, three of them fluently</h2>
            <div className="langs" style={{ marginTop: 26 }}>
              {[
                ["Urdu", "100%", "Native / Bilingual"],
                ["Punjabi", "92%", "Full Professional"],
                ["English", "85%", "Professional Working"],
                ["Arabic", "40%", "Limited Working"],
                ["Azerbaijani", "40%", "Limited Working"],
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
            <p>Hiring, building a technology team, looking for development support, or exploring a partnership? Send a message and I&apos;ll get back to you.</p>
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
