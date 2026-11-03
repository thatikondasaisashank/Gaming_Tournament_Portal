import React, { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore, formatDate, formatTime } from './store.jsx';
import { Brand, DashboardHeader, EmptyState, StatCard, TournamentCard, TournamentModal, TournamentTable } from './components.jsx';

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="page-noise" />
      <header className="navbar glass-panel">
        <Brand />
        <nav className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          <a className="active" href="#top">Home</a><Link to="/login">Tournaments</Link><a href="#games">Games</a><a href="#roles">Roles</a><a href="#about">About</a>
        </nav>
        <div className="nav-actions"><Link className="btn btn-ghost" to="/login">Login</Link><Link className="btn btn-primary" to="/signup">Join Now</Link></div>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu">☰</button>
      </header>
      <main id="top">
        <section className="hero-section">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="live-dot" /> LIVE TOURNAMENTS • READY TO PLAY</div>
            <h1>ENTER THE <span>ARENA.</span><br />MAKE YOUR NAME.</h1>
            <p>Discover competitive gaming tournaments, register in seconds, organize events, and manage everything from one powerful portal.</p>
            <div className="hero-actions"><Link className="btn btn-primary btn-lg" to="/login">Explore Tournaments <span>↗</span></Link><a className="btn btn-ghost btn-lg" href="#how-it-works">How It Works</a></div>
            <div className="hero-stats"><div><strong>4+</strong><span>Games</span></div><div><strong>20+</strong><span>Tournaments</span></div><div><strong>500+</strong><span>Players</span></div></div>
          </div>
          <div className="hero-visual reveal reveal-delay-1">
            <div className="hero-card"><div className="hero-image-slot">
              <img src="/assets/images/hero-gaming.jpg" alt="Gaming tournament hero" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement.classList.add('image-fallback'); }} />
              <div className="fallback-gamer" aria-hidden="true"><div className="energy-ring ring-1" /><div className="energy-ring ring-2" /><div className="helmet">◈</div><div className="silhouette" /><span className="pixel pixel-a" /><span className="pixel pixel-b" /><span className="pixel pixel-c" /></div>
            </div><div className="hero-card-overlay"><span className="status-chip">● LIVE</span><span>SEASON 01</span></div></div>
            <div className="floating-badge badge-one">⚡ <span><b>FAST</b><small>REGISTRATION</small></span></div>
            <div className="floating-badge badge-two">🏆 <span><b>COMPETE</b><small>WIN REWARDS</small></span></div>
          </div>
        </section>
        <section className="ticker-section"><div className="ticker-track"><span>CALL OF DUTY</span><i>✦</i><span>FREE FIRE</span><i>✦</i><span>VALORANT</span><i>✦</i><span>FORTNITE</span><i>✦</i><span>CALL OF DUTY</span><i>✦</i><span>FREE FIRE</span><i>✦</i><span>VALORANT</span><i>✦</i><span>FORTNITE</span><i>✦</i></div></section>
        <section className="section" id="games">
          <div className="section-heading reveal"><div><span className="eyebrow">CHOOSE YOUR BATTLEFIELD</span><h2>Featured <span>Games</span></h2></div><p>Build your squad. Pick your game. Enter the bracket.</p></div>
          <div className="game-grid">
            <GameCard cls="game-cod" number="01" name="CALL OF DUTY" description="Competitive mobile battles" image="cod.jpg" />
            <GameCard cls="game-ff" number="02" name="FREE FIRE" description="Fast-paced survival fights" image="free-fire.jpg" delay="reveal-delay-1" />
            <GameCard cls="game-valo" number="03" name="VALORANT" description="Tactical team competition" image="valorant.jpg" delay="reveal-delay-2" />
            <GameCard cls="game-fortnite" number="04" name="FORTNITE" description="Creative battle royale" image="fortnite.jpg" delay="reveal-delay-3" />
          </div>
        </section>
        <section className="section" id="roles">
          <div className="section-heading reveal"><div><span className="eyebrow">ONE PLATFORM • THREE ROLES</span><h2>Choose Your <span>Role</span></h2></div><p>GameZone connects players, tournament organizers and administrators in one system.</p></div>
          <div className="workflow-grid">
            <article className="workflow-card reveal"><span>01</span><strong>PLAYER</strong><p>Browse tournaments, register for competitions and track your events.</p><Link to="/signup" className="btn btn-ghost">Join as Player →</Link></article>
            <article className="workflow-card reveal reveal-delay-1"><span>02</span><strong>ORGANIZER</strong><p>Create tournaments, update schedules, manage events and monitor participants.</p><Link to="/signup?role=organizer" className="btn btn-primary">Join as Organizer →</Link></article>
            <article className="workflow-card reveal reveal-delay-2"><span>03</span><strong>ADMIN</strong><p>Manage users, tournaments and the overall GameZone platform.</p><Link to="/login" className="btn btn-ghost">Admin Login →</Link></article>
          </div>
        </section>
        <section className="section video-section" id="how-it-works">
          <div className="video-wrap reveal">
            <video className="promo-video" autoPlay muted loop playsInline poster="/assets/images/video-poster.jpg"><source src="/assets/videos/arena-intro.mp4" type="video/mp4" /></video>
            <div className="video-fallback"><div className="scan-lines" /><div className="video-grid-art"><span>GZ</span><small>YOUR STUDENT-MADE MOTION GRAPHIC GOES HERE</small></div></div>
            <div className="video-overlay" /><div className="video-caption"><span className="eyebrow">STUDENT-MADE MOTION SLOT</span><h2>From signup to <span>victory.</span></h2><p>Replace this block with your own screen recording or gaming animation.</p></div>
          </div>
        </section>
        <section className="section" id="about">
          <div className="section-heading reveal"><div><span className="eyebrow">BUILT FOR SDC</span><h2>Simple system. <span>Real workflow.</span></h2></div></div>
          <div className="workflow-grid">
            <article className="workflow-card reveal"><span>01</span><strong>Create Account</strong><p>Sign up as a player or organizer and save your profile locally.</p></article>
            <article className="workflow-card reveal reveal-delay-1"><span>02</span><strong>Find or Create</strong><p>Players find tournaments while organizers create and schedule events.</p></article>
            <article className="workflow-card reveal reveal-delay-2"><span>03</span><strong>Register</strong><p>Players join tournaments and track their registered events.</p></article>
            <article className="workflow-card reveal reveal-delay-3"><span>04</span><strong>Admin Control</strong><p>Admins manage users and maintain the overall tournament system.</p></article>
          </div>
        </section>
      </main>
      <footer className="footer"><Brand subtitle="SDC Project" /><p>Built with React, CSS & JavaScript • LocalStorage powered</p><p>© 2026 GameZone</p></footer>
    </>
  );
}

