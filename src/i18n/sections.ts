import type { Lang, OriginId } from './translations'

// ---------------------------------------------------------------------------
// Content for every section after "Explore a Similar Cup".
// English and Hebrew are fully written; French is structurally prepared and
// currently falls back to English until real French copy is provided.
// ---------------------------------------------------------------------------

export type RoastId = 'light' | 'medium' | 'dark'
export type BrewId = 'espresso' | 'v60' | 'frenchpress' | 'moka' | 'coldbrew' | 'cappuccino'

export interface RoastInfo {
  name: string
  desc: string
  brew: string
  notes: string[]
}

export interface BrewInfo {
  name: string
  desc: string
  roast: string
  time: string
}

export interface SectionsText {
  roasting: {
    eyebrow: string
    heading: string
    description: string
    stages: { num: string; title: string; text: string }[]
    selectorTitle: string
    roasts: Record<RoastId, RoastInfo>
    meterLabels: { acidity: string; sweetness: string; body: string; brew: string; notes: string }
    curveLabels: { temperature: string; airflow: string; development: string; time: string }
  }
  services: {
    heading: string
    description: string
    cards: { title: string; text: string; button: string; href: string }[]
  }
  brewing: {
    heading: string
    description: string
    meterLabels: { texture: string; intensity: string; clarity: string; time: string; roast: string }
    methods: Record<BrewId, BrewInfo>
    cta: string
  }
  cafe: {
    eyebrow: string
    heading: string
    description: string
    labels: string[]
    visit: string
    menu: string
  }
  drinks: {
    heading: string
    description: string
    originLabel: string
    cards: { id: string; name: string; desc: string; origin: string; roast: string; notes: string }[]
    cta: string
  }
  team: {
    eyebrow: string
    heading: string
    description: string
    favOrigin: string
    favBrew: string
    members: { name: string; role: string; philosophy: string; origin: string; brew: string }[]
    cta: string
  }
  sourcing: {
    heading: string
    description: string
    principles: { title: string; text: string }[]
    path: { farm: string; roastery: string; cafe: string }
    cta: string
  }
  match: {
    eyebrow: string
    heading: string
    description: string
    steps: { title: string; text: string }[]
    cta: string
  }
  quiz: {
    heading: string
    description: string
    stepLabel: string // "Question {n} of 3"
    questions: { q: string; options: string[] }[]
    resultKicker: string
    explanation: string // tokens: {flavor} {method}
    labels: { roast: string; notes: string; brew: string; cafeBrew: string }
    explore: string
    tryAgain: string
  }
  testimonials: {
    eyebrow: string
    heading: string
    favorite: string
    types: { guest: string; homeBrewer: string; homeRoaster: string }
    prev: string
    next: string
    items: { name: string; quote: string; coffee: string; type: 'guest' | 'homeBrewer' | 'homeRoaster' }[]
  }
  visit: {
    heading: string
    description: string
    addressLabel: string
    hoursLabel: string
    contactLabel: string
    address: string[]
    hours: string[]
    phone: string
    email: string
    features: string[]
    directions: string
    contact: string
    mapLabel: string
  }
  faq: {
    heading: string
    description: string
    items: { q: string; a: string }[]
  }
  finale: {
    heading: string
    description: string
    explore: string
    visit: string
  }
  footer: {
    statement: string
    newsletter: {
      heading: string
      description: string
      placeholder: string
      submit: string
      success: string
      error: string
      emailLabel: string
    }
    columns: { title: string; links: { label: string; href: string }[] }[]
    followUs: string
    legal: { label: string; href: string }[]
    closing: string
    copyright: string
    backToTop: string
  }
}

