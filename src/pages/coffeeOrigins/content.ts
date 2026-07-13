import type { Lang } from '../../i18n/translations'
import type { CoffeeOriginId } from './data'

export interface CoffeeOriginContent {
  id: CoffeeOriginId
  country: string
  region: string
  title: string
  story: string
  elevation: string
  variety: string
  process: string
  flavorNotes: string[]
  roast: string
  cta: string
}

export interface CoffeeOriginsContent {
  hero: {
    label: string
    heading: string
    supporting: string
    ctaPrimary: string
    ctaSecondary: string
    scrollHint: string
  }
  labels: {
    elevation: string
    variety: string
    process: string
    flavorNotes: string
    roast: string
  }
  globeLabel: string
  mapLabel: string
  /** template with {country} token */
  activeAnnouncement: string
  items: CoffeeOriginContent[]
}

const en: CoffeeOriginsContent = {
  hero: {
    label: 'FROM FARM TO CUP',
    heading: 'Discover Where Your Coffee Begins',
    supporting: 'Explore the farms, regions, and people behind every coffee in our collection.',
    ctaPrimary: 'Explore the Origins',
    ctaSecondary: 'Shop All Coffee',
    scrollHint: 'Scroll to explore',
  },
  labels: {
    elevation: 'Elevation',
    variety: 'Variety',
    process: 'Process',
    flavorNotes: 'Flavour Notes',
    roast: 'Roast',
  },
  globeLabel: 'Interactive 3D globe showing coffee-growing regions',
  mapLabel: 'Flat map showing coffee-growing regions',
  activeAnnouncement: 'Currently viewing {country}',
  items: [
    {
      id: 'ethiopia',
      country: 'ETHIOPIA',
      region: 'Yirgacheffe',
      title: 'The Birthplace of Coffee',
      story:
        'Floral, bright, and complex. This coffee is grown by smallholder farmers in the highlands of southern Ethiopia.',
      elevation: '1,900–2,200m',
      variety: 'Heirloom',
      process: 'Washed',
      flavorNotes: ['Jasmine', 'Bergamot', 'Peach'],
      roast: 'Light',
      cta: 'Explore Ethiopian Coffee',
    },
    {
      id: 'colombia',
      country: 'COLOMBIA',
      region: 'Huila',
      title: 'A Landscape Shaped by Volcanoes',
      story:
        "Rich volcanic soil and consistent rainfall across Huila's mountains produce a balanced, vibrant cup, tended by generations of small family farms.",
      elevation: '1,700–2,000m',
      variety: 'Caturra, Castillo',
      process: 'Washed',
      flavorNotes: ['Red Apple', 'Caramel', 'Citrus'],
      roast: 'Medium',
      cta: 'Explore Colombian Coffee',
    },
    {
      id: 'brazil',
      country: 'BRAZIL',
      region: 'Minas Gerais',
      title: "Where Coffee Became a Nation's Craft",
      story:
        "Rolling hills and warm, steady sun across Minas Gerais yield a smooth, nutty cup — the foundation of Brazil's coffee-growing legacy.",
      elevation: '900–1,200m',
      variety: 'Bourbon, Mundo Novo',
      process: 'Natural',
      flavorNotes: ['Milk Chocolate', 'Hazelnut', 'Brown Sugar'],
      roast: 'Medium-Dark',
      cta: 'Explore Brazilian Coffee',
    },
    {
      id: 'guatemala',
      country: 'GUATEMALA',
      region: 'Antigua',
      title: 'Coffee in the Shadow of Volcanoes',
      story:
        "Surrounded by three volcanoes, Antigua's mineral-rich soil and cool nights give this coffee a full body and quietly complex sweetness.",
      elevation: '1,500–1,800m',
      variety: 'Bourbon, Caturra',
      process: 'Washed',
      flavorNotes: ['Cocoa', 'Red Plum', 'Toasted Almond'],
      roast: 'Medium',
      cta: 'Explore Guatemalan Coffee',
    },
  ],
}