function GameCard({ cls, number, name, description, image, delay = '' }) {
  return <article className={`game-card ${cls} reveal ${delay}`}><img src={`/assets/images/${image}`} alt={name} onError={(event) => { event.currentTarget.style.display = 'none'; }} /><div className="game-overlay" /><div className="game-content"><span>{number}</span><h3>{name}</h3><p>{description}</p><Link to="/login">View Tournaments →</Link></div></article>;
}

export function AuthPage({ mode }) {
  const isSignup = mode === 'signup';
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, notify } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [form, setForm] = useState({ name: '', email: '', role: searchParams.get('role') === 'organizer' ? 'organizer' : 'user', password: '', confirm: '', remember: false });
  const set = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    let result;
    if (isSignup) {
      if (form.password !== form.confirm) {
        setMessage({ text: 'Passwords do not match.', type: 'error' });
        return;
      }
      if (form.password.length < 6) {
        setMessage({ text: 'Password must contain at least 6 characters.', type: 'error' });
        return;
      }
      result = signup(form);
    } else {
      result = login(form.email, form.password);
    }
    if (!result.ok) {
      setMessage({ text: result.message, type: 'error' });
      return;
    }
    const role = result.user.role;
    const label = role === 'organizer' ? 'Organizer Console' : role === 'admin' ? 'Admin Panel' : 'Player Dashboard';
    setMessage({ text: `${isSignup ? 'Account created' : 'Login successful'}. Opening ${label}…`, type: 'success' });
    notify(isSignup ? 'Account created successfully.' : 'Login successful.');
    navigate(role === 'admin' ? '/admin/dashboard' : role === 'organizer' ? '/organizer/dashboard' : '/user/dashboard');
  };

  return <div className="auth-shell">
    <div className={`auth-art ${isSignup ? 'signup-art' : ''}`}><Brand /><div className="auth-art-copy"><span className="eyebrow">{isSignup ? 'JOIN THE ARENA' : 'WELCOME BACK'}</span><h1>{isSignup ? <>BUILD YOUR<br /><span>LEGACY.</span></> : <>THE ARENA<br /><span>IS WAITING.</span></>}</h1><p>{isSignup ? 'Create an account as a player or tournament organizer and start building your gaming journey.' : 'Login to continue your tournament journey, organize your events, or manage GameZone.'}</p>{isSignup ? <div className="floating-ranks"><span>PLAYER</span><span>⚡ ORGANIZER</span><span>TOURNAMENTS ⚡</span></div> : <div className="mini-orbit"><div className="orbit-dot" /></div>}</div></div>
    <div className="auth-panel"><Link className="back-link" to="/">← Back to home</Link><div className="form-card"><span className="eyebrow">{isSignup ? 'CREATE PROFILE' : 'UNIVERSAL ACCESS'}</span><h2>{isSignup ? 'Join the arena' : 'Welcome back'}</h2><p>{isSignup ? 'Choose your role and create your GameZone account.' : 'Login as a Player, Organizer or Admin.'}</p>
      <form onSubmit={submit}>
        {isSignup && <label>Full Name<input type="text" value={form.name} onChange={set('name')} placeholder="Your name" minLength="2" required /></label>}
        <label>Email<input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" required /></label>
        {isSignup && <label>Account Type<select id="signupRole" value={form.role} onChange={set('role')} required><option value="user">Player</option><option value="organizer">Organizer</option></select></label>}
        <label>Password<div className="password-wrap"><input type={showPassword ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder={isSignup ? 'At least 6 characters' : '••••••••'} minLength={isSignup ? 6 : undefined} autoComplete={isSignup ? 'new-password' : 'current-password'} required /><button type="button" className="show-pass" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>
        {isSignup ? <label>Confirm Password<input type={showPassword ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')} placeholder="Re-enter password" required /></label> : <div className="form-row"><label className="check"><input type="checkbox" checked={form.remember} onChange={set('remember')} />Remember me</label><span /></div>}
        <button className="btn btn-primary btn-full" type="submit">{isSignup ? 'Create Account' : 'Enter Arena'} <span>↗</span></button>
        {message.text && <p className={`form-message ${message.type}`}>{message.text}</p>}
      </form>
      {isSignup ? <><div className="divider"><span>ROLE INFORMATION</span></div><div className="demo-box"><p><strong>Player</strong><br />Browse and register for gaming tournaments.</p><p><strong>Organizer</strong><br />Create and manage tournaments and registrations.</p></div></> : <><div className="divider"><span>DEMO ACCESS</span></div><div className="demo-box"><p><strong>Admin</strong><br />admin@gamezone.com<br />admin123</p><p><strong>Organizer</strong><br />organizer@gamezone.com<br />organizer123</p></div></>}
      <p className="switch-text">{isSignup ? 'Already have an account?' : "Don't have an account?"} <Link to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Login →' : 'Create one →'}</Link></p>
    </div></div>
  </div>;
}

export function UserDashboard() {
  const { session, tournaments, registrations } = useStore();
  const mine = registrations.filter((item) => item.userEmail === session.email);
  const upcomingMine = mine.filter((entry) => { const t = tournaments.find((item) => item.id === entry.tournamentId); return t && new Date(`${t.date}T${t.time}`) > new Date(); });
  const upcoming = tournaments.filter((item) => new Date(`${item.date}T${item.time}`) > new Date()).slice(0, 3);
  return <><DashboardHeader role="user" active="/user/dashboard" /><main className="dashboard-main"><section className="welcome-banner"><div><span className="eyebrow">PLAYER CONTROL CENTER</span><h1>Welcome, <span>{session.name.split(' ')[0]}</span> 👋</h1><p>Ready for your next match? Explore current tournaments and keep your entries organized.</p></div><Link className="btn btn-primary" to="/user/tournaments">Browse Tournaments ↗</Link></section><section className="stat-grid"><StatCard label="AVAILABLE" value={tournaments.length} note="Tournaments" /><StatCard label="REGISTERED" value={mine.length} note="Your entries" /><StatCard label="UPCOMING" value={upcomingMine.length} note="Matches to play" /><StatCard label="PROFILE" value="100%" note="Complete" /></section><section className="dashboard-section"><div className="section-heading compact"><div><span className="eyebrow">NEXT UP</span><h2>Upcoming <span>Tournaments</span></h2></div><Link to="/user/tournaments">View all →</Link></div><div className="tournament-grid">{upcoming.length ? upcoming.map((item) => <TournamentCard key={item.id} tournament={item} user={session} />) : <EmptyState>No upcoming tournaments yet.</EmptyState>}</div></section></main></>;
}

export function UserTournaments() {
  const { session, tournaments } = useStore();
  const [query, setQuery] = useState('');
  const [game, setGame] = useState('all');
  const [type, setType] = useState('all');
  const items = useMemo(() => tournaments.filter((item) => (!query || item.name.toLowerCase().includes(query.toLowerCase()) || item.game.toLowerCase().includes(query.toLowerCase())) && (game === 'all' || item.game === game) && (type === 'all' || item.type === type)), [tournaments, query, game, type]);
  return <><DashboardHeader role="user" active="/user/tournaments" /><main className="dashboard-main"><section className="page-title"><span className="eyebrow">COMPETE & CLIMB</span><h1>Available <span>Tournaments</span></h1><p>Choose your game and secure your slot.</p></section><section className="filter-bar"><input type="search" placeholder="Search tournaments…" value={query} onChange={(event) => setQuery(event.target.value)} /><select value={game} onChange={(event) => setGame(event.target.value)}><option value="all">All Games</option><option>Call of Duty</option><option>Free Fire</option><option>Valorant</option><option>Fortnite</option></select><select value={type} onChange={(event) => setType(event.target.value)}><option value="all">All Types</option><option value="Free">Free</option><option value="Paid">Paid</option></select></section><section className="tournament-grid">{items.length ? items.map((item) => <TournamentCard key={item.id} tournament={item} user={session} />) : <EmptyState>No tournaments match your filters.</EmptyState>}</section></main></>;
}

export function UserTournamentDetails() {
  const [searchParams] = useSearchParams();
  const { session, tournaments, registrations, registerForTournament, notify } = useStore();
  const id = searchParams.get('id');
  const tournament = tournaments.find((item) => item.id === id);
  if (!tournament) return <><DashboardHeader role="user" active="/user/tournaments" /><main className="dashboard-main"><EmptyState>Tournament not found. <Link to="/user/tournaments">Go back →</Link></EmptyState></main></>;
  const count = registrations.filter((item) => item.tournamentId === id).length;
  const joined = registrations.some((item) => item.tournamentId === id && item.userEmail === session.email);
  const handleRegister = () => { const result = registerForTournament(id); notify(result.message, result.ok ? 'success' : 'error'); };
  return <><DashboardHeader role="user" active="/user/tournaments" /><main className="dashboard-main"><Link className="back-link" to="/user/tournaments">← Back to tournaments</Link><section className="detail-page"><div className="detail-hero"><div><span className="eyebrow">{tournament.game} • {tournament.type}</span><h1>{tournament.name}</h1><p>{tournament.description}</p></div><button className={`btn ${joined ? 'btn-ghost' : 'btn-primary'}`} onClick={handleRegister} disabled={joined}>{joined ? 'Registered' : 'Register Now ↗'}</button></div><div className="detail-content"><div className="detail-box"><h3>Tournament Overview</h3><div className="detail-grid"><div><small>Date</small><strong>{formatDate(tournament.date)}</strong></div><div><small>Time</small><strong>{formatTime(tournament.time)}</strong></div><div><small>Prize Pool</small><strong>{tournament.prize}</strong></div><div><small>Players</small><strong>{count}/{tournament.slots}</strong></div></div><p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 18 }}>Registration is saved locally for this demonstration project.</p></div><div className="detail-box"><h3>Player</h3><p style={{ fontSize: 13 }}><strong>{session.name}</strong><br /><span style={{ color: 'var(--muted)' }}>{session.email}</span></p></div></div></section></main></>;
}

