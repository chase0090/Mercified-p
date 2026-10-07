import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, useParams } from 'wouter';
import {
  brand,
  images,
  navigation,
  works,
  type ImageAsset,
  type Work,
} from './content';

// ==========================================
// LUXURY THEME CONTEXT & HOOK
// ==========================================
type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ma_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ma_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

// ==========================================
// BESPOKE HAUTE COUTURE BRAND LOGO
// ==========================================
function Logo({ className = '', subtitle = true }: { className?: string; subtitle?: boolean }) {
  return (
    <Link href="/" className={`brand-logo ${className}`} aria-label="Mercified Artistry Home" data-testid="link-brand-home">
      <div className="brand-logo-emblem" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-sigil">
          {/* Outer high-fashion diamond crest */}
          <rect x="24" y="3" width="29.7" height="29.7" rx="2" transform="rotate(45 24 3)" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
          {/* Inner monogram: M and A architectural intersections */}
          <path d="M13 32V17L24 27L35 17V32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 28L24 14L30 28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="20" y1="24.5" x2="28" y2="24.5" stroke="currentColor" strokeWidth="1.2" />
          {/* Apex crown jewel in terracotta/gold */}
          <polygon points="24,6 26,9 24,12 22,9" fill="#8d5c43" />
        </svg>
      </div>
      <div className="brand-logo-text">
        <span className="brand-logo-title">MERCIFIED ARTISTRY</span>
        {subtitle && <span className="brand-logo-subtitle">HAUTE COUTURE · NIGERIA</span>}
      </div>
    </Link>
  );
}

