// Knowledge base for "Brew & Bean Coffee".
// Each FAQ has keywords used for matching and a quick-reply label.
const BUSINESS = {
  name: "Brew & Bean Coffee",
  agentName: "Maria",
};

const FAQS = [
  {
    id: "hours",
    label: "Opening hours",
    keywords: ["hour", "hours", "open", "opening", "close", "closing", "time", "today", "weekend", "sunday"],
    answer:
      "We're open:\n• Mon–Fri: 7:00 AM – 8:00 PM\n• Sat–Sun: 8:00 AM – 6:00 PM\nHoliday hours are posted on our Instagram.",
  },
  {
    id: "menu",
    label: "Menu & prices",
    keywords: ["menu", "price", "prices", "cost", "latte", "coffee", "drink", "drinks", "pastry", "food", "espresso", "cappuccino"],
    answer:
      "Some favourites:\n• Espresso – $3.00\n• Cappuccino / Latte – $4.50\n• Cold brew – $4.75\n• Croissants & muffins – from $3.25\nWe have oat, almond and soy milk at no extra charge.",
  },
  {
    id: "delivery",
    label: "Delivery & pickup",
    keywords: ["delivery", "deliver", "pickup", "pick", "order", "online", "takeaway", "takeout", "uber", "app"],
    answer:
      "You can order ahead for pickup on our website, or get delivery through Uber Eats and DoorDash within 5 km. Pickup orders are usually ready in about 10 minutes.",
  },
  {
    id: "wifi",
    label: "Wi-Fi & seating",
    keywords: ["wifi", "wi-fi", "internet", "laptop", "work", "seat", "seating", "study", "plug", "outlet"],
    answer:
      "Yes! Free Wi-Fi is available. The password is on your receipt. We have 30 seats, with power outlets along the window bar.",
  },
  {
    id: "loyalty",
    label: "Loyalty card",
    keywords: ["loyalty", "reward", "rewards", "points", "stamp", "card", "free", "discount", "promo"],
    answer:
      "Get a stamp for every drink you buy. Your 10th drink is free! Ask the barista for a card or sign up in our app.",
  },
];

// Small talk the bot should answer politely instead of offering a handoff.
const GREETING_KEYWORDS = ["hi", "hello", "hey", "hiya", "morning", "afternoon", "evening", "yo", "sup"];
const THANKS_KEYWORDS = ["thanks", "thank", "thx", "ty", "cheers"];

// Phrases that mean the customer wants a person right away.
const HUMAN_KEYWORDS = ["human", "agent", "person", "staff", "manager", "someone", "real", "talk", "speak", "complaint"];
