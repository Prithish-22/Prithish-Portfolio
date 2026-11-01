/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file to update the website.
 *  Add a project, certificate, achievement or timeline entry by
 *  adding an object to the matching array. Nothing else changes.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Prithish Raj",
  firstName: "Prithish",
  lastName: "Raj",
  title: "Aspiring AI/ML Engineer & Data Science Enthusiast",
  location: "Vellore, Tamil Nadu, India",
  headline: ["Exploring Intelligence.", "Engineering Possibilities."],
  heroDescription:
    "Exploring the intersection of Artificial Intelligence, Machine Learning, Data Science, and intelligent application development. Passionate about learning, experimentation, and turning complex problems into practical solutions.",
  availability: "Open to AI/ML & Data Science Opportunities",
  email: "prithish483@gmail.com",
  github: "https://github.com/Prithish-22",
  linkedin: "https://www.linkedin.com/in/prithish-raj-9bb884349/",
  /**
   * PHOTOGRAPH — drop your professional photo into /public (e.g. /public/prithish.jpg)
   * and set the path below: photo: "/prithish.jpg"
   * While empty, an elegant reserved frame is shown. No placeholder person is ever used.
   */
  photo: "./Mine.jpg",
  photoAlt: "Portrait of Prithish Raj",
  /**
   * CONTACT FORM — submissions are sent to your email through FormSubmit (formsubmit.co).
   * The first submission triggers a one-time activation email to the address above.
   * If the service is unreachable, the form falls back to opening your mail app.
   */
  formEndpoint: "https://formsubmit.co/ajax/prithish483@gmail.com",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const aboutParagraphs = [
  "I am currently pursuing my final year of Bachelor of Arts in English at Voorhees College, affiliated with Thiruvalluvar University.",
  "Alongside my academic education, I have developed a strong interest in Artificial Intelligence, Machine Learning, and Data Science through professional technical learning programs.",
  "I enjoy exploring emerging AI technologies, keeping myself updated with new AI models, experimenting with different development tools, and solving problems through technology.",
  "I am particularly interested in understanding how AI can be applied to practical situations rather than limiting myself to theoretical learning.",
];

export const aboutPullQuote = "I believe technology becomes meaningful when we use it to solve actual problems.";

export const aboutPrograms = [
  {
    status: "Completed",
    text: "Professional Certification Program in Software Development Engineering with Specialization in Data Science — Intellipaat",
  },
  {
    status: "Ongoing",
    text: "Professional Certification Program in AI & Data Science in collaboration with IIT Roorkee — Intellipaat",
  },
];

export const aboutGoal =
  "My goal is to grow as an AI/ML professional, develop meaningful solutions, and continuously improve my technical capabilities.";

export const characteristics = [
  "Curious about emerging technologies",
  "Passionate about AI and Machine Learning",
  "Interested in practical problem-solving",
  "Continuously exploring new AI models and tools",
  "Comfortable with AI-assisted development workflows",
  "Interested in building meaningful solutions",
];

/* ───────────── Areas of interest & capabilities ───────────── */
export const capabilities = [
  {
    id: "ai-ml",
    index: "01",
    title: "Artificial Intelligence & Machine Learning",
    short: "AI / ML",
    summary: "Understanding how models learn, behave, and where they can be put to practical use.",
    points: [
      "Exploring machine learning concepts",
      "Understanding model behavior",
      "Linear and logistic regression",
      "AI model experimentation",
      "AI-powered application development",
    ],
  },
  {
    id: "data-science",
    index: "02",
    title: "Data Science",
    short: "Data",
    summary: "Turning structured data into questions, visuals and insight.",
    points: [
      "Data analysis and exploration",
      "Statistical foundations",
      "Data visualization",
      "Working with structured datasets",
      "Extracting meaningful insights",
    ],
  },
  {
    id: "python",
    index: "03",
    title: "Python Development",
    short: "Python",
    summary: "The language I think in when a problem needs logic, data or an API.",
    points: [
      "Python programming foundations",
      "Application logic",
      "Backend experimentation",
      "AI API integrations",
      "Problem-solving through programming",
    ],
  },
  {
    id: "ai-assisted",
    index: "04",
    title: "AI-Assisted Development",
    short: "AI-assisted",
    summary: "Working with AI as a development partner — directing it, checking it, and shipping with it.",
    points: [
      "AI-assisted coding and development",
      "Prompt engineering",
      "Working with multiple AI models",
      "AI-powered research and problem-solving",
      "Building applications using AI APIs",
      "Development tools such as Google Antigravity and OpenAI Codex",
    ],
  },
];

