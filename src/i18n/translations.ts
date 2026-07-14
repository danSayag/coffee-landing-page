export type Lang = 'en' | 'fr' | 'he'

export type OriginId = 'ethiopia' | 'colombia' | 'brazil' | 'kenya' | 'guatemala' | 'costarica'

export interface HeadlineWord {
  text: string
  accent?: boolean
  breakBefore?: boolean
}

export interface OriginText {
  country: string
  region: string
  description: string
  notes: [string, string, string]
  roast: string
  profile: string
  coffeeName: string
  collectionDescription: string
  blurb: string
}

export interface Translation {
  dir: 'ltr' | 'rtl'
  nav: {
    home: string
    origins: string
    coffee: string
    cafe: string
    quiz: string
    contact: string
    visitCafe: string
  }
  hero: {
    kicker: string
    headline: HeadlineWord[]
    paragraph: string
    ctaExplore: string
    ctaCafe: string
    badges: string[]
  }
  origins: {
    kicker: string
    title: string
    subtitle: string
    scrollHint: string
    interactiveHint: string
    flavorNotesLabel: string
    closeCard: string
    items: Record<OriginId, OriginText>
  }
  collections: {
    kicker: string
    heading: string
    subtitle: string
    explore: string
    selectedBadge: string
    prev: string
    next: string
  }
  similar: {
    heading: string
    becauseYouChose: string
  }
  a11y: {
    open: string
    title: string
    fontSize: string
    highContrast: string
    underlineLinks: string
    stopAnimations: string
    reset: string
    close: string
    language: string
  }
}

