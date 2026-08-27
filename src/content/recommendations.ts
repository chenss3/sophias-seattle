import type { Recommendation } from "@/domain/recommendations/recommendation";

/**
 * Sophia's curated Seattle recommendations.
 *
 * This is editorial source data, not generated or aggregated content. Every
 * entry is written by Sophia and reviewed through a pull request.
 *
 * `satisfies` type-checks each entry against the domain contract while
 * `as const` preserves literal types for later use.
 *
 * File order carries editorial intent; there is no sort order in the domain
 * layer yet.
 *
 * See docs/content-model.md for the field contract.
 */
export const recommendations = [
  {
    slug: "kin-len-thai-night-bites",
    name: "Kin Len Thai Night Bites",
    kind: "restaurant",
    area: "Fremont",
    summary:
      "Lively Fremont Thai spot with street-food-inspired dishes and craft cocktails. Good for a fun dinner where you want both great food and drinks. Their official menu has a dedicated vegan menu, lunch menu, and happy hour menu.",
    why: "I came here my first week in Seattle, and years later I still love it. The battered chicken red curry is sooo good, and you get SO much meat. The portions are really solid for the price. The papaya salad is super bright and vibrant, and the khao soi is really good too; I love the crispy noodle topping. Their vegan menu is also worth highlighting because it's actually thorough and has a bunch of the classic dishes, just veganfied.",
    tags: [
      "date-night",
      "group-friendly",
      "cocktails",
      "happy-hour",
      "vegan-friendly",
    ],
    notes:
      "It can get busy and there may be a wait, especially at peak times. They currently have daily happy hour from 3–6 PM and 9–10 PM.",
    provenance: "sophia-curated",
  },
  {
    slug: "kobuta-and-ookami",
    name: "Kobuta and Ookami",
    kind: "restaurant",
    area: "Capitol Hill",
    summary:
      "Japanese katsu and sake house specializing in huge, crispy cutlets with a ton of different preparations — classic katsu, curry, nabe, miso, cheese, tomato and more.",
    why: "Apparently some of the best katsu ever, even according to my Japanese friends. My favorite is the tomato and cheese with the tomato miso sauce, it's like a pasta dream. The cutlet is so juicy and fried so well without being too oily, and they're HUGE. Honestly all the variations are good: cheese katsu, katsudon, katsu curry, katsu nabe.",
    tags: ["worth-the-wait", "date-night"],
    notes:
      "The wait can get LONG on the weekends. I once waited an hour on Saturday while dining alone. Reservations are only available for parties of 6+, and they have another location in Redmond. The Seattle restaurant is also currently dine-in only.",
    provenance: "sophia-curated",
  },
  {
    slug: "sizzle-and-crunch-slu",
    name: "Sizzle&Crunch SLU",
    kind: "restaurant",
    area: "South Lake Union",
    summary:
      "Basically Vietnamese Chipotle: a fast-casual, build-your-own spot for rice, vermicelli, or salad bowls with Vietnamese-style grilled meats, veggies, toppings, and sauces. It's casual, customizable, filling, and open late for a quick meal.",
    why: "ALL THEIR MEATS R SO JUICY. The chicken is not dry at all. It's so juicy. The pork belly is so good too, and they give fat portions. Each bowl is ~15 dollars and can easily be two meals, depending on how hungry you are. I love that it's build-your-own and super customizable, and it still feels pretty healthy because it's basically meat, veggies, and some rice. The Vietnamese flavors are so good, and the green sauce is SO good. I need extra green sauce on the side every time. It's also great with a big group because they have that really long table people can post up at, plus indoor and outdoor seating.",
    tags: [
      "casual",
      "budget-friendly",
      "group-friendly",
      "customizable",
      "quick-meal",
    ],
    notes:
      "I'd avoid weekday lunch if you can because it gets slammed with the SLU office crowd, so the line can get long, and in my experience portions can be more hit-or-miss when they're busy. They're open until 10:30 PM daily (hey that's good for a sleeps-early city like Seattle).",
    provenance: "sophia-curated",
  },
  {
    slug: "aroy-mak-thai-food",
    name: "Aroy Mak Thai Food",
    kind: "restaurant",
    area: "Bitter Lake",
    summary:
      "Low-key Thai spot near Bitter Lake with a broader Thai menu, but I mainly send people here for the khao man gai and gai tod. Their official menu specifically highlights Hainan chicken, fried chicken, and grilled chicken rice dishes.",
    why: "BEST CUSTOMER SERVICE EVER. The lady noticed my friend cutting the chicken skin off because he was in cutting szn lol, and the next time he came in (he goes a lot) she literally cut it off for him. She always gives me extra sauce to take home with my leftovers and an extra tub of soup, every single time I come in. Also, the khao man gai is SO good, and the sauce that comes with the gai tod is sooooo good. Very decent portions for the price.",
    tags: ["worth-the-wait", "great-service", "hidden-gem"],
    notes: "Be prepared for a line/wait. They're currently closed Mondays.",
    provenance: "sophia-curated",
  },
  {
    slug: "the-flour-box",
    name: "The Flour Box",
    kind: "bakery",
    area: "Hillman City",
    summary:
      "Small bakery specializing in handmade, from-scratch filled brioche donuts with really creative sweet and savory flavors that rotate every few weeks.",
    why: "Delicious filled brioche donuts with such creative flavors. They've done hojicha, cannoli cream, tiramisu, everything bagel, and so many other fun ones. My favorites are honestly the savory ones, especially when they have whipped cream cheese inside. It reminds me of a bagel and I LOVE bagels. You can also really tell how much they care about quality. Sometimes they literally won't open if that morning's batch didn't turn out well enough.",
    tags: ["worth-the-wait", "unique-flavors"],
    notes:
      "There will be the longest wait of your life lol. They're open Thursday through Sunday starting at 10 AM and sell donuts until they sell out, which is usually around 12:30 PM. The flavors rotate about every 2 to 3 weeks, with four at a time. If you want the best chance at getting every flavor (or any donut at all, because they sell fast), I'd be there around opening. I've gone five times and have basically always waited an hour. Follow their Instagram or check their current menu before going. If you're on a tight schedule, honestly maybe skip this one because the activation energy of getting there and waiting is definitely a thing.",
    provenance: "sophia-curated",
  },
  {
    slug: "molly-moons-homemade-ice-cream",
    name: "Molly Moon's Homemade Ice Cream",
    kind: "dessert",
    area: "Capitol Hill",
    summary:
      "Seattle ice cream shop with classic flavors plus four rotating seasonal flavors that are creative without getting too weird.",
    why: "It's kind of like Salt & Straw, except I hate Salt & Straw's flavors lol. Maybe my palate isn't refined enough, but I don't want blueberry pie and foraged mushroom ice cream or ice cream with crickets and spiders in it for texture. Molly Moon's also does rotating flavors, but they're much more my speed. Think Peaches and Cream, S'mores, Blueberry Cobbler, stuff like that. They also have hard shell toppings and I LOVE the hard shell. They always have chocolate, and sometimes they'll do a limited seasonal one. I've had a matcha hard shell before and it was so delicious.",
    tags: ["sweet-treat"],
    notes:
      "There are locations all over the Seattle area, so you don't need to specifically go to Capitol Hill. There's Wallingford, Capitol Hill, Queen Anne, Columbia City, Bellevue, Waterfront, and a bunch more. The Waterfront one is especially nice if you're already doing the waterfront/Pike Place area.",
    provenance: "sophia-curated",
  },
  {
    slug: "hellenika-cultured-creamery",
    name: "Hellenika Cultured Creamery",
    kind: "dessert",
    area: "Pike Place",
    summary:
      "Cultured creamery inside Pike Place Market serving thick, creamy, tangy frozen dairy in classic and rotating seasonal flavors.",
    why: "My FAVORITE spot in Pike Place of all time. It's so delicious. I live close to Pike Place and I genuinely come here all the time just to get this dessert. It somehow tastes super light but also so creamy. People love the ube, but I love the chocolate. They rotate flavors too, and they've done stuff like mango, calamansi, and Tim Tam during FIFA when Australia played here. If you love soft serve, you will love this.",
    tags: ["sweet-treat", "unique-seattle"],
    notes:
      "There will basically always be a line, but honestly it's usually not too bad, especially by Pike Place standards. It does close pretty early, like a lot of places in the Market, so don't save it for a late-night dessert. The Pike Place shop currently closes at 6 PM Sunday through Thursday and 7 PM Friday and Saturday.",
    provenance: "sophia-curated",
  },
] as const satisfies readonly Recommendation[];
