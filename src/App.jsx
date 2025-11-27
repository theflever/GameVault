// src/App.js
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
  {
    id: 5,
    title: "Signalis",
    subtitle: 'Survival Horror · Psychological',
    price: '19.99',
    cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/header.jpg?t=1762193138',
    description: "A Replika android named Elster awakens from cryostasis after a crash and searches for her lost partner in a surreal, dystopian world."
  },
];

const SAMPLE_POSTS = [
  {
    id: 1,
    user: "xx_h3lena_xx",
    community: "r/SilkSong",
    time: "3 min ago",
    text: "absolute cinema",
    image: "https://i.ytimg.com/vi/vXh43m1GC7Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDc-mfcJvv5FFR_bP9ne8HcAS0ZRQ",
    avatar: "https://imgx.sonora.id/crop/0x0:0x0/x/photo/2024/08/18/helena-mcrjpg-20240818055836.jpg",
    likes: 21,
    comments: 4,
    votes: 21
  },
  {
    id: 2,
    user: "phaideiglazer",
    community: "r/Hades2",
    time: "2 hrs ago",
    text: "Very rarely does a game deserve the highest honors possible and that of course applies to the 1 star reviews as well, especially with Hades 2 which has a hilariously large amount of undeserved low scores. That is how these amateur reviewers treat things though, is it not? They use these review sections as their own personal diary of hate or biased favoritism, with reviews residing on opposite ends of the spectrum in either overwhelmingly support or unfounded hate.",
    avatar: "https://i.pinimg.com/736x/ab/6c/05/ab6c0592b45c2301af191a870818074d.jpg",
    likes: 12,
    comments: 2,
    votes: 30
  },
  {
    id: 3,
    user: "labubu",
    community: "r/Franbow",
    time: "1 day ago",
    text: "franbow review. 9.5/10",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/362680/capsule_616x353.jpg?t=1693287362",
    avatar: "https://cobisnis.com/wp-content/uploads/2025/09/b59fafea93a177c493660ef1523a9b7a.jpg",
    likes: 58,
    comments: 5,
    votes: 11
  }
];

const GENRES = [
  {
    id: 1,
    name: "Action",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Hades_2_cover_art.jpeg"
  },
  {
    id: 2,
    name: "Horror",
    image: "https://upload.wikimedia.org/wikipedia/en/a/aa/Outlast_cover.jpg"
  },
  {
    id: 3,
    name: "Cozy",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4b/Unpacking_game_cover.png"
  },
  {
    id: 4,
    name: "Dating Sim",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2201320/e03c7619aaa07af0bc1f3fb4630534693ccea9d4/capsule_616x353.jpg?t=1761833283"
  },
  {
    id: 5,
    name: "RPG",
    image: "https://m.media-amazon.com/images/M/MV5BNzI4YTdiMWQtNzM4Zi00ODk4LWE2YTUtNTkwYjZjYzgyZjJlXkEyXkFqcGc@._V1_QL75_UY281_CR46,0,190,281_.jpg"
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
      {/* <button className="nav-btn add">＋</button> */}
      <button className={`nav-btn ${route === 'feed' ? 'active' : ''}`} onClick={() => onChange('feed')}>🔔</button>
      <button className={`nav-btn ${route === 'profile' ? 'active' : ''}`} onClick={() => onChange('profile')}>👤</button>
    </nav>
  );
}