const en: Translation = {
  dir: 'ltr',
  nav: {
    home: 'Home',
    origins: 'Origins',
    coffee: 'Our Coffee',
    cafe: 'Café',
    quiz: 'Quiz',
    contact: 'Contact',
    visitCafe: 'Visit Our Café',
  },
  hero: {
    kicker: 'Specialty Coffee From Around the World',
    headline: [
      { text: 'Every' },
      { text: 'Bean' },
      { text: 'Has', breakBefore: true },
      { text: 'a' },
      { text: 'Story.', accent: true },
    ],
    paragraph:
      'Anyone can serve coffee. We source rare beans from the world’s finest farms, roast them in house, and craft every cup into a moment worth savoring.',
    ctaExplore: 'Explore Our Coffee',
    ctaCafe: 'Visit Our Café',
    badges: ['Sourced From 40+ Countries', 'Roasted In House', 'Specialty Grade Coffee'],
  },
  origins: {
    kicker: 'The Journey of the Bean',
    title: 'Every Bean Begins Somewhere.',
    subtitle:
      'Every cup starts its journey thousands of miles away. Discover the farms, regions, and stories behind every origin we carefully source.',
    scrollHint: 'Scroll to follow the journey',
    interactiveHint: 'Click a bean to discover its origin story',
    flavorNotesLabel: 'Flavor Notes',
    closeCard: 'Close',
    items: {
      ethiopia: {
        country: 'Ethiopia',
        region: 'Yirgacheffe Highlands',
        description:
          'Grown at high altitude with delicate floral aromas, citrus brightness, and a clean finish.',
        notes: ['Jasmine', 'Citrus', 'Honey'],
        roast: 'Light Roast',
        profile: 'Floral & Citrus',
        coffeeName: 'Ethiopian Yirgacheffe',
        collectionDescription:
          'The birthplace of coffee — heirloom varieties washed at altitude for a luminous, tea-like cup.',
        blurb: 'Delicate florals with sparkling citrus brightness.',
      },
      colombia: {
        country: 'Colombia',
        region: 'Finca El Mirador, Huila',
        description:
          'A rare Pink Bourbon cultivated on volcanic slopes, prized for its perfumed sweetness and silky body.',
        notes: ['Rose', 'Tropical Fruit', 'Caramel'],
        roast: 'Medium-Light Roast',
        profile: 'Floral & Tropical',
        coffeeName: 'Colombian Pink Bourbon',
        collectionDescription:
          'A rare Huila micro-lot from volcanic slopes — perfumed, juicy, and quietly extravagant.',
        blurb: 'Floral aroma and tropical fruit notes.',
      },
      brazil: {
        country: 'Brazil',
        region: 'Fazenda Alta Vista, Cerrado Mineiro',
        description:
          'Slow sun-dried naturals from mineral-rich plateaus, delivering deep sweetness and a velvety chocolate body.',
        notes: ['Dark Chocolate', 'Hazelnut', 'Molasses'],
        roast: 'Medium-Dark Roast',
        profile: 'Chocolate & Nuts',
        coffeeName: 'Brazilian Cerrado',
        collectionDescription:
          'Sun-dried naturals from the Cerrado plateau — comfort in a cup, born for espresso.',
        blurb: 'Deep chocolate body with a velvety, sweet finish.',
      },
      kenya: {
        country: 'Kenya',
        region: 'Nyeri Highlands, Mount Kenya',
        description:
          'Red volcanic soils and cool mountain air yield a vivid cup of blackcurrant, berries, and sparkling acidity.',
        notes: ['Blackcurrant', 'Raspberry', 'Grapefruit'],
        roast: 'Medium-Light Roast',
        profile: 'Berries & Bright',
        coffeeName: 'Kenyan AA',
        collectionDescription:
          'Screen-18 AA lots from Nyeri’s red soils, bursting with blackcurrant and juicy acidity.',
        blurb: 'Berry sweetness with bright acidity.',
      },
      guatemala: {
        country: 'Guatemala',
        region: 'Antigua Valley Estates',
        description:
          'Shade-grown between three volcanoes, balancing cocoa richness with gentle spice and orange zest.',
        notes: ['Cocoa', 'Sweet Spice', 'Orange Zest'],
        roast: 'Medium Roast',
        profile: 'Cocoa & Spice',
        coffeeName: 'Guatemalan Antigua',
        collectionDescription:
          'Shade-grown beneath volcanoes in the Antigua valley — balanced, warm, softly spiced.',
        blurb: 'Cocoa warmth wrapped in gentle spice.',
      },
      costarica: {
        country: 'Costa Rica',
        region: 'Tarrazú Highlands',
        description:
          'Honey-processed micro-lots from high mountain farms, immaculately clean with layered sweetness.',
        notes: ['Citrus', 'Brown Sugar', 'Red Apple'],
        roast: 'Medium Roast',
        profile: 'Sweet & Citrus',
        coffeeName: 'Costa Rican Tarrazú',
        collectionDescription:
          'Honey-processed micro-lots from the Tarrazú highlands, immaculately clean and sweet.',
        blurb: 'Balanced sweetness with citrus brightness.',
      },
    },
  },
  collections: {
    kicker: 'Our Collections',
    heading: 'Explore Coffee by Origin',
    subtitle: 'Each origin offers a unique expression of climate, altitude, and craftsmanship.',
    explore: 'Explore This Coffee',
    selectedBadge: 'Selected from the Map',
    prev: 'Previous coffee',
    next: 'Next coffee',
  },
  similar: {
    heading: 'Explore a Similar Cup',
    becauseYouChose: 'Because you chose',
  },
  a11y: {
    open: 'Accessibility settings',
    title: 'Accessibility Settings',
    fontSize: 'Font Size',
    highContrast: 'High Contrast',
    underlineLinks: 'Underline Links',
    stopAnimations: 'Stop Animations',
    reset: 'Reset Settings',
    close: 'Close',
    language: 'Language',
  },
}

