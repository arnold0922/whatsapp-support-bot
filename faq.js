// Knowledge base for Boucla Cafe, Subiaco.
// Each FAQ has keywords used for matching and a quick-reply label.
const BUSINESS = {
  name: "Boucla Cafe",
  agentName: "Maria",
};

const FAQS = [
  {
    id: "hours",
    label: "Opening hours",
    keywords: ["hour", "hours", "open", "opening", "close", "closing", "closed", "time", "today", "weekend", "saturday", "sunday", "holiday", "christmas"],
    answer:
      "Our opening hours:\n• Mon–Fri: 6:30 AM – 3:00 PM\n• Saturday: 7:00 AM – 3:00 PM\n• Sunday & public holidays: 8:00 AM – 1:00 PM\nWe're closed on Christmas Day and Boxing Day.",
  },
  {
    id: "cakes",
    label: "Cakes & pre-orders",
    keywords: ["cake", "slice", "birthday", "whole", "gluten", "apple", "sicilian", "pre-order", "preorder", "dessert", "sweet"],
    answer:
      "Our cakes are handmade and baked every morning. There are usually 4 kinds on display until they sell out.\n• Slice: $9.50\n• Whole cake: $90\n• Whole Apple Sicilian: $99 (not gluten-free)\n• Double-layer cake: $180\nTo pre-order a whole cake, email orders@boucla.com.au.",
  },
  {
    id: "menu",
    label: "Menu & prices",
    keywords: ["menu", "price", "prices", "cost", "food", "eat", "breakfast", "brunch", "lunch", "shakshuka", "kotopita", "pie", "eggs", "coffee", "vegetarian"],
    answer:
      "We serve Mediterranean-inspired breakfast and lunch. Some favourites:\n• Shakshuka – $22\n• Kotopita (Greek-style chicken pie) – $18\n• Turkish eggs and huevos rancheros\nThe full menu is on our website.",
  },
  {
    id: "location",
    label: "Location & seating",
    keywords: ["where", "address", "location", "located", "find", "directions", "parking", "park", "courtyard", "seat", "seating", "outdoor", "subiaco", "rokeby"],
    answer:
      "You'll find us at 349 Rokeby Road, Subiaco WA 6008. We have cosy indoor seating and a leafy courtyard out the back.",
  },
  {
    id: "contact",
    label: "Contact us",
    keywords: ["phone", "call", "number", "email", "contact", "book", "booking", "reservation", "reserve"],
    answer:
      "You can reach us at:\n• Phone: (08) 9381 2841\n• Email: orders@boucla.com.au (for cake pre-orders)",
  },
];

// Small talk the bot should answer politely instead of offering a handoff.
const GREETING_KEYWORDS = ["hi", "hello", "hey", "hiya", "morning", "afternoon", "evening", "yo", "sup"];
const THANKS_KEYWORDS = ["thanks", "thank", "thx", "ty", "cheers"];

// Phrases that mean the customer wants a person right away.
const HUMAN_KEYWORDS = ["human", "agent", "person", "staff", "manager", "someone", "real", "talk", "speak", "complaint"];
