export type ImageAsset = { src: string; alt: string; note?: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: ImageAsset;
  body: string[];
};

export type Work = {
  slug: string;
  label: string;
  title: string;
  category: string;
  year: string;
  season: string;
  atelierHours: string;
  techniqueFocus: string;
  shape: 'portrait' | 'landscape' | 'square' | 'wide';
  image: ImageAsset;
  gallery: ImageAsset[];
  // Ordered writeup sections
  designConcept: string;
  inspiration: string;
  designDetails: string[];
  culturalStory: string;
  designPhilosophy: string;
  silhouette: string;
  keyElements: string[];
  // Atelier specs and legacy compatibility
  story: string;
  process: string[];
  heritage: string;
  sustainability: string;
  materials: string;
  credits: string;
};

// Concept imagery for the atelier archive
export const images = {
  hero: { src: '/images/collections/crimson-veil-full.png', alt: 'Mercified Artistry — statuesque crimson veiled couture column gown' },
  designer: { src: '/images/designer/designer-portrait.png', alt: 'Onobrorhie Mercy Ufuoma in red couture gown — Creative Director & Founder' },
  yorubaHeritage: { src: '/images/collections/yoruba-heritage.png', alt: 'Look 01: Reimagined Yoruba Heritage — patterned textile, sculptural red gele, dramatic drape and coordinated red accessories' },
  newspaperOrigami: { src: '/images/collections/newspaper-origami-gown.png', alt: 'Look 02: Origami Gazette Asymmetrical Silhouette — upcycled newspaper fans, black duchess satin column and couture hat' },
  geometricFringe: { src: '/images/collections/geometric-fringe-palazzo.png', alt: 'Look 03: Ancestral Grid Draped Fringe Palazzo — high-waisted vibrant African geometric print trousers with hand-tied tassel fringe' },
  pinkRuffle: { src: '/images/collections/pink-ruffle-corset.png', alt: 'Look 04: Blushing Bloom Sculptural Corset Mini — hand-beaded pearl corset and tiered orchid pink organza ruffles' },
  crimsonVeil: { src: '/images/collections/crimson-veil-corset.png', alt: 'Look 05: Scarlet Sanctuary Veiled Couture Portrait — ruched crimson gown with hand-embroidered coral bead clusters under sheer red veil' },
  crimsonVeilFull: { src: '/images/collections/crimson-veil-full.png', alt: 'Look 05: Scarlet Sanctuary Veiled Column Gown — statuesque crimson silk column gown with tiered veil and embroidered hem' },
  coralCrown: { src: '/images/collections/coral-gold-crown.png', alt: 'Look 06: Sovereign Coral Cage Avant-Garde Crown — sculptural red coral wire cage headpiece with hand-beaten gold brass wings' },
  tealReedFull: { src: '/images/collections/teal-reed-sculptural-full.png', alt: 'Look 07: Botanical Reed & Damask Couture Silhouette — teal and gold damask mini with natural palm-reed sunburst hip architecture' },
  bananaGrove: { src: '/images/collections/banana-grove-wrapper.jpg', alt: 'Look 08: Verdant Grove Draped Wrapper & Off-Shoulder Study — Nigerian Ankara wax wrapper beneath plantain canopy' },
  upcycledSachet: { src: '/images/collections/upcycled-sachet-mosaic.jpg', alt: 'Look 09: Chlorophyll Mosaic Upcycled Sachet Silhouette — black column dress with recycled green beverage sachet leaf scales' },
  palmSanctuary: { src: '/images/collections/palm-sanctuary-ankara.jpg', alt: 'Look 10: Palm Sanctuary Spiral Handkerchief Sundress — crimson and ochre solar-spiral Ankara dress between palm trees' },
  aboutHouse: { src: '/images/about-designer.png', alt: 'Onobrorhie Mercy Ufuoma — designer portrait in red couture gown with flowing scarf' },
  houseSection: { src: '/images/about-the-house.png', alt: 'Mercified Artistry — red couture gown with structured capelet, beaded clutch and sequin detailing' },
  designPhilosophy: { src: '/images/design-philosophy.png', alt: 'Design Philosophy — sculptural teal and gold couture gown with handcrafted reed waist adornments by Mercified Artistry' },
  look1: { src: '/images/collections/lookbook-01.jpg', alt: 'Editorial concept of a model in a sculptural clay-toned look' },
  look2: { src: '/images/collections/lookbook-02.jpg', alt: 'Two fashion models in contemporary dark and clay-toned silhouettes' },
  textile: { src: '/images/heritage/textile-archive.jpg', alt: 'Textile archive concept in indigo, cream and muted rust' },
  detail: { src: '/images/process/material-study.jpg', alt: 'Close-up concept of textile, folds and hand stitching' },
};

