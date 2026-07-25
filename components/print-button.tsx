"use client";

export function PrintButton() {
  return <button type="button" onClick={() => window.print()} data-track="resume.printed" data-track-target="print-button">Print / Save as PDF</button>;
}