const en: SectionsText = {
  roasting: {
    eyebrow: 'THE CRAFT BEHIND THE FLAVOR',
    heading: 'From Origin to Roast',
    description:
      'Every origin responds differently to heat. We develop a unique roast profile for each coffee, revealing the sweetness, aroma, and character already held inside the bean.',
    stages: [
      {
        num: '01',
        title: 'Selection',
        text: 'The density, altitude, processing method and moisture of every bean shape the roast profile we create.',
      },
      {
        num: '02',
        title: 'Development',
        text: 'Temperature, airflow and timing are carefully balanced to reveal sweetness without hiding the identity of the origin.',
      },
      {
        num: '03',
        title: 'First Crack',
        text: 'The bean expands, its aromas deepen and its natural character begins to emerge.',
      },
      {
        num: '04',
        title: 'Expression',
        text: 'The roast is completed when acidity, sweetness, body and aroma reach their ideal balance.',
      },
    ],
    selectorTitle: 'Choose Your Roast',
    roasts: {
      light: {
        name: 'Light Roast',
        desc: 'Floral, citrus, tea-like and bright.',
        brew: 'Best for V60, Chemex and filter brewing.',
        notes: ['Jasmine', 'Citrus', 'White Tea'],
      },
      medium: {
        name: 'Medium Roast',
        desc: 'Balanced, caramel-like, sweet and rounded.',
        brew: 'Best for espresso, AeroPress and moka pot.',
        notes: ['Caramel', 'Red Fruit', 'Cocoa'],
      },
      dark: {
        name: 'Dark Roast',
        desc: 'Deep cocoa, toasted nuts, molasses and full body.',
        brew: 'Best for milk-based drinks and French press.',
        notes: ['Dark Cocoa', 'Toasted Nuts', 'Molasses'],
      },
    },
    meterLabels: { acidity: 'Acidity', sweetness: 'Sweetness', body: 'Body', brew: 'Recommended Brewing', notes: 'Flavor Notes' },
    curveLabels: { temperature: 'Temperature', airflow: 'Airflow', development: 'Development', time: 'Time' },
  },
  services: {
    heading: 'Coffee, Your Way',
    description:
      'Start with the raw bean, choose a roast crafted for your brewing style, or let our baristas prepare the final cup for you.',
    cards: [
      {
        title: 'Green Coffee Beans',
        text: 'Unroasted whole beans sourced from distinctive farms and regions around the world, ready for experienced home roasters and professionals.',
        button: 'Discover Green Beans',
        href: '/coffee',
      },
      {
        title: 'Freshly Roasted Beans',
        text: 'Whole beans roasted in small batches and matched to espresso, filter, moka pot, French press or cold brew.',
        button: 'Explore Our Roasts',
        href: '/coffee',
      },
      {
        title: 'Prepared in Our Café',
        text: 'Choose an origin and let our baristas prepare it as espresso, cappuccino, flat white, V60, latte or cold brew.',
        button: 'View the Café Menu',
        href: '#drinks',
      },
    ],
  },
  brewing: {
    heading: 'One Bean. Many Expressions.',
    description:
      'The brewing method changes texture, aroma, clarity and intensity. Explore how each preparation reveals a different side of the coffee.',
    meterLabels: { texture: 'Texture', intensity: 'Intensity', clarity: 'Clarity', time: 'Preparation Time', roast: 'Recommended Roast' },
    methods: {
      espresso: {
        name: 'Espresso',
        desc: 'Concentrated, aromatic and full-bodied, with rich crema and an intense finish.',
        roast: 'Medium–Dark Roast',
        time: '≈ 30 seconds',
      },
      v60: {
        name: 'V60',
        desc: 'Clean, bright and aromatic, allowing delicate fruit and floral notes to remain clear.',
        roast: 'Light Roast',
        time: '≈ 3 minutes',
      },
      frenchpress: {
        name: 'French Press',
        desc: 'Rich and textured, with a fuller body and a deep expression of chocolate and spice.',
        roast: 'Dark Roast',
        time: '≈ 4 minutes',
      },
      moka: {
        name: 'Moka Pot',
        desc: 'Bold and syrupy, with roasted sweetness and a warm, familiar intensity.',
        roast: 'Medium Roast',
        time: '≈ 5 minutes',
      },
      coldbrew: {
        name: 'Cold Brew',
        desc: 'Smooth, refreshing, naturally sweet and low in perceived acidity.',
        roast: 'Medium Roast',
        time: '≈ 14 hours',
      },
      cappuccino: {
        name: 'Cappuccino',
        desc: 'Espresso softened by velvety milk foam — comforting, sweet and beautifully balanced.',
        roast: 'Medium–Dark Roast',
        time: '≈ 2 minutes',
      },
    },
    cta: 'Not Sure Which to Choose? Take the Quiz',
  },
  cafe: {
    eyebrow: 'A PLACE TO SLOW DOWN',
    heading: 'More Than Coffee.',
    description:
      'A warm space where carefully prepared coffee, quiet conversations and thoughtful details become part of the ritual.',
    labels: ['Freshly roasted daily', 'Skilled baristas', 'Indoor and outdoor seating', 'Seasonal drinks'],
    visit: 'Visit Our Café',
    menu: 'View the Menu',
  },
  drinks: {
    heading: 'Crafted for the Moment',
    description: 'Familiar classics and seasonal creations, prepared with coffees chosen specifically for each recipe.',
    originLabel: 'Recommended origin',
    cards: [
      {
        id: 'espresso',
        name: 'Espresso',
        desc: 'A short, intense expression of a single origin, extracted with care.',
        origin: 'Brazilian Cerrado',
        roast: 'Medium-Dark Roast',
        notes: 'Dark Chocolate • Hazelnut',
      },
      {
        id: 'flatwhite',
        name: 'Flat White',
        desc: 'Silky micro-foam poured over a double shot for a velvet texture.',
        origin: 'Guatemalan Antigua',
        roast: 'Medium Roast',
        notes: 'Cocoa • Sweet Spice',
      },
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        desc: 'The classic balance of espresso, steamed milk and airy foam.',
        origin: 'Colombian Pink Bourbon',
        roast: 'Medium Roast',
        notes: 'Caramel • Tropical Fruit',
      },
      {
        id: 'v60',
        name: 'V60',
        desc: 'A slow, precise pour-over that keeps every delicate note in focus.',
        origin: 'Ethiopian Yirgacheffe',
        roast: 'Light Roast',
        notes: 'Jasmine • Citrus',
      },
      {
        id: 'coldbrew',
        name: 'Cold Brew',
        desc: 'Steeped for fourteen hours, served cold — smooth and naturally sweet.',
        origin: 'Costa Rican Tarrazú',
        roast: 'Medium Roast',
        notes: 'Brown Sugar • Citrus',
      },
      {
        id: 'seasonal',
        name: 'Seasonal Signature',
        desc: 'A rotating creation from our baristas, built around the season.',
        origin: 'Kenyan AA',
        roast: 'Medium-Light Roast',
        notes: 'Blackcurrant • Raspberry',
      },
    ],
    cta: 'Shop the Full Collection',
  },
  team: {
    eyebrow: 'PEOPLE, NOT PRODUCTION LINES',
    heading: 'Crafted by Curious Minds',
    description:
      'Our roasters and baristas taste, test, adjust and question every decision until each coffee expresses its origin honestly.',
    favOrigin: 'Favorite origin',
    favBrew: 'Favorite brew',
    members: [
      // PLACEHOLDER people — replace names, roles and quotes with your real team.
      {
        name: 'Dana Rivera',
        role: 'Head Roaster',
        philosophy: 'A roast should reveal the farm, not replace it.',
        origin: 'Ethiopia',
        brew: 'V60',
      },
      {
        name: 'Omer Katz',
        role: 'Lead Barista',
        philosophy: 'Every cup is a small conversation between the grower and the guest.',
        origin: 'Kenya',
        brew: 'Espresso',
      },
      {
        name: 'Maya Chen',
        role: 'Green Coffee Buyer',
        philosophy: 'I look for coffees with a sense of place you can taste.',
        origin: 'Guatemala',
        brew: 'French Press',
      },
    ],
    cta: 'Visit Us at the Café',
  },
  sourcing: {
    heading: 'Respecting Every Origin',
    description:
      'Better coffee begins with stronger relationships. We work toward transparent sourcing, responsible roasting and long-term partnerships with the people who grow each harvest.',
    principles: [
      {
        title: 'Long-Term Relationships',
        text: 'We seek consistent partnerships rather than anonymous, one-time purchases.',
      },
      {
        title: 'Traceable Origins',
        text: 'Every coffee is connected to a known country, region, producer or cooperative.',
      },
      {
        title: 'Thoughtful Roasting',
        text: 'Small-batch roasting helps reduce waste while protecting quality.',
      },
      {
        title: 'Lower-Impact Packaging',
        text: 'We continue to improve materials and reduce unnecessary packaging.',
      },
    ],
    path: { farm: 'Farm', roastery: 'Roastery', cafe: 'Café' },
    cta: 'Shop the Coffee',
  },
  match: {
    eyebrow: 'YOUR PERFECT CUP',
    heading: 'How We Match You to Your Perfect Cup',
    description:
      "Great coffee starts with knowing what you actually enjoy. Here's how we turn a few quick answers into a personal recommendation.",
    steps: [
      {
        title: 'Tell Us How You Brew',
        text: 'Espresso machine, filter, moka pot or cold brew — we start with how you make coffee, or how you’d like it prepared for you.',
      },
      {
        title: 'Share Your Flavor Preference',
        text: 'Floral and bright, chocolate and nutty, or bold and intense — the flavors you love point straight to an origin.',
      },
      {
        title: 'Get Your Personal Match',
        text: 'We combine your answers with our roast profiles to recommend the exact origin, roast level and brewing method for you.',
      },
    ],
    cta: 'Take the Taste Quiz',
  },
  quiz: {
    heading: 'Find the Coffee That Feels Like Yours',
    description:
      'Answer three quick questions and discover the origin, roast and brewing style that best match your taste.',
    stepLabel: 'Question {n} of 3',
    questions: [
      {
        q: 'How do you usually prepare your coffee?',
        options: ['Espresso machine', 'Filter', 'Moka pot', 'French press', 'Cold brew', 'Let the café prepare it'],
      },
      {
        q: 'Which flavors sound best to you?',
        options: ['Floral and citrus', 'Fruity and bright', 'Chocolate and caramel', 'Nutty and smooth', 'Dark and intense'],
      },
      {
        q: 'How bold should your coffee feel?',
        options: ['Delicate', 'Balanced', 'Full-bodied', 'Intense'],
      },
    ],
    resultKicker: 'Your coffee',
    explanation:
      'Based on your love of {flavor} flavors and your {method} ritual, this cup should feel like it was roasted just for you.',
    labels: { roast: 'Roast', notes: 'Flavor Notes', brew: 'Recommended Brewing', cafeBrew: 'Prepared at our café' },
    explore: 'Explore This Coffee',
    tryAgain: 'Try Again',
  },
  testimonials: {
    eyebrow: 'SHARED OVER COFFEE',
    heading: 'What Our Guests Remember',
    favorite: 'Favorite coffee',
    types: { guest: 'Café guest', homeBrewer: 'Home brewer', homeRoaster: 'Home roaster' },
    prev: 'Previous testimonial',
    next: 'Next testimonial',
    items: [
      // PLACEHOLDER testimonials — replace with real guest quotes.
      {
        name: 'Maya L.',
        quote:
          'I came for the Ethiopian pour-over and stayed because the barista explained exactly why it tasted so different from my usual coffee.',
        coffee: 'Ethiopian Yirgacheffe',
        type: 'guest',
      },
      {
        name: 'Daniel K.',
        quote: 'Their roast dates are always fresh, and the Cerrado makes the most forgiving espresso I have pulled at home.',
        coffee: 'Brazilian Cerrado',
        type: 'homeBrewer',
      },
      {
        name: 'Noa B.',
        quote: 'The green Kenyan beans arrived with real notes about density and moisture. My first crack finally made sense.',
        coffee: 'Kenyan AA',
        type: 'homeRoaster',
      },
      {
        name: 'Tomer S.',
        quote: 'I asked for something floral and they walked me through three origins before I chose. No rush, no upsell.',
        coffee: 'Colombian Pink Bourbon',
        type: 'guest',
      },
      {
        name: 'Sarah M.',
        quote: 'The Tarrazú cold brew got me through the summer. Smooth enough that I stopped adding milk entirely.',
        coffee: 'Costa Rican Tarrazú',
        type: 'homeBrewer',
      },
      {
        name: 'Avi R.',
        quote: 'The Antigua flat white is my quiet ritual before work. Same seat by the window, same careful cup.',
        coffee: 'Guatemalan Antigua',
        type: 'guest',
      },
    ],
  },
  visit: {
    heading: 'Come Experience the Story',
    description:
      'Taste an origin, compare brewing methods or simply settle in with a cup prepared exactly the way you enjoy it.',
    addressLabel: 'Find us',
    hoursLabel: 'Opening hours',
    contactLabel: 'Contact',
    // PLACEHOLDER business info — replace before launch.
    address: ['12 Roastery Lane', 'Old Town District', 'Your City'],
    hours: ['Sunday – Thursday · 7:30 – 19:00', 'Friday · 7:30 – 14:00', 'Saturday · Closed'],
    phone: '+000-00-000-0000',
    email: 'hello@terraroasters.example',
    features: ['Indoor seating', 'Outdoor terrace', 'Wheelchair accessible', 'Free Wi-Fi', 'Nearby parking', 'Dog friendly'],
    directions: 'Get Directions',
    contact: 'Contact the Café',
    mapLabel: 'Map — replace with your live map embed',
  },
  faq: {
    heading: 'Frequently Asked Questions',
    description: 'Everything you need to know before your first cup — and a few things worth knowing after.',
    items: [
      {
        q: 'How fresh is the coffee when it ships?',
        a: 'Every bag is roasted to order and shipped within 24–48 hours of roasting, so you always receive coffee at its peak.',
      },
      {
        q: "What's the difference between light, medium and dark roast?",
        a: 'Roast level changes flavor, not caffeine content. Light roasts keep bright, origin-driven notes; dark roasts bring deeper, roasted sweetness. Our brewing guide can help you choose.',
      },
      {
        q: 'Do you offer a coffee subscription?',
        a: "Yes — choose your favorite origin, roast and grind, and we'll roast and ship on whatever schedule suits you. Pause, skip or cancel anytime.",
      },
      {
        q: 'Can I visit the roastery or café?',
        a: 'Absolutely. Our café is open daily, and roastery tours can be booked directly with our team — just get in touch.',
      },
      {
        q: 'Do you have decaf or non-dairy options?',
        a: 'Yes, we carry a naturally processed decaf and offer oat, almond and soy milk at the café.',
      },
      {
        q: 'How should I store my coffee at home?',
        a: 'Keep beans in an airtight container, away from light and heat, and use within a few weeks of the roast date for the best flavor.',
      },
    ],
  },
  finale: {
    heading: 'Every Great Story Begins With One Cup.',
    description: 'Discover a new origin, learn how it was roasted or visit us and experience the final cup for yourself.',
    explore: 'Explore Our Coffee',
    visit: 'Visit Our Café',
  },
  footer: {
    statement:
      'Coffee has traveled thousands of miles before reaching your cup. We make every step worth discovering.',
    newsletter: {
      heading: 'Stories From the Roastery',
      description:
        'Receive new-origin releases, café updates, brewing guides and stories from the farms behind our coffee.',
      placeholder: 'Your email address',
      submit: 'Join the Journal',
      success: 'Welcome to the Terra journal.',
      error: 'Please enter a valid email address.',
      emailLabel: 'Email address',
    },
    columns: [
      {
        title: 'Discover',
        links: [
          { label: 'Origins', href: '#origins' },
          { label: 'Coffee Collections', href: '/coffee' },
          { label: 'Green Coffee Beans', href: '#services' },
          { label: 'Roasted Coffee', href: '#services' },
          { label: 'Brewing Methods', href: '#brewing' },
        ],
      },
      {
        title: 'Terra',
        links: [
          { label: 'Our Story', href: '#story' },
          { label: 'Roasting', href: '#roasting' },
          { label: 'Our People', href: '#story' },
          { label: 'Responsibility', href: '/coffee-origins#sourcing' },
          { label: 'Origins Story', href: '/coffee-origins' },
        ],
      },
      {
        title: 'Café',
        links: [
          { label: 'Visit Us', href: '#contact' },
          { label: 'Café Menu', href: '#drinks' },
          { label: 'Opening Hours', href: '#contact' },
          { label: 'Accessibility', href: '#footer' },
          { label: 'Contact', href: '#contact' },
        ],
      },
    ],
    followUs: 'Follow Terra Roasters',
    legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Accessibility Statement', href: '#' },
      { label: 'Cookie Preferences', href: '#' },
    ],
    closing: 'Crafted with curiosity. Roasted with precision.',
    copyright: '© 2026 Terra Roasters. All rights reserved.',
    backToTop: 'Back to top',
  },
}