/* ───────────── Skills ───────────── */
export type LevelId = "studied" | "practiced" | "ai-assisted" | "learning";

export const levels: { id: LevelId; label: string; note: string }[] = [
  { id: "studied", label: "Studied & Familiar With", note: "Concepts I have studied and understand." },
  { id: "practiced", label: "Practiced & Explored", note: "Used hands-on in exercises and experiments." },
  { id: "ai-assisted", label: "AI-Assisted Development Experience", note: "Built with using AI-assisted workflows." },
  { id: "learning", label: "Currently Learning", note: "Actively being studied right now." },
];

export const skillGroups: { title: string; blurb: string; skills: { name: string; level: LevelId }[] }[] = [
  {
    title: "Programming & Data Foundations",
    blurb: "The groundwork everything else stands on.",
    skills: [
      { name: "Python", level: "practiced" },
      { name: "SQL", level: "studied" },
      { name: "Statistics", level: "studied" },
      { name: "Linear Algebra", level: "studied" },
    ],
  },
  {
    title: "Data Science & Machine Learning",
    blurb: "Analysis, visualisation and first models.",
    skills: [
      { name: "NumPy", level: "practiced" },
      { name: "Pandas", level: "practiced" },
      { name: "Matplotlib", level: "practiced" },
      { name: "Seaborn", level: "practiced" },
      { name: "Scikit-learn", level: "learning" },
      { name: "Linear Regression", level: "practiced" },
      { name: "Logistic Regression", level: "learning" },
    ],
  },
  {
    title: "AI & Development Tools",
    blurb: "The tools I research, prototype and build with.",
    skills: [
      { name: "ChatGPT", level: "practiced" },
      { name: "Claude", level: "practiced" },
      { name: "Gemini", level: "practiced" },
      { name: "Google Antigravity", level: "ai-assisted" },
      { name: "OpenAI Codex", level: "ai-assisted" },
      { name: "AI APIs", level: "ai-assisted" },
      { name: "Prompt Engineering", level: "practiced" },
      { name: "Git", level: "practiced" },
      { name: "GitHub", level: "practiced" },
    ],
  },
  {
    title: "AI-Assisted Web Development",
    blurb: "Web apps built through AI-assisted workflows — not claimed as independently mastered.",
    skills: [
      { name: "React", level: "ai-assisted" },
      { name: "Next.js", level: "ai-assisted" },
    ],
  },
];

/* ───────────── AI exploration ───────────── */
export const aiTools = [
  {
    name: "ChatGPT",
    role: "Research & reasoning partner",
    text: "Used for explaining unfamiliar concepts, comparing approaches, drafting and refining prompts, and talking through bugs.",
  },
  {
    name: "Claude",
    role: "Long-form thinking & code review",
    text: "Used for reading through longer problems, reviewing logic, structuring technical writing and iterating on solutions.",
  },
  {
    name: "Gemini",
    role: "Multimodal & cloud AI experiments",
    text: "Used for experimenting with different model behaviours, including image-aware tasks and cloud AI API workflows.",
  },
  {
    name: "Google Antigravity",
    role: "AI-assisted development environment",
    text: "Used as an AI-assisted development tool for building and iterating on application ideas quickly.",
  },
  {
    name: "OpenAI Codex",
    role: "AI coding assistant",
    text: "Used to accelerate implementation, explore code structure and work through development tasks with AI support.",
  },
];

