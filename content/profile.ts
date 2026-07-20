export const profile = {
  name: "Ahmed Soliman",
  shortName: "AS",
  role: "Senior Software Developer & AI Platform Engineer",
  location: "Abu Dhabi, United Arab Emirates",
  email: "ahmed-3010@hotmail.com",
  phone: "+971507065214",
  summary:
    "I design backend-heavy AI platforms where inference services, observability, data systems, developer tooling, and Kubernetes infrastructure operate as one reliable product.",
  resumeUrl:
    "https://ahmedalimsolimancv.s3.me-central-1.amazonaws.com/CVs_HCL/Ahmed_Ali_M_Soliman_SW_Engineer_en_HCL.pdf",
  linkedin: "https://ae.linkedin.com/in/ahmed-ali-m-soliman-01aa54120",
  github: "https://github.com/ahmedamsoliman-1",
  gitlab: "https://gitlab.com/ahmedamsoliman-1",
};

export const expertise = [
  {
    number: "01",
    title: "AI platforms",
    description:
      "Production inference, Arabic voice experiences, knowledge workflows, observability, and the services that keep them dependable.",
    tags: ["Voice AI", "Inference", "NLP", "Observability"],
  },
  {
    number: "02",
    title: "Backend systems",
    description:
      "Resilient APIs, service architecture, data integrations, automation, and operational tooling designed for real-world use.",
    tags: ["Node.js", "Python", "APIs", "Microservices"],
  },
  {
    number: "03",
    title: "Cloud reliability",
    description:
      "Cloud-native delivery and infrastructure practices that turn complex software into observable, repeatable products.",
    tags: ["Kubernetes", "Docker", "AWS", "CI/CD"],
  },
];

export const experience = [
  {
    period: "2023 — Present",
    role: "Senior Software Developer",
    company: "Avrioc Technologies",
    location: "Masdar City, Abu Dhabi",
    description:
      "Building voice-driven AI domains for Arabic recognition, natural language understanding, and knowledge workflows, with an emphasis on reliable delivery and platform clarity.",
    highlights: [
      "Delivered Arabic voice-to-meaning domains for vehicle control and knowledge queries.",
      "Integrated external data providers to improve coverage, accuracy, and resilience.",
      "Managed releases through testing, documentation, Docker, Git, Jenkins, and operational validation.",
    ],
    technologies: ["Voice AI", "Node.js", "Python", "Docker", "Jenkins"],
  },
  {
    period: "2019 — 2023",
    role: "Senior Software Developer",
    company: "HCL Technologies",
    location: "Dubai Internet City",
    description:
      "Developed enterprise backend components for voice AI, platform integrations, and production automation across complex delivery environments.",
    highlights: [
      "Built scalable backend services and integrations for enterprise workflows.",
      "Improved maintainability and release confidence through testing and documentation.",
      "Contributed to delivery automation with Docker, Git, Jenkins, and scripting.",
    ],
    technologies: ["Backend", "Voice AI", "Docker", "Automation", "Git"],
  },
  {
    period: "2017 — 2019",
    role: "DevOps & Infrastructure Engineer",
    company: "Omdurman Ahlia University",
    location: "Omdurman, Sudan",
    description:
      "Led infrastructure and systems modernization for university services, combining virtualization, Linux operations, documentation, and support.",
    highlights: [
      "Implemented datacenter, VMware, NAS storage, and Linux service foundations.",
      "Maintained open-source library, document management, and campus systems.",
      "Supported Active Directory, network policies, monitoring, and staff training.",
    ],
    technologies: ["Linux", "VMware", "Networking", "Storage", "Monitoring"],
  },
];

export const certifications = [
  { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2023", image: "/badges/solution-architect.png", url: "https://www.credly.com/badges/73500ee7-056e-4bb9-b594-f71f718fd436" },
  { title: "AWS Architecting", issuer: "Amazon Web Services", date: "2023", image: "/badges/aws-architecting.png", url: "https://www.credly.com/badges/a4d7f948-5684-4734-a14e-39ce432f3220" },
  { title: "AWS Data Protection & DR", issuer: "Amazon Web Services", date: "2023", image: "/badges/aws-data-protection.png", url: "https://www.credly.com/badges/eacfeedc-9019-4bd7-ba24-42e35b1bc30e" },
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2022", image: "/badges/cloud-practitioner.png", url: "https://www.credly.com/badges/146550f3-b9b1-464c-ae2e-b5971792d4e3/linked_in_profile" },
  { title: "Introduction to Artificial Intelligence", issuer: "Skillsoft", date: "2023", image: "/badges/ai.png", url: "https://skillsoft.digitalbadges.skillsoft.com/abc5efc9-968f-402e-90c0-a91d9b16aab7" },
  { title: "C++ Nanodegree", issuer: "Udacity", date: "2020", image: "/badges/cpp.jpg", url: "https://graduation.udacity.com/confirm/KC39MJUR" },
];

export const technologyGroups = [
  { label: "Build", items: ["Node.js", "Python", "C++", "REST APIs", "Microservices"] },
  { label: "Ship", items: ["Docker", "Kubernetes", "Jenkins", "Git", "CI/CD"] },
  { label: "Operate", items: ["AWS", "Linux", "Observability", "Data systems", "Automation"] },
];
