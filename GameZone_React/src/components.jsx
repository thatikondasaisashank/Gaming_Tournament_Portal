import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore, formatDate, formatTime } from './store.jsx';

export function Brand({ subtitle = 'Tournament Portal', to = '/' }) {
  return (
    <Link className="brand" to={to} aria-label="GameZone home">
      <span className="brand-mark">GZ</span>
      <span><strong>GAMEZONE</strong><small>{subtitle}</small></span>
    </Link>
  );
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return <div className={`toast ${toast.type}`} role="status">{toast.message}</div>;
}

export function DashboardHeader({ role, active }) {
  const { logout, notify } = useStore();
  const navigate = useNavigate();
  const config = {
    user: {
      subtitle: 'Player Dashboard',
      links: [['Dashboard', '/user/dashboard'], ['Tournaments', '/user/tournaments'], ['My Tournaments', '/user/my-tournaments'], ['Profile', '/user/profile']],
      className: '',
    },
    organizer: {
      subtitle: 'Organizer Console',
      links: [['Dashboard', '/organizer/dashboard'], ['Tournaments', '/organizer/tournaments'], ['Registrations', '/organizer/registrations']],
      className: 'organizer-nav',
    },
    admin: {
      subtitle: 'Admin Control',
      links: [['Dashboard', '/admin/dashboard'], ['Tournaments', '/admin/tournaments'], ['Users', '/admin/users']],
      className: 'admin-nav',
    },
  }[role];

  const handleLogout = () => {
    logout();
    notify('You have been logged out.', 'success');
    navigate('/login');
  };

  return (
    <header className={`dashboard-nav ${config.className}`}>
      <Brand subtitle={config.subtitle} to={`/${role}/dashboard`} />
      <nav>
        {config.links.map(([label, path]) => (
          <NavLink key={path} to={path} className={active === path ? 'active' : ''}>{label}</NavLink>
        ))}
      </nav>
      <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
    </header>
  );
}

export function TournamentCard({ tournament, user, showRegister = true }) {
  const { registrations, registerForTournament, notify } = useStore();
  const navigate = useNavigate();
  const count = registrations.filter((item) => item.tournamentId === tournament.id).length;
  const joined = Boolean(user && registrations.some((item) => item.tournamentId === tournament.id && item.userEmail === user.email));

  const handleRegister = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const result = registerForTournament(tournament.id);
    notify(result.message, result.ok ? 'success' : 'error');
  };

  return (
    <article className="tournament-card">
      <div className="tournament-banner">
        <span className="game-label">{String(tournament.game).toUpperCase()}</span>
        <span className={`type-chip ${tournament.type === 'Free' ? 'type-free' : 'type-paid'}`}>{String(tournament.type).toUpperCase()}</span>
      </div>
      <div className="tournament-body">
        <h3>{tournament.name}</h3>
        <p>{tournament.description || 'Open tournament for registered GameZone players.'}</p>
        <div className="tournament-meta">
          <div><small>Date</small><strong>{formatDate(tournament.date)}</strong></div>
          <div><small>Time</small><strong>{formatTime(tournament.time)}</strong></div>
          <div><small>Prize</small><strong>{tournament.prize}</strong></div>
          <div><small>Slots</small><strong>{count}/{tournament.slots}</strong></div>
        </div>
        <div className="card-actions">
          <Link className="btn btn-ghost" to={`/user/details?id=${encodeURIComponent(tournament.id)}`}>Details</Link>
          {showRegister && user && <button className={`btn ${joined ? 'btn-ghost' : 'btn-primary'}`} onClick={handleRegister} disabled={joined}>{joined ? 'Registered' : 'Register'}</button>}
        </div>
      </div>
    </article>
  );
}

export function EmptyState({ children }) {
  return <div className="empty-state">{children}</div>;
}