export const explorationHabits = [
  "Following new AI models and emerging technologies",
  "Comparing multiple LLM platforms on the same problem",
  "Testing AI-assisted development tools",
  "Refining prompt engineering techniques",
  "Experimenting with AI APIs and application integrations",
  "Looking for new approaches to technical problem-solving",
];

/* ───────────── Projects ───────────── */
export const projects = [
  {
    slug: "bfx-vesper",
    index: "01",
    name: "BFX Vesper",
    category: "AI for Digital Safety & Online Scam Detection",
    badge: "First Place — VIT Vellore Hackathon",
    role: "Project Lead & Primary Developer",
    repo: "https://github.com/Ligors/BFX-Vesper",
    tagline: "Not just “scam”. An explanation, a risk score, and what to do next.",
    overview: [
      "BFX Vesper is an AI-powered digital safety and scam detection solution designed to help users identify suspicious messages, potential online fraud, and fake payment evidence.",
      "Instead of simply identifying something as a scam, the application aims to explain why something appears suspicious, provide a risk score between 0 and 100, and recommend appropriate precautions.",
      "The objective is to make digital safety more understandable and accessible to different categories of users.",
    ],
    features: [
      "Suspicious SMS analysis",
      "OTP-related scam detection",
      "Fake payment screenshot analysis",
      "AI-powered risk assessment",
      "Explainable scam detection",
      "Risk scores from 0 to 100",
      "Recommended safety precautions",
      "Flexible cloud AI API integration",
      "Configurable AI API keys",
      "Offline model experimentation, including Gemma models",
      "Telegram-based guardian notifications",
      "Android application optimized to approximately 11 MB",
    ],
    tech: ["Python", "Cloud AI APIs", "Gemma (offline experiments)", "Prompt Engineering", "Android", "Telegram API"],
    stats: [
      { label: "Team", value: "2 members" },
      { label: "Evaluation", value: "Top 10 of ~50 teams" },
      { label: "Result", value: "First Place" },
      { label: "Android app", value: "~11 MB" },
    ],
    contributions: [
      "Project idea and research",
      "Problem identification",
      "Keypad-phone AI concept and architecture",
      "AI model selection and integration",
      "Prompt engineering and AI logic",
      "Python/backend development",
      "Android application development",
      "Telegram API integration",
      "Frontend/UI development",
      "Debugging and testing",
      "Final project integration",
    ],
    teammate: "Jagan contributed to presentation preparation and testing.",
    team: ["Prithish Raj", "Jagan"],
    story: [
      {
        kicker: "Chapter 01",
        title: "The problem",
        body: "Online fraud reaches people through ordinary, everyday channels — a text message asking for an OTP, a link that looks official, or a payment screenshot that was never real. For many users it is genuinely hard to tell the difference in the moment.",
      },
      {
        kicker: "Chapter 02",
        title: "Where the gap was",
        body: "We observed that a bare “scam / not scam” label does little for someone who doesn't understand why. It doesn't build awareness, doesn't suggest what to do next, and it assumes the user owns a modern smartphone. We wanted detection that explains itself and reaches further.",
      },
      {
        kicker: "Chapter 03",
        title: "The proposed solution",
        body: "BFX Vesper analyses suspicious SMS messages, OTP-related requests and payment screenshots, then answers three things: a risk score from 0 to 100, a plain-language explanation of why it looks suspicious, and recommended precautions. A registered guardian can be alerted through Telegram.",
      },
      {
        kicker: "Chapter 04",
        title: "AI integration & architecture",
        body: "A Python backend orchestrates the AI logic through carefully engineered prompts. The system works with flexible cloud AI APIs and configurable API keys, and we experimented with offline Gemma models. An Android app (optimised to roughly 11 MB) is the user-facing client, with Telegram handling guardian notifications.",
      },
      {
        kicker: "Chapter 05",
        title: "Technical challenges",
        body: "Keeping the AI's output consistent — a score, an explanation and precautions every time — required careful prompt design. Supporting different AI providers and user-supplied keys meant the integration had to stay flexible, and keeping the Android build lightweight shaped what we shipped on-device.",
      },
      {
        kicker: "Chapter 06",
        title: "The Android limitation",
        body: "Our original plan was to monitor call audio automatically to catch scam calls as they happened. During development we discovered that Android restrictions made this approach technically unworkable. The idea we had built the project around could not ship as designed.",
        highlight: true,
      },
      {
        kicker: "Chapter 07",
        title: "The pivot: keypad-phone accessibility",
        body: "Rather than abandon the concept, we asked who gets left out of a smartphone-only solution. We reimagined it for people using simple keypad phones: they call a dedicated number, describe the situation by voice, and a cloud AI assistant explains the risks and precautions — while a guardian is warned via Telegram.",
        highlight: true,
      },
      {
        kicker: "Chapter 08",
        title: "The virtual demonstration",
        body: "The telephone-number integration was not deployed as a live service. Instead we built a virtual keypad-phone prototype that demonstrates exactly how the workflow would feel for a real user — honest about its scope, and clear enough for evaluators to experience the idea.",
      },
      {
        kicker: "Chapter 09",
        title: "Presentation & evaluation",
        body: "In the first evaluation, BFX Vesper was selected among the Top 10 teams out of approximately 50 participating teams. We then presented the complete solution, including the keypad-phone concept and the story of how we adapted when our first approach hit a wall.",
      },
      {
        kicker: "Chapter 10",
        title: "First place",
        body: "BFX Vesper won First Place at the VIT Vellore Hackathon in the AI for Digital Safety and Online Scam Detection track.",
      },
    ],
    workflow: [
      { title: "Call", text: "A user calls a dedicated telephone number from any keypad phone." },
      { title: "Speak", text: "They describe the suspicious situation using their voice." },
      { title: "Analyse", text: "A cloud-based AI assistant analyses the information." },
      { title: "Explain", text: "The assistant explains potential risks and recommended precautions." },
      { title: "Alert", text: "A registered guardian can receive relevant warnings through Telegram." },
    ],
    note: "The telephone-number integration was not deployed as a live service. The keypad-phone workflow was demonstrated through a virtual prototype. No accuracy benchmarks or usage figures are claimed.",
  },
];