const he: CoffeeOriginsContent = {
  hero: {
    label: 'מהחווה ועד לכוס',
    heading: 'גלו היכן הקפה שלכם מתחיל',
    supporting: 'הכירו את החוות, האזורים והאנשים שמאחורי כל קפה בקולקציה שלנו.',
    ctaPrimary: 'גלו את מקורות הקפה',
    ctaSecondary: 'לכל סוגי הקפה',
    scrollHint: 'גללו כדי לגלות',
  },
  labels: {
    elevation: 'גובה',
    variety: 'זן',
    process: 'תהליך',
    flavorNotes: 'תווי טעם',
    roast: 'קלייה',
  },
  globeLabel: 'כדור תלת־ממדי אינטראקטיבי המציג את אזורי גידול הקפה',
  mapLabel: 'מפה שטוחה המציגה את אזורי גידול הקפה',
  activeAnnouncement: 'מוצג כעת: {country}',
  items: [
    {
      id: 'ethiopia',
      country: 'אתיופיה',
      region: "יירגה־צ'ף",
      title: 'ערש הולדתו של הקפה',
      story: 'פרחוני, בהיר ומורכב. קפה זה מגודל בידי חקלאים זעירים ברמות שבדרום אתיופיה.',
      elevation: '1,900–2,200 מ׳',
      variety: 'הירלום',
      process: 'תהליך רחוץ',
      flavorNotes: ['יסמין', 'ברגמוט', 'אפרסק'],
      roast: 'קלייה בהירה',
      cta: 'גלו את קפה אתיופיה',
    },
    {
      id: 'colombia',
      country: 'קולומביה',
      region: 'הוילה',
      title: 'נוף שעוצב בידי הרי געש',
      story:
        'אדמת געש עשירה וגשמים סדירים בהרי הוילה מניבים כוס מאוזנת ותוססת, מטופחת בידי דורות של חוות משפחתיות קטנות.',
      elevation: '1,700–2,000 מ׳',
      variety: "קאטורה, קסטיו",
      process: 'תהליך רחוץ',
      flavorNotes: ['תפוח אדום', 'קרמל', 'הדרים'],
      roast: 'קלייה בינונית',
      cta: 'גלו את קפה קולומביה',
    },
    {
      id: 'brazil',
      country: 'ברזיל',
      region: "מינאס ג'ראיס",
      title: 'המקום שבו הקפה הפך למלאכת מדינה',
      story:
        "גבעות מתגלגלות ושמש חמה ויציבה ברחבי מינאס ג'ראיס מניבות כוס חלקה ואגוזית — הבסיס למורשת גידול הקפה של ברזיל.",
      elevation: '900–1,200 מ׳',
      variety: 'בורבון, מונדו נובו',
      process: 'תהליך יבש (נטורל)',
      flavorNotes: ['שוקולד חלב', 'אגוז לוז', 'סוכר חום'],
      roast: 'קלייה בינונית־כהה',
      cta: 'גלו את קפה ברזיל',
    },
    {
      id: 'guatemala',
      country: 'גואטמלה',
      region: 'אנטיגואה',
      title: 'קפה בצילם של הרי געש',
      story:
        'מוקפת בשלושה הרי געש, אדמתה העשירה במינרלים ולילותיה הקרירים של אנטיגואה מעניקים לקפה זה גוף מלא ומתיקות מורכבת בשקט.',
      elevation: '1,500–1,800 מ׳',
      variety: 'בורבון, קאטורה',
      process: 'תהליך רחוץ',
      flavorNotes: ['קקאו', 'שזיף אדום', 'שקד קלוי'],
      roast: 'קלייה בינונית',
      cta: 'גלו את קפה גואטמלה',
    },
  ],
}

const fr: CoffeeOriginsContent = {
  hero: {
    label: 'DE LA FERME À LA TASSE',
    heading: 'Découvrez où naît votre café',
    supporting: 'Explorez les fermes, les régions et les personnes derrière chaque café de notre collection.',
    ctaPrimary: 'Explorer les origines',
    ctaSecondary: 'Voir tous les cafés',
    scrollHint: 'Faites défiler pour explorer',
  },
  labels: {
    elevation: 'Altitude',
    variety: 'Variété',
    process: 'Traitement',
    flavorNotes: 'Notes aromatiques',
    roast: 'Torréfaction',
  },
  globeLabel: 'Globe 3D interactif montrant les régions productrices de café',
  mapLabel: 'Carte plate montrant les régions productrices de café',
  activeAnnouncement: 'Affichage actuel : {country}',
  items: [
    {
      id: 'ethiopia',
      country: 'ÉTHIOPIE',
      region: 'Yirgacheffe',
      title: 'Le berceau du café',
      story:
        'Floral, lumineux et complexe. Ce café est cultivé par de petits producteurs sur les hauts plateaux du sud de l’Éthiopie.',
      elevation: '1 900–2 200 m',
      variety: 'Heirloom',
      process: 'Lavé',
      flavorNotes: ['Jasmin', 'Bergamote', 'Pêche'],
      roast: 'Claire',
      cta: 'Explorer le café d’Éthiopie',
    },
    {
      id: 'colombia',
      country: 'COLOMBIE',
      region: 'Huila',
      title: 'Un paysage façonné par les volcans',
      story:
        'Un sol volcanique riche et des pluies régulières sur les montagnes du Huila donnent une tasse équilibrée et vibrante, cultivée par des générations de petites fermes familiales.',
      elevation: '1 700–2 000 m',
      variety: 'Caturra, Castillo',
      process: 'Lavé',
      flavorNotes: ['Pomme rouge', 'Caramel', 'Agrumes'],
      roast: 'Moyenne',
      cta: 'Explorer le café de Colombie',
    },
    {
      id: 'brazil',
      country: 'BRÉSIL',
      region: 'Minas Gerais',
      title: 'Là où le café est devenu un art national',
      story:
        'Les collines vallonnées et le soleil constant du Minas Gerais donnent une tasse douce et noisetée — le socle de l’héritage caféier du Brésil.',
      elevation: '900–1 200 m',
      variety: 'Bourbon, Mundo Novo',
      process: 'Nature',
      flavorNotes: ['Chocolat au lait', 'Noisette', 'Sucre brun'],
      roast: 'Moyenne-foncée',
      cta: 'Explorer le café du Brésil',
    },
    {
      id: 'guatemala',
      country: 'GUATEMALA',
      region: 'Antigua',
      title: 'Le café à l’ombre des volcans',
      story:
        'Entouré de trois volcans, le sol riche en minéraux d’Antigua et ses nuits fraîches donnent à ce café un corps ample et une douceur discrètement complexe.',
      elevation: '1 500–1 800 m',
      variety: 'Bourbon, Caturra',
      process: 'Lavé',
      flavorNotes: ['Cacao', 'Prune rouge', 'Amande grillée'],
      roast: 'Moyenne',
      cta: 'Explorer le café du Guatemala',
    },
  ],
}

export const coffeeOriginsContent: Record<Lang, CoffeeOriginsContent> = { en, fr, he }