const fr: Translation = {
  dir: 'ltr',
  nav: {
    home: 'Accueil',
    origins: 'Origines',
    coffee: 'Nos Cafés',
    cafe: 'Café',
    quiz: 'Quiz',
    contact: 'Contact',
    visitCafe: 'Visiter notre café',
  },
  hero: {
    kicker: 'Café de spécialité venu du monde entier',
    headline: [
      { text: 'Chaque' },
      { text: 'grain' },
      { text: 'a', breakBefore: true },
      { text: 'une' },
      { text: 'histoire.', accent: true },
    ],
    paragraph:
      'N’importe qui peut servir un café. Nous sélectionnons des grains rares issus des plus belles fermes du monde, les torréfions sur place et faisons de chaque tasse un moment d’exception.',
    ctaExplore: 'Découvrir nos cafés',
    ctaCafe: 'Visiter notre café',
    badges: ['Sourcé dans plus de 40 pays', 'Torréfié sur place', 'Café de spécialité'],
  },
  origins: {
    kicker: 'Le voyage du grain',
    title: 'Chaque grain commence quelque part.',
    subtitle:
      'Chaque tasse commence son voyage à des milliers de kilomètres. Découvrez les fermes, les régions et les histoires derrière chacune de nos origines.',
    scrollHint: 'Faites défiler pour suivre le voyage',
    interactiveHint: 'Cliquez sur un grain pour découvrir son histoire',
    flavorNotesLabel: 'Notes aromatiques',
    closeCard: 'Fermer',
    items: {
      ethiopia: {
        country: 'Éthiopie',
        region: 'Hauts plateaux de Yirgacheffe',
        description:
          'Cultivé en haute altitude, avec de délicats arômes floraux, une vivacité d’agrumes et une finale nette.',
        notes: ['Jasmin', 'Agrumes', 'Miel'],
        roast: 'Torréfaction claire',
        profile: 'Floral & Agrumes',
        coffeeName: 'Yirgacheffe d’Éthiopie',
        collectionDescription:
          'Le berceau du café — des variétés anciennes lavées en altitude pour une tasse lumineuse, presque thé.',
        blurb: 'Fleurs délicates et éclat pétillant d’agrumes.',
      },
      colombia: {
        country: 'Colombie',
        region: 'Finca El Mirador, Huila',
        description:
          'Un rare Bourbon Rose cultivé sur des pentes volcaniques, prisé pour sa douceur parfumée et son corps soyeux.',
        notes: ['Rose', 'Fruits tropicaux', 'Caramel'],
        roast: 'Torréfaction mi-claire',
        profile: 'Floral & Tropical',
        coffeeName: 'Bourbon Rose de Colombie',
        collectionDescription:
          'Un micro-lot rare du Huila, né de pentes volcaniques — parfumé, juteux, discrètement extravagant.',
        blurb: 'Arômes floraux et notes de fruits tropicaux.',
      },
      brazil: {
        country: 'Brésil',
        region: 'Fazenda Alta Vista, Cerrado Mineiro',
        description:
          'Des naturels séchés lentement au soleil sur des plateaux minéraux, pour une douceur profonde et un corps chocolaté velouté.',
        notes: ['Chocolat noir', 'Noisette', 'Mélasse'],
        roast: 'Torréfaction mi-foncée',
        profile: 'Chocolat & Noisette',
        coffeeName: 'Cerrado du Brésil',
        collectionDescription:
          'Des naturels séchés au soleil du plateau du Cerrado — le réconfort en tasse, né pour l’espresso.',
        blurb: 'Corps chocolaté profond et finale veloutée.',
      },
      kenya: {
        country: 'Kenya',
        region: 'Hauts plateaux de Nyeri, Mont Kenya',
        description:
          'Des sols volcaniques rouges et l’air frais des montagnes donnent une tasse vive de cassis, de baies et d’acidité pétillante.',
        notes: ['Cassis', 'Framboise', 'Pamplemousse'],
        roast: 'Torréfaction mi-claire',
        profile: 'Baies & Vivacité',
        coffeeName: 'AA du Kenya',
        collectionDescription:
          'Des lots AA calibre 18 des terres rouges de Nyeri, débordant de cassis et d’acidité juteuse.',
        blurb: 'Douceur de baies et acidité éclatante.',
      },
      guatemala: {
        country: 'Guatemala',
        region: 'Domaines de la vallée d’Antigua',
        description:
          'Cultivé à l’ombre entre trois volcans, équilibrant la richesse du cacao avec des épices douces et un zeste d’orange.',
        notes: ['Cacao', 'Épices douces', 'Zeste d’orange'],
        roast: 'Torréfaction moyenne',
        profile: 'Cacao & Épices',
        coffeeName: 'Antigua du Guatemala',
        collectionDescription:
          'Cultivé à l’ombre des volcans dans la vallée d’Antigua — équilibré, chaleureux, doucement épicé.',
        blurb: 'Chaleur de cacao enveloppée d’épices douces.',
      },
      costarica: {
        country: 'Costa Rica',
        region: 'Hauts plateaux de Tarrazú',
        description:
          'Des micro-lots honey issus de fermes de haute montagne, d’une netteté immaculée et d’une douceur étagée.',
        notes: ['Agrumes', 'Sucre brun', 'Pomme rouge'],
        roast: 'Torréfaction moyenne',
        profile: 'Douceur & Agrumes',
        coffeeName: 'Tarrazú du Costa Rica',
        collectionDescription:
          'Des micro-lots honey des hauts plateaux de Tarrazú, d’une pureté et d’une douceur immaculées.',
        blurb: 'Douceur équilibrée et éclat d’agrumes.',
      },
    },
  },
  collections: {
    kicker: 'Nos Collections',
    heading: 'Explorez le café par origine',
    subtitle: 'Chaque origine offre une expression unique du climat, de l’altitude et du savoir-faire.',
    explore: 'Découvrir ce café',
    selectedBadge: 'Choisi depuis la carte',
    prev: 'Café précédent',
    next: 'Café suivant',
  },
  similar: {
    heading: 'Découvrez une tasse similaire',
    becauseYouChose: 'Parce que vous avez choisi',
  },
  a11y: {
    open: 'Paramètres d’accessibilité',
    title: 'Paramètres d’accessibilité',
    fontSize: 'Taille du texte',
    highContrast: 'Contraste élevé',
    underlineLinks: 'Souligner les liens',
    stopAnimations: 'Arrêter les animations',
    reset: 'Réinitialiser',
    close: 'Fermer',
    language: 'Langue',
  },
}

