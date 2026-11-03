import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const StoreContext = createContext(null);

export const STORAGE_KEYS = {
  users: 'gz_users',
  session: 'gz_session',
  tournaments: 'gz_tournaments',
  registrations: 'gz_registrations',
};

const seedAdmin = {
  id: 'admin-001', name: 'GameZone Admin', email: 'admin@gamezone.com',
  password: 'admin123', role: 'admin', status: 'active', createdAt: '2026-09-01T09:00:00.000Z',
};
const seedOrganizer = {
  id: 'org-001', name: 'GameZone Organizer', email: 'organizer@gamezone.com',
  password: 'organizer123', role: 'organizer', status: 'active', createdAt: '2026-09-02T09:00:00.000Z',
};

const seedTournaments = [
  { id: 't-001', name: 'Neon Night Clash', game: 'Valorant', type: 'Paid', date: '2026-10-08', time: '19:00', prize: '₹10,000', slots: 100, description: 'A fast-paced tactical tournament for student squads.', createdAt: '2026-09-20' },
  { id: 't-002', name: 'Firestorm Solo Cup', game: 'Free Fire', type: 'Free', date: '2026-10-11', time: '18:30', prize: '₹5,000', slots: 80, description: 'Quick rounds, smart rotations and a final-zone finish.', createdAt: '2026-09-22' },
  { id: 't-003', name: 'COD Campus League', game: 'Call of Duty', type: 'Paid', date: '2026-10-15', time: '20:00', prize: '₹15,000', slots: 64, description: 'Campus teams battle for the GameZone season title.', createdAt: '2026-09-24' },
  { id: 't-004', name: 'Fortnite Creative Rush', game: 'Fortnite', type: 'Free', date: '2026-10-18', time: '17:00', prize: '₹3,000', slots: 120, description: 'Creative builds, rapid fights and a student-only lobby.', createdAt: '2026-09-26' },
  { id: 't-005', name: 'Weekend Warzone', game: 'Call of Duty', type: 'Free', date: '2026-10-23', time: '19:30', prize: '₹4,000', slots: 100, description: 'Weekend community tournament open to all registered players.', createdAt: '2026-09-27' },
  { id: 't-006', name: 'Valorant Zero Hour', game: 'Valorant', type: 'Paid', date: '2026-10-27', time: '20:30', prize: '₹20,000', slots: 64, description: 'High-intensity student esports with a serious bracket.', createdAt: '2026-09-28' },
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.warn(`Could not read ${key} from LocalStorage.`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Could not save ${key} to LocalStorage.`, error);
    return false;
  }
}

export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

export function formatTime(value) {
  if (!value) return '—';
  const [hours, minutes] = value.split(':').map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return value;
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
}

export function safeText(value) {
  return String(value ?? '');
}

function makeSafeSession(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status || 'active',
    createdAt: user.createdAt || new Date().toISOString(),
  };
}

export function StoreProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const stored = readStorage(STORAGE_KEYS.users, []);
    const list = Array.isArray(stored) ? [...stored] : [];
    if (!list.some((user) => user.email?.toLowerCase() === seedAdmin.email)) list.push(seedAdmin);
    if (!list.some((user) => user.email?.toLowerCase() === seedOrganizer.email)) list.push(seedOrganizer);
    writeStorage(STORAGE_KEYS.users, list);
    return list;
  });

  const [session, setSessionState] = useState(() => readStorage(STORAGE_KEYS.session, null));
  const [tournaments, setTournaments] = useState(() => {
    const stored = readStorage(STORAGE_KEYS.tournaments, null);
    const initial = stored === null ? seedTournaments : (Array.isArray(stored) ? stored : seedTournaments);
    writeStorage(STORAGE_KEYS.tournaments, initial);
    return initial;
  });
  const [registrations, setRegistrations] = useState(() => {
    const stored = readStorage(STORAGE_KEYS.registrations, []);
    const initial = Array.isArray(stored) ? stored : [];
    writeStorage(STORAGE_KEYS.registrations, initial);
    return initial;
  });
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

 useEffect(() => {
    writeStorage(STORAGE_KEYS.users, users);
}, [users]);

useEffect(() => {
    writeStorage(STORAGE_KEYS.tournaments, tournaments);
}, [tournaments]);

useEffect(() => {
    writeStorage(STORAGE_KEYS.registrations, registrations);
}, [registrations]);
  useEffect(() => {
    if (session) writeStorage(STORAGE_KEYS.session, session);
    else localStorage.removeItem(STORAGE_KEYS.session);
  }, [session]);

  const notify = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  };

  const login = (email, password) => {
    const user = users.find((item) => item.email?.toLowerCase() === email.trim().toLowerCase() && item.password === password);
    if (!user) return { ok: false, message: 'Invalid email or password.' };
    if (user.status === 'banned') return { ok: false, message: 'This account is currently banned.' };
    const nextSession = makeSafeSession(user);
    setSessionState(nextSession);
    return { ok: true, user: nextSession };
  };

  const signup = ({ name, email, password, role }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((item) => item.email?.toLowerCase() === normalizedEmail)) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    if (!['user', 'organizer'].includes(role)) {
      return { ok: false, message: 'Please choose a valid account type.' };
    }
    const user = {
      id: `${role}-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setUsers((current) => [...current, user]);
    const nextSession = makeSafeSession(user);
    setSessionState(nextSession);
    return { ok: true, user: nextSession };
  };

  const logout = () => setSessionState(null);

  const saveTournament = (values, id = '') => {
    const existing = id ? tournaments.find((item) => item.id === id) : null;
    const record = {
      id: id || `t-${Date.now()}`,
      name: values.name.trim(),
      game: values.game,
      type: values.type,
      date: values.date,
      time: values.time,
      prize: values.prize.trim(),
      slots: Number(values.slots),
      status: values.status || 'Upcoming',
      description: values.description?.trim() || '',
      organizerId: existing?.organizerId || (session?.role === 'organizer' ? session.id : ''),
      createdAt: existing?.createdAt || new Date().toISOString(),
    };
    if (id && existing) {
      setTournaments((current) => current.map((item) => item.id === id ? record : item));
      return { ok: true, message: 'Tournament updated.', tournament: record };
    }
    setTournaments((current) => [...current, record]);
    return { ok: true, message: 'Tournament created successfully.', tournament: record };
  };

  const deleteTournament = (id) => {
    setTournaments((current) => current.filter((item) => item.id !== id));
    setRegistrations((current) => current.filter((item) => item.tournamentId !== id));
  };

  const registerForTournament = (tournamentId) => {
    if (!session || session.role !== 'user') return { ok: false, message: 'Please log in as a player to register.' };
    const tournament = tournaments.find((item) => item.id === tournamentId);
    if (!tournament) return { ok: false, message: 'Tournament not found.' };
    if (registrations.some((item) => item.tournamentId === tournamentId && item.userEmail === session.email)) {
      return { ok: false, message: 'You are already registered.' };
    }
    if (registrations.filter((item) => item.tournamentId === tournamentId).length >= Number(tournament.slots)) {
      return { ok: false, message: 'This tournament is full.' };
    }
    const registration = {
      id: `r-${Date.now()}`,
      tournamentId,
      userEmail: session.email,
      userName: session.name,
      registeredAt: new Date().toISOString(),
    };
    setRegistrations((current) => [...current, registration]);
    return { ok: true, message: 'Registration confirmed.' };
  };

  const unregisterFromTournament = (tournamentId, email = session?.email) => {
    setRegistrations((current) => current.filter((item) => !(item.tournamentId === tournamentId && item.userEmail === email)));
  };

  const removeRegistration = (registrationId) => {
    setRegistrations((current) => current.filter((item) => item.id !== registrationId));
  };

  const updateUserStatus = (email) => {
    setUsers((current) => current.map((user) => user.email === email
      ? { ...user, status: user.status === 'banned' ? 'active' : 'banned' }
      : user));
  };

  const value = useMemo(() => ({
    users, session, tournaments, registrations, toast,
    login, signup, logout, notify,
    saveTournament, deleteTournament,
    registerForTournament, unregisterFromTournament, removeRegistration,
    updateUserStatus, setToast,
  }), [users, session, tournaments, registrations, toast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside StoreProvider');
  return value;
}