export function MyTournaments() {
  const { session, tournaments, registrations } = useStore();
  const myIds = new Set(registrations.filter((item) => item.userEmail === session.email).map((item) => item.tournamentId));
  const mine = tournaments.filter((item) => myIds.has(item.id));
  return <><DashboardHeader role="user" active="/user/my-tournaments" /><main className="dashboard-main"><section className="page-title"><span className="eyebrow">YOUR ENTRIES</span><h1>My <span>Tournaments</span></h1><p>Everything you have registered for, in one place.</p></section><section className="tournament-grid">{mine.length ? mine.map((item) => <TournamentCard key={item.id} tournament={item} user={session} />) : <EmptyState>You have not registered for a tournament yet.<br /><Link to="/user/tournaments" style={{ color: 'var(--accent)' }}>Browse tournaments →</Link></EmptyState>}</section></main></>;
}

export function UserProfile() {
  const { session, registrations } = useStore();
  const entries = registrations.filter((item) => item.userEmail === session.email).length;
  const joinedDate = session.createdAt?.split('T')[0];
  const initials = session.name.split(' ').map((item) => item[0]).join('').slice(0, 2).toUpperCase();
  return <><DashboardHeader role="user" active="/user/profile" /><main className="dashboard-main"><section className="page-title"><span className="eyebrow">PLAYER PROFILE</span><h1>Your <span>Profile</span></h1><p>View your saved GameZone account details.</p></section><section className="profile-card"><div className="avatar">{initials}</div><div><span className="eyebrow">ACCOUNT</span><h2>{session.name}</h2><p>{session.email}</p><span className="status-pill">ACTIVE</span></div><div className="profile-meta"><div><small>ROLE</small><strong>{session.role.toUpperCase()}</strong></div><div><small>JOINED</small><strong>{joinedDate ? formatDate(joinedDate) : '—'}</strong></div><div><small>ENTRIES</small><strong>{entries}</strong></div></div></section></main></>;
}