const he: SectionsText = {
  roasting: {
    eyebrow: 'האומנות שמאחורי הטעם',
    heading: 'מהמקור אל הקלייה',
    description:
      'כל מקור מגיב לחום בצורה שונה. אנו מפתחים פרופיל קלייה ייחודי לכל קפה כדי לחשוף את המתיקות, הארומה והאופי שכבר נמצאים בתוך הפול.',
    stages: [
      {
        num: '01',
        title: 'בחירה',
        text: 'הצפיפות, הגובה, שיטת העיבוד ורמת הלחות של כל פול משפיעים על פרופיל הקלייה שאנו יוצרים.',
      },
      {
        num: '02',
        title: 'פיתוח',
        text: 'הטמפרטורה, זרימת האוויר והזמן מאוזנים בקפידה כדי לחשוף מתיקות מבלי להסתיר את זהות המקור.',
      },
      {
        num: '03',
        title: 'הפיצוח הראשון',
        text: 'הפול מתרחב, הארומות מעמיקות והאופי הטבעי שלו מתחיל להתגלות.',
      },
      {
        num: '04',
        title: 'ביטוי',
        text: 'הקלייה מסתיימת כאשר החמיצות, המתיקות, הגוף והארומה מגיעים לאיזון הנכון.',
      },
    ],
    selectorTitle: 'בחרו את הקלייה שלכם',
    roasts: {
      light: {
        name: 'קלייה בהירה',
        desc: 'פרחוני, הדרי, עדין ובהיר.',
        brew: 'מתאים במיוחד ל־V60, כימקס וקפה פילטר.',
        notes: ['יסמין', 'הדרים', 'תה לבן'],
      },
      medium: {
        name: 'קלייה בינונית',
        desc: 'מאוזן, קרמלי, מתקתק ועגול.',
        brew: 'מתאים במיוחד לאספרסו, אירופרס ומקינטה.',
        notes: ['קרמל', 'פירות אדומים', 'קקאו'],
      },
      dark: {
        name: 'קלייה כהה',
        desc: 'קקאו עמוק, אגוזים קלויים, מולסה וגוף מלא.',
        brew: 'מתאים במיוחד למשקאות עם חלב ולפרנץ׳ פרס.',
        notes: ['קקאו מריר', 'אגוזים קלויים', 'מולסה'],
      },
    },
    meterLabels: { acidity: 'חמיצות', sweetness: 'מתיקות', body: 'גוף', brew: 'שיטת הכנה מומלצת', notes: 'תווי טעם' },
    curveLabels: { temperature: 'טמפרטורה', airflow: 'זרימת אוויר', development: 'פיתוח', time: 'זמן' },
  },
  services: {
    heading: 'הקפה, בדרך שלכם',
    description:
      'התחילו מפול הקפה הירוק, בחרו קלייה שמתאימה לשיטת ההכנה שלכם או תנו לבריסטות שלנו להכין עבורכם את הכוס המושלמת.',
    cards: [
      {
        title: 'פולי קפה ירוקים',
        text: 'פולים שלמים שטרם נקלו, המגיעים מחוות ואזורים ייחודיים ברחבי העולם ומתאימים לקולים ביתיים מנוסים ולאנשי מקצוע.',
        button: 'גלו פולים ירוקים',
        href: '/coffee',
      },
      {
        title: 'פולי קפה קלויים',
        text: 'פולים שלמים הנקלים במנות קטנות ומותאמים לאספרסו, פילטר, מקינטה, פרנץ׳ פרס או קולד ברו.',
        button: 'גלו את הקליות שלנו',
        href: '/coffee',
      },
      {
        title: 'מוכן עבורכם בבית הקפה',
        text: 'בחרו מקור ותנו לבריסטות שלנו להכין אותו כאספרסו, קפוצ׳ינו, פלאט וייט, V60, לאטה או קולד ברו.',
        button: 'צפו בתפריט בית הקפה',
        href: '#drinks',
      },
    ],
  },
  brewing: {
    heading: 'פול אחד. אינספור ביטויים.',
    description:
      'שיטת ההכנה משנה את המרקם, הארומה, הצלילות והעוצמה. גלו כיצד כל שיטה חושפת צד אחר של הקפה.',
    meterLabels: { texture: 'מרקם', intensity: 'עוצמה', clarity: 'צלילות', time: 'זמן הכנה', roast: 'קלייה מומלצת' },
    methods: {
      espresso: {
        name: 'אספרסו',
        desc: 'מרוכז, ארומטי ובעל גוף מלא, עם קרמה עשירה וסיומת עוצמתית.',
        roast: 'קלייה בינונית־כהה',
        time: '≈ 30 שניות',
      },
      v60: {
        name: 'V60',
        desc: 'נקי, בהיר וארומטי, ומאפשר לטעמים פירותיים ופרחוניים עדינים להישאר ברורים.',
        roast: 'קלייה בהירה',
        time: '≈ 3 דקות',
      },
      frenchpress: {
        name: 'פרנץ׳ פרס',
        desc: 'עשיר ובעל מרקם מלא, עם גוף מודגש וביטוי עמוק של שוקולד ותבלינים.',
        roast: 'קלייה כהה',
        time: '≈ 4 דקות',
      },
      moka: {
        name: 'מקינטה',
        desc: 'נועז וסמיך, עם מתיקות קלויה ועוצמה חמה ומוכרת.',
        roast: 'קלייה בינונית',
        time: '≈ 5 דקות',
      },
      coldbrew: {
        name: 'קולד ברו',
        desc: 'חלק, מרענן, מתקתק באופן טבעי ובעל חמיצות מורגשת נמוכה.',
        roast: 'קלייה בינונית',
        time: '≈ 14 שעות',
      },
      cappuccino: {
        name: 'קפוצ׳ינו',
        desc: 'אספרסו מרוכך בקצף חלב קטיפתי — מנחם, מתקתק ומאוזן להפליא.',
        roast: 'קלייה בינונית־כהה',
        time: '≈ 2 דקות',
      },
    },
    cta: 'לא בטוחים מה לבחור? עברו לשאלון',
  },
  cafe: {
    eyebrow: 'מקום לעצור בו לרגע',
    heading: 'יותר מקפה.',
    description: 'חלל חם שבו קפה שמוכן בקפידה, שיחות רגועות ופרטים קטנים הופכים לחלק מהטקס היומי.',
    labels: ['קלייה טרייה מדי יום', 'בריסטות מקצועיים', 'ישיבה בפנים ובחוץ', 'משקאות עונתיים'],
    visit: 'בקרו בבית הקפה',
    menu: 'צפו בתפריט',
  },
  drinks: {
    heading: 'נוצר במיוחד לרגע',
    description: 'קלאסיקות מוכרות ויצירות עונתיות, המוכנות מקפה שנבחר במיוחד לכל מתכון.',
    originLabel: 'מקור מומלץ',
    cards: [
      {
        id: 'espresso',
        name: 'אספרסו',
        desc: 'ביטוי קצר ועוצמתי של מקור יחיד, בחליטה מוקפדת.',
        origin: 'סראדו ברזילאי',
        roast: 'קלייה בינונית־כהה',
        notes: 'שוקולד מריר • אגוזי לוז',
      },
      {
        id: 'flatwhite',
        name: 'פלאט וייט',
        desc: 'קצף חלב משיי שנמזג על שוט כפול למרקם קטיפתי.',
        origin: 'אנטיגואה גואטמלי',
        roast: 'קלייה בינונית',
        notes: 'קקאו • תבלינים מתוקים',
      },
      {
        id: 'cappuccino',
        name: 'קפוצ׳ינו',
        desc: 'האיזון הקלאסי בין אספרסו, חלב מוקצף וקצף אוורירי.',
        origin: 'פינק בורבון קולומביאני',
        roast: 'קלייה בינונית',
        notes: 'קרמל • פירות טרופיים',
      },
      {
        id: 'v60',
        name: 'V60',
        desc: 'מזיגה איטית ומדויקת ששומרת על כל תו עדין בפוקוס.',
        origin: 'יִרְגָּצֵ׳ף אתיופי',
        roast: 'קלייה בהירה',
        notes: 'יסמין • הדרים',
      },
      {
        id: 'coldbrew',
        name: 'קולד ברו',
        desc: 'בהשריה של ארבע־עשרה שעות, מוגש קר — חלק ומתקתק באופן טבעי.',
        origin: 'טראסוּ קוסטה ריקני',
        roast: 'קלייה בינונית',
        notes: 'סוכר חום • הדרים',
      },
      {
        id: 'seasonal',
        name: 'משקה עונתי מיוחד',
        desc: 'יצירה מתחלפת של הבריסטות שלנו, בהשראת העונה.',
        origin: 'AA קנייתי',
        roast: 'קלייה בהירה־בינונית',
        notes: 'דומדמניות • פטל',
      },
    ],
    cta: 'לצפייה במבחר המלא',
  },
  team: {
    eyebrow: 'אנשים, לא פסי ייצור',
    heading: 'נוצר בידי אנשים סקרנים',
    description:
      'הקולים והבריסטות שלנו טועמים, בודקים, משנים ושואלים שאלות עד שכל קפה מבטא בכנות את המקום שממנו הגיע.',
    favOrigin: 'מקור אהוב',
    favBrew: 'שיטת הכנה אהובה',
    members: [
      {
        name: 'דנה ריברה',
        role: 'קולה ראשית',
        philosophy: 'הקלייה צריכה לחשוף את החווה, לא להחליף אותה.',
        origin: 'אתיופיה',
        brew: 'V60',
      },
      {
        name: 'עומר כץ',
        role: 'בריסטה ראשי',
        philosophy: 'כל כוס היא שיחה קטנה בין המגדל לאורח.',
        origin: 'קניה',
        brew: 'אספרסו',
      },
      {
        name: 'מאיה חן',
        role: 'רוכשת קפה ירוק',
        philosophy: 'אני מחפשת קפה עם תחושת מקום שאפשר לטעום.',
        origin: 'גואטמלה',
        brew: 'פרנץ׳ פרס',
      },
    ],
    cta: 'בקרו אותנו בבית הקפה',
  },
  sourcing: {
    heading: 'מכבדים כל מקור',
    description:
      'קפה טוב יותר מתחיל בקשרים חזקים יותר. אנו שואפים לרכש שקוף, קלייה אחראית ושותפויות ארוכות טווח עם האנשים שמגדלים כל יבול.',
    principles: [
      {
        title: 'מערכות יחסים ארוכות טווח',
        text: 'אנו שואפים לשותפויות יציבות ולא לרכישות חד־פעמיות ואנונימיות.',
      },
      {
        title: 'מקורות ניתנים למעקב',
        text: 'כל קפה מחובר למדינה, אזור, יצרן או קואופרטיב מוכרים.',
      },
      {
        title: 'קלייה מחושבת',
        text: 'קלייה במנות קטנות מסייעת להפחית בזבוז ולשמור על האיכות.',
      },
      {
        title: 'אריזות בעלות השפעה מופחתת',
        text: 'אנו ממשיכים לשפר את חומרי האריזה ולהפחית שימוש מיותר.',
      },
    ],
    path: { farm: 'חווה', roastery: 'בית הקלייה', cafe: 'בית הקפה' },
    cta: 'לרכישת הקפה',
  },
  match: {
    eyebrow: 'הכוס המושלמת שלכם',
    heading: 'איך אנחנו מתאימים לכם את הכוס המושלמת',
    description: 'קפה טוב מתחיל בהבנה של מה שאתם באמת אוהבים. כך אנחנו הופכים כמה תשובות קצרות להמלצה אישית.',
    steps: [
      {
        title: 'ספרו לנו איך אתם מכינים',
        text: 'מכונת אספרסו, פילטר, מקינטה או קולד ברו — אנחנו מתחילים מהדרך שבה אתם מכינים קפה, או האופן שבו הייתם רוצים שהוא יוכן עבורכם.',
      },
      {
        title: 'שתפו את טעמי הבחירה שלכם',
        text: 'פרחוני ובהיר, שוקולד ואגוזי, או נועז ועוצמתי — הטעמים שאתם אוהבים מצביעים ישר על מקור מתאים.',
      },
      {
        title: 'קבלו את ההתאמה האישית שלכם',
        text: 'אנחנו משלבים את התשובות שלכם עם פרופילי הקלייה שלנו כדי להמליץ על המקור, רמת הקלייה ושיטת ההכנה המדויקים עבורכם.',
      },
    ],
    cta: 'עברו לשאלון הטעימה',
  },
  quiz: {
    heading: 'מצאו את הקפה שמתאים לכם',
    description: 'ענו על שלוש שאלות קצרות וגלו את המקור, הקלייה ושיטת ההכנה שמתאימים לטעם שלכם.',
    stepLabel: 'שאלה {n} מתוך 3',
    questions: [
      {
        q: 'איך אתם בדרך כלל מכינים את הקפה שלכם?',
        options: ['מכונת אספרסו', 'פילטר', 'מקינטה', 'פרנץ׳ פרס', 'קולד ברו', 'מעדיפים שבית הקפה יכין'],
      },
      {
        q: 'אילו טעמים נשמעים לכם הכי טוב?',
        options: ['פרחוני והדרי', 'פירותי ובהיר', 'שוקולד וקרמל', 'אגוזי וחלק', 'כהה ועוצמתי'],
      },
      {
        q: 'עד כמה הקפה שלכם צריך להיות עוצמתי?',
        options: ['עדין', 'מאוזן', 'בעל גוף מלא', 'עוצמתי'],
      },
    ],
    resultKicker: 'הקפה שלכם',
    explanation: 'בהשראת האהבה שלכם לטעמים {flavor} ולהכנה בשיטת {method}, הכוס הזאת תרגיש כאילו נקלתה במיוחד עבורכם.',
    labels: { roast: 'קלייה', notes: 'תווי טעם', brew: 'שיטת הכנה מומלצת', cafeBrew: 'מוכן אצלנו בבית הקפה' },
    explore: 'גלו את הקפה',
    tryAgain: 'נסו שוב',
  },
  testimonials: {
    eyebrow: 'רגעים שחולקים סביב קפה',
    heading: 'מה האורחים שלנו זוכרים',
    favorite: 'הקפה האהוב',
    types: { guest: 'אורח בית הקפה', homeBrewer: 'מכין קפה ביתי', homeRoaster: 'קולה ביתי' },
    prev: 'ההמלצה הקודמת',
    next: 'ההמלצה הבאה',
    items: [
      {
        name: 'מאיה ל.',
        quote: 'הגעתי בשביל הפילטר האתיופי ונשארתי כי הבריסטה הסביר בדיוק למה הטעם שלו שונה כל כך מהקפה הרגיל שלי.',
        coffee: 'אתיופיה ירגצ׳ף',
        type: 'guest',
      },
      {
        name: 'דניאל ק.',
        quote: 'תאריכי הקלייה תמיד טריים, והסראדו הוא האספרסו הכי סלחני שהכנתי בבית.',
        coffee: 'סראדו ברזילאי',
        type: 'homeBrewer',
      },
      {
        name: 'נועה ב.',
        quote: 'הפולים הירוקים מקניה הגיעו עם הערות אמיתיות על צפיפות ולחות. הפיצוח הראשון שלי סוף סוף הצליח.',
        coffee: 'AA קנייתי',
        type: 'homeRoaster',
      },
      {
        name: 'תומר ס.',
        quote: 'ביקשתי משהו פרחוני והם עברו איתי על שלושה מקורות לפני שבחרתי. בלי לחץ ובלי שכנועים.',
        coffee: 'פינק בורבון קולומביאני',
        type: 'guest',
      },
      {
        name: 'שרה מ.',
        quote: 'הקולד ברו מטראסו העביר אותי את הקיץ. חלק כל כך שהפסקתי להוסיף חלב לגמרי.',
        coffee: 'טראסוּ קוסטה ריקני',
        type: 'homeBrewer',
      },
      {
        name: 'אבי ר.',
        quote: 'הפלאט וייט מאנטיגואה הוא הטקס השקט שלי לפני העבודה. אותו מקום ליד החלון, אותה כוס מוקפדת.',
        coffee: 'אנטיגואה גואטמלי',
        type: 'guest',
      },
    ],
  },
  visit: {
    heading: 'בואו לחוות את הסיפור',
    description: 'טעמו מקור חדש, השוו בין שיטות הכנה או פשוט שבו עם כוס שמוכנה בדיוק בדרך שאתם אוהבים.',
    addressLabel: 'איפה אנחנו',
    hoursLabel: 'שעות פתיחה',
    contactLabel: 'יצירת קשר',
    address: ['רחוב הקלייה 12', 'העיר העתיקה', 'העיר שלכם'],
    hours: ['ראשון – חמישי · 7:30 – 19:00', 'שישי · 7:30 – 14:00', 'שבת · סגור'],
    phone: '+000-00-000-0000',
    email: 'hello@terraroasters.example',
    features: ['ישיבה בפנים', 'מרפסת חיצונית', 'נגיש לכיסאות גלגלים', 'Wi-Fi חינם', 'חניה בקרבת מקום', 'ידידותי לכלבים'],
    directions: 'קבלו הוראות הגעה',
    contact: 'צרו קשר עם בית הקפה',
    mapLabel: 'מפה — החליפו בהטמעת מפה אמיתית',
  },
  faq: {
    heading: 'שאלות נפוצות',
    description: 'כל מה שכדאי לדעת לפני הכוס הראשונה — וכמה דברים שכדאי לדעת גם אחריה.',
    items: [
      {
        q: 'כמה טרי הקפה כשהוא נשלח?',
        a: 'כל שקית נקלית לפי הזמנה ונשלחת תוך 24–48 שעות מהקלייה, כך שתמיד תקבלו קפה בשיאו.',
      },
      {
        q: 'מה ההבדל בין קלייה בהירה, בינונית וכהה?',
        a: 'רמת הקלייה משנה את הטעם, לא את כמות הקפאין. קלייה בהירה שומרת על תווים בהירים ומקוריים, וקלייה כהה מביאה מתיקות קלויה ועמוקה יותר. מדריך ההכנה שלנו יעזור לכם לבחור.',
      },
      {
        q: 'האם יש לכם מנוי לקפה?',
        a: 'כן — בחרו את המקור, הקלייה והטחינה המועדפים עליכם, ואנחנו נקלה ונשלח בקצב שנוח לכם. אפשר להשהות, לדלג או לבטל בכל עת.',
      },
      {
        q: 'אפשר לבקר בבית הקלייה או בבית הקפה?',
        a: 'בהחלט. בית הקפה שלנו פתוח מדי יום, וניתן לתאם סיורים בבית הקלייה ישירות מול הצוות שלנו.',
      },
      {
        q: 'יש לכם אפשרויות נטולות קפאין או צמחיות?',
        a: 'כן, יש לנו קפה נטול קפאין בעיבוד טבעי, ובבית הקפה מוגשים גם חלב שיבולת שועל, שקדים וסויה.',
      },
      {
        q: 'איך כדאי לאחסן את הקפה בבית?',
        a: 'שמרו את הפולים בכלי אטום, הרחק מאור וחום, ונצלו אותם תוך מספר שבועות מתאריך הקלייה לטעם הטוב ביותר.',
      },
    ],
  },
  finale: {
    heading: 'כל סיפור גדול מתחיל בכוס אחת.',
    description: 'גלו מקור חדש, למדו כיצד הוא נקלה או בקרו אצלנו וחוו את הכוס הסופית בעצמכם.',
    explore: 'גלו את הקפה שלנו',
    visit: 'בקרו בבית הקפה',
  },
  footer: {
    statement: 'הקפה עבר אלפי קילומטרים לפני שהגיע לכוס שלכם. אנחנו הופכים כל שלב בדרך לראוי לגילוי.',
    newsletter: {
      heading: 'סיפורים מבית הקלייה',
      description: 'קבלו עדכונים על מקורות חדשים, חדשות מבית הקפה, מדריכי הכנה וסיפורים מהחוות שמאחורי הקפה שלנו.',
      placeholder: 'כתובת האימייל שלכם',
      submit: 'הצטרפו ליומן שלנו',
      success: 'ברוכים הבאים ליומן של Terra.',
      error: 'נא להזין כתובת אימייל תקינה.',
      emailLabel: 'כתובת אימייל',
    },
    columns: [
      {
        title: 'גלו',
        links: [
          { label: 'מקורות הקפה', href: '#origins' },
          { label: 'קולקציות קפה', href: '/coffee' },
          { label: 'פולי קפה ירוקים', href: '#services' },
          { label: 'קפה קלוי', href: '#services' },
          { label: 'שיטות הכנה', href: '#brewing' },
        ],
      },
      {
        title: 'Terra',
        links: [
          { label: 'הסיפור שלנו', href: '#story' },
          { label: 'תהליך הקלייה', href: '#roasting' },
          { label: 'האנשים שלנו', href: '#story' },
          { label: 'אחריות', href: '/coffee-origins#sourcing' },
          { label: 'סיפור המקורות', href: '/coffee-origins' },
        ],
      },
      {
        title: 'בית הקפה',
        links: [
          { label: 'בקרו אצלנו', href: '#contact' },
          { label: 'תפריט בית הקפה', href: '#drinks' },
          { label: 'שעות פתיחה', href: '#contact' },
          { label: 'נגישות', href: '#footer' },
          { label: 'יצירת קשר', href: '#contact' },
        ],
      },
    ],
    followUs: 'עקבו אחרי Terra Roasters',
    legal: [
      { label: 'פרטיות', href: '#' },
      { label: 'תנאי שימוש', href: '#' },
      { label: 'הצהרת נגישות', href: '#' },
      { label: 'העדפות קובצי Cookie', href: '#' },
    ],
    closing: 'נוצר מתוך סקרנות. נקלה בדיוק.',
    copyright: '© 2026 Terra Roasters. כל הזכויות שמורות.',
    backToTop: 'חזרה למעלה',
  },
}

