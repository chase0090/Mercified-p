import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, useParams } from 'wouter';
import { articles, brand, collections, images, navigation, primaryNavigation, secondaryNavigation, works, type ImageAsset } from './content';

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const pageTitle = `${title} | ${brand.name}`;
    document.title = pageTitle;
    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [title, description]);
}

function EditorialImage({ image, className = 'portrait', caption }: { image: ImageAsset; className?: string; caption?: string }) {
  return <figure className="image-figure">
    <div className={`photo ${className}`}><img src={image.src} alt={image.alt} loading="lazy" sizes="(max-width: 640px) 100vw, 70vw" /></div>
    {caption && <figcaption className="photo-caption"><span>{caption}</span><span>Concept image · temporary</span></figcaption>}
  </figure>;
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2 className="serif">{title}</h2></div>{children && <p>{children}</p>}</div>;
}

function Header({ home }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const isCurrent = (href: string) =>
    location === href ||
    ((href === '/collections' || href === '/journal') && location.startsWith(`${href}/`));

  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstFocusable = document.querySelector<HTMLElement>('#site-menu a');
    firstFocusable?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAndRestore();
      if (event.key === 'Tab') {
        const items = Array.from(document.querySelectorAll<HTMLElement>('#site-menu a, #site-menu button'));
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prior; window.removeEventListener('keydown', onKey); };
  }, [open]);
  const closeAndRestore = () => {
    setOpen(false);
    window.setTimeout(() => openerRef.current?.focus(), 0);
  };
  return <>
    <header className={`header ${home ? '' : 'is-light'} ${scrolled ? 'is-scrolled' : ''}`} data-testid="site-header">
      <Link href="/" className="brand" aria-label="Mercified Artistry home" data-testid="link-brand-home">MERCIFIED ARTISTRY</Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryNavigation.map((item) => {
          const current = isCurrent(item.href);
          return <Link key={item.href} href={item.href} className={current ? 'is-active' : ''} aria-current={current ? 'page' : undefined} data-testid={`link-primary-${item.href === '/' ? 'home' : item.href.slice(1)}`}>{item.label}</Link>;
        })}
      </nav>
      <details className={`more-menu ${secondaryNavigation.some((item) => isCurrent(item.href)) ? 'has-active' : ''}`}>
        <summary data-testid="nav-more">More</summary>
        <div className="more-dropdown">{secondaryNavigation.map((item) => {
          const current = isCurrent(item.href);
          return <Link key={item.href} href={item.href} className={current ? 'is-active' : ''} aria-current={current ? 'page' : undefined} data-testid={`link-secondary-${item.href.slice(1)}`}>{item.label}</Link>;
        })}</div>
      </details>
      <button ref={openerRef} className="menu-trigger" aria-expanded={open} aria-controls="site-menu" aria-label="Open navigation menu" onClick={() => setOpen(true)} data-testid="button-open-menu">
        Menu <span className="bars" aria-hidden="true"><i /><i /></span>
      </button>
    </header>
    {open && <div id="site-menu" className="menu-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeAndRestore(); }}>
      <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="menu-close">
          <Link href="/" className="brand" onClick={closeAndRestore} data-testid="link-drawer-brand">MERCIFIED ARTISTRY</Link>
          <button className="menu-button" onClick={closeAndRestore} aria-label="Close navigation" data-testid="button-close-menu">Close ×</button>
        </div>
        <nav className="menu-links" aria-label="All pages">{navigation.map((item) => {
          const current = isCurrent(item.href);
          return <Link key={item.href} href={item.href} onClick={closeAndRestore} className={current ? 'is-active' : ''} aria-current={current ? 'page' : undefined} data-testid={`link-menu-${item.href === '/' ? 'home' : item.href.slice(1)}`}>{item.label}</Link>;
        })}</nav>
      </div>
    </div>}
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-top">
      <div className="footer-brand"><h3>MERCIFIED ARTISTRY</h3><p>African Heritage,<br /><em>Intentionally Reimagined.</em></p></div>
      <nav className="footer-nav" aria-label="Footer navigation">{navigation.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
      <div className="footer-location">{brand.location}<br />Independent fashion practice</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Mercified Artistry</span><span>Concept imagery is temporary and editable.</span></div>
  </footer>;
}

function Shell({ children, home = false }: { children: ReactNode; home?: boolean }) {
  return <div className="site"><Header home={home} /><main>{children}</main><Footer /></div>;
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="text-link">{children}<span aria-hidden="true">→</span></Link>;
}

