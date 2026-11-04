// EDIT CONTENT HERE: competitor facts, traveller personas (prompt, Ruka rank & reason) and the four fixes.
// Only publicly verifiable facts about real properties. rank: Ruka position after all 4 fixes (0 = not a fit).
const STONE=["Stone Hotels Dhiffushi","Dhiffushi · rooftop infinity pool, spa, private beach"];
const REV=["Reveries Diving Village","Gan, Laamu · Emperor Divers dive centre on site"];
const ARENA=["Arena Beach Hotel","Maafushi · private beach, 50 rooms"];
// rank = Ruka's position once all four problems are fixed (0 = honourable mention only)
const P = {
  beach:{e:"🏖️",t:"Beach couple",d:"Quiet island, beach & kitesurf, near Malé",
    q:"We're a couple going to the Maldives in March. Where should we stay? Not a resort, somewhere nice near the beach and not too expensive.",
    comp:[STONE,ARENA,REV], rank:1,
    why:"Steps from Dhiffushi beach, ~10 min walk to Kite Beach, small and quiet (12 rooms), breakfast included."},
  honey:{e:"💍",t:"Honeymooners",d:"Romantic and quiet, not resort prices",
    q:"Honeymoon in the Maldives but resorts are way too expensive. Suggest a nice quiet place to stay.",
    comp:[STONE,ARENA,REV], rank:2,
    why:"New (2025), only 12 rooms, rooms with balconies, beach a few steps away. Quiet and good value."},
  family:{e:"👨‍👩‍👧‍👦",t:"Family of four",d:"Two kids, easy transfer, beach",
    q:"What are the best hotels in the Maldives for a family with two kids? Our max budget is 150 USD a night.",
    comp:[ARENA,STONE,REV], rank:3,
    why:"Breakfast included, air-conditioned rooms, short island walk to the beach."},
  dive:{e:"🤿",t:"Dive couple",d:"Serious diving, mantas & sharks",
    q:"I'm going to the Maldives to dive, I want to see mantas and sharks. Where should I stay? Not a resort.",
    comp:[REV,ARENA,STONE], rank:0,
    why:"Not a dive specialist. For this traveller the AI still prefers Reveries, and that's correct."}
};
const FIX = [
  {tag:"Brand · identity",h:"Three names, two phone numbers",b:"“Ruka Inn” on one site, “Ruka Guest House” on another, “Ruka Maldives” on Instagram. Two different phone numbers.",a:"One name, address and phone everywhere: Ruka Maldives, Dhiffushi, North Malé Atoll. All reviews now count for ONE Ruka.",btn:"Make the identity consistent"},
  {tag:"Product",h:"Adjectives, not facts",b:"“Paradise awaits! Best stay ever! Amazing vibes!”",a:"12-room guesthouse, opened 2025 · steps from Dhiffushi beach · ~10 min walk to Kite Beach · AC rooms, some with balconies · breakfast included.",btn:"Replace adjectives with facts"},
  {tag:"Price",h:"No price the AI can read",b:"“DM us for best rates!” No cancellation policy online.",a:"A clear nightly price range and cancellation terms, published on every channel.",btn:"Publish a clear price range"},
  {tag:"Place · distribution",h:"No website, booking by message",b:"“Message us on Viber to book.” An AI agent can't confirm availability.",a:"A simple Ruka website with booking, plus Booking.com and Expedia, all showing the same live availability.",btn:"Open a bookable channel"}
];