/* Reserved slots — only rendered as "coming" placeholders, never as fake work */
export const upcomingSlots = [
  { label: "Python project", hint: "Reserved" },
  { label: "Data Science / ML project", hint: "Reserved" },
  { label: "AI-powered application", hint: "Reserved" },
];

/* ───────────── Achievements ───────────── */
export const achievements = [
  {
    title: "First Place",
    event: "VIT Vellore Hackathon",
    track: "AI for Digital Safety and Online Scam Detection",
    project: "BFX Vesper",
    teamSize: "2 members",
    team: "Prithish Raj & Jagan",
    role: "Project Lead & Primary Developer",
    funnel: [
      { label: "Participating teams", value: "~50" },
      { label: "First evaluation — Top 10", value: "10" },
      { label: "Final result", value: "1st" },
    ],
    certificate: "https://drive.google.com/file/d/1PpISCaNDByEeN8e636XIkTWaF91oiH-3/view?usp=sharing",
  },
];

/* ───────────── Education ───────────── */
export const degree = {
  title: "Bachelor of Arts in English",
  institution: "Voorhees College",
  university: "Thiruvalluvar University",
  location: "Vellore, Tamil Nadu",
  status: "Currently pursuing — Final Year (3rd Year)",
};

export const programs = [
  {
    status: "completed" as const,
    title: "Professional Certification Program in Software Development Engineering with Specialization in Data Science",
    institution: "Intellipaat",
    detail: "Completed",
    link: "https://tih.iitr.ac.in/certificate/intellipaat/IPTIH25121787.jpg",
  },
  {
    status: "ongoing" as const,
    title: "Professional Certification Program in AI & Data Science in collaboration with IIT Roorkee",
    institution: "Intellipaat",
    detail: "Ongoing",
    note: "A professional certification program offered by Intellipaat in collaboration with IIT Roorkee.",
    link: "",
  },
];