export const articles: Article[] = [
  {
    slug: 'heritage-as-a-living-language',
    title: 'Heritage as a Living Language',
    category: 'Cultural Lineage',
    date: 'Atelier Note',
    excerpt: 'How African roots, fabric memory, and modern design come together in every piece we make.',
    image: images.textile,
    body: [
      'At Mercified Artistry, heritage is not something we look back at — it is something we carry forward every day.',
      'We look at African culture, traditional fabrics, and the stories behind them, then ask how they can speak to people all over the world — without losing where they came from.',
      'Every garment we make holds a piece of that history, sewn in by hand, one stitch at a time.',
    ],
  },
  {
    slug: 'from-idea-to-form',
    title: 'From Idea to Form: The Art of Making',
    category: 'Atelier Craft',
    date: 'Craft Archive',
    excerpt: 'A look at how a garment goes from a first idea all the way to a finished piece.',
    image: images.detail,
    body: [
      'Every piece starts long before we pick up a needle — with research, questions, and a search for the right story to tell.',
      'We sketch, choose fabrics, and build the garment step by step. At every stage we balance strong shapes with real comfort.',
      'We cut carefully to waste as little fabric as possible, and every final detail is finished by hand.',
    ],
  },
];

export const works: Work[] = [
  {
    slug: 'look-01',
    label: 'LOOK 01',
    title: 'Reimagined Yoruba Heritage',
    category: 'Lookbook Studies',
    year: '2026',
    season: '2026 Collection',
    atelierHours: '160 Atelier Hours',
    techniqueFocus: 'Sculptural Gele & Beadwork Draping',
    shape: 'portrait',
    image: images.yorubaHeritage,
    gallery: [images.yorubaHeritage],
    designConcept:
      'A contemporary interpretation of Yoruba dressing, this look reimagines traditional elements through a modern fashion lens. The combination of patterned textile, dramatic red draping, sculptural gele, and intricate beadwork creates a look that celebrates Yoruba elegance while maintaining a contemporary silhouette.',
    inspiration:
      'Inspired by the richness and elegance of Yoruba traditional attire, particularly the expressive use of the gele, beads, layered fabrics and bold colour. The design takes these recognizable elements and translates them into a modern, fashion-forward look.',
    designDetails: [
      'Black, white and red patterned textile',
      'Voluminous sleeves',
      'Fitted contemporary silhouette',
      'Intricate beadwork around the neckline',
      'Dramatic red shoulder drape',
      'Sculptural red gele',
      'Coordinated red clutch and accessories',
    ],
    culturalStory:
      'The look celebrates the Yoruba tradition of using clothing, headwear, colour and adornment as expressions of identity, elegance and cultural pride.\n\nRather than reproducing traditional attire exactly, Mercified Artistry reinterprets these elements for the contemporary woman—allowing Yoruba heritage to remain visible while evolving with modern fashion.',
    designPhilosophy:
      '> Yoruba heritage, intentionally reimagined.\n\nThis look embodies Mercified Artistry\'s belief that African fashion can preserve cultural identity while continuously evolving.',
    silhouette: 'Contemporary • Relaxed • Layered',
    keyElements: [
      'Yoruba Heritage',
      'Gele',
      'Beadwork',
      'Layering',
      'Bold Colour',
    ],
    story:
      'A contemporary interpretation of Yoruba dressing, this look reimagines traditional elements through a modern fashion lens. The combination of patterned textile, dramatic red draping, sculptural gele, and intricate beadwork creates a look that celebrates Yoruba elegance while maintaining a contemporary silhouette.',
    process: [
      'Black, white and red patterned textile with voluminous sleeves and fitted contemporary silhouette.',
      'Intricate beadwork around the neckline paired with a dramatic red shoulder drape.',
      'Sculptural red gele complemented with coordinated red clutch and accessories.',
    ],
    heritage:
      'The look celebrates the Yoruba tradition of using clothing, headwear, colour and adornment as expressions of identity, elegance and cultural pride.',
    sustainability:
      'Yoruba heritage, intentionally reimagined. Designed to preserve cultural identity while continuously evolving through sustainable atelier practices.',
    materials:
      'Black, white and red patterned textile, structured red silk, artisan glass beadwork, coordinated accessories.',
    credits: 'Creative Direction: Mercy Ufuoma · Mercified Artistry | 2026.',
  },
  {
    slug: 'look-02',
    label: 'LOOK 02',
    title: 'Origami Gazette Asymmetrical Silhouette',
    category: 'Atelier Craft',
    year: '2026',
    season: 'SS26 Haute Couture',
    atelierHours: '185 Atelier Hours',
    techniqueFocus: 'Upcycled Newsprint Origami & Duchess Satin Corsetry',
    shape: 'portrait',
    image: images.newspaperOrigami,
    gallery: [images.newspaperOrigami],
    designConcept:
      'An avant-garde asymmetrical column gown pairing rich black duchess satin with architectural origami paper fans crafted from printed newspapers and journals. Complemented by elbow-length opera gloves and a tilted sculptural couture hat, this piece turns the daily press and printed word into wearable sculpture.',
    inspiration:
      'Inspired by the enduring tradition of African print journalism, street broadsheets, and paper fan crafts used across tropical outdoor gatherings. The design explores fashion as a living document of cultural commentary carried directly on the human form.',
    designDetails: [
      'Hand-folded multi-tier newsprint origami fan rosettes along hip and bustline',
      'Sleek black duchess satin asymmetrical one-shoulder column silhouette',
      'Architectural pleated fan bustle effect offering dimensional volume',
      'Black satin opera gloves accented with delicate folded paper cuff elements',
      'Sculptural tilted wide-brim couture tilt hat',
      'Internal hand-finished boning for clean structural support and posture',
    ],
    culturalStory:
      'Throughout West African modern history, newspapers and printed broadsheets were vital vehicles for documenting cultural independence, social life, and community voices.\n\nTransforming recycled printed news into couture origami fans honors the power of the written word while championing sustainable upcycling in high fashion.',
    designPhilosophy:
      '> News as narrative, paper as sculpture.\n\nMercified Artistry believes that fashion is the ultimate storyteller—giving discarded everyday materials a permanent, dignified place on the haute couture stage.',
    silhouette: 'Avant-Garde • Sculptural • Architectural',
    keyElements: [
      'Origami Paper Fans',
      'Upcycled Newsprint',
      'Duchess Satin',
      'Opera Gloves',
      'Couture Millinery',
    ],
    story:
      'This dramatic editorial piece was created to challenge conventional textile usage. By folding discarded daily periodicals into crisp, accordion-pleated fans that bloom across black satin, the silhouette commands the room with intellectual wit and dramatic architectural contrast.',
    process: [
      'Precision paper-folding techniques adapted from Japanese origami and Nigerian hand-held woven fan traditions.',
      'Weather-resistant non-toxic sealant applied to newsprint pleats to preserve integrity and permanent structure.',
      'Architectural placement along hip line to accentuate feminine poise and dynamic editorial presence.',
    ],
    heritage:
      'Grounded in West African paper millinery, storytelling broadsheets, and traditional fan-bearing ceremonies updated for the modern avant-garde runway.',
    sustainability:
      'Over 85% of decorative elements are crafted from reclaimed local newspapers and post-consumer print materials, paired with deadstock black satin fabric.',
    materials:
      'Upcycled Nigerian newspapers, black duchess satin, organic cotton lining, eco-friendly resin fixative, satin gloves.',
    credits: 'Creative Direction: Mercy Ufuoma · Millinery & Folding: Mercified Artistry Abraka | 2026.',
  },
  {
    slug: 'look-03',
    label: 'LOOK 03',
    title: 'Ancestral Grid Draped Fringe Palazzo',
    category: 'Lookbook Studies',
    year: '2026',
    season: '2026 Resort & Ready-to-Wear',
    atelierHours: '110 Atelier Hours',
    techniqueFocus: 'Geometric Pattern Alignment & Hand-Tied Fringe Draping',
    shape: 'portrait',
    image: images.geometricFringe,
    gallery: [images.geometricFringe],
    designConcept:
      'Contemporary high-waisted palazzo trousers cut in a vibrant electric lime, black, white, and cyan geometric tribal print, accented with an asymmetrical draped sash and hand-tied white fringe tassels. Paired effortlessly with a minimal black long-sleeve knit, it represents daily African elegance with bold visual cadence.',
    inspiration:
      'Inspired by the rhythmic geometric symbols of West African mudcloth (Bogolan) and linear cowrie/chevron iconography, representing paths of life, protection, and balanced community movement.',
    designDetails: [
      'High-waisted wide-leg palazzo trousers with fluid movement',
      'Vivid emerald, lime green, black, white, and sky-blue graphic textile',
      'Asymmetrical wrap sash draped across the left hip',
      'Hand-knotted cascading white yarn fringe along sash edge',
      'Concealed waistband and deep functional side pockets',
      'Balanced against a minimalist crewneck knit top',
    ],
    culturalStory:
      'Traditional African wrappers (iro / lappa) have always celebrated the dynamic swing of fabric around the hips.\n\nHere, the ancestral wrapper is re-engineered as an integrated side-drape sash on modern wide-leg trousers, giving the contemporary woman both commanding comfort and cultural resonance.',
    designPhilosophy:
      '> Everyday movement rooted in ancestral geometry.\n\nAfrican heritage does not belong only on ceremonial stages—it belongs in everyday spaces, walking boldly with freedom and pride.',
    silhouette: 'High-Waisted • Wide-Leg • Draped',
    keyElements: [
      'Geometric Grid',
      'Hand-Tied Fringe',
      'Palazzo Trouser',
      'Asymmetrical Sash',
      'Living Color',
    ],
    story:
      'Designed for effortless confidence, this look marries the structure of modern tailoring with the joyous exuberance of African print. The swaying fringe catches kinetic energy with every step, turning walking into a rhythmic statement.',
    process: [
      'Architectural pattern placement ensuring continuous alignment of vertical chevron motifs along outer and inner seams.',
      'Hand-tied individual cotton fringe tassels attached along bias-cut side sash.',
      'Fluid tailoring engineered for maximum ease and breathable comfort in tropical climates.',
    ],
    heritage:
      'Draws from West African geometric stamp and weaving idioms, reimagining traditional wrapper draping into cosmopolitan wide-leg trousers.',
    sustainability:
      '100% natural breathable African cotton print, zero-plastic buttons, constructed with reinforced flat-felled seams for long-lasting everyday wear.',
    materials:
      '100% African cotton wax print, hand-spun cotton fringe yarn, organic cotton pocketing.',
    credits: 'Creative Direction: Mercy Ufuoma · Tailoring: Mercified Artistry Abraka | 2026.',
  },
  {
    slug: 'look-04',
    label: 'LOOK 04',
    title: 'Blushing Bloom Sculptural Corset Mini',
    category: 'Runway Editions',
    year: '2026',
    season: 'SS26 Runway Collection',
    atelierHours: '175 Atelier Hours',
    techniqueFocus: 'Crystal-Dripped Corsetry & Tiered Organza Ruffling',
    shape: 'portrait',
    image: images.pinkRuffle,
    gallery: [images.pinkRuffle],
    designConcept:
      'A celebratory confectionery mini-dress in orchid pink, featuring a sweetheart plunging corset bodice hand-dripped in hundreds of pearls and crystals, sculpted wing epaulettes, and an exuberant multi-tiered ruffled ballerina skirt of layered sheer organza.',
    inspiration:
      'Inspired by the vibrant energy, youthful celebration, and joy of Nigerian owambe festivities, where high-glamour dressing is a collective expression of happiness (Ayo / Otete), abundance, and playful elegance.',
    designDetails: [
      'Hand-boned sweetheart corset bodice with plunging illusion mesh',
      'Hundreds of individually hand-set iridescent crystals, pearl drops, and silver beads in vertical bone lines',
      'Winged cap-sleeve epaulettes adorned with matching pearl cluster borders',
      'Multi-tiered tiered organza ruffle skirt with dramatic bounce and volume',
      'Exposed architectural back laced closure with reinforced eyelets',
      'Built-in lightweight horsehair crinoline hem for lasting silhouette memory',
    ],
    culturalStory:
      'Festivity and joy are sacred parts of African communal life. Clothes for celebration are designed to make the wearer feel radiant, noticed, and filled with delight.\n\nThis look reclaims playful, fairytale volume and reinterprets it through African exuberance and couture finishing.',
    designPhilosophy:
      '> Joy is an intentional art form.\n\nFashion should not always take itself too seriously—it should make the heart skip a beat and celebrate the radiant joy of being alive.',
    silhouette: 'Corseted • Voluminous • Playful Mini',
    keyElements: [
      'Orchid Pink',
      'Hand-Beaded Corset',
      'Tiered Organza Ruffles',
      'Winged Epaulettes',
      'Celebratory Glamour',
    ],
    story:
      'Conceived as a celebration of unapologetic femininity, this piece brings together rigid internal corset architecture with cloud-soft organza tiers that float with every motion. The crystal lines catch every beam of light like morning dew.',
    process: [
      'Multi-panel internal corset hand-fitted with flexible steel bones to support the pearl and crystal surface weight.',
      'Over 60 meters of hand-gathered organza cut into graduated ruffles and layered tier upon tier.',
      'Hand-stitched pearl droplets positioned along vertical bone channels to emphasize feminine form.',
    ],
    heritage:
      'Celebrates the vibrant, celebratory fashion traditions of Nigerian festivities, where color, volume, and sparkle are worn with fearless confidence.',
    sustainability:
      'Created using deadstock organza remnants from previous collections and high-grade glass crystals designed to be heirloom-preserved or refitted.',
    materials:
      'Silk organza, reinforced satin twill bodice, lead-free glass crystals, faux pearls, steel boning.',
    credits: 'Creative Direction: Mercy Ufuoma · Atelier: Mercified Artistry Abraka | 2026.',
  },
  {
    slug: 'look-05',
    label: 'LOOK 05',
    title: 'Scarlet Sanctuary Veiled Couture Portrait',
    category: 'Runway Editions',
    year: '2026',
    season: 'SS26 Haute Couture',
    atelierHours: '220 Atelier Hours',
    techniqueFocus: 'Coral-Red Seed Beading & Sheer Silk Ruched Draping',
    shape: 'portrait',
    image: images.crimsonVeilFull,
    gallery: [images.crimsonVeilFull, images.crimsonVeil],
    designConcept:
      'A captivating ceremonial couture gown in deep scarlet red, featuring a finely ruched sweetheart corset adorned with hand-stitched coral-crystal cluster flora and glass seed beading, framed by a cascading gossamer crimson veil that drapes dramatically around the face and shoulders.',
    inspiration:
      'Inspired by sacred Delta State and Edo Kingdom ceremonial red traditions, where crimson fabric and coral symbolize vitality, spiritual sanctity, passion, and royal nobility. The sheer veil reflects the reverent beauty of traditional bridal reveal ceremonies.',
    designDetails: [
      'Finely hand-ruched crimson silk chiffon over a sculpted internal corset',
      'Dimensional floral clusters handcrafted from glass seed beads and coral-tone crystals along the neckline',
      'Sculptural center-front beaded bone accents tracing the ribcage',
      'Gossamer crimson organza veil floating freely around the head and shoulders',
      'Pure silk lining dyed with eco-friendly vegetable-derived scarlet dyes',
      'Hidden internal waist stay for statuesque posture',
    ],
    culturalStory:
      'In southern Nigerian royal courts, scarlet and red coral beads (ivie) are the attire of royalty and initiates. To wear crimson is to carry the strength of ancestors and the sacred promise of nobility.\n\nThis look modernizes that reverent authority into an intimate, breathtaking beauty statement.',
    designPhilosophy:
      '> Sacred red, woven with ancestral dignity.\n\nCrimson is not merely a color in African heritage—it is life, breath, royalty, and an unbroken lineage of female strength.',
    silhouette: 'Ruched • Veiled • Statuesque',
    keyElements: [
      'Crimson Red',
      'Hand-Stitched Bead Clusters',
      'Gossamer Veil',
      'Ruched Chiffon',
      'Sacred Regalia',
    ],
    story:
      'This silhouette captures a moment of sacred quietude and intense beauty. Shrouded in sheer red organza, the intricate beadwork along the neckline glints like embers in a quiet sanctuary, honoring both mystery and revelation.',
    process: [
      'Delicate chiffon hand-gathered in micro-pleats over a structured cupped corset foundation.',
      'Each bead cluster individually embroidered using silk thread and tiny red seed beads.',
      'Soft organza veil cut on the bias to billow gracefully in ambient wind or motion.',
    ],
    heritage:
      'Rooted in Delta and Edo traditional bridal and royal rites, where crimson drapery and coral adornment honor womanhood and nobility.',
    sustainability:
      'Vegetable-dyed silk fabrics rinsed with rainwater, artisan beadwork crafted to last for generations without degradation.',
    materials:
      'Pure silk chiffon, silk organza veil, glass seed beads, faceted crystal gems, cotton corset lining.',
    credits: 'Creative Direction: Mercy Ufuoma · Photography: Mercified Artistry Editorial | 2026.',
  },
  {
    slug: 'look-06',
    label: 'LOOK 06',
    title: 'Sovereign Coral Cage Avant-Garde Crown',
    category: 'Atelier Craft',
    year: '2026',
    season: 'Atelier Custom / Wearable Art',
    atelierHours: '260 Atelier Hours',
    techniqueFocus: 'Sculptural Coral Armature & Beaten Brass Repoussé',
    shape: 'portrait',
    image: images.coralCrown,
    gallery: [images.coralCrown],
    designConcept:
      'A museum-grade avant-garde crown and sculptural headpiece constructed on a black velvet millinery skullcap, studded with raw jagged red coral rock spikes, from which arches a soaring wire cage canopy wrapped in coral beads, crowned with hand-beaten gold brass swallow wings and ceremonial plumage.',
    inspiration:
      'Directly inspired by the legendary royal coral crowns (Ade / Okuku) worn by the monarchs and royal matriarchs of Benin, Delta, and Yoruba kingdoms, fused with contemporary architectural metalwork.',
    designDetails: [
      'Deep midnight-black velvet skullcap fitted to anatomical contours',
      'Surface embellished with raw, faceted red coral-crystal rock shards',
      'Arching cathedral-like three-dimensional wire cage canopy wrapped in red coral beads',
      'Hand-beaten, chiseled gold brass ceremonial swallow wings and foliage rising from crown peak',
      'Hand-threaded coral branch fringes cascading delicately over temple and ear',
      'Cushioned interior headband for regal, balanced wearability',
    ],
    culturalStory:
      'In West African kingship and queenship, the crown (Ade) is the ultimate spiritual vessel. Coral beads are sacred gifts believed to confer wisdom, divine protection, and lineage power.\n\nThis piece transforms ancestral coronation regalia into a daring piece of contemporary haute couture sculpture.',
    designPhilosophy:
      '> Royal crowns for the modern sovereign.\n\nWe do not leave African crowns in historic archives—we carry their gold, coral, and divine majesty boldly into tomorrow.',
    silhouette: 'Regal • Sculptural • Architectural Headpiece',
    keyElements: [
      'Royal Coral Beads',
      'Beaten Brass Birds',
      'Velvet Skullcap',
      'Cathedral Cage',
      'Monarchic Heritage',
    ],
    story:
      'This breathtaking headpiece is wearable sculpture at its most ambitious. It demands attention, exuding sovereign power, ancient mysticism, and the exquisite metalworking and bead-threading traditions of Nigerian court artisans.',
    process: [
      'Hand-forged brass sheet cut, annealed, and hammered using traditional repoussé techniques to shape the golden bird wings.',
      'Structural brass wire cage shaped and soldered by hand, then meticulously bound in coral bead strings.',
      'Hand-set coral crystal spikes mounted individually to the reinforced velvet cap base.',
    ],
    heritage:
      'Honoring the historic coral crowns and bronze/brass casting traditions of ancient Nigerian royal courts (Benin, Ile-Ife, and Delta royalties).',
    sustainability:
      'Hand-beaten recycled brass scrap metals, ethically sourced coral elements, heirloom construction built to withstand museum exhibition.',
    materials:
      'Natural red coral beads and raw crystal rock, hand-beaten recycled brass, midnight cotton velvet, steel wire armature.',
    credits: 'Creative Direction: Mercy Ufuoma · Metalwork & Beading: Mercified Artistry Atelier Abraka | 2026.',
  },
  {
    slug: 'look-07',
    label: 'LOOK 07',
    title: 'Botanical Reed & Damask Couture Silhouette',
    category: 'Atelier Craft',
    year: '2026',
    season: 'SS26 Runway Collection',
    atelierHours: '195 Atelier Hours',
    techniqueFocus: 'Natural Palm-Reed Sculptural Hip Architecture & Damask Tailoring',
    shape: 'portrait',
    image: images.tealReedFull,
    gallery: [images.tealReedFull, images.designPhilosophy],
    designConcept:
      'A striking strapless mini-dress cut from luminous peacock teal and gold damask brocade, distinguished by architectural outward-radiating sunburst whisk bundles of natural palm frond midribs (traditional broomstick reeds) cinched at the hip and waist. Merging domestic natural fibers with regal brocade, it transforms agricultural everyday materials into high-fashion kinetic armor.',
    inspiration:
      'Inspired by traditional Nigerian palm broom (ọwà) craftsmanship, the sweeping agricultural rhythms of rural southern Nigeria, and the spiritual symbolism of sweeping away misfortune while honoring the fertility and versatility of the oil palm tree (Elaeis guineensis).',
    designDetails: [
      'Luminous peacock teal and gold embroidered damask brocade',
      'Strapless sweetheart bandeau neckline with structured internal corset',
      'Outward-flaring hand-tied natural palm reed broomstick bundles anchored along the hip line',
      'Geometrically aligned chevron gold trim defining waist contour',
      'Fitted tapered pencil silhouette emphasizing architectural hip volume',
      'Tailored with pure cotton twill lining for comfort against the skin',
    ],
    culturalStory:
      'In West African domestic and spiritual cosmology, the broom made from palm reeds is not merely a tool for sweeping—it represents unity (a single reed breaks easily, but tied together they are unbreakable) and spiritual cleansing.\n\nAnchoring these sculptural reeds to a luxury brocade gown elevates an everyday symbol of African communal solidarity into haute couture royalty.',
    designPhilosophy:
      '> Unity in the reed, sovereignty in the cloth.\n\nTrue innovation comes from looking at what is all around us—palm reeds, natural brush, soil—and elevating it to the highest planes of couture art.',
    silhouette: 'Strapless • Sculptural Hip Accent • Column Mini',
    keyElements: [
      'Palm-Reed Architecture',
      'Teal & Gold Damask',
      'Broomstick Sunburst',
      'Communal Unity',
      'Kinetic Hip Sculpture',
    ],
    story:
      'This look is an atelier triumph of contrast. The softness of gold-threaded brocade is met by the crisp, dry acoustic whisper of natural palm reeds that rustle gently as the model walks, creating an auditory and visual presence that stops audiences in their tracks.',
    process: [
      'Hand-selected mature oil palm frond midribs soaked, straightened, and sun-dried in Abraka.',
      'Reeds bundled into graduated fan sheaves and wrapped with gold-threaded silk bindings.',
      'Hand-anchored to reinforced internal hip stays that distribute structural tension without warping the silhouette.',
    ],
    heritage:
      'Celebrating the oil palm—the tree of life in the Niger Delta—and the timeless proverb of the broom bundle representing family and communal strength.',
    sustainability:
      '100% natural, biodegradable palm reeds harvested from renewable local agroforests; zero plastic synthetic wire used in the hip armature.',
    materials:
      'Teal and gold brocade, natural Nigerian palm frond midribs, gold metallic thread, reinforced cotton twill.',
    credits: 'Creative Direction: Mercy Ufuoma · Reed Craft & Tailoring: Mercified Artistry Atelier Abraka | 2026.',
  },
  {
    slug: 'look-08',
    label: 'LOOK 08',
    title: 'Verdant Grove Draped Wrapper & Off-Shoulder Study',
    category: 'Lookbook Studies',
    year: '2026',
    season: '2026 Cultural Landscape Archive',
    atelierHours: '95 Atelier Hours',
    techniqueFocus: 'Ancestral Wrapper Draping (Iro) & Off-Shoulder Contouring',
    shape: 'portrait',
    image: images.bananaGrove,
    gallery: [images.bananaGrove],
    designConcept:
      'Captured in the fertile green heart of a Delta State plantain grove, this study pairs an off-the-shoulder sculpted black bodice with a hand-draped Nigerian wax print wrapper (iro) bearing gold, navy, and crimson lion and leopard motifs. Grounded barefoot on the earth beneath expansive plantain leaves, it reflects the sacred intimacy between African womanhood, agriculture, and ancestral textile traditions.',
    inspiration:
      'Inspired by the agrarian matriarchs of southern Nigeria, the sacred fertility of the plantain and banana groves (ogba), and the timeless dignity of the wrapped textile (wrapper) worn for work, worship, and family gatherings.',
    designDetails: [
      'Sculptural asymmetrical off-the-shoulder neckline in stretch velvet-cotton knit',
      'Double-folded authentic Ankara wax wrapper tied with ancestral gathered side knot',
      'Rich navy blue, ochre gold, and crimson red wildlife and royal crest iconography',
      'High-contrast balance between modern minimalist black silhouette and historic print',
      'Grounded, barefoot editorial styling honoring direct connection to the soil',
      'Reversible wrap orientation allowing versatile drape lengths',
    ],
    culturalStory:
      'In Delta and southern Nigerian culture, the wrapper is the foundational garment of womanhood. From childhood into motherhood and eldership, women wear wrappers that convey life stage, royal descent, and family pride.\n\nThis look strips away excessive artificial ornament to celebrate the raw, majestic elegance of a woman standing tall beneath the canopy of her ancestral soil.',
    designPhilosophy:
      '> Grounded in the soil that feeds our stories.\n\nAfrican fashion cannot be separated from the land. The crops, the trees, and the earth are the first runway and the eternal muse.',
    silhouette: 'Off-Shoulder • Wrapped • Earth-Grounded',
    keyElements: [
      'Ankara Wax Wrapper',
      'Off-Shoulder Knit',
      'Plantain Grove',
      'Agrarian Lineage',
      'Sacred Earth',
    ],
    story:
      'Shot on location in Abraka among towering plantain trees, this photograph captures a quiet communion with nature. As the model gently touches the rain-washed banana leaf, her wrapped textile speaks of generations of African women who have drawn strength and identity from the land.',
    process: [
      'Ergonomic draped wrap technique ensuring freedom of stride and natural gait.',
      'Body-conscious off-the-shoulder top cut with hidden elastic stay tape to prevent slipping during movement.',
      'Pure cotton wax print washed and softened with natural river water to achieve comfortable drape.',
    ],
    heritage:
      'Honoring the ancestral tradition of wrapper tying (Iro) practiced across Delta, Edo, and Yoruba matriarchal lineages.',
    sustainability:
      'Pure 100% African cotton wax print; location shoot conducted with zero environmental disruption, celebrating local agro-ecology.',
    materials:
      '100% African cotton Ankara print, soft modal-cotton jersey bodice, natural dyes.',
    credits: 'Creative Direction: Mercy Ufuoma · Location: Abraka Flora Archive | 2026.',
  },
  {
    slug: 'look-09',
    label: 'LOOK 09',
    title: 'Chlorophyll Mosaic Upcycled Sachet Silhouette',
    category: 'Atelier Craft',
    year: '2026',
    season: 'SS26 Haute Couture',
    atelierHours: '215 Atelier Hours',
    techniqueFocus: 'Post-Consumer Foil/Sachet Mosaic Appliqué & Column Tailoring',
    shape: 'portrait',
    image: images.upcycledSachet,
    gallery: [images.upcycledSachet],
    designConcept:
      'A groundbreaking sustainable couture ensemble pairing a structured black sweetheart column mini-dress and sheer illusion trouser legs with hundreds of meticulously cut, folded, and heat-contoured recycled green beverage sachets. Radiating across the decolletage and hips like lush botanical scales or iridescent beetle wings, this look transforms urban single-use waste into luminous, jewel-like ecological haute couture.',
    inspiration:
      'Inspired by the urgency of African environmental conservation, circular economy movements, and the natural protective armor of pangolin scales and rain-forest foliage. The piece turns street pollution into a high-fashion critique and celebration of regenerative design.',
    designDetails: [
      'Hundreds of hand-cut recycled beverage sachet scales shaped into dimensional leaf petals',
      'Asymmetrical off-the-shoulder black satin bodice with structured internal support',
      'Lush emerald green metallic and foil leaf mosaic cascading over the bust and hips',
      'Coordinated architectural upcycled sachet envelope clutch',
      'Sheer black chiffon illusion pant legs creating elegant vertical column elongation',
      'Reinforced concealed back zip with edge-stitched satin binding',
    ],
    culturalStory:
      'Across modern African urban centers, discarded plastic sachets present one of the most visible environmental challenges.\n\nMercified Artistry answers this crisis not with despair, but with radical creativity—transforming street-collected packaging into an iridescent botanical tapestry that honors the resilience of the African ecosystem.',
    designPhilosophy:
      '> Waste is merely raw material awaiting artistic dignity.\n\nTrue luxury in the 21st century must heal the earth. We believe African couture can lead the world in circular, zero-waste innovation without sacrificing elegance.',
    silhouette: 'Fitted Column • Botanical Mosaic • Sheer Overlay',
    keyElements: [
      'Upcycled Foil Sachets',
      'Botanical Mosaic',
      'Circular Fashion',
      'Sheer Column Legs',
      'Eco-Activism',
    ],
    story:
      'Photographed along a sun-drenched pathway in rural Abraka bordered by banana trees, this dress captures a provocative dialogue between nature and human consumption. The gleaming green sachet leaves catch natural sunlight exactly like fresh dew-soaked plantain leaves.',
    process: [
      'Post-consumer beverage sachets gathered, sanitized, and sorted by green color gradients.',
      'Individual petals precision-cut and heat-sealed to prevent fraying and maintain three-dimensional curvature.',
      'Hand-stitched in overlapping organic leaf sequences across a reinforced cotton-satin foundation.',
    ],
    heritage:
      'Drawing on the historic African ethos of resourceful ingenuity and repurposing, elevating communal reclamation to the global runway.',
    sustainability:
      'Constructed with over 90% reclaimed single-use plastics and packaging that would otherwise litter local waterways. Zero virgin synthetic embellishments.',
    materials:
      'Upcycled beverage packaging foil, reclaimed polyester satin, pure silk organza sheer legs, cotton thread.',
    credits: 'Creative Direction: Mercy Ufuoma · Eco-Atelier Craft: Mercified Artistry Abraka | 2026.',
  },
  {
    slug: 'look-10',
    label: 'LOOK 10',
    title: 'Palm Sanctuary Spiral Handkerchief Sundress',
    category: 'Lookbook Studies',
    year: '2026',
    season: '2026 Resort & Ready-to-Wear',
    atelierHours: '120 Atelier Hours',
    techniqueFocus: 'Elastic Bodice Smocking & Multi-Tier Handkerchief Hem Geometry',
    shape: 'portrait',
    image: images.palmSanctuary,
    gallery: [images.palmSanctuary],
    designConcept:
      'A spirited, earth-grounded sundress crafted in rich crimson, ochre, and black solar-spiral Ankara wax print. Engineered with a form-fitting hand-shirred elastic bodice, puffed flutter cap sleeves, a braided gold neckline fringe, and a dramatic handkerchief waterfall hem that flows with effortless asymmetry around the body.',
    inspiration:
      'Inspired by the sacred presence of coconut and oil palm groves (Igi Ope) in southern Nigerian communal life, where ancient trees frame shared paths and provide shelter, sustenance, and spiritual anchor. The swirling Ankara motifs evoke solar energy, life cycles, and warmth.',
    designDetails: [
      'Hand-shirred elastic bodice offering flexible, contoured comfort for all body types',
      'Asymmetrical handkerchief waterfall hemline with cascading geometric drape',
      'Concentric solar swirl motifs in deep crimson, ochre gold, and midnight black',
      'Puffed cap sleeves with gathered elastic cuffs',
      'Hand-woven gold and cream tassel fringe bordering the square decolletage',
      'Double-turned rolled hems ensuring fluid kinetic flutter during movement',
    ],
    culturalStory:
      'In Delta State culture, the palm tree is sacred—every part from root to frond serves human life. Captured barefoot between two towering palm trunks, this silhouette celebrates the timeless joy and grounded strength of African women in communion with nature.',
    designPhilosophy:
      '> Flow with the wind, stand like the palm.\n\nFashion should never restrict the human spirit—it should move like water, breathe with the breeze, and root us in ancestral soil.',
    silhouette: 'Smocked Bodice • Handkerchief Hem • Waterfall Flow',
    keyElements: [
      'Solar Spiral Ankara',
      'Handkerchief Hem',
      'Shirred Bodice',
      'Palm Sanctuary',
      'Gold Fringe Decolletage',
    ],
    story:
      'Posed naturally between two grand palm trunks, this photograph captures serene groundedness. The rich red swirl print dances in contrast with the weathered tree bark, capturing the harmony between human creativity and nature’s enduring architecture.',
    process: [
      'Precision Ankara pattern placement centering the solar spiral motif across the front waterfall drop.',
      'Dense multi-row elastic thread smocking applied across the midsection for ergonomic flexibility.',
      'Bias-cut handkerchief panels draped and balanced to ensure graceful movement while walking.',
    ],
    heritage:
      'Rooted in Nigerian daywear and celebratory wrapper traditions, re-tailored into a carefree modern silhouette for resort and cultural ceremonies.',
    sustainability:
      '100% natural breathable African cotton wax print; zero plastic zippers or synthetic boning, designed for lifetime biodegradability.',
    materials:
      '100% African cotton Ankara print, natural cotton elastic shirring, metallic gold embroidery yarn.',
    credits: 'Creative Direction: Mercy Ufuoma · Location: Delta Palm Sanctuary Editorial | 2026.',
  },
];

// Clean, focused navigation: 4 core destinations (Home, About, Portfolio, Contact)
// Runway is curated directly under Portfolio; Heritage, Process, and Sustainability are embedded into each garment
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export const primaryNavigation = navigation;
export const allNavigation = navigation;

export const brand = {
  name: 'MERCIFIED ARTISTRY',
  founder: 'Onobrorhie Mercy Ufuoma',
  role: 'Founder & Creative Director',
  location: 'Abraka, Delta State, Nigeria',
  tagline: 'African Heritage, Intentionally Reimagined.',
};
