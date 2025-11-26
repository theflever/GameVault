import React, { useState } from 'react';
import './app.css';

const SAMPLE_GAMES = [
  {
    id: 1,
    title: 'Hollow Knight: Silksong',
    subtitle: 'Action · Story Mode',
    price: '7.49',
    cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1756994410',
    description: "Play as Hornet, princess-protector of Hallownest, and adventure through a whole new kingdom ruled by silk and song! Captured and brought to this unfamiliar world, Hornet must battle foes and solve mysteries as she ascends on a deadly pilgrimage to the kingdom’s peak."
  },
  {
    id: 2,
    title: 'Discounty',
    subtitle: 'Cozy · Casual',
    price: 'Free',
    cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2274620/b2620f12bb1ce28ed7734bcddb5d561811b895d8/header_alt_assets_1.jpg?t=1760352963',
    description: "Manage your own discount supermarket! Get caught up in small-town drama, organize and plan your shop's layout, and strike lucrative trade deals as you expand your secretive aunt's business empire. Selling more frozen fries will surely heal this broken community...right?"
  },
  {
    id: 3,
    title: "Five Nights at Freddy's",
    subtitle: 'Horror · Indie',
    price: '12.99',
    cover: 'https://image.api.playstation.com/vulcan/ap/rnd/202502/1221/0d00c92c1de9cc36fc5f6b48c5525a77ff036c7a67defdea.png',
    description: "Enter the abandoned workshop of Murray's Costume Manor and unravel the mystery left behind by the reclusive inventor, Edwin Murray. In Five Nights at Freddy's: Secret of the Mimic, you'll step into a world where every dark corner holds a secret and every flicker of light hints at an ever-present threat. The Mimic, a prototype endoskeleton, can adapt to any costume and become any character, including what you fear most."
  },
  {
    id: 4,
    title: "Stardew Valley",
    subtitle: 'Cozy · Farming',
    price: '14.99',
    cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg?t=1754692865',
    description: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?"
  },
];

function TopBar({ onMenu, title }) {
  return (
    <header className="topbar">
      <button className="icon-btn" onClick={onMenu} aria-label="menu">☰</button>
      <div className="title">{title}</div>
      <div className="avatar" aria-hidden />
    </header>
  );
}

function BottomNav({ route, onChange }) {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="main navigation">
      <button className={`nav-btn ${route === 'home' ? 'active' : ''}`} onClick={() => onChange('home')}>🏠</button>
      <button className={`nav-btn ${route === 'search' ? 'active' : ''}`} onClick={() => onChange('search')}>🔍</button>
      <button className="nav-btn add">＋</button>
      <button className={`nav-btn ${route === 'feed' ? 'active' : ''}`} onClick={() => onChange('feed')}>🔔</button>
      <button className={`nav-btn ${route === 'profile' ? 'active' : ''}`} onClick={() => onChange('profile')}>👤</button>
    </nav>
  );
}

function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  return (
    <div className="search-wrap">
      <input
        className="search-input"
        placeholder="Looking for the next game to binge?"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(q)}
      />
      <div className="search-actions">
        <button className="chip">Filter ▾</button>
        <button className="chip">Sort ▾</button>
      </div>
    </div>
  );
}

function GameCard({ game, onSelect }) {
  return (
    <article className="game-card" onClick={() => onSelect(game)}>
      <div className="cover" style={{ backgroundImage: `url(${game.cover})` }} />
      <div className="card-body">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-sub">{game.subtitle}</p>
        <div className="card-footer">
          <div className="price">{game.price === 'Free' ? 'Free' : `$${game.price}`}</div>
          <button className="detail-btn">Details</button>
        </div>
      </div>
    </article>
  );
}

function Home({ onSelect }) {
  return (
    <main className="page">
      <SearchBar onSearch={() => {}} />
      <section className="sections">
        <h4 className="section-title">Featured</h4>
        <div className="carousel">
          {/* simple horizontal scroll with big item */}
          {SAMPLE_GAMES.map((g) => (
            <div className="carousel-item" key={g.id} onClick={() => onSelect(g)}>
              <div className="carousel-cover" style={{ backgroundImage: `url(${g.cover})` }} />
              <div className="carousel-caption">{g.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sections">
        <h4 className="section-title">More Games</h4>
        <div className="grid">
          {SAMPLE_GAMES.map((g) => (
            <GameCard key={g.id} game={g} onSelect={onSelect} />
          ))}
        </div>
      </section>
    </main>
  );
}

function SearchResults({ query, onSelect }) {
  // simple filter by title
  const q = (query || '').toLowerCase();
  const results = SAMPLE_GAMES.filter((g) => g.title.toLowerCase().includes(q) || !q);
  return (
    <main className="page">
      <div className="search-results">
        <SearchBar onSearch={() => {}} />
        <ul className="hot-list">
          <li>signalis</li>
          <li>firewatch</li>
          <li>deltarune</li>
          <li>volcano princess</li>
          <li>disco elysium</li>
          <li>stray</li>
        </ul>
        <div className="results-list">
          {results.map((g) => (
            <GameCard key={g.id} game={g} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </main>
  );
}

function DetailsModal({ game, onClose }) {
  if (!game) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-cover" style={{ backgroundImage: `url(${game.cover})` }} />
        <div className="modal-body">
          <h2>{game.title}</h2>
          <p className="muted">{game.subtitle}</p>
          <p className="desc">{game.description}</p>
          <div className="modal-footer">
            <div className="big-price">{game.price === 'Free' ? 'Free' : `$${game.price}`}</div>
            <button className="save-btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <main className="page profile-page">
      <div className="profile-header-card">
        <div className="profile-avatar" style={{ backgroundImage: 'url(https://picsum.photos/200)' }} />
        <h2 className="profile-name">lavie de hypen</h2>
        <div className="profile-stats">
          <div><div className="num">154</div><div className="label">Played</div></div>
          <div><div className="num">324</div><div className="label">Saved</div></div>
          <div><div className="num">11</div><div className="label">Following</div></div>
        </div>
        <div className="profile-chips">
          <button className="chip">Collection</button>
          <button className="chip">Played</button>
          <button className="chip">Playing</button>
        </div>
      </div>

      <section className="sections">
        <h4 className="section-title">Following</h4>
        <div className="card-light">elvisprsly</div>
        <div className="card-light">bakubum</div>
      </section>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState('home'); // home, search, profile, feed, sign
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const openDetails = (game) => {
    setSelected(game);
    setRoute('details');
  };

  return (
    <div className="app-root">
      <TopBar onMenu={() => setMenuOpen(!menuOpen)} title="GameVault" />
      <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
        {route === 'home' && <Home onSelect={openDetails} />}
        {route === 'search' && <SearchResults query={''} onSelect={openDetails} />}
        {route === 'profile' && <Profile />}
        {route === 'feed' && (
          <main className="page">
            <h3 className="section-title">Feed</h3>
            <div className="post">A sample social post — likes and comments go here.</div>
            <div className="post">Another post in the feed.</div>
          </main>
        )}
        {route === 'details' && selected && <DetailsModal game={selected} onClose={() => { setSelected(null); setRoute('home'); }} />}
      </div>

      <BottomNav route={route} onChange={(r) => setRoute(r)} />
    </div>
  );
}

