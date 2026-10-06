export type ImageAsset = { src: string; alt: string; note?: string };
export type Collection = {
  slug: string;
  title: string;
  year: string;
  description: string;
  story: string;
  hero: ImageAsset;
  gallery: ImageAsset[];
  materials: string;
  credits: string;
};

// Temporary concept imagery only. Replace image paths here when approved house photography is available.
export const images = {
  hero: { src: '/images/hero/house-hero.jpg', alt: 'Fashion concept portrait in a sculptural ivory and oxblood look' },
  designer: { src: '/images/designer/designer-portrait.jpg', alt: 'Editorial concept portrait representing the designer profile' },
  look1: { src: '/images/collections/lookbook-01.jpg', alt: 'Editorial concept of a model in a sculptural clay-toned look' },
  look2: { src: '/images/collections/lookbook-02.jpg', alt: 'Two fashion models in contemporary dark and clay-toned silhouettes' },
  textile: { src: '/images/heritage/textile-archive.jpg', alt: 'Textile archive concept in indigo, cream and muted rust' },
  detail: { src: '/images/process/material-study.jpg', alt: 'Close-up concept of textile, folds and hand stitching' },
};

export const collections: Collection[] = [
  {
    slug: 'lookbook-01',
    title: 'Lookbook 01',
    year: 'Year not supplied',
    description: 'An editable collection entry for the house archive. Collection title, year and story await approved details.',
    story: 'This space is reserved for the story behind the work. Add the collection narrative when it has been confirmed by the house.',
    hero: images.look1,
    gallery: [images.look1, images.detail, images.look2, images.textile],
    materials: 'Details not supplied.',
    credits: 'Credits not supplied.',
  },
  {
    slug: 'lookbook-02',
    title: 'Lookbook 02',
    year: 'Year not supplied',
    description: 'A second editable archive entry, using temporary fashion concept imagery until approved photographs are available.',
    story: 'The collection story has not yet been provided. Replace this neutral copy with the house-approved narrative.',
    hero: images.look2,
    gallery: [images.look2, images.textile, images.look1, images.detail],
    materials: 'Details not supplied.',
    credits: 'Credits not supplied.',
  },
];

export const works = [
  { label: 'LOOK 01', image: images.look1, category: 'Lookbook', shape: 'portrait' },
  { label: 'LOOK 02', image: images.textile, category: 'Material study', shape: 'landscape' },
  { label: 'LOOK 03', image: images.look2, category: 'Lookbook', shape: 'portrait' },
  { label: 'LOOK 04', image: images.detail, category: 'Atelier detail', shape: 'square' },
  { label: 'LOOK 05', image: images.hero, category: 'Fashion concept', shape: 'wide' },
];

export const articles = [
  {
    slug: 'heritage-as-a-living-language',
    title: 'Heritage as a living language',
    category: 'Heritage',
    date: 'Date not supplied',
    excerpt: 'A place for reflections on heritage, identity and the language of contemporary design.',
    image: images.textile,
    body: [
      'At Mercified Artistry, heritage is approached as an ongoing conversation: a source of perspective that can meet the present with intention.',
      'The house explores how cultural references, material choices and creative expression may inform fashion without losing sight of the people and stories behind them.',
      'This journal entry is an editable editorial placeholder. Add verified research, attribution and approved language before publication.',
    ],
  },
  {
    slug: 'from-idea-to-form',
    title: 'From idea to form',
    category: 'Process',
    date: 'Date not supplied',
    excerpt: 'Notes on moving from research and early ideas toward a considered final form.',
    image: images.detail,
    body: [
      'A garment begins before its first seam: with looking, asking questions, and deciding which ideas deserve to be carried into form.',
      'Sketch, material and construction become part of one process. Each stage offers a chance to refine the balance between expression, wearability and craft.',
      'This editable placeholder can become a process story once specific project details and approved imagery are available.',
    ],
  },
];

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Heritage', href: '/heritage' },
  { label: 'Process', href: '/process' },
  { label: 'Runway', href: '/runway' },
  { label: 'Journal', href: '/journal' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Credentials', href: '/credentials' },
  { label: 'Contact', href: '/contact' },
];

export const brand = {
  name: 'MERCIFIED ARTISTRY',
  founder: 'Onobrorhie Mercy Ufuoma',
  role: 'Founder & Creative Director',
  location: 'Abraka, Delta State, Nigeria',
  tagline: 'African Heritage, Intentionally Reimagined.',
};
