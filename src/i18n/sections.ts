import type { Lang, OriginId } from './translations'

// ---------------------------------------------------------------------------
// Content for every section after "Explore a Similar Cup".
// English, French and Hebrew are fully written.
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
const fr: SectionsText = {
  roasting: {
    eyebrow: 'LE SAVOIR-FAIRE DERRIÈRE LE GOÛT',
    heading: 'De l’origine à la torréfaction',
    description:
      'Chaque origine réagit différemment à la chaleur. Nous développons un profil de torréfaction unique pour chaque café, révélant la douceur, les arômes et le caractère déjà présents dans le grain.',
    stages: [
      {
        num: '01',
        title: 'Sélection',
        text: 'La densité, l’altitude, la méthode de traitement et l’humidité de chaque grain façonnent le profil de torréfaction que nous créons.',
      },
      {
        num: '02',
        title: 'Développement',
        text: 'Température, flux d’air et durée sont soigneusement équilibrés pour révéler la douceur sans masquer l’identité de l’origine.',
      },
      {
        num: '03',
        title: 'Premier crack',
        text: 'Le grain se dilate, ses arômes s’intensifient et son caractère naturel commence à émerger.',
      },
      {
        num: '04',
        title: 'Expression',
        text: 'La torréfaction s’achève lorsque l’acidité, la douceur, le corps et les arômes atteignent leur équilibre idéal.',
      },
    ],
    selectorTitle: 'Choisissez votre torréfaction',
    roasts: {
      light: {
        name: 'Torréfaction claire',
        desc: 'Florale, agrumes, délicate comme un thé et lumineuse.',
        brew: 'Idéale pour V60, Chemex et café filtre.',
        notes: ['Jasmin', 'Agrumes', 'Thé blanc'],
      },
      medium: {
        name: 'Torréfaction moyenne',
        desc: 'Équilibrée, caramélisée, douce et ronde.',
        brew: 'Idéale pour espresso, AeroPress et cafetière moka.',
        notes: ['Caramel', 'Fruits rouges', 'Cacao'],
      },
      dark: {
        name: 'Torréfaction foncée',
        desc: 'Cacao profond, noix grillées, mélasse et corps ample.',
        brew: 'Idéale pour les boissons lactées et la French press.',
        notes: ['Cacao noir', 'Noix grillées', 'Mélasse'],
      },
    },
    meterLabels: { acidity: 'Acidité', sweetness: 'Douceur', body: 'Corps', brew: 'Préparation recommandée', notes: 'Notes aromatiques' },
    curveLabels: { temperature: 'Température', airflow: 'Flux d’air', development: 'Développement', time: 'Temps' },
  },
  services: {
    heading: 'Le café, à votre façon',
    description:
      'Partez du grain vert, choisissez une torréfaction adaptée à votre méthode de préparation, ou laissez nos baristas préparer la tasse finale pour vous.',
    cards: [
      {
        title: 'Café vert en grains',
        text: 'Des grains non torréfiés issus de fermes et de régions remarquables du monde entier, prêts pour les torréfacteurs amateurs expérimentés et les professionnels.',
        button: 'Découvrir le café vert',
        href: '/coffee',
      },
      {
        title: 'Grains fraîchement torréfiés',
        text: 'Des grains entiers torréfiés en petits lots et adaptés à l’espresso, au filtre, à la moka, à la French press ou au cold brew.',
        button: 'Explorer nos torréfactions',
        href: '/coffee',
      },
      {
        title: 'Préparé dans notre café',
        text: 'Choisissez une origine et laissez nos baristas la préparer en espresso, cappuccino, flat white, V60, latte ou cold brew.',
        button: 'Voir la carte du café',
        href: '#drinks',
      },
    ],
  },
  brewing: {
    heading: 'Un grain. Mille expressions.',
    description:
      'La méthode de préparation transforme la texture, les arômes, la clarté et l’intensité. Découvrez comment chaque préparation révèle une facette différente du café.',
    meterLabels: { texture: 'Texture', intensity: 'Intensité', clarity: 'Clarté', time: 'Temps de préparation', roast: 'Torréfaction recommandée' },
    methods: {
      espresso: {
        name: 'Espresso',
        desc: 'Concentré, aromatique et corsé, avec une crema riche et une finale intense.',
        roast: 'Torréfaction moyenne–foncée',
        time: '≈ 30 secondes',
      },
      v60: {
        name: 'V60',
        desc: 'Net, lumineux et aromatique, laissant s’exprimer les délicates notes fruitées et florales.',
        roast: 'Torréfaction claire',
        time: '≈ 3 minutes',
      },
      frenchpress: {
        name: 'French Press',
        desc: 'Riche et texturé, avec un corps ample et une expression profonde de chocolat et d’épices.',
        roast: 'Torréfaction foncée',
        time: '≈ 4 minutes',
      },
      moka: {
        name: 'Cafetière moka',
        desc: 'Intense et sirupeux, avec une douceur torréfiée et une chaleur familière.',
        roast: 'Torréfaction moyenne',
        time: '≈ 5 minutes',
      },
      coldbrew: {
        name: 'Cold Brew',
        desc: 'Doux, rafraîchissant, naturellement sucré et faible en acidité perçue.',
        roast: 'Torréfaction moyenne',
        time: '≈ 14 heures',
      },
      cappuccino: {
        name: 'Cappuccino',
        desc: 'Un espresso adouci par une mousse de lait veloutée — réconfortant, doux et parfaitement équilibré.',
        roast: 'Torréfaction moyenne–foncée',
        time: '≈ 2 minutes',
      },
    },
    cta: 'Vous hésitez ? Faites le quiz',
  },
  cafe: {
    eyebrow: 'UN LIEU POUR RALENTIR',
    heading: 'Plus que du café.',
    description:
      'Un espace chaleureux où un café préparé avec soin, des conversations paisibles et des détails pensés font partie du rituel.',
    labels: ['Torréfié chaque jour', 'Baristas passionnés', 'Salle et terrasse', 'Boissons de saison'],
    visit: 'Visiter notre café',
    menu: 'Voir la carte',
  },
  drinks: {
    heading: 'Créé pour l’instant présent',
    description: 'Des classiques familiers et des créations de saison, préparés avec des cafés choisis spécialement pour chaque recette.',
    originLabel: 'Origine recommandée',
    cards: [
      {
        id: 'espresso',
        name: 'Espresso',
        desc: 'L’expression courte et intense d’une origine unique, extraite avec soin.',
        origin: 'Cerrado brésilien',
        roast: 'Torréfaction moyenne-foncée',
        notes: 'Chocolat noir • Noisette',
      },
      {
        id: 'flatwhite',
        name: 'Flat White',
        desc: 'Une micro-mousse soyeuse versée sur un double shot pour une texture veloutée.',
        origin: 'Antigua guatémaltèque',
        roast: 'Torréfaction moyenne',
        notes: 'Cacao • Épices douces',
      },
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        desc: 'L’équilibre classique entre espresso, lait chauffé et mousse aérienne.',
        origin: 'Pink Bourbon colombien',
        roast: 'Torréfaction moyenne',
        notes: 'Caramel • Fruits tropicaux',
      },
      {
        id: 'v60',
        name: 'V60',
        desc: 'Une extraction lente et précise qui garde chaque note délicate bien nette.',
        origin: 'Yirgacheffe éthiopien',
        roast: 'Torréfaction claire',
        notes: 'Jasmin • Agrumes',
      },
      {
        id: 'coldbrew',
        name: 'Cold Brew',
        desc: 'Infusé quatorze heures, servi froid — doux et naturellement sucré.',
        origin: 'Tarrazú costaricien',
        roast: 'Torréfaction moyenne',
        notes: 'Sucre brun • Agrumes',
      },
      {
        id: 'seasonal',
        name: 'Création de saison',
        desc: 'Une création changeante de nos baristas, inspirée par la saison.',
        origin: 'Kenya AA',
        roast: 'Torréfaction moyenne-claire',
        notes: 'Cassis • Framboise',
      },
    ],
    cta: 'Découvrir toute la collection',
  },
  team: {
    eyebrow: 'DES PERSONNES, PAS DES CHAÎNES DE PRODUCTION',
    heading: 'Façonné par des esprits curieux',
    description:
      'Nos torréfacteurs et baristas goûtent, testent, ajustent et remettent en question chaque décision jusqu’à ce que chaque café exprime honnêtement son origine.',
    favOrigin: 'Origine préférée',
    favBrew: 'Préparation préférée',
    members: [
      // PLACEHOLDER people — replace names, roles and quotes with your real team.
      {
        name: 'Dana Rivera',
        role: 'Cheffe torréfactrice',
        philosophy: 'Une torréfaction doit révéler la ferme, pas la remplacer.',
        origin: 'Éthiopie',
        brew: 'V60',
      },
      {
        name: 'Omer Katz',
        role: 'Barista principal',
        philosophy: 'Chaque tasse est une petite conversation entre le producteur et l’invité.',
        origin: 'Kenya',
        brew: 'Espresso',
      },
      {
        name: 'Maya Chen',
        role: 'Acheteuse de café vert',
        philosophy: 'Je cherche des cafés dont on peut goûter le terroir.',
        origin: 'Guatemala',
        brew: 'French Press',
      },
    ],
    cta: 'Rendez-nous visite au café',
  },
  sourcing: {
    heading: 'Respecter chaque origine',
    description:
      'Un meilleur café commence par des relations plus solides. Nous œuvrons pour un approvisionnement transparent, une torréfaction responsable et des partenariats durables avec celles et ceux qui cultivent chaque récolte.',
    principles: [
      {
        title: 'Des relations durables',
        text: 'Nous privilégions des partenariats constants plutôt que des achats anonymes et ponctuels.',
      },
      {
        title: 'Des origines traçables',
        text: 'Chaque café est relié à un pays, une région, un producteur ou une coopérative identifiés.',
      },
      {
        title: 'Une torréfaction réfléchie',
        text: 'La torréfaction en petits lots réduit le gaspillage tout en préservant la qualité.',
      },
      {
        title: 'Des emballages à moindre impact',
        text: 'Nous améliorons sans cesse nos matériaux et réduisons les emballages superflus.',
      },
    ],
    path: { farm: 'Ferme', roastery: 'Atelier', cafe: 'Café' },
    cta: 'Découvrir nos cafés',
  },
  match: {
    eyebrow: 'VOTRE TASSE IDÉALE',
    heading: 'Comment nous trouvons votre tasse idéale',
    description:
      'Un bon café commence par savoir ce que vous aimez vraiment. Voici comment quelques réponses rapides deviennent une recommandation personnelle.',
    steps: [
      {
        title: 'Dites-nous comment vous préparez votre café',
        text: 'Machine espresso, filtre, moka ou cold brew — nous partons de votre façon de faire le café, ou de la façon dont vous aimeriez qu’il soit préparé pour vous.',
      },
      {
        title: 'Partagez vos goûts',
        text: 'Floral et lumineux, chocolaté et noiseté, ou corsé et intense — les saveurs que vous aimez mènent tout droit à une origine.',
      },
      {
        title: 'Recevez votre recommandation personnelle',
        text: 'Nous combinons vos réponses avec nos profils de torréfaction pour vous recommander l’origine, le niveau de torréfaction et la méthode de préparation qui vous correspondent.',
      },
    ],
    cta: 'Faire le quiz des saveurs',
  },
  quiz: {
    heading: 'Trouvez le café qui vous ressemble',
    description:
      'Répondez à trois questions rapides et découvrez l’origine, la torréfaction et la méthode de préparation qui correspondent le mieux à vos goûts.',
    stepLabel: 'Question {n} sur 3',
    questions: [
      {
        q: 'Comment préparez-vous votre café habituellement ?',
        options: ['Machine espresso', 'Filtre', 'Cafetière moka', 'French press', 'Cold brew', 'Préparé au café'],
      },
      {
        q: 'Quelles saveurs vous attirent le plus ?',
        options: ['Florales et agrumes', 'Fruitées et lumineuses', 'Chocolat et caramel', 'Noiseté et doux', 'Sombres et intenses'],
      },
      {
        q: 'Quelle intensité recherchez-vous ?',
        options: ['Délicate', 'Équilibrée', 'Corsée', 'Intense'],
      },
    ],
    resultKicker: 'Votre café',
    explanation:
      'Entre votre amour des saveurs {flavor} et votre rituel {method}, cette tasse semble avoir été torréfiée rien que pour vous.',
    labels: { roast: 'Torréfaction', notes: 'Notes aromatiques', brew: 'Préparation recommandée', cafeBrew: 'Préparé dans notre café' },
    explore: 'Découvrir ce café',
    tryAgain: 'Recommencer',
  },
  testimonials: {
    eyebrow: 'PARTAGÉ AUTOUR D’UN CAFÉ',
    heading: 'Ce que nos invités retiennent',
    favorite: 'Café préféré',
    types: { guest: 'Client du café', homeBrewer: 'Barista maison', homeRoaster: 'Torréfacteur maison' },
    prev: 'Témoignage précédent',
    next: 'Témoignage suivant',
    items: [
      // PLACEHOLDER testimonials — replace with real guest quotes.
      {
        name: 'Maya L.',
        quote:
          'Je suis venue pour le café filtre éthiopien et je suis restée parce que le barista m’a expliqué exactement pourquoi il était si différent de mon café habituel.',
        coffee: 'Yirgacheffe éthiopien',
        type: 'guest',
      },
      {
        name: 'Daniel K.',
        quote: 'Leurs dates de torréfaction sont toujours fraîches, et le Cerrado donne l’espresso le plus indulgent que j’aie préparé chez moi.',
        coffee: 'Cerrado brésilien',
        type: 'homeBrewer',
      },
      {
        name: 'Noa B.',
        quote: 'Les grains verts du Kenya sont arrivés avec de vraies notes sur la densité et l’humidité. Mon premier crack a enfin eu du sens.',
        coffee: 'Kenya AA',
        type: 'homeRoaster',
      },
      {
        name: 'Tomer S.',
        quote: 'J’ai demandé quelque chose de floral et ils m’ont fait découvrir trois origines avant que je choisisse. Sans précipitation, sans vente forcée.',
        coffee: 'Pink Bourbon colombien',
        type: 'guest',
      },
      {
        name: 'Sarah M.',
        quote: 'Le cold brew Tarrazú m’a accompagnée tout l’été. Si doux que j’ai complètement arrêté d’ajouter du lait.',
        coffee: 'Tarrazú costaricien',
        type: 'homeBrewer',
      },
      {
        name: 'Avi R.',
        quote: 'Le flat white Antigua est mon rituel tranquille avant le travail. La même place près de la fenêtre, la même tasse soignée.',
        coffee: 'Antigua guatémaltèque',
        type: 'guest',
      },
    ],
  },
  visit: {
    heading: 'Venez vivre l’histoire',
    description:
      'Goûtez une origine, comparez les méthodes de préparation ou installez-vous simplement avec une tasse préparée exactement comme vous l’aimez.',
    addressLabel: 'Nous trouver',
    hoursLabel: 'Horaires d’ouverture',
    contactLabel: 'Contact',
    // PLACEHOLDER business info — replace before launch.
    address: ['12 rue de la Torréfaction', 'Quartier de la Vieille Ville', 'Votre ville'],
    hours: ['Dimanche – Jeudi · 7h30 – 19h00', 'Vendredi · 7h30 – 14h00', 'Samedi · Fermé'],
    phone: '+000-00-000-0000',
    email: 'hello@terraroasters.example',
    features: ['Salle intérieure', 'Terrasse extérieure', 'Accessible en fauteuil roulant', 'Wi-Fi gratuit', 'Parking à proximité', 'Chiens bienvenus'],
    directions: 'Itinéraire',
    contact: 'Contacter le café',
    mapLabel: 'Carte — à remplacer par votre carte interactive',
  },
  faq: {
    heading: 'Questions fréquentes',
    description: 'Tout ce qu’il faut savoir avant votre première tasse — et quelques choses utiles pour après.',
    items: [
      {
        q: 'Quelle est la fraîcheur du café à l’expédition ?',
        a: 'Chaque sachet est torréfié à la commande et expédié dans les 24 à 48 heures suivant la torréfaction, pour que vous receviez toujours un café à son apogée.',
      },
      {
        q: 'Quelle est la différence entre torréfaction claire, moyenne et foncée ?',
        a: 'Le niveau de torréfaction change le goût, pas la teneur en caféine. Les torréfactions claires gardent des notes vives marquées par l’origine ; les foncées apportent une douceur torréfiée plus profonde. Notre guide de préparation peut vous aider à choisir.',
      },
      {
        q: 'Proposez-vous un abonnement café ?',
        a: 'Oui — choisissez votre origine, votre torréfaction et votre mouture préférées, et nous torréfions et expédions au rythme qui vous convient. Pause, saut ou annulation à tout moment.',
      },
      {
        q: 'Peut-on visiter l’atelier ou le café ?',
        a: 'Bien sûr. Notre café est ouvert tous les jours, et les visites de l’atelier de torréfaction se réservent directement auprès de notre équipe — contactez-nous.',
      },
      {
        q: 'Avez-vous du décaféiné ou des laits végétaux ?',
        a: 'Oui, nous proposons un décaféiné de traitement naturel ainsi que du lait d’avoine, d’amande et de soja au café.',
      },
      {
        q: 'Comment conserver mon café à la maison ?',
        a: 'Gardez les grains dans un récipient hermétique, à l’abri de la lumière et de la chaleur, et consommez-les dans les semaines qui suivent la date de torréfaction pour un goût optimal.',
      },
    ],
  },
  finale: {
    heading: 'Chaque grande histoire commence par une tasse.',
    description: 'Découvrez une nouvelle origine, apprenez comment elle a été torréfiée ou rendez-nous visite et goûtez la tasse finale par vous-même.',
    explore: 'Découvrir nos cafés',
    visit: 'Visiter notre café',
  },
  footer: {
    statement:
      'Le café parcourt des milliers de kilomètres avant d’atteindre votre tasse. Nous faisons de chaque étape une découverte.',
    newsletter: {
      heading: 'Histoires de l’atelier',
      description:
        'Recevez les nouvelles origines, les actualités du café, des guides de préparation et des histoires des fermes derrière nos cafés.',
      placeholder: 'Votre adresse e-mail',
      submit: 'Rejoindre le journal',
      success: 'Bienvenue dans le journal Terra.',
      error: 'Veuillez saisir une adresse e-mail valide.',
      emailLabel: 'Adresse e-mail',
    },
    columns: [
      {
        title: 'Découvrir',
        links: [
          { label: 'Origines', href: '#origins' },
          { label: 'Collections de café', href: '/coffee' },
          { label: 'Café vert en grains', href: '#services' },
          { label: 'Café torréfié', href: '#services' },
          { label: 'Méthodes de préparation', href: '#brewing' },
        ],
      },
      {
        title: 'Terra',
        links: [
          { label: 'Notre histoire', href: '#story' },
          { label: 'La torréfaction', href: '#roasting' },
          { label: 'Notre équipe', href: '#story' },
          { label: 'Responsabilité', href: '/coffee-origins#sourcing' },
          { label: 'L’histoire des origines', href: '/coffee-origins' },
        ],
      },
      {
        title: 'Café',
        links: [
          { label: 'Nous rendre visite', href: '#contact' },
          { label: 'Carte du café', href: '#drinks' },
          { label: 'Horaires d’ouverture', href: '#contact' },
          { label: 'Accessibilité', href: '#footer' },
          { label: 'Contact', href: '#contact' },
        ],
      },
    ],
    followUs: 'Suivez Terra Roasters',
    legal: [
      { label: 'Confidentialité', href: '#' },
      { label: 'Conditions', href: '#' },
      { label: 'Déclaration d’accessibilité', href: '#' },
      { label: 'Préférences de cookies', href: '#' },
    ],
    closing: 'Créé avec curiosité. Torréfié avec précision.',
    copyright: '© 2026 Terra Roasters. Tous droits réservés.',
    backToTop: 'Retour en haut',
  },
}

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