function ImageLightbox({ image, onClose, openerRef }: {
  image: ImageAsset;
  onClose: () => void;
  openerRef: { current: HTMLElement | null };
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, openerRef]);

  function close() {
    onClose();
    window.setTimeout(() => openerRef.current?.focus(), 0);
  }

  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged image" tabIndex={-1} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <button ref={closeButtonRef} onClick={close} aria-label="Close image">Close ×</button>
    <img src={image.src} alt={image.alt} />
  </div>;
}

function HomePage() {
  usePageMeta('Home', 'MERCIFIED ARTISTRY is a Nigerian fashion practice exploring African heritage through intentional contemporary design and craftsmanship.');
  return <Shell home>
    <section className="hero">
      <img className="hero-image" src={images.hero.src} alt={images.hero.alt} fetchPriority="high" />
      <div className="hero-copy">
        <span className="eyebrow">Fashion practice · Abraka, Nigeria</span>
        <h1 className="serif">African Heritage,<br /><em>Intentionally Reimagined.</em></h1>
        <div className="hero-meta"><p>Fashion Designer &amp; Creative Director<br /><strong>{brand.founder}</strong><br />{brand.location}</p><a href="#house" className="scroll-cue">Enter the house</a></div>
      </div>
      <span className="hero-vertical">MERCIFIED ARTISTRY · CONCEPT IMAGE</span>
    </section>

    <section id="house" className="section">
      <div className="wrap split">
        <div className="copy-block"><span className="eyebrow">The house</span><h2 className="serif">Design with a point of view.</h2><p className="lead">Mercified Artistry is a Nigerian fashion practice exploring the relationship between African heritage and contemporary design.</p><p>Through intentional fashion, cultural storytelling, craftsmanship and creative expression, the house makes space for heritage to speak in a contemporary visual language.</p><TextLink href="/about">Discover the house</TextLink></div>
        <EditorialImage image={images.look1} className="portrait" caption="Fashion concept · temporary" />
      </div>
    </section>

    <section className="section compact home-explore">
      <div className="wrap">
        <SectionHeading eyebrow="Explore the house" title="A separate page for every chapter">Choose a section to explore. The full work archive lives on its own page, organized by category.</SectionHeading>
        <div className="home-page-links">
          {[
            { label: 'About', href: '/about', description: 'Meet the designer and learn about the house.' },
            { label: 'Collections', href: '/collections', description: 'Browse the collection archive and individual collection pages.' },
            { label: 'Portfolio', href: '/portfolio', description: 'Explore the current work archive, organized by category.' },
            { label: 'Heritage', href: '/heritage', description: 'Explore the house’s ongoing cultural research.' },
            { label: 'Process', href: '/process', description: 'Follow the creative process from research to final form.' },
            { label: 'Journal', href: '/journal', description: 'Read editorial notes on heritage and creative process.' },
          ].map((page) => <Link key={page.href} href={page.href} className="home-page-card" data-testid={`home-page-${page.href.slice(1)}`}>
            <span className="eyebrow">Explore</span>
            <h3 className="serif">{page.label}</h3>
            <p>{page.description}</p>
            <span className="home-page-arrow" aria-hidden="true">↗</span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="cta"><div className="wrap cta-inner"><div><span className="eyebrow">Collaborations · opportunities · press</span><h2>Let’s create<br /><em>something intentional.</em></h2></div><TextLink href="/contact">Start a conversation</TextLink></div></section>
  </Shell>;
}

function PageHeading({ label, title, description }: { label: string; title: string; description: string }) {
  return <div className="wrap page-title"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{description}</p></div>;
}

function AboutPage() {
  usePageMeta('About', 'Meet Mercy Ufuoma and discover the philosophy of Mercified Artistry, a Nigerian fashion practice.');
  return <Shell><PageHeading label="The designer / the house" title="About" description="A Nigerian fashion practice shaped by heritage, thoughtful design and the belief that fashion can carry stories." />
    <section className="section compact"><div className="wrap about-intro"><EditorialImage image={images.designer} className="portrait" caption="Portrait concept · temporary" /><div><span className="eyebrow">The designer</span><h2>Mercy Ufuoma</h2><span className="eyebrow">Founder &amp; Creative Director</span><p>Mercy Ufuoma is a Nigerian fashion designer and creative entrepreneur committed to exploring the relationship between African heritage and contemporary fashion.</p><p>Her journey began early, learning from her mother, a fashion designer. It grew into a passion and fashion business with a larger vision: create fashion that tells stories, celebrates culture, and gives African heritage a place on the global stage.</p><p>Through Mercified Artistry, Mercy creates intentional, elegant, culturally inspired pieces, reinterpreting traditional influences through contemporary silhouettes, craftsmanship and creative expression.</p></div></div></section>
    <section className="section archive-section"><div className="wrap split"><div className="copy-block"><span className="eyebrow">The house</span><h2 className="serif">MERCIFIED ARTISTRY</h2><p className="lead">African Heritage, Intentionally Reimagined.</p><p>Mercified Artistry is a Nigerian fashion practice exploring African heritage through intentional contemporary design and craftsmanship. The house brings together fashion, cultural storytelling and creative expression.</p><p>Based in {brand.location}, the practice is oriented toward an international audience while staying attentive to the meaning and context of its references.</p></div><EditorialImage image={images.look1} className="landscape" caption="Fashion concept · temporary" /></div></section>
    <section className="section"><div className="wrap"><SectionHeading eyebrow="What we believe" title="Four guiding ideas" /><div className="values-list">{[['Heritage','Understanding and preserving African cultural identity.'],['Design','Reinterpreting heritage through contemporary creativity and craftsmanship.'],['Impact','Creating opportunities for young creatives and exploring more sustainable approaches.'],['Global vision','Taking African stories, techniques and perspectives to wider audiences through fashion.']].map(([heading, text]) => <article className="value" key={heading}><h3>{heading}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="vision"><div className="wrap vision-inner"><div><span className="eyebrow">Design philosophy</span><h2>African Heritage,<br /><em>Intentionally Reimagined.</em></h2><p>Fashion as a language for identity, story and creative possibility.</p></div><EditorialImage image={images.look2} className="landscape" caption="Fashion concept · temporary" /></div></section>
  </Shell>;
}

function CollectionsPage() {
  usePageMeta('Collections', 'Explore the Mercified Artistry collection archive.');
  return <Shell><PageHeading label="The archive" title="Collections" description="Chapters of design, heritage and creative exploration. Collection information is locally editable; concepts shown are temporary imagery only." />
    <section className="section compact"><div className="wrap archive-list">{collections.map((collection, index) => <article className="archive-row" key={collection.slug}><Link href={`/collections/${collection.slug}`} className="photo"><img src={collection.hero.src} alt={collection.hero.alt} loading="lazy" /></Link><div><span className="eyebrow">{collection.year}</span><h2>{collection.title}</h2><p>{collection.description}</p><TextLink href={`/collections/${collection.slug}`}>View collection</TextLink></div></article>)}</div></section></Shell>;
}

function CollectionDetailPage() {
  const params = useParams<{ slug: string }>();
  const collection = collections.find((entry) => entry.slug === params.slug);
  usePageMeta(collection?.title ?? 'Collection', collection?.description ?? 'A Mercified Artistry collection archive entry.');
  if (!collection) return <NotFoundPage />;
  return <Shell><PageHeading label={`Collection / ${collection.year}`} title={collection.title} description={collection.description} />
    <section className="wrap page-hero-image"><img src={collection.hero.src} alt={collection.hero.alt} /></section>
    <section className="section"><div className="wrap detail-layout"><aside className="detail-sticky"><span className="eyebrow">Collection story</span><h1>{collection.title}</h1><p>{collection.story}</p><p><strong>Materials / techniques</strong><br />{collection.materials}</p><p><strong>Credits</strong><br />{collection.credits}</p><TextLink href="/collections">Back to collections</TextLink></aside><div className="detail-gallery">{collection.gallery.map((image, i) => <EditorialImage key={`${image.src}-${i}`} image={image} className={i === 0 || i === collection.gallery.length - 1 ? 'wide' : 'portrait'} caption={`Look ${String(i + 1).padStart(2, '0')}`} />)}</div></div></section>
  </Shell>;
}

function PortfolioPage() {
  usePageMeta('Portfolio', 'Browse the Mercified Artistry work archive, organized by category.');
  const categories = Array.from(new Set(works.map((item) => item.category)));
  const [activeCategory, setActiveCategory] = useState('All work');
  const [selected, setSelected] = useState<ImageAsset | null>(null);
  const lightboxOpenerRef = useRef<HTMLElement | null>(null);
  const openLightbox = (image: ImageAsset) => {
    lightboxOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(image);
  };
  const visibleCategories = activeCategory === 'All work' ? categories : [activeCategory];
  return <Shell><PageHeading label="The visual archive" title="Portfolio" description="Browse all current work entries grouped by category. Images are temporary generated concepts, not confirmed house campaigns." />
    <section className="section compact"><div className="wrap">
      <div className="portfolio-filters" role="group" aria-label="Filter portfolio by category">
        <button type="button" onClick={() => setActiveCategory('All work')} aria-pressed={activeCategory === 'All work'} data-testid="button-filter-all-work">All work</button>
        {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} data-testid={`button-filter-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{category}</button>)}
      </div>
      <div className="portfolio-note"><strong>Archive note</strong>The current entries use temporary concept imagery. Replace them with approved house work and details as they become available.</div>
      <div className="portfolio-categories">
        {visibleCategories.map((category) => {
          const categoryWorks = works.filter((item) => item.category === category);
          const categoryId = `portfolio-category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return <section className="portfolio-category" key={category} aria-labelledby={categoryId}>
            <div className="portfolio-category-heading">
              <div><span className="eyebrow">{categoryWorks.length} {categoryWorks.length === 1 ? 'entry' : 'entries'}</span><h2 className="serif" id={categoryId}>{category}</h2></div>
            </div>
            <div className={`portfolio-grid count-${Math.min(categoryWorks.length, 3)}`}>
              {categoryWorks.map((item) => <article className="portfolio-card" key={item.label}>
                <button className="portfolio-work-image" type="button" onClick={() => openLightbox(item.image)} aria-label={`Enlarge ${item.label}`} data-testid={`button-enlarge-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className={`photo ${item.shape}`}><img src={item.image.src} alt={item.image.alt} loading="lazy" /></div>
                </button>
                <div className="portfolio-work-meta"><span>{item.label}</span><span>{item.category}</span></div>
                <p className="portfolio-concept-label">Temporary concept image</p>
              </article>)}
            </div>
          </section>;
        })}
      </div>
    </div></section>
    {selected && <ImageLightbox image={selected} onClose={() => setSelected(null)} openerRef={lightboxOpenerRef} />}</Shell>;
}

function HeritagePage() {
  usePageMeta('Heritage', 'Heritage, textile and cultural research at Mercified Artistry.');
  return <Shell><PageHeading label="Cultural research" title="Heritage" description="African identity, textile, culture and storytelling—approached with curiosity, care and an eye toward contemporary fashion." />
    <section className="wrap page-hero-image"><img src={images.textile.src} alt={images.textile.alt} /></section>
    <section className="section"><div className="wrap archive-feature"><div className="archive-note"><span className="eyebrow">Akwécha / Anioma</span><h2 className="serif">An inquiry in progress.</h2><p>These references are part of an evolving cultural research space. This site does not assign unverified historical meanings or present concept images as documentary records.</p></div><EditorialImage image={images.look2} className="landscape" caption="Fashion concept · temporary" /></div></section>
    <section className="section archive-section"><div className="wrap"><SectionHeading eyebrow="From research to expression" title="Cultural references">Research is a starting point for considered design translation, not a substitute for context or attribution.</SectionHeading><div className="archive-details"><EditorialImage image={images.textile} className="landscape" caption="Textile archive concept" /><EditorialImage image={images.detail} className="landscape" caption="Material study concept" /></div><div className="process-strip">{['Akwécha', 'Anioma', 'Textile research', 'Cultural references', 'Design translation'].map((text, i) => <div className="process-step" key={text}><b>0{i + 1}</b><p>{text}</p></div>)}</div></div></section>
    <section className="section"><div className="wrap story-body"><span className="eyebrow">Research statement</span><p>Mercified Artistry explores how African heritage can inform contemporary fashion through thoughtful inquiry and creative expression. Specific cultural research, sourcing and attributions will be added when verified and approved.</p><TextLink href="/contact">Discuss a collaboration</TextLink></div></section></Shell>;
}

function ProcessPage() {
  usePageMeta('Creative process', 'A visual introduction to the Mercified Artistry creative process.');
  const stages = [['01', 'Research', images.textile], ['02', 'Sketch', images.detail], ['03', 'Material', images.detail], ['04', 'Experiment', images.look1], ['05', 'Construction', images.detail], ['06', 'Final form', images.look2]] as const;
  return <Shell><PageHeading label="Inside the atelier" title="The creative process" description="A visual story moving from research and early ideas toward material, construction and final form." />
    <section className="wrap page-hero-image"><img src={images.detail.src} alt={images.detail.alt} /></section>
    <section className="section"><div className="wrap archive-list">{stages.map(([num, title, image], index) => <article key={num} className="archive-row"><EditorialImage image={image} className={index % 2 ? 'landscape' : 'portrait'} caption={`${title} · concept image`} /><div><span className="eyebrow">{num} / Atelier</span><h2>{title}</h2><p>{index === 0 ? 'Questions, references and observation set a direction for a design idea.' : index === 1 ? 'Early lines and proportions make the first visual decisions visible.' : index === 2 ? 'Material offers texture, movement and possibility to the emerging form.' : index === 3 ? 'Ideas develop through testing, adjustment and expressive choices.' : index === 4 ? 'Construction brings silhouette and material into a finished relationship.' : 'The final form brings the process into a considered whole.'}</p></div></article>)}</div></section></Shell>;
}

function RunwayPage() {
  usePageMeta('Runway & showcases', 'Showcase information and editorial placeholders for Mercified Artistry.');
  return <Shell><PageHeading label="Public presentation" title="Runway / showcases" description="A place for confirmed showcase stories, event details and imagery. No events or runway achievements have been supplied yet." />
    <section className="runway-band"><img src={images.look2.src} alt={images.look2.alt} /><div className="runway-copy"><span className="eyebrow">Showcase archive</span><h2>Stories to come.</h2><p>This visual space is ready for verified event name, year, location, description and approved images.</p></div></section>
    <section className="section"><div className="wrap split"><EditorialImage image={images.look1} className="portrait" caption="Fashion concept · temporary" /><div className="copy-block"><span className="eyebrow">Event record</span><h2 className="serif">Awaiting house details</h2><p>There are no showcase entries available to publish at this time. Event information remains neutral until confirmed, so this page does not imply participation or achievements.</p><div className="status-note"><strong>Editorial placeholder</strong>Replace with approved event details and credits when available.</div></div></div></section></Shell>;
}

function JournalPage() {
  usePageMeta('Journal', 'Stories and notes on fashion, heritage and creative process.');
  return <Shell><PageHeading label="Notes from the house" title="Journal" description="A small editorial space for fashion, heritage and process. Stories below are editable concept copy, not published reporting." />
    <section className="section compact"><div className="wrap archive-list">{articles.map((article) => <article className="archive-row" key={article.slug}><Link href={`/journal/${article.slug}`} className="photo"><img src={article.image.src} alt={article.image.alt} loading="lazy" /></Link><div><span className="eyebrow">{article.category} · {article.date}</span><h2>{article.title}</h2><p>{article.excerpt}</p><TextLink href={`/journal/${article.slug}`}>Read story</TextLink></div></article>)}</div></section></Shell>;
}

function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = articles.find((entry) => entry.slug === params.slug);
  usePageMeta(article?.title ?? 'Journal story', article?.excerpt ?? 'A Mercified Artistry journal entry.');
  if (!article) return <NotFoundPage />;
  return <Shell><PageHeading label={`${article.category} · ${article.date}`} title={article.title} description={article.excerpt} />
    <section className="wrap page-hero-image"><img src={article.image.src} alt={article.image.alt} /></section>
    <section className="section"><article className="wrap story-body">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="status-note"><strong>Editorial note</strong>This is editable placeholder copy. Verify research and attribution before publication.</div><div style={{ marginTop: 35 }}><TextLink href="/journal">Back to journal</TextLink></div></article></section>
    <section className="section archive-section"><div className="wrap"><SectionHeading eyebrow="Continue reading" title="Related stories" /><div className="collection-preview">{articles.filter((entry) => entry.slug !== article.slug).map((entry) => <article className="collection-tile" key={entry.slug}><Link href={`/journal/${entry.slug}`}><div className="photo"><img src={entry.image.src} alt={entry.image.alt} loading="lazy" /></div></Link><h3>{entry.title}</h3><p>{entry.category} · {entry.date}</p><TextLink href={`/journal/${entry.slug}`}>Read story</TextLink></article>)}</div></div></section></Shell>;
}

function SustainabilityPage() {
  usePageMeta('Sustainability', 'The thoughtful practice principles behind Mercified Artistry.');
  return <Shell><PageHeading label="A considered practice" title="Sustainability" description="A space for an honest, evolving conversation about design, craftsmanship, materials and longevity—without unsupported claims." />
    <section className="wrap page-hero-image"><img src={images.detail.src} alt={images.detail.alt} /></section>
    <section className="section"><div className="wrap"><SectionHeading eyebrow="A thoughtful approach" title="Questions before claims">The house is committed to considering these subjects with care. Verified practices and specifics can be added as they are established.</SectionHeading><div className="values-list">{[['Intentional design','Making considered creative choices from the earliest stages of an idea.'],['Craftsmanship','Recognising the attention and skill involved in making fashion.'],['Material awareness','Treating material selection as an important part of design exploration.'],['Longevity','Considering how a garment may hold meaning beyond a single moment.'],['Responsible creative practice','Continuing to ask how a fashion practice can work with care and purpose.']].map(([title, copy]) => <article key={title} className="value"><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="status-note" style={{ marginTop: 34 }}><strong>Transparent by design</strong>No certifications, statistics or environmental performance claims are made on this page.</div></div></section></Shell>;
}

function CredentialsPage() {
  usePageMeta('Credentials', 'Professional profile and editable credentials for Mercified Artistry.');
  const sections = ['Achievements', 'Showcases', 'Features', 'Education / Training', 'Collaborations', 'Recognition', 'Professional Development'];
  return <Shell><PageHeading label="Professional profile" title="Credentials" description="A considered home for confirmed achievements, education, collaborations and professional milestones." />
    <section className="section compact"><div className="wrap"><div className="page-hero-image" style={{ height: 'min(54vw, 580px)' }}><img src={images.hero.src} alt={images.hero.alt} /></div><div className="values-list" style={{ marginTop: 55 }}>{sections.map((section) => <article key={section} className="value"><span className="eyebrow">{section}</span><h3>Details pending</h3><p>Information has not been supplied. This entry is intentionally neutral and ready for verified details.</p></article>)}</div></div></section></Shell>;
}

function ContactPage() {
  usePageMeta('Contact', 'Contact Mercified Artistry for collaborations, fashion opportunities and creative projects.');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <Shell><PageHeading label="Contact / collaboration" title="Let’s create something intentional." description="For collaborations, fashion opportunities, showcases, creative projects and press." />
    <section className="section compact"><div className="wrap contact-layout"><div className="copy-block"><span className="eyebrow">Start a conversation</span><h2 className="serif">Open to what comes next.</h2><p>Share a little about your idea and the best way to reach you. This form is frontend-only; your message is not transmitted or stored.</p><div style={{ marginTop: 32 }}><span className="eyebrow">Based in</span><p>{brand.location}</p></div><div className="status-note"><strong>Contact details</strong>Direct email and social links have not been supplied.</div></div>
      <div>{submitted ? <div className="confirmation" role="status"><strong>Thank you{name ? `, ${name}` : ''}.</strong><br />Your message has been prepared. This frontend-only form did not send or store it. Please use your own email application to contact the house once an official address is available.</div> : <form className="contact-form" onSubmit={submit}>
        <div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></div>
        <div className="field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" required autoComplete="email" /></div>
        <div className="field full"><label htmlFor="contact-subject">Subject</label><select id="contact-subject" name="subject" defaultValue="" required><option value="" disabled>Select a reason for reaching out</option><option>Collaboration</option><option>Fashion opportunity</option><option>Showcase</option><option>Creative project</option><option>Press</option><option>Other</option></select></div>
        <div className="field full"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required /></div>
        <button className="submit-button" type="submit">Prepare message →</button>
      </form>}</div></div></section></Shell>;
}

function NotFoundPage() {
  usePageMeta('Page not found', 'The requested page could not be found.');
  return <Shell><section className="wrap not-found"><div><span className="eyebrow">404 · Not found</span><h1>Lost in the archive.</h1><p>The page you are looking for is not here.</p><TextLink href="/">Return home</TextLink></div></section></Shell>;
}

function App() {
  const [location] = useLocation();
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [location]);
  return <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/collections/:slug" component={CollectionDetailPage} />
    <Route path="/collections" component={CollectionsPage} />
    <Route path="/portfolio" component={PortfolioPage} />
    <Route path="/heritage" component={HeritagePage} />
    <Route path="/process" component={ProcessPage} />
    <Route path="/runway" component={RunwayPage} />
    <Route path="/journal/:slug" component={ArticlePage} />
    <Route path="/journal" component={JournalPage} />
    <Route path="/sustainability" component={SustainabilityPage} />
    <Route path="/credentials" component={CredentialsPage} />
    <Route path="/contact" component={ContactPage} />
    <Route component={NotFoundPage} />
  </Switch>;
}

export default App;