function getOrganizerTournaments(tournaments, session) {
  // Preserve the original portal's behavior: legacy seed entries without an organizer ID
  // remain visible; newly created entries belong to their creator.
  return tournaments.filter((item) => !item.organizerId || item.organizerId === session.id || item.organizerId === 'org-001');
}

export function OrganizerDashboard() {
  const { session, tournaments, registrations } = useStore();
  const mine = getOrganizerTournaments(tournaments, session);
  const mineIds = new Set(mine.map((item) => item.id));
  const myRegistrations = registrations.filter((item) => mineIds.has(item.tournamentId));
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = mine.filter((item) => item.date >= today && item.status !== 'Completed').sort((a, b) => a.date.localeCompare(b.date));
  const uniquePlayers = new Set(myRegistrations.map((item) => item.userEmail)).size;
  return <><DashboardHeader role="organizer" active="/organizer/dashboard" /><main className="dashboard-main">
    <section className="welcome-banner organizer-banner"><div><span className="eyebrow">ORGANIZER CONSOLE</span><h1>Run the <span>arena.</span></h1><p>Create tournaments, control schedules and manage participants from one place.</p></div><Link className="btn btn-primary" to="/organizer/tournaments">Manage Tournaments ↗</Link></section>
    <section className="stat-grid"><StatCard label="MY TOURNAMENTS" value={mine.length} note="Created or assigned to you" /><StatCard label="REGISTRATIONS" value={myRegistrations.length} note="Total player entries" /><StatCard label="UPCOMING" value={upcoming.length} note="Scheduled events" /><StatCard label="PLAYERS" value={uniquePlayers} note="Unique participants" /></section>
    <section className="dashboard-section"><div className="section-heading compact"><div><span className="eyebrow">SCHEDULE</span><h2>Upcoming <span>Events</span></h2></div><Link to="/organizer/registrations">View registrations →</Link></div>
      <div className="admin-list">{upcoming.slice(0, 6).length ? upcoming.slice(0, 6).map((item) => <div className="admin-row" key={item.id}><div><strong>{item.name}</strong><span>{item.game} • {formatDate(item.date)} • {formatTime(item.time)}</span></div><span className={`status-${String(item.status || 'Upcoming').toLowerCase()}`}>{String(item.status || 'Upcoming').toUpperCase()}</span><span>{registrations.filter((entry) => entry.tournamentId === item.id).length}/{item.slots} players</span><div className="admin-row-actions"><Link className="mini-btn" to="/organizer/tournaments">Manage</Link></div></div>) : <div className="loading">No upcoming tournaments yet.</div>}</div>
    </section>
  </main></>;
}