export function StatCard({ label, value, note }) {
  return <div className="stat-card"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

export function TournamentTable({ tournaments, registrations, onEdit, onDelete, admin = false }) {
  return (
    <div className="admin-table-wrap">
      <table>
        <thead><tr><th>Tournament</th><th>Game</th>{admin ? <><th>Date</th><th>Type</th></> : <><th>Schedule</th><th>Status</th></>}<th>Players</th><th>Actions</th></tr></thead>
        <tbody>
          {tournaments.length === 0 ? <tr><td colSpan="6">No tournaments available. Create your first tournament.</td></tr> : tournaments.map((item) => {
            const players = registrations.filter((entry) => entry.tournamentId === item.id).length;
            return (
              <tr key={item.id}>
                <td><strong>{item.name}</strong><br /><small>{item.type}</small></td>
                <td>{item.game}</td>
                {admin ? <><td>{formatDate(item.date)}</td><td className={item.type === 'Free' ? 'type-free' : 'type-paid'}>{item.type}</td></> : <><td>{formatDate(item.date)}<br />{formatTime(item.time)}</td><td className={`status-${String(item.status || 'Upcoming').toLowerCase()}`}>{item.status || 'Upcoming'}</td></>}
                <td>{players}/{item.slots}</td>
                <td><div className="table-actions"><button type="button" className="mini-btn edit-organizer" onClick={() => onEdit(item)}>Edit</button><button type="button" className="mini-btn danger" onClick={() => onDelete(item)}>Delete</button></div></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function TournamentModal({ open, onClose, onSave, tournament = null, titlePrefix = '', showStatus = true }) {
  const [form, setForm] = React.useState(() => makeForm(tournament));
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setForm(makeForm(tournament));
    setError('');
  }, [tournament, open]);

  if (!open) return null;
  const set = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.date || !form.time || !form.prize.trim()) {
      setError('Please complete all required fields.');
      return;
    }
    const slots = Number(form.slots);
    if (!Number.isInteger(slots) || slots < 2) {
      setError('Slots must be a whole number of at least 2.');
      return;
    }
    onSave(form, tournament?.id || '');
  };

  return (
    <div className="modal open" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="tournament-modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <span className="eyebrow">{titlePrefix || 'TOURNAMENT FORM'}</span>
        <h2 id="tournament-modal-title">{tournament ? 'Edit Tournament' : 'Create Tournament'}</h2>
        <form className="admin-form" onSubmit={submit}>
          <label>Tournament Name<input required value={form.name} onChange={set('name')} placeholder="e.g. Valorant Night Cup" /></label>
          <div className="form-grid">
            <label>Game<select value={form.game} onChange={set('game')}><option>Call of Duty</option><option>Free Fire</option><option>Valorant</option><option>Fortnite</option></select></label>
            <label>Type<select value={form.type} onChange={set('type')}><option>Free</option><option>Paid</option></select></label>
            <label>Date<input type="date" required value={form.date} onChange={set('date')} /></label>
            <label>Time<input type="time" required value={form.time} onChange={set('time')} /></label>
            <label>Prize Pool<input required value={form.prize} onChange={set('prize')} placeholder="₹10,000" /></label>
            <label>Slots<input type="number" min="2" required value={form.slots} onChange={set('slots')} /></label>
            {showStatus && <label>Status<select value={form.status} onChange={set('status')}><option>Upcoming</option><option>Live</option><option>Completed</option></select></label>}
          </div>
          <label>Description<textarea rows="4" value={form.description} onChange={set('description')} placeholder="Tell players what to expect..." /></label>
          {error && <p className="form-message error">{error}</p>}
          <div className="admin-actions">
            <button className="btn btn-primary" type="submit">Save Tournament</button>
            <button className="btn btn-ghost" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function makeForm(tournament) {
  return {
    name: tournament?.name || '',
    game: tournament?.game || 'Call of Duty',
    type: tournament?.type || 'Free',
    date: tournament?.date || '',
    time: tournament?.time || '19:00',
    prize: tournament?.prize || '₹5,000',
    slots: tournament?.slots ?? 100,
    status: tournament?.status || 'Upcoming',
    description: tournament?.description || '',
  };
}
