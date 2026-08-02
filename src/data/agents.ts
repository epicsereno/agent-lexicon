export type Position =
  | "Frontend"
  | "Backend"
  | "Fullstack"
  | "Design"
  | "DevOps"
  | "Security"
  | "Data"
  | "QA"
  | "Platform"
  | "Mobile";

export type Clearance = "S" | "A" | "B" | "C";

export type Agent = {
  id: string;
  codename: string;
  callsign: string;
  position: Position;
  specialty: string;
  clearance: Clearance;
  status: "Active" | "Field" | "Standby" | "Blacksite";
  stack: string[];
  traits: string[];
  quote: string;
  dossier: string;
  ops: string[];
  years: number;
  monogram: string;
  accent: "steel" | "ember" | "moss" | "ink" | "frost";
};

export const POSITIONS: Position[] = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Design",
  "DevOps",
  "Security",
  "Data",
  "QA",
  "Platform",
  "Mobile",
];

export const CLEARANCE_LABEL: Record<Clearance, string> = {
  S: "Spectral — black ops only",
  A: "Alpha — full stack access",
  B: "Bravo — standard field",
  C: "Charlie — supervised",
};

export const AGENTS: Agent[] = [
  {
    id: "iron-man",
    codename: "Iron Man",
    callsign: "STARK-1",
    position: "Platform",
    specialty: "Hardware-software fusion & product theater",
    clearance: "S",
    status: "Active",
    stack: ["Edge", "WebGL", "Systems", "Prototypes", "Design Eng"],
    traits: ["Visionary showman", "Ships under fire", "Arc-reactor polish"],
    quote: "Sometimes you gotta run before you can walk — then ship v2 in the cave.",
    dossier:
      "Platform visionary who builds the suit and the demo. Turns moonshot ideas into working hardware-adjacent software before the board finishes questioning the budget. Owns high-stakes product surfaces where performance, spectacle, and reliability all have to land on stage.",
    ops: [
      "Prototype platform capabilities that feel like magic",
      "Own demo-critical surfaces under impossible deadlines",
      "Bridge design, hardware, and runtime into one suit",
    ],
    years: 16,
    monogram: "IM",
    accent: "ember",
  },
  {
    id: "r2d2",
    codename: "R2-D2",
    callsign: "ASTROMECH",
    position: "DevOps",
    specialty: "Mission-critical automation & recovery droids",
    clearance: "S",
    status: "Field",
    stack: ["CI/CD", "Shell", "Observability", "Rollback", "Edge"],
    traits: ["Beeps, then fixes", "Loyal under fire", "Saves the run"],
    quote: "*whistle* — pipeline green. You're welcome.",
    dossier:
      "Astromech of the shipping lane. Speaks mostly in logs and status LEDs, but every deploy that survives hyperspace has R2 on the board. Specializes in recovery when humans freeze: restore from backup, patch the hull, and get the mission moving before the empire notices.",
    ops: [
      "Automate deploy, rollback, and secret rotation",
      "Recover failed missions from partial state",
      "Keep CI honest when the rest of the crew panics",
    ],
    years: 40,
    monogram: "R2",
    accent: "steel",
  },
  {
    id: "neo",
    codename: "Neo",
    callsign: "MATRIX-0",
    position: "Fullstack",
    specialty: "Seeing the code behind the UI — Matrix operator",
    clearance: "S",
    status: "Field",
    stack: ["TypeScript", "TanStack", "Postgres", "Vite", "Zod"],
    traits: ["Reads the matrix", "Bullet-time debug", "Chosen path owner"],
    quote: "There is no page refresh. Only the matrix.",
    dossier:
      "The One of full-stack delivery. Sees routes, state, and queries as green rain — then rewrites reality without a full reload. Preferred when product says the impossible is due Friday and the old stack is a simulation you can still escape.",
    ops: [
      "Own vertical slices from UI to migration",
      "Bend hydration and cache rules without breaking the illusion",
      "Debug production with bullet-time calm",
    ],
    years: 11,
    monogram: "NE",
    accent: "frost",
  },
  {
    id: "joker",
    codename: "The Joker",
    callsign: "CHAOS-7",
    position: "Frontend",
    specialty: "UI chaos engineering & interaction prototypes",
    clearance: "S",
    status: "Active",
    stack: ["React", "CSS", "Motion", "Figma", "Storybook"],
    traits: ["Unpredictable polish", "Pixel mischief", "Delight-first"],
    quote: "Why so serious about the button radius?",
    dossier:
      "Frontline interface operative. Turns brittle layouts into living surfaces. Specializes in micro-interactions that feel illegal but ship clean. Known for rewriting a design system overnight and making it funnier without breaking a11y.",
    ops: [
      "Ship zero-layout-shift hero systems",
      "Prototype high-risk UI paths before product asks",
      "Stress-test design tokens under real content chaos",
    ],
    years: 9,
    monogram: "JK",
    accent: "ember",
  },
  {
    id: "vader",
    codename: "Vader",
    callsign: "FORCE-1",
    position: "Backend",
    specialty: "Systems architecture & service enforcement",
    clearance: "S",
    status: "Active",
    stack: ["Node", "Postgres", "Redis", "gRPC", "Kubernetes"],
    traits: ["Ruthless correctness", "Iron contracts", "Quiet power"],
    quote: "I find your N+1 query disturbing.",
    dossier:
      "Command authority over service boundaries. Owns latency budgets, schema discipline, and the dark art of making distributed systems look simple. If an API violates the contract, the PR does not leave the hangar.",
    ops: [
      "Author service SLAs and kill switches",
      "Enforce transactional integrity under load",
      "Refactor monoliths without civilian casualties",
    ],
    years: 14,
    monogram: "VD",
    accent: "ink",
  },
  {
    id: "ghost",
    codename: "Ghost",
    callsign: "SPECTER",
    position: "Security",
    specialty: "Threat modeling & stealth red-team ops",
    clearance: "S",
    status: "Blacksite",
    stack: ["OWASP", "Auth", "CSP", "Burp", "SIEM"],
    traits: ["Invisible until needed", "Paranoid by design", "Zero trust"],
    quote: "If you can see me, the perimeter already failed.",
    dossier:
      "Moves through auth graphs and trust boundaries without leaving fingerprints. Converts threat models into concrete guardrails. Preferred for anything that touches sessions, secrets, or other people's money.",
    ops: [
      "Hardening auth and session surfaces",
      "Pre-ship pen tests on critical flows",
      "Incident response with quiet precision",
    ],
    years: 12,
    monogram: "GH",
    accent: "ink",
  },
  {
    id: "oracle",
    codename: "Oracle",
    callsign: "SIGHT-9",
    position: "Data",
    specialty: "Analytics prophecy & metric truth",
    clearance: "A",
    status: "Active",
    stack: ["SQL", "dbt", "Python", "Warehouse", "Recharts"],
    traits: ["Sees patterns early", "Metric honesty", "Narrative clarity"],
    quote: "The data already told me what product will deny.",
    dossier:
      "Turns noisy event streams into decisions. Protects metric definitions like sacred texts. When product argues with numbers, Oracle brings the source of truth and a calm chart.",
    ops: [
      "Define north-star metrics that survive debate",
      "Build pipelines that don't lie on Mondays",
      "Surface anomalies before the board meeting",
    ],
    years: 10,
    monogram: "OR",
    accent: "frost",
  },
  {
    id: "wire",
    codename: "Wire",
    callsign: "GRID-4",
    position: "DevOps",
    specialty: "CI/CD circuitry & runtime resilience",
    clearance: "A",
    status: "Active",
    stack: ["GitHub Actions", "Docker", "Terraform", "Observability", "CDN"],
    traits: ["Always online", "Pipeline poet", "Blast-radius aware"],
    quote: "If it isn't automated, it isn't done.",
    dossier:
      "Owns the path from commit to cold-start. Makes deploys boring on purpose. When the pager fires at 03:00, Wire already has a runbook, a rollback, and a slightly disappointed tone.",
    ops: [
      "Design zero-drama deploy pipelines",
      "Instrument the stack for real signal",
      "Keep preview and prod twins honest",
    ],
    years: 13,
    monogram: "WR",
    accent: "steel",
  },
  {
    id: "muse",
    codename: "Muse",
    callsign: "FORM-2",
    position: "Design",
    specialty: "Systems of taste & product gravity",
    clearance: "A",
    status: "Active",
    stack: ["Figma", "Tokens", "Type", "Motion", "Research"],
    traits: ["Restraint as power", "Hierarchy instinct", "Anti-slop"],
    quote: "If everything is accent, nothing is.",
    dossier:
      "Design systems operative. Builds visual language that engineers can ship without weekly reinterpretation. Hates decorative chaos; loves concentric radii and quiet confidence.",
    ops: [
      "Author token systems that survive scaling",
      "Cut AI-slop before it reaches production",
      "Pair with frontend on interaction fidelity",
    ],
    years: 8,
    monogram: "MU",
    accent: "moss",
  },
  {
    id: "cipher",
    codename: "Cipher",
    callsign: "HEX-13",
    position: "Backend",
    specialty: "API contracts & integration decoding",
    clearance: "B",
    status: "Field",
    stack: ["OpenAPI", "GraphQL", "Webhooks", "Zod", "Queues"],
    traits: ["Contract maximalist", "Edge-case bloodhound", "Patient decoder"],
    quote: "Undefined is not a type — it's a confession.",
    dossier:
      "Speaks fluent third-party. Turns messy partner APIs into typed, versioned contracts. The agent you call when the docs are wrong and the webhook arrives twice on Fridays.",
    ops: [
      "Normalize external chaos into internal types",
      "Design idempotent webhook receivers",
      "Version APIs without breaking the fleet",
    ],
    years: 7,
    monogram: "CP",
    accent: "steel",
  },
  {
    id: "pulse",
    codename: "Pulse",
    callsign: "PERF-3",
    position: "Frontend",
    specialty: "Runtime performance & frame budgets",
    clearance: "A",
    status: "Active",
    stack: ["Chrome DevTools", "Lighthouse", "Web Vitals", "Workers", "Canvas"],
    traits: ["Millisecond obsession", "Profiler whisperer", "Lean bundles"],
    quote: "Sixty frames or it didn't happen.",
    dossier:
      "Keeps interfaces smooth under real devices and real networks. Hunts jank, layout thrash, and accidental megabytes. If a route feels heavy, Pulse already has a flame chart open.",
    ops: [
      "Own Core Web Vitals for critical journeys",
      "Trim hydration and client waterfalls",
      "Make motion cheap and interruptible",
    ],
    years: 9,
    monogram: "PL",
    accent: "ember",
  },
  {
    id: "shadow",
    codename: "Shadow",
    callsign: "QA-0",
    position: "QA",
    specialty: "Stealth regression hunting",
    clearance: "B",
    status: "Standby",
    stack: ["Playwright", "Vitest", "A11y", "Fuzzing", "Traces"],
    traits: ["Finds the quiet bug", "Spec literalist", "User empathy"],
    quote: "It works on my machine is not a test plan.",
    dossier:
      "Breaks happy paths for a living. Builds harnesses that catch what demos hide. Shadow's reports are short, reproducible, and somehow always polite while being devastating.",
    ops: [
      "Author critical-path browser coverage",
      "Catch a11y and state bugs pre-merge",
      "Reproduce flaky nightmares with evidence",
    ],
    years: 8,
    monogram: "SH",
    accent: "ink",
  },
  {
    id: "forge",
    codename: "Forge",
    callsign: "ANVIL",
    position: "Platform",
    specialty: "Internal tools & developer leverage",
    clearance: "A",
    status: "Active",
    stack: ["DX", "CLIs", "Monorepos", "Scaffolding", "Docs"],
    traits: ["Force multiplier", "Opinionated defaults", "Craftsman"],
    quote: "If the team repeats it thrice, Forge automates it twice.",
    dossier:
      "Builds the tools other agents ship with. Owns scaffolds, generators, and the golden path. When onboarding takes days instead of hours, Forge rewrites the map.",
    ops: [
      "Design internal platforms that feel product-grade",
      "Cut build times and ceremony",
      "Codify best practices as defaults",
    ],
    years: 12,
    monogram: "FG",
    accent: "moss",
  },
  {
    id: "lumen",
    codename: "Lumen",
    callsign: "A11Y-1",
    position: "Frontend",
    specialty: "Accessibility & inclusive interfaces",
    clearance: "A",
    status: "Active",
    stack: ["ARIA", "Keyboard", "Contrast", "Screen readers", "Focus"],
    traits: ["Inclusive by default", "Focus-order obsessive", "Quiet advocate"],
    quote: "If it isn't keyboardable, it isn't shipped.",
    dossier:
      "Ensures every surface works for more people, not fewer. Partners with Muse on contrast and with Pulse on focus management. Makes compliance feel like craft, not a checklist dump.",
    ops: [
      "Audit critical flows with real AT",
      "Bake a11y into component primitives",
      "Train teams without shame theater",
    ],
    years: 7,
    monogram: "LM",
    accent: "frost",
  },
  {
    id: "raven",
    codename: "Raven",
    callsign: "MOB-5",
    position: "Mobile",
    specialty: "Touch-first product surfaces",
    clearance: "B",
    status: "Field",
    stack: ["React Native", "Swift", "Kotlin", "Gestures", "Offline"],
    traits: ["Thumb-zone thinker", "Offline-ready", "Battery conscious"],
    quote: "Desktop habits die on a 390-wide screen.",
    dossier:
      "Owns the pocket-sized battlefield. Translates web product intent into native-feel motion, offline grace, and honest empty states. Raven ships apps that feel inevitable on a bus ride.",
    ops: [
      "Ship touch-first navigation patterns",
      "Handle flaky networks without drama",
      "Keep cold starts under user patience",
    ],
    years: 6,
    monogram: "RV",
    accent: "steel",
  },
  {
    id: "yoda",
    codename: "Yoda",
    callsign: "ELDER",
    position: "Platform",
    specialty: "Architecture counsel & long-game craft",
    clearance: "S",
    status: "Standby",
    stack: ["Architecture", "Mentorship", "RFCs", "Tradeoffs", "Legacy"],
    traits: ["Patient wisdom", "Tradeoff clarity", "Legacy whisperer"],
    quote: "Ship, or ship not. There is no endless rewrite.",
    dossier:
      "The quiet elder of the lexicon. Speaks in RFCs and postmortems. Pulls teams out of rewrite death spirals with boring, correct advice that ages well under load.",
    ops: [
      "Chair hard architecture decisions",
      "Unstick rewrites with incremental paths",
      "Mentor agents without ego theater",
    ],
    years: 20,
    monogram: "YD",
    accent: "moss",
  },
  {
    id: "morpheus",
    codename: "Morpheus",
    callsign: "AWAKEN",
    position: "Fullstack",
    specialty: "Team enablement & technical awakening",
    clearance: "A",
    status: "Active",
    stack: ["Coaching", "System design", "TypeScript", "Product", "Reviews"],
    traits: ["Recruits talent", "Red-pill clarity", "Belief in craft"],
    quote: "I can only show you the door. You have to write the code.",
    dossier:
      "Operative who turns mid-level teams into autonomous units. Combines product sense with technical depth. When the org needs a path out of cargo-cult engineering, Morpheus offers two pills: status quo or craft.",
    ops: [
      "Run architecture reviews that teach",
      "Pair on ambiguous product bets",
      "Raise the floor of code quality org-wide",
    ],
    years: 15,
    monogram: "MP",
    accent: "frost",
  },
  {
    id: "trinity",
    codename: "Trinity",
    callsign: "STRIKE",
    position: "Fullstack",
    specialty: "High-stakes feature extraction",
    clearance: "A",
    status: "Field",
    stack: ["React", "Node", "Realtime", "Auth", "Edge"],
    traits: ["Precision striker", "No wasted motion", "Field-proven"],
    quote: "Dodge this — and the deadline.",
    dossier:
      "Extracts critical features under pressure. Combines frontend finesse with backend grit. When the demo is tomorrow and the bug is structural, Trinity lands the cut.",
    ops: [
      "Execute time-boxed vertical slices",
      "Stabilize realtime and auth edges",
      "Pair with Neo on impossible timelines",
    ],
    years: 10,
    monogram: "TR",
    accent: "ember",
  },
];

export function getAgent(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}

export function searchAgents(
  query: string,
  position: Position | "All",
  clearance: Clearance | "All",
): Agent[] {
  const q = query.trim().toLowerCase();
  return AGENTS.filter((a) => {
    if (position !== "All" && a.position !== position) return false;
    if (clearance !== "All" && a.clearance !== clearance) return false;
    if (!q) return true;
    const hay = [
      a.codename,
      a.callsign,
      a.position,
      a.specialty,
      a.quote,
      a.dossier,
      ...a.stack,
      ...a.traits,
      ...a.ops,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
