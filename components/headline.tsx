import { Fragment } from "react";

type Word = { text: string; className?: string };

// Each line is an array of words; words reveal in sequence with a masked rise.
const lines: Word[][] = [
  [{ text: "Engineering" }, { text: "intelligence.", className: "grad-text" }],
  [{ text: "Operating" }, { text: "reliability.", className: "outline-text" }],
];

export function Headline() {
  let i = 0;
  return (
    <h1 className="hero-title reveal-load" style={{ ["--d" as string]: "60ms" }}>
      {lines.map((words, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          <span className="hl-line">
            {words.map((word, wi) => {
              const delay = i++ * 85 + 260;
              return (
                <span className="word" key={wi}>
                  <span className={`word-in ${word.className ?? ""}`} style={{ ["--wd" as string]: `${delay}ms` }}>
                    {word.text}
                  </span>
                </span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </h1>
  );
}
