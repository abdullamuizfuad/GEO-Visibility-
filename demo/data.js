// EDIT CONTENT HERE: all wording for the phone demo (a scripted simulation, not a live AI).
// Only verified facts about real properties (see CLAUDE.md). No prices, ratings, distances or scores.
const COPY = {
  title: "Ruka Visibility Lab",
  sub: "Unique Marketing Issues · class simulation",
  kicker: "Be the traveller",
  h1: "You're planning a Maldives trip.",
  intro: "Like more and more travellers, you ask an AI assistant to find you a place to stay. Who are you?",
  hint: "Each traveller is a different market segment.",
  label: "Simulated AI assistant",
  search: "Search",
  loading: "Reading listings, maps and reviews…",
  sourcesLabel: "Sources",
  stopH: "Watch the screen.",
  stopP: "Phones down for a moment. Your lecturer takes it from here.",
  again: "Search again",
  afterKicker: "After Ruka fixed four things",
  fixesLabel: "Fixes applied",
  restart: "Try another traveller",
  note: "Teaching simulation. Ruka Maldives (used with the owner's permission), Stone Hotels Dhiffushi, Reveries Diving Village and Arena Beach Hotel are real Maldivian properties, described only with publicly listed facts. The answers are scripted to show how AI shortlisting works, informed by Morand & Schegg (2026), Be Visible to AI, HES-SO Valais-Wallis."
};

// The four fixes Ruka applies between the two searches (shown as chips in the after state).
const FIXES = [
  { p: "Brand", t: "One name, one phone everywhere" },
  { p: "Product", t: "Facts, not adjectives" },
  { p: "Price", t: "A clear price range online" },
  { p: "Place", t: "Bookable online, not only by message" }
];

// Places the AI can shortlist. why = one-line reason; src = generic source chips (no logos).
const PLACES = {
  stone: { n: "Stone Hotels Dhiffushi", where: "Dhiffushi, North Malé Atoll",
    why: "Rooftop infinity pool, spa and a private beach.", src: ["Booking.com", "Google Maps", "reviews"] },
  arena: { n: "Arena Beach Hotel", where: "Maafushi, a local island near Malé",
    why: "Private beach; a larger hotel with 50 rooms.", src: ["Booking.com", "Tripadvisor", "reviews"] },
  rev: { n: "Reveries Diving Village", where: "Gan, Laamu Atoll",
    why: "Emperor Divers dive centre on site.", src: ["Google Maps", "Tripadvisor", "dive forums"] },
  ruka: { n: "Ruka Maldives", where: "Dhiffushi, North Malé Atoll", ruka: true,
    why: "", src: ["Instagram", "Booking.com", "Google Maps"] }
};

// Personas. before/after = place keys in shortlist order. rukaWhy = Ruka's one-line reason after the fixes.
const PERSONAS = [
  { id: "couple", e: "💍", t: "Couple / Honeymoon", d: "Romantic, cosy, not resort prices",
    q: "cute cosy guesthouse maldives for honeymoon not too expensive",
    zh: "马尔代夫 蜜月 温馨 民宿 不要太贵",
    lead: "For a cosy, good-value honeymoon, local islands near Malé are a good fit. Here are three options:",
    before: ["stone", "arena", "rev"], after: ["ruka", "stone", "arena"],
    rukaWhy: "Cosy 12-room boutique guesthouse with a boho, personal-island-villa feel, steps from the beach. Breakfast included, budget-friendly.",
    afterLead: "Updated: a new boutique guesthouse now matches “cosy” and “not too expensive” best." },
  { id: "solo", e: "🎒", t: "Solo traveller", d: "Quiet, simple, budget",
    q: "quiet guesthouse maldives solo trip budget",
    zh: "马尔代夫 一个人 安静 民宿 便宜",
    lead: "For a quiet solo trip on a budget, local-island stays are the usual choice. Three to consider:",
    before: ["stone", "arena", "rev"], after: ["stone", "ruka", "arena"],
    rukaWhy: "Small (12 rooms), budget-friendly serviced living with an open courtyard. Breakfast included.",
    afterLead: "Updated: a small, budget-friendly guesthouse now makes the shortlist." },
  { id: "family", e: "👨‍👩‍👧", t: "Family", d: "Kids, easy transfer, beach",
    q: "family friendly guesthouse near male cheap",
    zh: "马累附近 适合家庭 民宿 便宜",
    lead: "For families who want a short trip from Malé and a beach, these local-island options stand out:",
    before: ["arena", "stone", "rev"], after: ["arena", "stone", "ruka"],
    rukaWhy: "A/C rooms with private bathrooms, breakfast included, steps from the beach. Budget-friendly.",
    afterLead: "Updated: Ruka now appears as a budget-friendly option for families." },
  { id: "dive", e: "🤿", t: "Dive couple", d: "Diving first, everything else second",
    q: "best guesthouse for diving maldives",
    zh: "马尔代夫 潜水 最好的 民宿",
    lead: "If diving is the priority, stay where the dive centre is. Three picks:",
    before: ["rev", "arena", "stone"], after: ["rev", "arena", "stone"],
    rukaWhy: "",
    afterLead: "Ruka is now easy for the AI to read… and it still isn't the answer here.",
    lesson: "Ruka is a cosy beach guesthouse, not a dive specialist, so Reveries Diving Village still wins. Positioning means choosing the travellers you can win, not chasing every search." }
];
