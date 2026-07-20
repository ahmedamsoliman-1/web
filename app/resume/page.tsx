import type { Metadata } from "next";
import { PrintButton } from "@/components/print-button";
import { certifications, experience, profile, technologyGroups } from "@/content/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Professional résumé of Ahmed Soliman, Senior Software Developer and AI Platform Engineer.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <header className="resume-header">
        <div><p>AHMED SOLIMAN</p><h1>{profile.role}</h1></div>
        <div className="resume-contact"><span>{profile.location}</span><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.linkedin}>LinkedIn</a></div>
      </header>
      <section className="resume-summary"><h2>Profile</h2><p>{profile.summary}</p></section>
      <section><h2>Experience</h2>{experience.map((job) => <article className="resume-job" key={job.company}><div><b>{job.period}</b><span>{job.location}</span></div><div><h3>{job.role}</h3><h4>{job.company}</h4><p>{job.description}</p><ul>{job.highlights.map((item) => <li key={item}>{item}</li>)}</ul></div></article>)}</section>
      <div className="resume-columns">
        <section><h2>Technical toolkit</h2>{technologyGroups.map((group) => <div className="resume-toolkit" key={group.label}><b>{group.label}</b><p>{group.items.join(" · ")}</p></div>)}</section>
        <section><h2>Credentials</h2>{certifications.slice(0, 4).map((item) => <div className="resume-cert" key={item.title}><b>{item.title}</b><span>{item.issuer} · {item.date}</span></div>)}<div className="resume-cert"><b>BSc in Computer Engineering</b><span>Omdurman Ahlia University · 2014</span></div></section>
      </div>
      <div className="resume-actions"><PrintButton /><a href="/">Return to portfolio</a></div>
    </main>
  );
}
