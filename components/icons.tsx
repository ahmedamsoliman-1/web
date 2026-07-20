import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const ArrowUpRight = (props: IconProps) => <svg {...base} {...props}><path d="M7 17 17 7M7 7h10v10" /></svg>;
export const ArrowDown = (props: IconProps) => <svg {...base} {...props}><path d="m6 9 6 6 6-6" /></svg>;
export const Download = (props: IconProps) => <svg {...base} {...props}><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg>;
export const Mail = (props: IconProps) => <svg {...base} {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
export const Github = (props: IconProps) => <svg {...base} {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.2.5S18.1.1 15 1.8a13.4 13.4 0 0 0-6 0C5.9.1 4.8.5 4.8.5A5 5 0 0 0 4.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.5 6.8 6.9A4.8 4.8 0 0 0 9 18v4" /><path d="M9 18c-5 .5-5-2-7-2" /></svg>;
export const Linkedin = (props: IconProps) => <svg {...base} {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
export const Menu = (props: IconProps) => <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const Close = (props: IconProps) => <svg {...base} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
export const Globe = (props: IconProps) => <svg {...base} {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" /></svg>;
export const Sun = (props: IconProps) => <svg {...base} {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></svg>;
export const Moon = (props: IconProps) => <svg {...base} {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>;