/* ───────────── Certifications ───────────── */
export const certifications = [
  {
    title: "Software Development Engineering with Specialization in Data Science",
    issuer: "Intellipaat",
    kind: "Professional Program",
    status: "completed" as const,
    link: "https://tih.iitr.ac.in/certificate/intellipaat/IPTIH25121787.jpg",
    preview: "https://tih.iitr.ac.in/certificate/intellipaat/IPTIH25121787.jpg",
  },
  {
    title: "AI & Data Science (with IIT Roorkee)",
    issuer: "Intellipaat",
    kind: "Professional Program",
    status: "ongoing" as const,
    link: "",
    preview: "",
  },
  {
    title: "Machine Learning",
    issuer: "IBM / Coursera",
    kind: "Certificate",
    status: "completed" as const,
    link: "https://drive.google.com/file/d/1-zkxGvNXXylrcffyPW71stwv-uphx3HD/view?usp=sharing",
    preview: "",
  },
  {
    title: "Power BI",
    issuer: "Intellipaat",
    kind: "Certificate",
    status: "completed" as const,
    link: "https://lms.intellipaat.com/certificate-link/?Yz1jdXMtOTEzNDIxJnU9MjczNDU1JmV4dD0x",
    preview: "",
  },
  {
    title: "AI Chat Prompts for Business Analysis",
    issuer: "LinkedIn",
    kind: "Certificate",
    status: "completed" as const,
    link: "https://drive.google.com/file/d/10fubAHchEUqRcQqqzWyGCMgdLyLCinaE/view?usp=sharing",
    preview: "",
  },
];

/* ───────────── Journey ───────────── */
export const timeline = [
  {
    kind: "Academic",
    title: "B.A. English — Voorhees College",
    text: "Pursuing a Bachelor of Arts in English at Voorhees College (Thiruvalluvar University), now in the final year.",
    status: "Ongoing",
  },
  {
    kind: "Learning",
    title: "Software Development Engineering with Data Science",
    text: "Completed the professional certification program from Intellipaat — the start of a serious move into Python, data and ML.",
    status: "Completed",
  },
  {
    kind: "Learning",
    title: "AI & Data Science with IIT Roorkee",
    text: "Pursuing the Intellipaat professional certification program in AI & Data Science, offered in collaboration with IIT Roorkee.",
    status: "Ongoing",
  },
  {
    kind: "Build",
    title: "BFX Vesper",
    text: "Led and developed an AI-powered scam detection solution — and redesigned it as a keypad-phone concept after hitting Android's call-audio limits.",
    status: "Built",
  },
  {
    kind: "Hackathon",
    title: "VIT Vellore Hackathon — Top 10",
    text: "Selected among the Top 10 teams out of approximately 50 participating teams in the first evaluation.",
    status: "Selected",
  },
  {
    kind: "Achievement",
    title: "First Place — VIT Vellore Hackathon",
    text: "Won First Place in the AI for Digital Safety and Online Scam Detection track.",
    status: "Won",
  },
  {
    kind: "Continuous",
    title: "Ongoing AI/ML learning & experimentation",
    text: "Exploring new models, AI-assisted development tools and practical applications of Machine Learning and Data Science.",
    status: "Now",
  },
];

export type Project = (typeof projects)[number];
