import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const TAGLINE = 'We create the Buzz Your Brand Deserves';

const SERVICES = [
  {
    id: '01',
    title: 'Branding',
    lead: 'Identities with a point of view — built to be recognised in a half-second scroll and remembered long after.',
    items: [
      'Brand strategy & positioning',
      'Naming & verbal identity',
      'Logo systems & visual identity',
      'Packaging & print collateral',
      'Brand guidelines your team will actually use',
    ],
  },
  {
    id: '02',
    title: 'Digital Content',
    lead: 'Content made for the feed, not adapted to it — shot, written and edited to stop thumbs and start conversations.',
    items: [
      'Social content & campaign creative',
      'Short-form video & reels',
      'Product & lifestyle photography',
      'Copywriting & content calendars',
      'Motion graphics & animated assets',
    ],
  },
];

const PROCESS = [
  {
    step: 'Listen',
    text: 'We dig into your business, your audience and the competition before a single pixel moves.',
  },
  {
    step: 'Shape',
    text: 'Strategy becomes a clear creative direction: one idea, sharp enough to build everything on.',
  },
  {
    step: 'Make',
    text: 'Identity, content and assets — crafted in focused sprints with you in the room.',
  },
  {
    step: 'Amplify',
    text: 'We launch, watch what lands and keep the buzz going with content that compounds.',
  },
];

const MARQUEE = [
  'Brand Strategy',
  'Visual Identity',
  'Social Content',
  'Short-form Video',
  'Photography',
  'Copywriting',
  'Packaging',
  'Motion',
];

// Each client renders as a typographic wordmark. To use an official logo instead,
// drop the file into public/clients/ and set `logo`, e.g. logo: '/clients/asbl.svg'.
const CLIENTS = [
  { name: 'Zura Spaces', style: 'zura', mark: 'Zura', sub: 'Spaces' },
  { name: 'Maneppally Jewellers', style: 'maneppally', mark: 'Maneppally', sub: 'Jewellers' },
  { name: 'KIMS Hospitals', style: 'kims', mark: 'KIMS', sub: 'Hospitals' },
  { name: 'Mirai Sushi', style: 'mirai', mark: 'Mirai', sub: 'Sushi' },
  { name: 'Nannayya', style: 'nannayya', mark: 'Nannayya' },
  { name: 'Ken2', style: 'ken2', mark: 'Ken2' },
  { name: 'ASBL', style: 'asbl', mark: 'ASBL' },
];

function ClientLogo({ client }) {
  if (client.logo) {
    return <img src={client.logo} alt={client.name} className={styles.clientImg} loading="lazy" />;
  }
  return (
    <span className={`${styles.wordmark} ${styles[`wm_${client.style}`]}`} role="img" aria-label={client.name}>
      <span className={styles.wmMark} aria-hidden="true">
        {client.mark}
      </span>
      {client.sub && (
        <span className={styles.wmSub} aria-hidden="true">
          {client.sub}
        </span>
      )}
    </span>
  );
}

function Hexagon({ className }) {
  return (
    <svg viewBox="0 0 100 115.47" className={className} aria-hidden="true">
      <polygon points="50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87" />
    </svg>
  );
}

