import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download, Github, Globe, Linkedin, Mail } from "@/components/icons";
import { Navigation } from "@/components/navigation";
import { RevealObserver } from "@/components/reveal";
import { SystemVisual } from "@/components/system-visual";
import { Atmosphere } from "@/components/atmosphere";
import { Interactions } from "@/components/interactions";
import { Headline } from "@/components/headline";
import { certifications, experience, expertise, profile, technologyGroups } from "@/content/profile";
import { brandLogos } from "@/content/brand-logos";

const stats = [
  { value: 12, suffix: "+", label: "Years in the field" },
  { value: 3, suffix: "", label: "Countries delivered in" },
  { value: 4, suffix: "", label: "AWS certifications" },
  { value: 100, suffix: "%", label: "Focus on reliability" },
];


export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.summary,
    address: { "@type": "PostalAddress", addressLocality: "Abu Dhabi", addressCountry: "AE" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Omdurman Ahlia University" },
    sameAs: [profile.linkedin, profile.github, profile.gitlab],
    knowsAbout: ["Artificial Intelligence", "Backend engineering", "Voice AI", "Kubernetes", "AWS", "Cloud computing"],
  };

  return (
    <>
      <Atmosphere />
      <Navigation />
      <RevealObserver />
      <Interactions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <main id="top">
        <section className="hero section-shell">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow reveal-load" style={{ ["--d" as string]: "0ms" }}><span className="status-dot" />Available for meaningful challenges</div>
            <Headline />
            <p className="reveal-load" style={{ ["--d" as string]: "620ms" }}>{profile.summary}</p>
            <div className="hero-actions reveal-load" style={{ ["--d" as string]: "700ms" }}>
              <a className="button button-primary" href="#experience">Explore my work <ArrowDown /></a>
              <a className="button button-ghost" href={profile.website} target="_blank" rel="noreferrer">Main website <Globe /></a>
              <a className="button button-ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">Download résumé <Download /></a>
            </div>
            <div className="hero-meta reveal-load" style={{ ["--d" as string]: "780ms" }}>
              <div><small>BASED IN</small><strong>Abu Dhabi, UAE</strong></div>
              <div><small>SPECIALIZING IN</small><strong>AI · Backend · Cloud</strong></div>
            </div>
          </div>
          <div className="hero-art reveal-fade" style={{ ["--d" as string]: "220ms" }} data-tilt data-scrub><SystemVisual /></div>
          <a className="scroll-cue" href="#intro"><span>Scroll to explore</span><ArrowDown /></a>
        </section>

        <div className="marquee section-shell" aria-hidden="true">
          <div className="marquee-track">
            {[...brandLogos, ...brandLogos].map((logo, i) => (
              <span key={i} className="marquee-item">
                <svg className="brand-icon" viewBox="0 0 24 24" style={{ ["--brand" as string]: logo.color }} aria-hidden="true">
                  <path d={logo.path} fill="currentColor" />
                </svg>
                {logo.label}
              </span>
            ))}
          </div>
        </div>

        <section className="intro section-shell" id="intro">
          <div className="section-index">01 / PROFILE</div>
          <div className="intro-grid">
            <h2 data-reveal>I make complex<br />systems feel <em>clear.</em></h2>
            <div className="intro-copy" data-reveal>
              <p className="lead">I&apos;m Ahmed, a senior software developer and AI platform engineer focused on the hard parts behind intelligent products.</p>
              <p>My work connects inference services, data, infrastructure, delivery automation, and operational visibility into a dependable product surface. The result is software teams can understand, operate, and evolve.</p>
              <div className="portrait-card">
                <Image src="/avatar.jpg" alt="Portrait of Ahmed Soliman" width={120} height={120} priority />
                <div><span>12+ years across</span><b>Software · AI · Infrastructure</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats section-shell" aria-label="Career at a glance">
          {stats.map((stat) => (
            <div className="stat" key={stat.label} data-reveal>
              <b><span data-count={stat.value} data-suffix={stat.suffix}>0{stat.suffix}</span></b>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="expertise section-shell" id="expertise">
          <span className="section-watermark" data-scrub aria-hidden="true">02</span>
          <div className="section-heading" data-reveal><div><div className="section-index">02 / EXPERTISE</div><h2>Where I create value</h2></div><p>From model-facing services to the operational layer beneath them.</p></div>
          <div className="expertise-grid">
            {expertise.map((item) => (
              <article className="expertise-card" key={item.number} data-reveal data-spotlight>
                <span className="card-number">{item.number}</span><div className="signal" aria-hidden="true"><i /><i /><i /></div>
                <h3>{item.title}</h3><p>{item.description}</p>
                <div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell" id="experience">
          <span className="section-watermark" data-scrub aria-hidden="true">03</span>
          <div className="section-heading" data-reveal><div><div className="section-index">03 / EXPERIENCE</div><h2>Built through practice</h2></div><p>A career moving upward through infrastructure, backend engineering, and applied AI.</p></div>
          <div className="timeline">
            {experience.map((job, index) => (
              <article className="job" key={job.company} data-reveal>
                <div className="job-marker">
                  {job.logo ? <Image className="job-logo" src={job.logo} alt={`${job.company} logo`} width={44} height={44} /> : <span>{String(index + 1).padStart(2, "0")}</span>}
                </div>
                <div className="job-period">{job.period}</div>
                <div className="job-content">
                  <div className="job-title"><div><h3>{job.role}</h3><p>{job.company} · {job.location}</p></div></div>
                  <p className="job-description">{job.description}</p>
                  <ul>{job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                  <div className="tag-list">{job.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="stack section-shell" id="stack">
          <div className="stack-panel">
            <div className="section-heading" data-reveal><div><div className="section-index">04 / TOOLKIT</div><h2>A stack built to operate</h2></div><p>Technology is useful when it reduces uncertainty, accelerates teams, and survives production.</p></div>
            <div className="stack-grid">
              {technologyGroups.map((group, index) => <div className="stack-group" key={group.label} data-reveal data-spotlight><span>0{index + 1}</span><h3>{group.label}</h3><div>{group.items.map((item) => <b key={item}>{item}</b>)}</div></div>)}
            </div>
          </div>
        </section>

        <section className="credentials section-shell" id="credentials">
          <span className="section-watermark" data-scrub aria-hidden="true">05</span>
          <div className="section-heading" data-reveal><div><div className="section-index">05 / CREDENTIALS</div><h2>Continuous learning,<br />validated.</h2></div><p>Cloud architecture, AI, and systems engineering credentials supporting hands-on experience.</p></div>
          <div className="credential-grid">
            {certifications.map((certificate) => (
              <a className="credential-card" href={certificate.url} target="_blank" rel="noreferrer" key={certificate.title} data-reveal data-spotlight>
                <Image src={certificate.image} alt="" width={92} height={92} /><div><span>{certificate.issuer} · {certificate.date}</span><h3>{certificate.title}</h3><small>View credential <ArrowUpRight /></small></div>
              </a>
            ))}
          </div>
        </section>

        <section className="education section-shell" data-reveal>
          <div className="education-card"><div><span>EDUCATION</span><h2>BSc in Computer Engineering</h2><p>Omdurman Ahlia University · 2009—2014</p></div><div className="education-mark">BSc<small>Computer<br />Engineering</small></div></div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="section-index">06 / CONTACT</div>
          <div className="contact-grid">
            <div data-reveal><p className="contact-kicker">Have a complex system to build?</p><h2>Let&apos;s turn it into<br /><em>something reliable.</em></h2></div>
            <div className="contact-side" data-reveal><p>Open to senior backend, AI platform, cloud-native, and developer tooling opportunities.</p><a className="button button-primary" href={`mailto:${profile.email}`}>Start a conversation <Mail /></a></div>
          </div>
          <div className="contact-footer">
            <div><span>Ahmed Soliman</span><small>Senior Software Developer & AI Platform Engineer</small></div>
            <div className="social-links"><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a></div>
            <a href="#top">Back to top ↑</a>
          </div>
        </section>
      </main>
    </>
  );
}