const he: Translation = {
  dir: 'rtl',
  nav: {
    home: 'בית',
    origins: 'מקורות',
    coffee: 'הקפה שלנו',
    cafe: 'בית הקפה',
    quiz: 'שאלון',
    contact: 'צרו קשר',
    visitCafe: 'בקרו בבית הקפה',
  },
  hero: {
    kicker: 'קפה ספיישלטי מכל רחבי העולם',
    headline: [
      { text: 'לכל' },
      { text: 'פולה' },
      { text: 'יש', breakBefore: true },
      { text: 'סיפור.', accent: true },
    ],
    paragraph:
      'כל אחד יכול להגיש קפה. אנחנו מאתרים פולים נדירים מהחוות הטובות בעולם, קולים אותם בבית הקלייה שלנו, והופכים כל כוס לרגע ששווה להתעכב עליו.',
    ctaExplore: 'גלו את הקפה שלנו',
    ctaCafe: 'בקרו בבית הקפה',
    badges: ['מקורות מ־40+ מדינות', 'נקלה בבית הקלייה שלנו', 'קפה ברמת ספיישלטי'],
  },
  origins: {
    kicker: 'המסע של הפולה',
    title: 'כל פולה מתחילה איפשהו.',
    subtitle:
      'כל כוס מתחילה את מסעה במרחק אלפי קילומטרים. גלו את החוות, האזורים והסיפורים שמאחורי כל מקור שאנחנו בוחרים בקפידה.',
    scrollHint: 'גללו כדי ללוות את המסע',
    interactiveHint: 'לחצו על פולה כדי לגלות את סיפור המקור שלה',
    flavorNotesLabel: 'תווי טעם',
    closeCard: 'סגירה',
    items: {
      ethiopia: {
        country: 'אתיופיה',
        region: 'רמות יִרְגָּצֵ׳ף',
        description: 'גדל בגובה רב, עם ניחוחות פרחוניים עדינים, חמיצות הדרית בהירה וסיומת נקייה.',
        notes: ['יסמין', 'הדרים', 'דבש'],
        roast: 'קלייה בהירה',
        profile: 'פרחוני והדרי',
        coffeeName: 'יִרְגָּצֵ׳ף אתיופי',
        collectionDescription:
          'ערש הקפה העולמי — זנים עתיקים בשטיפה רטובה בגובה רב, לכוס זוהרת ועדינה כמו תה.',
        blurb: 'פרחוניות עדינה עם חמיצות הדרית נוצצת.',
      },
      colombia: {
        country: 'קולומביה',
        region: 'פינקה אל מיראדור, וּאילָה',
        description: 'פינק בורבון נדיר שגדל על מדרונות געשיים, מוערך בזכות מתיקותו המבושמת וגופו המשיי.',
        notes: ['ורד', 'פירות טרופיים', 'קרמל'],
        roast: 'קלייה בהירה־בינונית',
        profile: 'פרחוני וטרופי',
        coffeeName: 'פינק בורבון קולומביאני',
        collectionDescription: 'מיקרו־לוט נדיר מוּאילָה, פרי מדרונות געשיים — מבושם, עסיסי ומפנק בשקט.',
        blurb: 'ניחוח פרחוני ותווים של פירות טרופיים.',
      },
      brazil: {
        country: 'ברזיל',
        region: 'פזנדה אלטה ויסטה, סראדו מיניירו',
        description: 'עיבוד טבעי בייבוש שמש איטי ברמות עשירות במינרלים — מתיקות עמוקה וגוף שוקולדי קטיפתי.',
        notes: ['שוקולד מריר', 'אגוזי לוז', 'מולסה'],
        roast: 'קלייה בינונית־כהה',
        profile: 'שוקולדי ואגוזי',
        coffeeName: 'סראדו ברזילאי',
        collectionDescription: 'עיבוד טבעי מיובש בשמש מרמת הסראדו — נחמה בכוס, נולד לאספרסו.',
        blurb: 'גוף שוקולדי עמוק וסיומת קטיפתית ומתוקה.',
      },
      kenya: {
        country: 'קניה',
        region: 'רמות נְיֶירִי, הר קניה',
        description: 'אדמה געשית אדומה ואוויר הרים צלול יוצרים כוס חיה של דומדמניות, פירות יער וחמיצות נוצצת.',
        notes: ['דומדמניות שחורות', 'פטל', 'אשכולית'],
        roast: 'קלייה בהירה־בינונית',
        profile: 'פירות יער ורעננות',
        coffeeName: 'AA קנייתי',
        collectionDescription: 'לוטים בדירוג AA מהאדמות האדומות של נְיֶירִי, מתפקעים מדומדמניות וחמיצות עסיסית.',
        blurb: 'מתיקות של פירות יער עם חמיצות בהירה.',
      },
      guatemala: {
        country: 'גואטמלה',
        region: 'אחוזות עמק אנטיגואה',
        description: 'גדל בצל בין שלושה הרי געש, ומאזן עושר של קקאו עם תבלינים עדינים וגרידת תפוז.',
        notes: ['קקאו', 'תבלינים מתוקים', 'גרידת תפוז'],
        roast: 'קלייה בינונית',
        profile: 'קקאו ותבלינים',
        coffeeName: 'אנטיגואה גואטמלי',
        collectionDescription: 'גדל בצל הרי הגעש של עמק אנטיגואה — מאוזן, חם ומתובל בעדינות.',
        blurb: 'חום של קקאו עטוף בתבלינים עדינים.',
      },
      costarica: {
        country: 'קוסטה ריקה',
        region: 'רמות טראסוּ',
        description: 'מיקרו־לוטים בעיבוד דבש מחוות הרים גבוהות — נקיים להפליא עם שכבות של מתיקות.',
        notes: ['הדרים', 'סוכר חום', 'תפוח אדום'],
        roast: 'קלייה בינונית',
        profile: 'מתוק והדרי',
        coffeeName: 'טראסוּ קוסטה ריקני',
        collectionDescription: 'מיקרו־לוטים בעיבוד דבש מרמות טראסוּ, נקיים ומתוקים להפליא.',
        blurb: 'מתיקות מאוזנת עם רעננות הדרית.',
      },
    },
  },
  collections: {
    kicker: 'הקולקציות שלנו',
    heading: 'גלו קפה לפי מקור',
    subtitle: 'כל מקור מבטא באופן ייחודי את האקלים, הגובה והאומנות שמאחורי הכוס.',
    explore: 'גלו את הקפה הזה',
    selectedBadge: 'נבחר מהמפה',
    prev: 'הקפה הקודם',
    next: 'הקפה הבא',
  },
  similar: {
    heading: 'גלו כוס דומה',
    becauseYouChose: 'כי בחרתם',
  },
  a11y: {
    open: 'הגדרות נגישות',
    title: 'הגדרות נגישות',
    fontSize: 'גודל גופן',
    highContrast: 'ניגודיות גבוהה',
    underlineLinks: 'קו תחתון לקישורים',
    stopAnimations: 'עצירת אנימציות',
    reset: 'איפוס הגדרות',
    close: 'סגירה',
    language: 'שפה',
  },
}

export const translations: Record<Lang, Translation> = { en, fr, he }

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'he', label: 'עב', name: 'עברית' },
]