function SpinBadge() {
  return (
    <div className={styles.badge} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={styles.badgeRing}>
        <defs>
          <path
            id="badgeCircle"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <text>
          <textPath href="#badgeCircle">
            Branding · Digital Content · Buzz Mee · Branding · Content ·
          </textPath>
        </text>
      </svg>
      <Hexagon className={styles.badgeCore} />
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.target)).toString(),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      e.target.reset();
      setStatus('sent');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className={styles.formDone} role="status">
        <Hexagon className={styles.formDoneHex} />
        <p className={styles.formDoneTitle}>Message received.</p>
        <p>We&rsquo;ll be in touch within two working days to talk about your brand.</p>
        <button type="button" className={styles.linkButton} onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      name="project-enquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <input type="hidden" name="form-name" value="project-enquiry" />
      <p hidden>
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <label className={styles.field}>
        <span>Your name</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label className={styles.field}>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className={`${styles.field} ${styles.fieldWide}`}>
        <span>What do you need?</span>
        <select name="service" defaultValue="Branding">
          <option>Branding</option>
          <option>Digital content</option>
          <option>Both — the full buzz</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label className={`${styles.field} ${styles.fieldWide}`}>
        <span>Tell us about your brand</span>
        <textarea name="message" rows={4} required />
      </label>

      <div className={styles.formFooter}>
        <button type="submit" className={styles.button} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Start the buzz'}
          <span aria-hidden="true">→</span>
        </button>
        {status === 'error' && (
          <p className={styles.formError} role="alert">
            Something went wrong sending that. Please try again in a moment.
          </p>
        )}
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Buzz Mee — {TAGLINE}</title>
        <meta
          name="description"
          content="Buzz Mee is a branding and digital content studio. We create the buzz your brand deserves."
        />
        <meta property="og:title" content={`Buzz Mee — ${TAGLINE}`} />
      </Head>

      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.nav}>
        <a href="#top" className={styles.logo}>
          <Hexagon className={styles.logoHex} />
          Buzz&nbsp;Mee
        </a>
        <nav aria-label="Main">
          <a href="#services">Services</a>
          <a href="#clients">Clients</a>
          <a href="#process">Process</a>
          <Link href="/journal">Journal</Link>
          <a href="#contact" className={styles.navCta}>
            Let&rsquo;s talk
          </a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <p className={`${styles.eyebrow} ${styles.reveal}`} style={{ '--d': '0ms' }}>
            Branding &amp; digital content studio
          </p>
          <h1 className={styles.heroTitle}>
            <span className={styles.reveal} style={{ '--d': '80ms' }}>
              We create
            </span>
            <span className={styles.reveal} style={{ '--d': '160ms' }}>
              the <em className={styles.buzzWord}>Buzz</em>
            </span>
            <span className={`${styles.reveal} ${styles.heroSerif}`} style={{ '--d': '240ms' }}>
              your brand deserves.
            </span>
          </h1>
          <div className={`${styles.heroAside} ${styles.reveal}`} style={{ '--d': '360ms' }}>
            <p>
              Buzz Mee builds brands people talk about — then keeps them talking with content made
              for every screen they live on.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.button}>
                Start a project <span aria-hidden="true">→</span>
              </a>
              <a href="#services" className={styles.linkButton}>
                See what we do
              </a>
            </div>
          </div>
          <SpinBadge />
        </section>

        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i}>
                {item}
                <Hexagon className={styles.marqueeHex} />
              </span>
            ))}
          </div>
        </div>

        <section id="services" className={styles.services}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>What we do</p>
            <h2>
              Two crafts, <em>one</em> obsession: getting you noticed.
            </h2>
          </div>

          {SERVICES.map((s) => (
            <article key={s.id} className={styles.service}>
              <span className={styles.serviceNum}>{s.id}</span>
              <h3>{s.title}</h3>
              <p className={styles.serviceLead}>{s.lead}</p>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="clients" className={styles.clients}>
          <div className={styles.clientsHead}>
            <p className={styles.eyebrow}>Selected clients</p>
            <h2>
              Brands we&rsquo;ve helped <em>get talked about</em>.
            </h2>
          </div>
          <ul className={styles.clientGrid}>
            {CLIENTS.map((client) => (
              <li key={client.name} className={styles.clientCell}>
                <ClientLogo client={client} />
                <span className={styles.clientName}>{client.name}</span>
              </li>
            ))}
            <li className={`${styles.clientCell} ${styles.clientCta}`}>
              <a href="#contact">
                <span>Your brand here</span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.manifesto}>
          <p>
            A logo isn&rsquo;t a brand. A post isn&rsquo;t a strategy.{' '}
            <em>Buzz is what happens when both work together</em> — a sharp identity and a steady
            stream of content that sounds unmistakably like you.
          </p>
        </section>

        <section id="process" className={styles.process}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>How we work</p>
            <h2>
              From first chat to <em>full hive</em>.
            </h2>
          </div>
          <ol className={styles.steps}>
            {PROCESS.map((p, i) => (
              <li key={p.step} className={styles.step}>
                <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.step}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className={styles.contact}>
          <div className={styles.contactIntro}>
            <p className={styles.eyebrow}>Got a brand that deserves more?</p>
            <h2>
              Let&rsquo;s make some <em>noise</em>.
            </h2>
            <p>
              Tell us where your brand is today and where you want it to go. We reply to every
              enquiry personally.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerLogo}>Buzz Mee</span>
        <span>{TAGLINE}.</span>
        <span>© {new Date().getFullYear()} Buzz Mee. All rights reserved.</span>
      </footer>
    </div>
  );
}