function SearchBar({ onSearch, defaultValue = '' }) {
  const [q, setQ] = useState(defaultValue);
  // if you want live search, call onSearch inside onChange
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

function Home({ onSelect, onSearch }) {
  return (
    <main className="page">
      <SearchBar onSearch={onSearch} />
      <section className="sections">
        <h4 className="section-title">Featured</h4>
        <div className="carousel">
          {SAMPLE_GAMES.map((g) => (
            <div className="carousel-item" key={g.id} onClick={() => onSelect(g)}>
              <div className="carousel-cover" style={{ backgroundImage: `url(${g.cover})` }} />
              <div className="carousel-caption">{g.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sections genre-section">
        <div className="section-row">
          <h4 className="section-title">Genre</h4>
          <button className="arrow-btn">›</button>
        </div>

        <div className="genre-scroll">
          {GENRES.map((g) => (
            <div key={g.id} className="genre-card">
              <div
                className="genre-image"
                style={{ backgroundImage: `url(${g.image})` }}
              />
              <div className="genre-name">{g.name}</div>
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

function SearchResults({ query, onSelect, onSearch }) {
  const q = (query || '').toLowerCase();
  const results = SAMPLE_GAMES.filter((g) => g.title.toLowerCase().includes(q) || !q);
  return (
    <main className="page">
      <div className="search-results">
        <SearchBar onSearch={onSearch} defaultValue={query} />
        <ul className="hot-list">
          {history.length === 0 && <li className="muted">No search history yet</li>}
          {history.map((item, i) => (
            <li key={i} onClick={() => onHistoryClick(item)}>{item}</li>
          ))}
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
        <div className="profile-avatar" style={{ backgroundImage: 'url(https://preview.redd.it/240716-winter-instagram-update-v0-tub4rjggttcd1.jpg?width=1080&crop=smart&auto=webp&s=2d3a27e8013fdbd70a4e4f6fc24d6c442552bd42)' }} />
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

function FeedPost({ post }) {
  const [vote, setVote] = React.useState(0);
  const handleUpvote = () => setVote((prev) => (prev === 1 ? 0 : 1));
  const handleDownvote = () => setVote((prev) => (prev === -1 ? 0 : -1));
  const score = post.votes + vote;

  return (
    <article className="feed-post">
      <div className="feed-header">
        <img
          src={post.avatar}
          alt={post.user}
          className="avatar small"
        />
        <div className="meta">
          <div className="user">{post.user} <span>in {post.community}</span></div>
          <div className="time">{post.time}</div>
        </div>
        <button className="more-btn">⋯</button>
      </div>

      {post.image && <div className="feed-image" style={{ backgroundImage: `url(${post.image})` }} />}

      <p className="feed-text">{post.text}</p>

      <div className="feed-actions">
        <div className="vote-box">
          <button className={`vote-btn up ${vote === 1 ? "active" : ""}`} onClick={handleUpvote}>▲</button>
          <span className="vote-count">{score}</span>
          <button className={`vote-btn down ${vote === -1 ? "active" : ""}`} onClick={handleDownvote}>▼</button>
        </div>
        <span className="comment-count">💬 {post.comments} comments</span>
      </div>
    </article>
  );
}

function Feed() {
  return (
    <main className="page feed-page">
      <div className="feed-tabs">
        <button className="tab active">For You</button>
        <button className="tab">Following</button>
        <button className="tab">Favorites</button>
      </div>
      {SAMPLE_POSTS.map((post) => <FeedPost key={post.id} post={post} />)}
    </main>
  );
}

/* --------- Login screen that matches the screenshot layout --------- */
function Login({ onContinue }) {
  const [email, setEmail] = useState('');
  return (
    <main className="page login-page">
      <h1 className="login-title">GameVault</h1>
      <p className="login-sub">Create an account</p>
      <p className="login-mini">Enter your email to sign up for this app</p>

      <input
        className="login-input"
        placeholder="email@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="login-btn" onClick={() => onContinue(email)}>Continue</button>

      <div className="login-or">or</div>

      <button className="login-oauth google">Continue with Google</button>
      <button className="login-oauth apple">Continue with Apple</button>

      <p className="login-terms">By clicking continue, you agree to our Terms of Service and Privacy Policy</p>
    </main>
  );
}

/* ---------------------- App (single default export) ---------------------- */
export default function App() {
  const [route, setRoute] = useState('login'); // start at login
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openDetails = (game) => {
    setSelected(game);
    setRoute('details');
  };

  const startSearch = (q) => {
    setSearchQuery(q || '');
    setRoute('search');
  };

  return (
    <div className="app-root">
      <TopBar onMenu={() => setMenuOpen(!menuOpen)} title="GameVault" />

      <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
        {route === 'login' && <Login onContinue={() => setRoute('home')} />}

        {route === 'home' && <Home onSelect={openDetails} onSearch={startSearch} />}

        {route === 'search' && <SearchResults query={searchQuery} onSelect={openDetails} onSearch={startSearch} />}

        {route === 'profile' && <Profile />}

        {route === 'feed' && <Feed />}

        {route === 'details' && selected && <DetailsModal game={selected} onClose={() => { setSelected(null); setRoute('home'); }} />}
      </div>

      <BottomNav route={route} onChange={(r) => setRoute(r)} />
    </div>
  );
}