// French: structurally prepared — falls back to English until translated.
const fr: SectionsText = en

export const sectionsText: Record<Lang, SectionsText> = { en, fr, he }

// ---------------------------------------------------------------------------
// Quiz scoring (language-independent)
// ---------------------------------------------------------------------------

type Score = Partial<Record<OriginId, number>>

export const QUIZ_SCORES: Score[][] = [
  // Q1 — brewing method
  [
    { brazil: 2, guatemala: 1 }, // espresso machine
    { ethiopia: 2, kenya: 1 }, // filter
    { guatemala: 2, brazil: 1 }, // moka pot
    { brazil: 2, guatemala: 1 }, // french press
    { costarica: 2, colombia: 1 }, // cold brew
    { colombia: 1, ethiopia: 1 }, // café
  ],
  // Q2 — flavors
  [
    { ethiopia: 3, colombia: 2 }, // floral & citrus
    { kenya: 3, colombia: 2 }, // fruity & bright
    { guatemala: 3, brazil: 2 }, // chocolate & caramel
    { brazil: 3, costarica: 1 }, // nutty & smooth
    { brazil: 3, guatemala: 2 }, // dark & intense
  ],
  // Q3 — boldness
  [
    { ethiopia: 2, colombia: 1 }, // delicate
    { costarica: 2, guatemala: 1 }, // balanced
    { brazil: 2, guatemala: 1 }, // full-bodied
    { brazil: 2, kenya: 1 }, // intense
  ],
]

export function scoreQuiz(answers: number[]): OriginId {
  const totals: Record<string, number> = {}
  answers.forEach((answer, questionIndex) => {
    const scores = QUIZ_SCORES[questionIndex]?.[answer]
    if (!scores) return
    for (const [id, value] of Object.entries(scores)) {
      totals[id] = (totals[id] ?? 0) + (value ?? 0)
    }
  })
  let best: OriginId = 'ethiopia'
  let bestScore = -1
  for (const [id, value] of Object.entries(totals)) {
    if (value > bestScore) {
      bestScore = value
      best = id as OriginId
    }
  }
  return best
}