export function OrganizerTournaments() {
  const { session, tournaments, registrations, saveTournament, deleteTournament, notify } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const mine = getOrganizerTournaments(tournaments, session);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setModalOpen(true); };
  const handleSave = (values, id) => {
    const result = saveTournament(values, id);
    notify(result.message, result.ok ? 'success' : 'error');
    setModalOpen(false);
    setEditing(null);
  };
  const handleDelete = (item) => {
    if (!window.confirm(`Delete “${item.name}” and its registrations?`)) return;
    deleteTournament(item.id);
    notify('Tournament deleted.', 'success');
  };

  return <><DashboardHeader role="organizer" active="/organizer/tournaments" /><main className="dashboard-main">
    <section className="page-title"><span className="eyebrow">TOURNAMENT OPERATIONS</span><h1>Manage <span>Events</span></h1><p>Create, update, schedule and remove tournaments assigned to your organizer account.</p></section>
    <div className="toolbar"><button type="button" className="btn btn-primary" onClick={openCreate}>+ Create Tournament</button><Link className="btn btn-ghost" to="/organizer/registrations">View Players ↗</Link></div>
    <TournamentTable tournaments={mine} registrations={registrations} onEdit={openEdit} onDelete={handleDelete} />
  </main><TournamentModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} tournament={editing} titlePrefix="ORGANIZER FORM" /></>;
}

