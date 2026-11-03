import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StoreProvider, useStore } from './store.jsx';
import { Toast } from './components.jsx';
import {
  AdminDashboard, AdminTournaments, AdminUsers, AuthPage,
  HomePage, MyTournaments, NotFoundPage, OrganizerDashboard,
  OrganizerRegistrations, OrganizerTournaments, UserDashboard,
  UserProfile, UserTournamentDetails, UserTournaments,
} from './pages.jsx';

function ProtectedRoute({ role, children }) {
  const { session } = useStore();
  if (!session) return <Navigate to="/login" replace />;
  if (role && session.role !== role) {
    const destination = session.role === 'admin' ? '/admin/dashboard' : session.role === 'organizer' ? '/organizer/dashboard' : '/user/dashboard';
    return <Navigate to={destination} replace />;
  }
  if (session.status === 'banned') return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />

      <Route path="/user/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
      <Route path="/user/tournaments" element={<ProtectedRoute role="user"><UserTournaments /></ProtectedRoute>} />
      <Route path="/user/details" element={<ProtectedRoute role="user"><UserTournamentDetails /></ProtectedRoute>} />
      <Route path="/user/my-tournaments" element={<ProtectedRoute role="user"><MyTournaments /></ProtectedRoute>} />
      <Route path="/user/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />

      <Route path="/organizer/dashboard" element={<ProtectedRoute role="organizer"><OrganizerDashboard /></ProtectedRoute>} />
      <Route path="/organizer/tournaments" element={<ProtectedRoute role="organizer"><OrganizerTournaments /></ProtectedRoute>} />
      <Route path="/organizer/registrations" element={<ProtectedRoute role="organizer"><OrganizerRegistrations /></ProtectedRoute>} />

      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/tournaments" element={<ProtectedRoute role="admin"><AdminTournaments /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Toast />
  </>;
}

export default function App() {
  return <BrowserRouter><StoreProvider><AppRoutes /></StoreProvider></BrowserRouter>;
}
