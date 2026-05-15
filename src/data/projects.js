// Project case studies. Photography is local to /public/projects/<slug>/.
// Each project carries enough narrative for a full scrolly page.

const p = (slug, file) => `/projects/${slug}/${file}`;

export const projects = [
  {
    slug: "haven-cuisine",
    number: "01",
    title: "Haven Cuisine",
    subtitle: "An Italian kitchen, authored.",
    category: "Residential — Kitchen",
    location: "Saadiyat Island, Abu Dhabi",
    year: "2024",
    surface: "112 m²",
    duration: "9 months",
    discipline: ["Concept", "Joinery", "Lighting", "Material Direction"],
    summary:
      "A private kitchen designed as the social heart of a villa — coffered ceilings, fluted timber, and stone islands the colour of late espresso.",
    hero: p("haven-cuisine", "01-hero.jpg"),
    thumb: p("haven-cuisine", "01-hero.jpg"),
    palette: ["#4A3528", "#A38566", "#E8DEC9", "#0D0D0D"],
    images: [
      p("haven-cuisine", "01-hero.jpg"),
      p("haven-cuisine", "02.jpg"),
      p("haven-cuisine", "03.jpg"),
      p("haven-cuisine", "04.jpg"),
      p("haven-cuisine", "05.jpg"),
    ],
    chapters: [
      {
        kicker: "Brief",
        title: "Heart of the home, made permanent.",
        body:
          "Our client wanted a kitchen that her family would keep for thirty years. Not a showpiece — a working room that held its character through breakfast, dinner parties, and quiet Sundays. We started by removing four walls.",
      },
      {
        kicker: "Architecture",
        title: "A coffered ceiling sets the tempo.",
        body:
          "We replaced the original flat slab with a deep coffered ceiling in chalked plaster, pushing the apparent height by forty centimetres. Linear pendants run along the central axis and quietly do all the lighting work the eye does not see.",
      },
      {
        kicker: "Materials",
        title: "Espresso oak, calacatta viola, brushed bronze.",
        body:
          "All cabinetry is fluted Italian oak, oiled three times for depth. The island is a single block of calacatta viola from Carrara, edged in 4 mm chamfered bronze. Hardware was drawn for the project — there are no off-the-shelf pulls in the room.",
      },
      {
        kicker: "Result",
        title: "A kitchen that holds its quiet at full house.",
        body:
          "The room sits between two living spaces and resolves both. The family eats there every morning; we still photograph it the way we left it.",
      },
    ],
  },

  {
    slug: "suite-royale",
    number: "02",
    title: "Suite Royale",
    subtitle: "French Art Deco, recomposed.",
    category: "Residential — Master Suite",
    location: "Al Bateen, Abu Dhabi",
    year: "2024",
    surface: "78 m²",
    duration: "6 months",
    discipline: ["Concept", "Bespoke Furniture", "Joinery", "Soft Goods"],
    summary:
      "A master suite that draws on Haussmannian Paris — boiserie panels, parquet de Versailles, and a black marble fireplace as the room's anchor.",
    hero: p("suite-royale", "01-hero.jpg"),
    thumb: p("suite-royale", "01-hero.jpg"),
    palette: ["#1B1612", "#7C0F18", "#E8DEC9", "#9C7C38"],
    images: [
      p("suite-royale", "01-hero.jpg"),
      p("suite-royale", "02.jpg"),
      p("suite-royale", "03.jpg"),
      p("suite-royale", "04.jpg"),
      p("suite-royale", "05.jpg"),
    ],
    chapters: [
      {
        kicker: "Brief",
        title: "An Art Deco room with a quiet pulse.",
        body:
          "The owners had spent years in Paris and wanted to bring a piece of it home. Not a pastiche — a contemporary reading of pre-war Paris, in a single bedroom suite that doubles as a private sitting room.",
      },
      {
        kicker: "Architecture",
        title: "Boiserie, but only where it earns its keep.",
        body:
          "We installed full-height boiserie on the long walls only, painted in three barely-different shades of warm white so the panels read by light instead of by line. The remaining walls are limewashed in a soft espresso, against which the bed reads like a sculpture.",
      },
      {
        kicker: "Furniture",
        title: "A Carrara fireplace that does not need a fire.",
        body:
          "The hearth is fluted noir Saint-Laurent marble, drawn for the project and cut in Italy. It anchors the seating area and reflects the parquet de Versailles, which we laid in 600 mm panels in smoked French oak.",
      },
      {
        kicker: "Result",
        title: "A room that is private without being precious.",
        body:
          "Linen curtains, a tufted headboard the colour of bone, claret pillows. The room can be lit two people deep or twelve, and it works at both.",
      },
    ],
  },

  {
    slug: "getaway-retreat",
    number: "03",
    title: "Getaway Retreat",
    subtitle: "A bachelor lounge with presence.",
    category: "Residential — Entertainment",
    location: "Yas Island, Abu Dhabi",
    year: "2024",
    surface: "94 m²",
    duration: "7 months",
    discipline: ["Concept", "AV Integration", "Joinery", "Lighting"],
    summary:
      "A moody entertainment retreat — a billiard table cut from a single oak slab, blackened steel curtains, and a 110-inch screen disappearing into millwork.",
    hero: p("getaway-retreat", "01-hero.jpg"),
    thumb: p("getaway-retreat", "01-hero.jpg"),
    palette: ["#0D0D0D", "#3C2E26", "#9C7C38", "#7B7268"],
    images: [
      p("getaway-retreat", "01-hero.jpg"),
      p("getaway-retreat", "02.jpg"),
      p("getaway-retreat", "03.jpg"),
      p("getaway-retreat", "04.jpg"),
      p("getaway-retreat", "05.jpg"),
    ],
    chapters: [
      {
        kicker: "Brief",
        title: "Somewhere to disappear, at home.",
        body:
          "A successful entrepreneur with a young family asked us for one room that did not belong to anyone else — a private retreat for poker nights, late films, and the rare evening alone.",
      },
      {
        kicker: "Architecture",
        title: "Light is the material here.",
        body:
          "We blackened the ceiling and ran linear LEDs along three sides, set 18 mm into a recessed channel so the source vanishes. Wall washers fall on a single travertine column. The room can be played dark, or lit like a room.",
      },
      {
        kicker: "Furniture",
        title: "A pool table the colour of the room.",
        body:
          "The billiard table was drawn for the space — cantilevered legs in blackened steel, a slate bed, charcoal felt. The bar runs the length of one wall, fronted in fluted oak with a brass kick rail you only notice on the second visit.",
      },
      {
        kicker: "Result",
        title: "A room that holds its volume at three or thirty.",
        body:
          "It is the most-used room in the house, and the one no one photographs.",
      },
    ],
  },

  {
    slug: "classic-home-office",
    number: "04",
    title: "Classic — Home Office",
    subtitle: "Work, with gravitas.",
    category: "Residential — Home Office",
    location: "Al Reem Island, Abu Dhabi",
    year: "2023",
    surface: "42 m²",
    duration: "4 months",
    discipline: ["Concept", "Joinery", "Lighting"],
    summary:
      "A home office composed for a couple who run a business from one room — twin desks, a shared library wall, and a skylight that does the lighting before noon.",
    hero: p("classic-home-office", "01-hero.jpg"),
    thumb: p("classic-home-office", "01-hero.jpg"),
    palette: ["#3F362F", "#B8AC9C", "#E8DEC9", "#9C7C38"],
    images: [
      p("classic-home-office", "01-hero.jpg"),
      p("classic-home-office", "02.jpg"),
      p("classic-home-office", "03.jpg"),
      p("classic-home-office", "04.jpg"),
      p("classic-home-office", "05.jpg"),
    ],
    chapters: [
      {
        kicker: "Brief",
        title: "One room, two people, no compromises.",
        body:
          "The clients work side by side. The room had to support two simultaneous calls without echo, hold a thousand books, and feel like a room you would happily sit in on a Sunday with a coffee.",
      },
      {
        kicker: "Architecture",
        title: "Acoustic plaster on every soft surface.",
        body:
          "We pulled the ceiling down 80 mm to fit lime-plaster acoustic panels and a continuous linen wall behind the desks. Reverberation drops by 0.6 seconds. The room sounds like a library should.",
      },
      {
        kicker: "Furniture",
        title: "Twin oak desks, one shared library.",
        body:
          "Two cantilevered desks in oiled European oak face each other across a Persian rug. The library wall is bookmatched smoked oak, lit from within by a 9 mm channel that disappears at eye level.",
      },
      {
        kicker: "Result",
        title: "A working room that reads as a sitting room.",
        body:
          "Calls happen, books get pulled, work gets done — and at six the room is still beautiful.",
      },
    ],
  },

  {
    slug: "the-palm",
    number: "05",
    title: "The Palm",
    subtitle: "A coastal café, gently.",
    category: "Commercial — Café",
    location: "Corniche, Abu Dhabi",
    year: "2024",
    surface: "230 m²",
    duration: "8 months",
    discipline: ["Concept", "FF&E", "Lighting", "Branding Liaison"],
    summary:
      "A hospitality interior that reads as a residence — woven rattan, soft archways, raw plaster, and a long terrazzo bar made on-site.",
    hero: p("the-palm", "01-hero.jpg"),
    thumb: p("the-palm", "01-hero.jpg"),
    palette: ["#3D352B", "#7E6F5D", "#E8DEC9", "#5A715A"],
    images: [
      p("the-palm", "01-hero.jpg"),
      p("the-palm", "02.jpg"),
      p("the-palm", "03.jpg"),
      p("the-palm", "04.jpg"),
      p("the-palm", "05.jpg"),
    ],
    chapters: [
      {
        kicker: "Brief",
        title: "A café that does not sound like a café.",
        body:
          "The owners had run two restaurants and one too many concept-driven cafés. They wanted something quiet — a room people would go to alone, with a book, before lunch.",
      },
      {
        kicker: "Architecture",
        title: "Three soft archways set the room's rhythm.",
        body:
          "We carved three full-height arches into the rear wall and lined them in micro-cement. The arches break the long room into thirds and let the seating clusters feel intimate without screening anything off.",
      },
      {
        kicker: "Furniture",
        title: "Rattan, terrazzo, and a single big tree.",
        body:
          "The bar is a 9-metre run of poured terrazzo with brass inlay. Seating is woven rattan with linen cushions. A single fiddle-leaf fig anchors the centre and softens every photograph anyone has ever taken in the room.",
      },
      {
        kicker: "Result",
        title: "A room that reads as a private living room.",
        body:
          "Conversations are quiet. Coffee is taken slowly. The café was full on its second day and never advertised.",
      },
    ],
  },

  {
    slug: "italian-dining",
    number: "06",
    title: "Italian Dining",
    subtitle: "La dolce vita, in section.",
    category: "Commercial — Restaurant",
    location: "Al Maryah Island, Abu Dhabi",
    year: "2025",
    surface: "320 m²",
    duration: "11 months",
    discipline: ["Concept", "Lighting", "FF&E", "Acoustic Design"],
    summary:
      "A 90-cover Italian restaurant — fluted timber columns, a sculpted plaster column ceiling, and chandeliers drawn for the room.",
    hero: p("italian-dining", "01-hero.jpg"),
    thumb: p("italian-dining", "01-hero.jpg"),
    palette: ["#2C231D", "#8B7757", "#E8DEC9", "#9C7C38"],
    images: [
      p("italian-dining", "01-hero.jpg"),
      p("italian-dining", "02.jpg"),
      p("italian-dining", "03.jpg"),
      p("italian-dining", "04.jpg"),
      p("italian-dining", "05.jpg"),
    ],
    chapters: [
      {
        kicker: "Brief",
        title: "An Italian dining room that is not Italian-themed.",
        body:
          "The brief was direct: nothing red-and-white, no Tuscan villa motifs. We drew a contemporary tribute — slow, warm, generous — that reads as Italian only when you slow down to look.",
      },
      {
        kicker: "Architecture",
        title: "A column ceiling, sculpted in plaster.",
        body:
          "The 320 m² floor is broken by twelve sculpted plaster columns that rise into a coffered ceiling. The columns are structural; the coffers are decorative; together they shape the room into intimate four-tops with a clear sightline to the open kitchen.",
      },
      {
        kicker: "Furniture",
        title: "Chandeliers drawn for the project.",
        body:
          "Six bespoke chandeliers in alabaster and brushed brass were drawn for the room and hand-fabricated in Murano. Banquette seating is hand-tufted in caramel mohair.",
      },
      {
        kicker: "Result",
        title: "A 90-cover dining room that feels like 30.",
        body:
          "Acoustic panels behind the boiserie kept the noise floor below 65 dB at full house. The dining room reads as a quiet conversation, even when it is not.",
      },
    ],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) || null;
}