// ==========================================
// THEME TOGGLER BUTTON
// ==========================================
function ThemeToggle({ className = '' }: { className?: string; compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
      data-testid="button-theme-toggle"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
    >
      <span className="theme-toggle-emoji" aria-hidden="true">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

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

function EditorialImage({ image, className = 'portrait' }: { image: ImageAsset; className?: string; caption?: string }) {
  return (
    <figure className="image-figure">
      <div className={`photo ${className}`}>
        <img src={image.src} alt={image.alt} loading="lazy" sizes="(max-width: 640px) 100vw, 70vw" />
      </div>
    </figure>
  );
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="serif">{title}</h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function Marquee() {
  const items = ['African Heritage', 'Intentionally Reimagined', 'Contemporary Craft', 'Cultural Storytelling'];
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((text, i) => (
          <span className={i % 2 ? 'marquee-word outline' : 'marquee-word'} key={i}>
            {text}
            <b>·</b>
          </span>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// CLEAN, FOCUSED HORIZONTAL HEADER (NO REDUNDANT ITEMS)
// ==========================================
function Header({ home }: { home?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 20);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const isCurrent = (href: string) =>
    href === '/' ? location === '/' : location === href || location.startsWith(`${href}/`);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prior;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  return (
    <>
      <header
        className={`header ${home ? 'is-home' : 'is-light'} ${scrolled ? 'is-scrolled' : ''}`}
        data-testid="site-header"
      >
        <div className="header-container">
          {/* LEFT: MERCIFIED ARTISTRY Logo */}
          <div className="header-left">
            <Logo />
          </div>

          {/* CENTER / RIGHT: Clean Horizontal Navigation (Home, About, Portfolio, Runway, Journal, Contact) */}
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => {
              const current = isCurrent(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${current ? 'is-active' : ''}`}
                  aria-current={current ? 'page' : undefined}
                  data-testid={`link-nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Header Actions */}
          <div className="header-actions">
            <ThemeToggle />

            <Link href="/contact" className="header-inquire-btn" data-testid="button-header-inquire">
              <span>Inquire</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </Link>

            {/* Mobile Hamburger Trigger (Only on mobile / tablet) */}
            <button
              ref={triggerRef}
              className="mobile-menu-trigger"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileOpen((prev) => !prev)}
              data-testid="button-open-menu"
            >
              <span className="hamburger-bars" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Clean Mobile Navigation Drawer (Unnumbered, modern, elegant) */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="mobile-drawer-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMobile();
          }}
        >
          <div className="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
            <div className="mobile-drawer-top">
              <Logo subtitle={false} />
              <div className="mobile-drawer-top-actions">
                <ThemeToggle compact />
                <button
                  type="button"
                  className="mobile-drawer-close-btn"
                  onClick={closeMobile}
                  aria-label="Close navigation"
                  data-testid="button-close-menu"
                >
                  <span>Close</span>
                  <span className="close-symbol" aria-hidden="true">✕</span>
                </button>
              </div>
            </div>

            <nav className="mobile-drawer-links" aria-label="Mobile navigation">
              {navigation.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={`mobile-nav-item ${current ? 'is-active' : ''}`}
                    aria-current={current ? 'page' : undefined}
                    data-testid={`link-mobile-${item.href === '/' ? 'home' : item.href.slice(1)}`}
                  >
                    <span className="mobile-item-label">{item.label}</span>
                    {current && <span className="mobile-item-badge">Active</span>}
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-drawer-bottom">
              {/* Designer photo inside the menu */}
              <div className="mobile-drawer-photo">
                <img src={images.designer.src} alt={images.designer.alt} className="mobile-drawer-photo-img" />
                <div className="mobile-drawer-photo-caption">
                  <span>{brand.founder}</span>
                  <small>{brand.role}</small>
                </div>
              </div>
              <Link
                href="/contact"
                onClick={closeMobile}
                className="mobile-drawer-inquire-btn"
                data-testid="button-mobile-drawer-inquire"
              >
                <span>Private Consultation</span>
                <span aria-hidden="true">→</span>
              </Link>
              <div className="mobile-drawer-brand-note">
                <strong>{brand.name}</strong>
                <span>{brand.tagline}</span>
                <small>{brand.location}</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// CLEAN, SOPHISTICATED FOOTER
// ==========================================
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            African Heritage,<br />
            <em>Intentionally Reimagined.</em>
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-location">
          <strong>{brand.location}</strong><br />
          Independent Nigerian Fashion Practice<br />
          Haute Couture &amp; Ready-to-Wear
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mercified Artistry. All rights reserved.</span>
        <div className="footer-bottom-actions">
          <span>Abraka, Delta State, Nigeria</span>
          <ThemeToggle compact />
        </div>
      </div>
    </footer>
  );
}

function Shell({ children, home = false }: { children: ReactNode; home?: boolean }) {
  return (
    <div className="site">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header home={home} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-link">
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function ImageLightbox({
  image,
  onClose,
  openerRef,
}: {
  image: ImageAsset;
  onClose: () => void;
  openerRef: { current: HTMLElement | null };
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
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
    return () => {
      document.body.style.overflow = prior;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, openerRef]);

  function close() {
    onClose();
    window.setTimeout(() => openerRef.current?.focus(), 0);
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
      tabIndex={-1}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button ref={closeButtonRef} onClick={close} aria-label="Close image">
        Close ×
      </button>
      <img src={image.src} alt={image.alt} />
    </div>
  );
}

function PageHeading({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="wrap page-title">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

// ==========================================
// HOME PAGE
// ==========================================
function HomePage() {
  usePageMeta('Home', 'MERCIFIED ARTISTRY is a Nigerian fashion practice exploring African heritage through intentional contemporary design and craftsmanship.');
  return (
    <Shell home>
      <section className="hero">
        <img className="hero-image" src={images.hero.src} alt={images.hero.alt} fetchPriority="high" />
        <div className="hero-copy">
          <span className="eyebrow">Fashion practice · Abraka, Nigeria</span>
          <h1 className="serif">African Heritage,<br /><em>Intentionally Reimagined.</em></h1>
          <div className="hero-meta">
            <p>
              Fashion Designer &amp; Creative Director<br />
              <strong>{brand.founder}</strong><br />
              {brand.location}
            </p>
            <a href="#house" className="scroll-cue">Enter the house</a>
          </div>
        </div>
        <span className="hero-vertical">MERCIFIED ARTISTRY · ATELIER ARCHIVE</span>
        <div className="hero-strip" aria-hidden="true">
          <span>Atelier Archive</span>
          <span>SS26 Couture</span>
          <span>Heritage · Process · Sustainability</span>
        </div>
      </section>

      <Marquee />

      <section id="house" className="section">
        <div className="wrap split">
          <Reveal className="copy-block">
            <span className="eyebrow">The house</span>
            <h2 className="serif">Design with a point of view.</h2>
            <p className="lead">Mercified Artistry is a Nigerian fashion practice exploring the relationship between African heritage and contemporary design.</p>
            <p>Through intentional fashion, cultural storytelling, craftsmanship and creative expression, the house makes space for heritage to speak in a contemporary visual language.</p>
            <TextLink href="/about">Discover the house</TextLink>
          </Reveal>
          <EditorialImage image={images.houseSection} className="portrait" />
        </div>
      </section>

      <section className="dark-section section featured" id="featured">
        <div className="wrap">
          <div className="featured-heading">
            <div>
              <span className="eyebrow">Selected works</span>
              <h2 className="serif">The archive, in motion.</h2>
            </div>
            <div className="featured-heading-aside">
              <p>Runway, lookbook, material study and atelier detail — a working archive where every silhouette carries its cultural heritage, craft process, and circular sustainability.</p>
              <TextLink href="/portfolio">Explore the archive</TextLink>
            </div>
          </div>
          <div className="work-grid">
            {works.slice(0, 4).map((item, i) => (
              <article className="work-item" key={item.slug}>
                <span className="work-index">{String(i + 1).padStart(2, '0')} · {item.category}</span>
                <Link href={`/portfolio/${item.slug}`} className="work-link" data-testid={`home-featured-${item.slug}`}>
                  <div className="photo portrait">
                    <img src={item.image.src} alt={item.image.alt} loading="lazy" />
                    <span className="work-hover">Inspect Piece&nbsp;↗</span>
                  </div>
                </Link>
                <h3>
                  <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="work-note">{item.season} · {item.atelierHours}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="parallax-band" style={{ backgroundImage: `url(${images.hero.src})` }}>
        <div className="parallax-copy">
          <span className="eyebrow">The atelier · heritage in practice</span>
          <h2 className="serif">Built on heritage,<br /><em>worn into the future.</em></h2>
          <TextLink href="/portfolio">Enter the archive</TextLink>
        </div>
      </section>

      <section className="section compact home-explore">
        <div className="wrap">
          <SectionHeading eyebrow="Explore the house" title="Chapters of the practice">
            From the designer's philosophy to the complete archive and public showcases.
          </SectionHeading>
          <div className="home-page-links">
            {[
              { eyebrow: 'The designer', title: 'About', href: '/about', image: images.designer, note: 'Meet Mercy Ufuoma and discover the four guiding ideas behind the house.' },
              { eyebrow: 'The archive', title: 'Portfolio', href: '/portfolio', image: images.newspaperOrigami, note: 'Ten couture silhouettes with integrated cultural heritage, atelier craft, and sustainability.' },
              { eyebrow: 'The conversation', title: 'Contact', href: '/contact', image: images.coralCrown, note: 'Private consultations, bespoke styling, opportunities and creative collaborations.' },
            ].map((page, index) => (
              <Reveal key={page.href} delay={index * 90}>
                <Link href={page.href} className="home-page-card" data-testid={`home-page-${page.href.slice(1)}`}>
                  <div className="home-card-media">
                    <img src={page.image.src} alt="" loading="lazy" />
                  </div>
                  <div className="home-card-body">
                    <div className="home-card-top">
                      <span className="eyebrow">{page.eyebrow}</span>
                      <span className="home-card-num" aria-hidden="true">0{index + 1}</span>
                    </div>
                    <h3 className="serif">{page.title}</h3>
                    <p>{page.note}</p>
                    <span className="home-page-arrow" aria-hidden="true">↗</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta-inner">
          <div>
            <span className="eyebrow">Collaborations · opportunities · press</span>
            <h2>Let’s create<br /><em>something intentional.</em></h2>
          </div>
          <TextLink href="/contact">Start a conversation</TextLink>
        </div>
      </section>
    </Shell>
  );
}

// ==========================================
// ABOUT PAGE
// ==========================================
function AboutPage() {
  usePageMeta('About', 'Meet Onobrorhie Mercy Ufuoma and discover the philosophy of Mercified Artistry, a Nigerian fashion practice.');
  return (
    <Shell>
      <PageHeading
        label="The designer / the house"
        title="About"
        description="A Nigerian fashion practice shaped by heritage, thoughtful design and the belief that fashion can carry stories."
      />
      <section className="section compact">
        <div className="wrap about-intro">
          <EditorialImage image={images.aboutHouse} className="portrait" />
          <div>
            <span className="eyebrow">The designer</span>
            <h2>Onobrorhie Mercy Ufuoma</h2>
            <span className="eyebrow">Founder &amp; Creative Director</span>
            <p>Onobrorhie Mercy Ufuoma is a Nigerian fashion designer and creative entrepreneur committed to exploring the relationship between African heritage and contemporary fashion.</p>
            <p>Her journey began early, learning from her mother, a fashion designer. It grew into a passion and fashion business with a larger vision: create fashion that tells stories, celebrates culture, and gives African heritage a place on the global stage.</p>
            <p>Through Mercified Artistry, Mercy creates intentional, elegant, culturally inspired pieces, reinterpreting traditional influences through contemporary silhouettes, craftsmanship and creative expression.</p>
          </div>
        </div>
      </section>
      <section className="section archive-section">
        <div className="wrap split">
          <div className="copy-block">
            <span className="eyebrow">The house</span>
            <h2 className="serif">MERCIFIED ARTISTRY</h2>
            <p className="lead">African Heritage, Intentionally Reimagined.</p>
            <p>Mercified Artistry is a Nigerian fashion practice exploring African heritage through intentional contemporary design and craftsmanship. The house brings together fashion, cultural storytelling and creative expression.</p>
            <p>Based in {brand.location}, the practice is oriented toward an international audience while staying attentive to the meaning and context of its references.</p>
          </div>
          <EditorialImage image={images.houseSection} className="portrait" />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="What we believe" title="Four guiding ideas" />
          <div className="values-list">
            {[
              ['Heritage', 'Understanding and preserving African cultural identity.'],
              ['Design', 'Reinterpreting heritage through contemporary creativity and craftsmanship.'],
              ['Impact', 'Creating opportunities for young creatives and exploring more sustainable approaches.'],
              ['Global vision', 'Taking African stories, techniques and perspectives to wider audiences through fashion.'],
            ].map(([heading, text], i) => (
              <article className="value" key={heading}>
                <span className="value-number">0{i + 1}</span>
                <h3>{heading}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="vision">
        <div className="wrap vision-inner">
          <div>
            <span className="eyebrow">Design philosophy</span>
            <h2>African Heritage,<br /><em>Intentionally Reimagined.</em></h2>
            <p>Fashion as a language for identity, story and creative possibility.</p>
          </div>
          <EditorialImage image={images.designPhilosophy} className="portrait" />
        </div>
      </section>
    </Shell>
  );
}

// ==========================================
// CRISPY DRESS CARD FOR EDITORIAL GRID
// ==========================================
function CrispyDressCard({
  item,
  index,
  onQuickView,
}: {
  item: Work;
  index: number;
  pillarFilter?: 'all' | 'heritage' | 'process' | 'sustainability';
  onQuickView: (image: ImageAsset) => void;
}) {
  const [activeTab, setActiveTab] = useState<'concept' | 'inspiration' | 'details' | 'cultural' | 'philosophy'>('concept');

  return (
    <article className="crispy-dress-card" data-testid={`dress-card-${item.slug}`}>
      {/* Visual Media Header */}
      <div className="crispy-media-wrap">
        <Link
          href={`/portfolio/${item.slug}`}
          className="crispy-media-btn"
          aria-label={`View details for ${item.title}`}
        >
          <div className="crispy-photo">
            <img src={item.image.src} alt={item.image.alt} loading="lazy" />
            <div className="crispy-badge-row">
              <span className="crispy-num-badge">№ {String(index + 1).padStart(2, '0')}</span>
              <span className="crispy-season-badge">{item.season}</span>
            </div>
            <div className="crispy-photo-hover-cue">
              <span>View Details ↗</span>
            </div>
          </div>
        </Link>
        <button
          type="button"
          className="crispy-quick-zoom"
          onClick={() => onQuickView(item.image)}
          aria-label={`Enlarge photo for ${item.title}`}
        >
          Zoom ⊕
        </button>
      </div>

      {/* Card Content & Meta */}
      <div className="crispy-card-body">
        <h3 className="crispy-card-title">
          <Link
            href={`/portfolio/${item.slug}`}
            className="crispy-title-btn"
          >
            {item.title}
          </Link>
        </h3>

        {/* Ordered Write-Up Preview Tabs */}
        <div className="crispy-pillars-box">
          <div className="crispy-pillar-tabs" role="tablist" aria-label={`Ordered sections for ${item.title}`}>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'concept'}
              className={`crispy-tab-btn ${activeTab === 'concept' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('concept')}
            >
              ✦ Concept
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'inspiration'}
              className={`crispy-tab-btn ${activeTab === 'inspiration' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('inspiration')}
            >
              🏛 Inspiration
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'details'}
              className={`crispy-tab-btn ${activeTab === 'details' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              ✂ Details
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'cultural'}
              className={`crispy-tab-btn ${activeTab === 'cultural' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('cultural')}
            >
              🌍 Story
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'philosophy'}
              className={`crispy-tab-btn ${activeTab === 'philosophy' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('philosophy')}
            >
              ❝ Ethos
            </button>
          </div>

          <div className="crispy-pillar-panel" role="tabpanel">
            {activeTab === 'concept' && (
              <div className="crispy-tab-content">
                <span className="crispy-tab-kicker">01 · Design Concept</span>
                <p>{item.designConcept}</p>
              </div>
            )}
            {activeTab === 'inspiration' && (
              <div className="crispy-tab-content">
                <span className="crispy-tab-kicker">02 · Inspiration</span>
                <p>{item.inspiration}</p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="crispy-tab-content">
                <span className="crispy-tab-kicker">03 · Design Details</span>
                <ul className="crispy-details-mini-list">
                  {item.designDetails.slice(0, 3).map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'cultural' && (
              <div className="crispy-tab-content">
                <span className="crispy-tab-kicker">04 · Cultural Story</span>
                <p>{item.culturalStory.split('\n\n')[0]}</p>
              </div>
            )}
            {activeTab === 'philosophy' && (
              <div className="crispy-tab-content">
                <span className="crispy-tab-kicker">05 · Design Philosophy</span>
                <p>{item.designPhilosophy.replace(/^>\s*/, '').split('\n\n')[0]}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button Row */}
        <div className="crispy-card-actions">
          <Link
            href={`/portfolio/${item.slug}`}
            className="crispy-dossier-trigger"
            data-testid={`btn-detail-${item.slug}`}
          >
            <span>View Full Details</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

// ==========================================
// CRISPY SPEC SHEET TABLE VIEW (ALTERNATIVE ORGANIZED LAYOUT)
// ==========================================
function CrispySpecTable({
  worksList,
  onQuickView,
}: {
  worksList: Work[];
  onQuickView: (image: ImageAsset) => void;
}) {
  return (
    <div className="crispy-table-container">
      <table className="crispy-spec-table">
        <thead>
          <tr>
            <th>Silhouette</th>
            <th>Category &amp; Season</th>
            <th>Cultural Heritage</th>
            <th>Craft Technique</th>
            <th>Circular Sustainability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {worksList.map((item, idx) => (
            <tr key={item.slug} className="crispy-table-row">
              <td className="table-col-silhouette">
                <div className="table-thumb-wrap">
                  <button
                    type="button"
                    className="table-thumb-btn"
                    onClick={() => onQuickView(item.image)}
                    aria-label={`Enlarge photo for ${item.title}`}
                  >
                    <img src={item.image.src} alt={item.image.alt} />
                  </button>
                  <div>
                    <span className="table-num">№ 0{idx + 1}</span>
                    <strong className="table-title">{item.title}</strong>
                    <span className="table-hours">{item.atelierHours}</span>
                  </div>
                </div>
              </td>
              <td className="table-col-category">
                <span className="table-badge">{item.category}</span>
                <span className="table-sub">{item.season}</span>
              </td>
              <td className="table-col-pillar heritage-cell">
                <p>{item.heritage}</p>
              </td>
              <td className="table-col-pillar craft-cell">
                <strong>{item.techniqueFocus}</strong>
                <p>{item.process[0]}</p>
              </td>
              <td className="table-col-pillar eco-cell">
                <p>{item.sustainability}</p>
              </td>
              <td className="table-col-action">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="table-inspect-btn"
                >
                  View ↗
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// ORGANIZED & CRISPY PORTFOLIO PAGE
// ==========================================
function PortfolioPage() {
  usePageMeta('Portfolio', 'Browse the Mercified Artistry portfolio — six handcrafted couture pieces rooted in African heritage and sustainable craft.');


  const [zoomImage, setZoomImage] = useState<ImageAsset | null>(null);
  const zoomOpenerRef = useRef<HTMLElement | null>(null);

  const handleQuickZoom = (image: ImageAsset) => {
    zoomOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setZoomImage(image);
  };

  return (
    <Shell>
      {/* PORTFOLIO HERO BANNER */}
      <section className="portfolio-banner">
        <img className="portfolio-banner-img" src={images.crimsonVeil.src} alt={images.crimsonVeil.alt} />
        <div className="portfolio-banner-overlay" />
        <div className="portfolio-banner-content">
          <div className="portfolio-banner-top">
            <span className="portfolio-banner-season">SS26 · Abraka Atelier</span>
            <span className="portfolio-banner-badge">Archive</span>
          </div>
          <h1 className="portfolio-banner-title serif">Our Work</h1>
          <p className="portfolio-banner-desc">Fourteen handcrafted pieces, each rooted in African culture, made by hand, and built to last.</p>
          <div className="portfolio-banner-rule" />
          <div className="portfolio-banner-stats">
            <div className="pbs-tile">
              <span className="pbs-val">{works.length}</span>
              <span className="pbs-lbl">Pieces</span>
            </div>
            <div className="pbs-tile">
              <span className="pbs-val">2,320+</span>
              <span className="pbs-lbl">Hours of Handwork</span>
            </div>
            <div className="pbs-tile">
              <span className="pbs-val">100%</span>
              <span className="pbs-lbl">African Heritage</span>
            </div>
            <div className="pbs-tile">
              <span className="pbs-val">Zero</span>
              <span className="pbs-lbl">Waste or Plastic</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section compact portfolio-section">
        <div className="wrap">

          {/* Clean Grid — All Works */}
          <div className="crispy-grid-layout">
            {works.map((item, index) => (
              <Reveal key={item.slug} delay={index * 50}>
                <CrispyDressCard
                  item={item}
                  index={index}
                  pillarFilter="all"
                  onQuickView={handleQuickZoom}
                />
              </Reveal>
            ))}
          </div>



          {/* Image Lightbox */}
          {zoomImage && (
            <ImageLightbox
              image={zoomImage}
              onClose={() => setZoomImage(null)}
              openerRef={zoomOpenerRef}
            />
          )}
        </div>
      </section>
    </Shell>
  );
}

// ==========================================
// PORTFOLIO DETAIL PERMALINK PAGE
// ==========================================
function PortfolioDetailPage() {
  const params = useParams<{ slug: string }>();
  const work = works.find((entry) => entry.slug === params.slug);
  usePageMeta(work?.title ?? 'Look', work?.story ?? 'A Mercified Artistry portfolio entry.');
  const [selected, setSelected] = useState<ImageAsset | null>(null);
  const lightboxOpenerRef = useRef<HTMLElement | null>(null);

  if (!work) return <NotFoundPage />;

  const openLightbox = (image: ImageAsset) => {
    lightboxOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(image);
  };

  const sections = [
    { id: 'concept', label: '01 Design Concept' },
    { id: 'inspiration', label: '02 Inspiration' },
    { id: 'details', label: '03 Design Details' },
    { id: 'cultural', label: '04 Cultural Story' },
    { id: 'philosophy', label: '05 Design Philosophy' },
    { id: 'specs', label: '06 Technical Specs' },
    { id: 'gallery', label: 'Atelier Imagery' },
  ];

  return (
    <Shell>
      <PageHeading label={`${work.category} · ${work.season}`} title={work.title} description={work.designConcept} />
      <section className="detail-hero">
        <img src={work.image.src} alt={work.image.alt} fetchPriority="high" />
        <span className="detail-hero-caption">{work.label} · {work.atelierHours}</span>
      </section>
      <section className="section detail-body">
        <div className="wrap detail-layout">
          <aside className="detail-sticky">
            <span className="eyebrow">Garment Overview</span>
            <nav aria-label="Sections of this entry" className="detail-index">
              {sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  {section.label}
                </a>
              ))}
            </nav>

            <div className="detail-fact-tile">
              <strong>Key Elements</strong>
              <div className="detail-element-tags">
                {work.keyElements.map((el) => (
                  <span key={el} className="element-pill">{el}</span>
                ))}
              </div>
            </div>

            <p className="detail-fact">
              <strong>Materials / techniques</strong><br />
              {work.materials}
            </p>
            <p className="detail-fact">
              <strong>Craftsmanship</strong><br />
              {work.atelierHours} · {work.techniqueFocus}
            </p>
            <div style={{ marginTop: 20 }}>
              <Link
                href={`/contact?inquire=${encodeURIComponent(work.title)}`}
                className="header-inquire-btn"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Inquire Silhouette</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div style={{ marginTop: 16 }}>
              <TextLink href="/portfolio">Back to portfolio archive</TextLink>
            </div>
          </aside>

          <div className="detail-features">
            {/* ORDER 1: DESIGN CONCEPT */}
            <section className="detail-feature" id="concept">
              <Reveal>
                <span className="eyebrow">01 / Design Concept</span>
                <h2 className="serif">Contemporary Vision</h2>
                <p className="lead">{work.designConcept}</p>
              </Reveal>
            </section>

            {/* ORDER 2: INSPIRATION */}
            <section className="detail-feature" id="inspiration">
              <Reveal>
                <span className="eyebrow">02 / Inspiration</span>
                <h2 className="serif">Origins &amp; Cultural Lineage</h2>
                <p className="lead">{work.inspiration}</p>
              </Reveal>
            </section>

            {/* ORDER 3: DESIGN DETAILS */}
            <section className="detail-feature" id="details">
              <Reveal>
                <span className="eyebrow">03 / Design Details</span>
                <h2 className="serif">Atelier Features &amp; Elements</h2>
              </Reveal>
              <ul className="detail-feature-checklist">
                {work.designDetails.map((detail, i) => (
                  <li key={detail}>
                    <b>0{i + 1}</b>
                    <p>{detail}</p>
                  </li>
                ))}
              </ul>
              <div className="dossier-meta-footer" style={{ marginTop: 16 }}>
                <strong>Technique Focus:</strong> {work.techniqueFocus} ({work.atelierHours})
              </div>
            </section>

            {/* ORDER 4: CULTURAL STORY */}
            <section className="detail-feature" id="cultural">
              <Reveal>
                <span className="eyebrow">04 / Cultural Story</span>
                <h2 className="serif">Living Heritage &amp; Meaning</h2>
                <div className="detail-paragraphs">
                  {work.culturalStory.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="lead">{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ORDER 5: DESIGN PHILOSOPHY */}
            <section className="detail-feature" id="philosophy">
              <Reveal>
                <span className="eyebrow">05 / Design Philosophy</span>
                <h2 className="serif">Atelier Intention &amp; Ethos</h2>
                <div className="detail-philosophy-container">
                  {work.designPhilosophy.split('\n\n').map((para, idx) => {
                    if (para.startsWith('>')) {
                      return (
                        <blockquote key={idx} className="detail-pullquote">
                          <em>{para.replace(/^>\s*/, '')}</em>
                        </blockquote>
                      );
                    }
                    return <p key={idx} className="lead">{para}</p>;
                  })}
                </div>
              </Reveal>
            </section>

            {/* TECHNICAL SPECS */}
            <section className="detail-feature" id="specs">
              <Reveal>
                <span className="eyebrow">06 / Atelier Record</span>
                <h2 className="serif">Garment Specifications</h2>
                <table className="dossier-specs-table" style={{ marginTop: 20 }}>
                  <tbody>
                    <tr>
                      <th>Silhouette</th>
                      <td>{work.title} ({work.label})</td>
                    </tr>
                    <tr>
                      <th>Silhouette Form</th>
                      <td>{work.silhouette}</td>
                    </tr>
                    <tr>
                      <th>Collection / Season</th>
                      <td>{work.season} · {work.year}</td>
                    </tr>
                    <tr>
                      <th>Materials</th>
                      <td>{work.materials}</td>
                    </tr>
                    <tr>
                      <th>Atelier Time</th>
                      <td>{work.atelierHours}</td>
                    </tr>
                    <tr>
                      <th>Key Technique</th>
                      <td>{work.techniqueFocus}</td>
                    </tr>
                    <tr>
                      <th>Atelier Origin</th>
                      <td>{work.credits}</td>
                    </tr>
                  </tbody>
                </table>
              </Reveal>
            </section>

            {/* GALLERY */}
            <section className="detail-feature" id="gallery">
              <Reveal>
                <span className="eyebrow">Atelier Imagery</span>
                <h2 className="serif">Visual Studies</h2>
              </Reveal>
              <div className="detail-gallery">
                {work.gallery.map((image, i) => (
                  <button
                    key={`${image.src}-${i}`}
                    className={`gallery-frame ${i === 0 ? 'wide' : 'portrait'}`}
                    type="button"
                    onClick={() => openLightbox(image)}
                    aria-label={`Enlarge image ${i + 1}`}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <span className="gallery-frame-hint" aria-hidden="true">Enlarge +</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
      {selected && <ImageLightbox image={selected} onClose={() => setSelected(null)} openerRef={lightboxOpenerRef} />}
    </Shell>
  );
}

// ==========================================
// REDIRECT HANDLERS (RUNWAY IS UNDER PORTFOLIO)
// ==========================================
function RedirectToPortfolio() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation('/portfolio', { replace: true });
  }, [setLocation]);
  return null;
}

function RedirectToRunway() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation('/portfolio?category=Runway+Editions', { replace: true });
  }, [setLocation]);
  return null;
}

// ==========================================
// CONTACT PAGE
// ==========================================
function ContactPage() {
  usePageMeta('Contact', 'Contact Mercified Artistry for private consultations, bespoke appointments, and collaborations.');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [inquireParam, setInquireParam] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const piece = urlParams.get('inquire');
      if (piece) setInquireParam(piece);
    }
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Shell>
      <PageHeading
        label="Private consultation &amp; atelier"
        title="Let’s create something intentional."
        description="For private couture appointments, bespoke silhouette orders, showcases, creative projects and press inquiries."
      />
      <section className="section compact">
        <div className="wrap contact-layout">
          <div className="copy-block">
            <span className="eyebrow">Start a conversation</span>
            <h2 className="serif">Open to what comes next.</h2>
            <p>Every piece in the atelier is made with deliberate intention. Share a little about your project, silhouette preference, or inquiry.</p>
            {inquireParam && (
              <div className="inquire-target-notice">
                <span className="eyebrow">Silhouette Selected</span>
                <strong>{inquireParam}</strong>
              </div>
            )}
            <div style={{ marginTop: 32 }}>
              <span className="eyebrow">Atelier Location</span>
              <p>{brand.location}</p>
            </div>
            <div className="status-note">
              <strong>Private Atelier Consultations</strong>Bespoke fittings and consultations by private appointment.
            </div>
          </div>
          <div>
            {submitted ? (
              <div className="confirmation" role="status">
                <strong>Thank you{name ? `, ${name}` : ''}.</strong><br />
                Your consultation request has been prepared. This frontend-only form did not send or store it. Please reach out to our atelier representative once the official line opens.
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="field full">
                  <label htmlFor="contact-subject">Inquiry Type</label>
                  <select id="contact-subject" name="subject" defaultValue={inquireParam ? 'Bespoke Couture Order' : ''} required>
                    <option value="" disabled>Select inquiry type</option>
                    <option value="Bespoke Couture Order">Bespoke Couture Silhouette Order</option>
                    <option value="Private Consultation">Private Atelier Consultation</option>
                    <option value="Showcase & Runway">Showcase &amp; Runway Feature</option>
                    <option value="Editorial & Press">Editorial &amp; Press Feature</option>
                    <option value="Creative Collaboration">Creative Collaboration</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    defaultValue={inquireParam ? `Hello, I would like to inquire about the ${inquireParam} silhouette...` : ''}
                    required
                  />
                </div>
                <button className="submit-button" type="submit">Submit Request →</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}

// ==========================================
// 404 NOT FOUND PAGE
// ==========================================
function NotFoundPage() {
  usePageMeta('Page not found', 'The requested page could not be found.');
  return (
    <Shell>
      <section className="wrap not-found">
        <div>
          <span className="eyebrow">404 · Not found</span>
          <h1>Lost in the archive.</h1>
          <p>The page you are looking for is not here.</p>
          <TextLink href="/">Return home</TextLink>
        </div>
      </section>
    </Shell>
  );
}

// ==========================================
// MAIN APP COMPONENT & ROUTER (CLEAN ROUTING)
// ==========================================
function App() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);

  return (
    <ThemeProvider>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/portfolio/:slug" component={PortfolioDetailPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/runway" component={RedirectToRunway} />
        <Route path="/journal/:slug" component={RedirectToPortfolio} />
        <Route path="/journal" component={RedirectToPortfolio} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