export function OrganizerRegistrations() {
  const { session, tournaments, registrations, removeRegistration, notify } = useStore();
  const mine = getOrganizerTournaments(tournaments, session);
  const mineIds = new Set(mine.map((item) => item.id));
  const [filter, setFilter] = useState('all');
  const visible = registrations.filter((entry) => mineIds.has(entry.tournamentId) && (filter === 'all' || entry.tournamentId === filter));
  const handleRemove = (entry) => {
    if (!window.confirm(`Remove ${entry.userName} from this tournament?`)) return;
    removeRegistration(entry.id);
    notify('Registration removed.', 'success');
  };
  return <><DashboardHeader role="organizer" active="/organizer/registrations" /><main className="dashboard-main">
    <section className="page-title"><span className="eyebrow">PLAYER MANAGEMENT</span><h1>Event <span>Registrations</span></h1><p>Review players registered for your tournaments and remove unwanted entries.</p></section>
    <div className="registration-filter"><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All my tournaments</option>{mine.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
    <section className="admin-table-wrap"><table><thead><tr><th>Player</th><th>Email</th><th>Tournament</th><th>Registered</th><th>Action</th></tr></thead><tbody>{visible.length ? visible.map((entry) => {
      const tournament = mine.find((item) => item.id === entry.tournamentId);
      return <tr key={entry.id}><td><strong>{entry.userName}</strong></td><td>{entry.userEmail}</td><td>{tournament?.name || 'Unknown'}</td><td>{new Date(entry.registeredAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td><td><button type="button" className="mini-btn danger" onClick={() => handleRemove(entry)}>Remove</button></td></tr>;
    }) : <tr><td colSpan="5">No registrations found.</td></tr>}</tbody></table></section>
  </main></>;
}

export function AdminDashboard() {
  const { users, tournaments, registrations } = useStore();
  const players = users.filter((item) => item.role === 'user');
  const banned = users.filter((item) => item.status === 'banned');
  return <><DashboardHeader role="admin" active="/admin/dashboard" /><main className="dashboard-main">
    <section className="welcome-banner admin-banner"><div><span className="eyebrow">ADMIN CONTROL CENTER</span><h1>System <span>Overview</span></h1><p>Manage tournaments, player accounts and registrations.</p></div><Link className="btn btn-primary" to="/admin/tournaments">Manage Tournaments ↗</Link></section>
    <section className="stat-grid"><StatCard label="PLAYERS" value={players.length} note="Registered users" /><StatCard label="TOURNAMENTS" value={tournaments.length} note="In system" /><StatCard label="REGISTRATIONS" value={registrations.length} note="Total entries" /><StatCard label="BANNED" value={banned.length} note="User accounts" /></section>
    <section className="dashboard-section"><div className="section-heading compact"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Latest <span>Tournaments</span></h2></div><Link to="/admin/tournaments">Open manager →</Link></div><div className="admin-list">{tournaments.slice(-5).reverse().map((item) => <div className="admin-row" key={item.id}><div><strong>{item.name}</strong><span>{item.game} • {formatDate(item.date)}</span></div><span>{item.type}</span><span>{registrations.filter((entry) => entry.tournamentId === item.id).length}/{item.slots} players</span><div className="admin-row-actions"><Link className="mini-btn" to="/admin/tournaments">Manage</Link></div></div>)}</div></section>
  </main></>;
}

export function AdminTournaments() {
  const { tournaments, registrations, saveTournament, deleteTournament, notify } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const handleSave = (values, id) => {
    const result = saveTournament(values, id);
    notify(result.message, result.ok ? 'success' : 'error');
    setModalOpen(false);
    setEditing(null);
  };
  const handleDelete = (item) => {
    if (!window.confirm(`Delete “${item.name}”?`)) return;
    deleteTournament(item.id);
    notify('Tournament deleted.', 'success');
  };
  return <><DashboardHeader role="admin" active="/admin/tournaments" /><main className="dashboard-main">
    <section className="page-title row-title"><div><span className="eyebrow">ADMINISTRATOR</span><h1>Tournament <span>Manager</span></h1><p>Create, update and remove competition entries.</p></div><button className="btn btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>+ Create Tournament</button></section>
    <TournamentTable tournaments={tournaments} registrations={registrations} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={handleDelete} admin />
  </main><TournamentModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} tournament={editing} showStatus={false} /></>;
}

export function AdminUsers() {
  const { users, registrations, updateUserStatus, notify } = useStore();
  const players = users.filter((item) => item.role === 'user');
  const toggle = (email) => {
    const target = players.find((item) => item.email === email);
    updateUserStatus(email);
    notify(target?.status === 'banned' ? 'User unbanned.' : 'User banned.', 'success');
  };
  return <><DashboardHeader role="admin" active="/admin/users" /><main className="dashboard-main">
    <section className="page-title"><span className="eyebrow">ADMINISTRATOR</span><h1>User <span>Management</span></h1><p>Review account status and control access.</p></section>
    <section className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Status</th><th>Entries</th><th>Action</th></tr></thead><tbody>{players.length ? players.map((user) => <tr key={user.id}><td><strong>{user.name}</strong></td><td>{user.email}</td><td>{formatDate(user.createdAt?.split('T')[0])}</td><td className={user.status === 'banned' ? 'status-banned' : 'status-active'}>{(user.status || 'active').toUpperCase()}</td><td>{registrations.filter((item) => item.userEmail === user.email).length}</td><td><button className={`mini-btn ${user.status === 'banned' ? '' : 'danger'}`} onClick={() => toggle(user.email)}>{user.status === 'banned' ? 'Unban' : 'Ban'}</button></td></tr>) : <tr><td colSpan="6">No registered players yet.</td></tr>}</tbody></table></section>
  </main></>;
}

export function NotFoundPage() {
  return <main className="dashboard-main"><EmptyState>Page not found. <Link to="/">Return to GameZone home →</Link></EmptyState></main>;
}
