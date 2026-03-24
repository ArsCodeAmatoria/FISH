export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  personalityTraits: string[];
  image: string;
  songIds: string[];
}

export const characters: Character[] = [
  // ── Main Characters ────────────────────────────────────────
  {
    id: "zuri",
    name: "Zuri",
    role: "Protagonist",
    description:
      "A sharp-witted 17-year-old who hears rhythm in everything. She grew up on the docks helping her father but secretly dreams of music like her late mother. Quietly kind — she catches a fallen mango, hums to soothe a fussy toddler, tells Ade 'I miss her too' — but sings only in private, terrified of performing. By the end she finds her voice, overcomes her fear of the water, and sings to save the river.",
    personalityTraits: ["Creative", "Observant", "Kind", "Shy then brave"],
    image: "/characters/zuri.png",
    songIds: ["fish", "fish-2", "going-up", "stars-over-the-block"],
  },
  {
    id: "ade",
    name: "Ade",
    role: "Zuri's Father",
    description:
      "A hardworking fisherman and Zuri's father — big, strong, and broad-shouldered, with a clean handsome Caribbean face. Disciplined, protective, and quietly grieving. He lost his wife Amara in a storm and has kept Zuri away from music. When she says 'I miss her too,' he answers 'I know.' By the end he tells her 'I'm with you. All the way' — and when she sings, he sees Amara. Love sometimes means letting go.",
    personalityTraits: ["Disciplined", "Protective", "Quietly tender", "Learning to let go"],
    image: "/characters/ade.png",
    songIds: [],
  },
  {
    id: "papa-louis",
    name: "Louis",
    role: "Elder Busker",
    description:
      "The Elder Busker of the Market Circle — a fixture of the town as much as the flame-tree or the lanterns. He plays with his granddaughter PG on ukulele. He hears harmony where others hear noise. He remembers when Zuri used to get up there with Marcus, before he left. He already knows what Zuri is before she does.",
    personalityTraits: ["Wise", "Playful", "Sees what others miss"],
    image: "/characters/louis2.png",
    songIds: ["louis"],
  },
  {
    id: "mama-sabine",
    name: "Mama Sabine",
    role: "Spiritual Guide",
    description:
      "Owner of a mysterious shop of candles, shells, and records. Wise, calm, and slightly mystical — she speaks in poetic metaphors and seems to know things before they happen. She knew Zuri's mother well and keeps recordings of her voice.",
    personalityTraits: ["Mysterious", "Cryptic", "Powerful", "Insightful"],
    image: "/characters/witchdoctor.png",
    songIds: ["echo-in-the-water"],
  },
  {
    id: "amara",
    name: "Amara",
    role: "Zuri's Late Mother",
    description:
      "Zuri's late mother — a beloved singer who believed music could unite people. She died in a storm years before the story begins, but her voice lives on in recordings, and every path Zuri takes leads back to her.",
    personalityTraits: ["Soulful", "Courageous", "Artistic"],
    image: "/characters/mother2.png",
    songIds: [],
  },

  // ── Animal Comedy Trio (Fish Thieves) ──────────────────────
  {
    id: "big-nay",
    name: "Big Nay",
    role: "Leader of the Fish Thieves",
    description:
      "A large pelican and self-declared philosopher of the market. He talks like a rapper and thinks like a preacher — theatrical, morally flexible, and completely convinced that stealing fish is not stealing, it is redistribution. He leads the gang with enormous confidence and zero planning. His manifesto has a beat.",
    personalityTraits: ["Theatrical", "Philosophical", "Absolutely certain he's right"],
    image: "/characters/captain.png",
    songIds: ["redistribution"],
  },
  {
    id: "pants",
    name: "Pants",
    role: "Reluctant Accomplice",
    description:
      "An extremely clean and organised cat forced into messy fish-stealing adventures. She constantly grooms herself and hates getting dirty — whenever Ripple splashes water on her she freezes in horror. Her dry sarcasm contrasts sharply with the others' chaos. By the end she quits the gang — 'Too much risk. And the drugs' — but stays close to Big Nay and Ripple. Still their friend.",
    personalityTraits: ["Sarcastic", "Perfectionist", "Dramatic", "Grounded"],
    image: "/characters/pants.png",
    songIds: ["redistribution", "glazed", "chaos", "pants-song"],
  },
  {
    id: "ripple",
    name: "Ripple",
    role: "Chaos Engine",
    description:
      "A sleek black river otter with a slightly bulldog-shaped head — compact, solid, and built like a small battering ram. He never speaks; he nods. That head is the source of most of the trio's structural damage. He loves water, gadgets, and pressing buttons he should not press. He bumps into things with cheerful, total commitment. Despite the chaos, his curiosity accidentally helps uncover the villain's scheme.",
    personalityTraits: ["Curious", "Chaotic", "Joyful"],
    image: "/characters/ripple.png",
    songIds: [],
  },

  // ── Marsh / River Creatures ────────────────────────────────
  {
    id: "gator",
    name: "Gator",
    role: "Marsh Gator",
    description:
      "An alligator with a smooth African accent. The self-proclaimed king of the shoreline. One mistake and he makes headlines. Sings his philosophy to anyone who gets too close to the water.",
    personalityTraits: ["Smooth", "Theatrical", "Dangerous"],
    image: "/characters/gator.png",
    songIds: ["gator"],
  },
  {
    id: "byte",
    name: "Byte",
    role: "Marsh Gator",
    description:
      "One of three alligators in the marsh. Spooky, still, unnerving — he sways with Gator's song. Part of the crew that blocks Zuri and Ade from the submerged dock post.",
    personalityTraits: ["Spooky", "Quiet", "Unnerving"],
    image: "/characters/byte.png",
    songIds: [],
  },
  {
    id: "teddy",
    name: "Teddy",
    role: "Marsh Gator",
    description:
      "One of three alligators in the marsh. Dumb, hungry, drooling — he sways with Gator's song and nearly gets Zuri when she surfaces. Part of the crew that blocks the submerged dock.",
    personalityTraits: ["Hungry", "Simple", "Dangerous when hungry"],
    image: "/characters/teddy.png",
    songIds: [],
  },

  // ── Corporate Antagonists ──────────────────────────────────
  {
    id: "marcus-vale",
    name: "Marcus Vale",
    role: "Former Hometown Hero Turned Tech CEO",
    description:
      "A hometown boy turned tech CEO whose company plans to build a data center that will destroy the marsh. He's not cruel — just disconnected. When his secretary hands him the envelope the girls left under his door — the Polaroid, the river reports — something breaks. He drives to River Z. 'I'm going to hear what the river says.' He cancels the project. Comes home.",
    personalityTraits: ["Pragmatic", "Reflective", "Capable of change", "Hometown heart"],
    image: "/characters/MarcusVale1.png",
    songIds: ["carry-the-sound"],
  },
  {
    id: "victor-kane",
    name: "Victor Kane",
    role: "Corporate Antagonist",
    description:
      "Operations director pushing the construction project at any cost. Unlike Marcus, he has no emotional connection to the town — only targets. He runs illegal dredging, bribes the fishing warden, cuts the dock stage ropes to sabotage the town, and is always three steps ahead — all for profit.",
    personalityTraits: ["Ruthless", "Calculating", "Profit-driven", "Saboteur"],
    image: "/characters/VictorKane.png",
    songIds: [],
  },
  {
    id: "henchman",
    name: "Henchman",
    role: "Victor Kane's Enforcer",
    description:
      "Victor Kane's on-the-ground enforcer. Dumps waste in the river, bribes the fishing warden, cuts the dock stage ropes. When the trio's Polaroid catches him handing the Warden money, he becomes the evidence that brings Marcus home.",
    personalityTraits: ["Obedient", "Intimidating", "Caught on film"],
    image: "/characters/henchman.png",
    songIds: [],
  },
  {
    id: "oscar",
    name: "Oscar",
    role: "Victor's Cat",
    description:
      "Victor Kane's black cat. Appears when least expected. Observes. Judges. Belongs to the opposition.",
    personalityTraits: ["Aloof", "Mysterious", "Victor's shadow"],
    image: "/characters/oscar.png",
    songIds: [],
  },
  {
    id: "security-1",
    name: "Security",
    role: "Hotel Security",
    description:
      "One of Victor's men in black. Big. Suit. Earpiece. Blocks the Creole Hotel entrance. Nobody gets through.",
    personalityTraits: ["Imposing", "Impersonal", "Obedient"],
    image: "/characters/security.png",
    songIds: [],
  },
  {
    id: "security-2",
    name: "Security",
    role: "Hotel Security",
    description:
      "Victor's other man in black. Same uniform. Same mission. No bookings. Move on.",
    personalityTraits: ["Imposing", "Impersonal", "Obedient"],
    image: "/characters/security2.png",
    songIds: [],
  },
  {
    id: "secretary",
    name: "Secretary",
    role: "Marcus Vale's Assistant",
    description:
      "Marcus's penthouse secretary. She brings coffee and mail, moves through the marble halls with practiced efficiency. The morning she finds the envelope under his door — unmarked, left by the girls — she hands it to him and changes everything.",
    personalityTraits: ["Efficient", "Unassuming", "Pivotal"],
    image: "/characters/secretary.png",
    songIds: [],
  },
  {
    id: "elmer",
    name: "Elmer",
    role: "Fish Thief Cat — Orange Tabby",
    description:
      "A lean, street-hardened orange tabby in a very small vest. Elmer runs his own fish thief outfit and does not appreciate newcomers using his gang sign. He is not unfriendly — just territorial and precise. He invented the Spock sign two years ago and will tell you so calmly and at length.",
    personalityTraits: ["Territorial", "Precise", "Deadpan"],
    image: "/characters/fishtheifcat.png",
    songIds: [],
  },
  {
    id: "pepe",
    name: "Pepe",
    role: "Fish Thief Dog — Chihuahua",
    description:
      "A Chihuahua with enormous eyes, a gentle disposition, and a warm Mexican accent. Elmer's partner — he rarely speaks but watches everything with quiet interest. When he does speak, or sing, it's in Spanish or with a melodic Mexican lilt. His paws are too small to make the gang sign properly, which he refuses to acknowledge. When Elmer is tense, Pepe is calm. They balance each other perfectly.",
    personalityTraits: ["Gentle", "Observant", "Unflappable", "Warm", "Musical"],
    image: "/characters/fishtheifdog1.png",
    songIds: [],
  },


  // ── Town Officials ──────────────────────────────────────────
  {
    id: "the-councilor",
    name: "The Councilor",
    role: "Town Council",
    description:
      "An older blind man who serves as The Councilor — a respected town leader. He navigates the docks and decisions with the steady certainty of someone who has seen the river change over decades.",
    personalityTraits: ["Steady", "Perceptive", "Authoritative"],
    image: "/characters/council.png",
    songIds: [],
  },
  {
    id: "fishing-warden",
    name: "Fishing Warden",
    role: "Town Authority",
    description:
      "An older rough man with white hair and beard — the town's fishery authority. He's seen the river in every season. Announces the three-day fishing shutdown. But he takes Victor's bribe — and when the Polaroid catches him accepting the cash, he's the proof that breaks the case.",
    personalityTraits: ["Seasoned", "Compromised", "Exposed"],
    image: "/characters/warden.png",
    songIds: [],
  },

  // ── Market Characters ──────────────────────────────────────
  {
    id: "mango-vendor",
    name: "Mango Vendor",
    role: "Market Fruit Vendor",
    description:
      "The first vendor Zuri passes when she walks into the market. A mango rolls off his stack — she catches it without breaking stride, sets it back without looking. He calls after her: 'You're a good one.' She doesn't react. She wasn't doing it for thanks.",
    personalityTraits: ["Warm", "Quick to notice", "Unhurried"],
    image: "/characters/vendor1.png",
    songIds: [],
  },
  {
    id: "fishmonger",
    name: "The Vendor",
    role: "Market Fishmonger",
    description:
      "A broad man in a fish-stained apron. Checks crates at the loading dock. Knows the river, knows the catches. The unhurried energy of someone who trusts his own judgment. He's heard about the machine upriver.",
    personalityTraits: ["Steady", "Observant", "No-nonsense"],
    image: "/characters/fishmonger.png",
    songIds: [],
  },
  {
    id: "sushi",
    name: "Sushi",
    role: "Sushi Shop Owner",
    description:
      "She runs the sushi shop at the Fish Market, serving the freshest rolls on the river. Sharp-tongued, warm-hearted, and deadpan — 'Catfish nigiri doesn't sell very well.' She obsesses over vinegar ratios, refuses to sell her stall to Victor Kane, and sends the girls off with 'Don't get arrested. I still need that bream by Thursday.'",
    personalityTraits: ["Resourceful", "Sharp", "Deadpan", "Warm"],
    image: "/characters/sushi.png",
    songIds: [],
  },
  {
    id: "j",
    name: "J",
    role: "Market Girl",
    description:
      "A few years older than Zuri, J is one of the Market Circle's fixtures — sharp, warm, and dressed like she stepped out of a 1960s jazz poster. High-waisted trousers, a fitted blouse, a headscarf tied just so. She knows every stall, every vendor, and every piece of news before it happens. She's the kind of person who makes a room feel like a party just by arriving in it.",
    personalityTraits: ["Quick", "Street-smart", "Bold"],
    image: "/characters/J.png",
    songIds: ["going-up", "porcelain"],
  },
  {
    id: "cedar",
    name: "Cedar",
    role: "Market Girl",
    description:
      "One of the Market Girls — grounded and steady as the tree she's named for. Cedar keeps the group together when things get loud.",
    personalityTraits: ["Steady", "Loyal", "Protective"],
    image: "/characters/misspine.png",
    songIds: ["going-up", "porcelain"],
  },
  {
    id: "sticks",
    name: "Sticks",
    role: "Busker & Market Boy",
    description:
      "A high-energy street percussionist who performs using buckets, fish crates, and anything that makes noise. He loves rhythm and believes music should be loud, fun, and shared. He's among the first to treat Zuri like a fellow musician. Can turn any object into a drum.",
    personalityTraits: ["Rhythmic", "Restless", "Energetic"],
    image: "/characters/sticks.png",
    songIds: ["louis", "monday", "tiny-space"],
  },
  {
    id: "chops",
    name: "Chops",
    role: "Market Busker",
    description:
      "The loudest personality on the block. He performs near the train yard, blasting electric guitar solos that sync with passing trains. Loves dramatic riffs and playful showmanship. Treats every performance like a stadium concert.",
    personalityTraits: ["Flashy", "Passionate", "Showman"],
    image: "/characters/chops.png",
    songIds: ["chops", "louis", "tiny-space"],
  },
  {
    id: "bass",
    name: "Bass",
    role: "Market Busker",
    description:
      "Calm, quiet, and deeply cool. Rarely speaks and prefers communicating through bass lines — kids dance when she plays. When something important happens, she expresses it through music rather than words. Answers questions with bass riffs.",
    personalityTraits: ["Soulful", "Cool", "Grounded"],
    image: "/characters/bass.png",
    songIds: ["louis", "monday", "tiny-space"],
  },
  {
    id: "holly",
    name: "Holly",
    role: "Fish Market Busker",
    description:
      "Holly has the most traditional street-performer style — sings soulful songs in the open market square and her voice draws crowds naturally. She is the first person to tell Zuri she should sing publicly. A voice that makes strangers stop walking.",
    personalityTraits: ["Free-spirited", "Warm", "Resilient"],
    image: "/characters/holly.png",
    songIds: ["keys-to-the-block", "hustle-busker"],
  },
  {
    id: "bus-rider",
    name: "Bus Rider",
    role: "Mysterious Stranger",
    description:
      "An old woman on the bus to the city. Shawl, a basket in her lap, eyes that have seen too much. She speaks in riddles — the bird, the nest, first light — and tells the girls what they seek is not there until tomorrow. She's been riding this route twenty years; she knows who gets on, who gets off, and when three girls with proof in a bag aren't going for the sights.",
    personalityTraits: ["Cryptic", "Wise", "Unfazed", "Playful"],
    image: "/characters/busrider.png",
    songIds: [],
  },
  {
    id: "elevator-sec",
    name: "Elevator Guard",
    role: "Penthouse Security",
    description:
      "A broad, unmoving guard at the penthouse elevator. The only way up. When his radio crackles with a lobby problem, he steps away — and the girls slip past.",
    personalityTraits: ["Stoic", "Alert", "Outmaneuvered"],
    image: "/characters/elevatorsec.png",
    songIds: [],
  },
  {
    id: "pg",
    name: "PG",
    role: "Louis's Granddaughter & Busker",
    description:
      "Louis's granddaughter. She plays ukulele and busks with Louis at the market — the two of them a familiar duo, passing melodies and rhythm between trumpet and ukulele.",
    personalityTraits: ["Warm", "Playful", "Musical"],
    image: "/characters/PG1.png",
    songIds: ["louis", "monday", "tiny-space"],
  },
];
