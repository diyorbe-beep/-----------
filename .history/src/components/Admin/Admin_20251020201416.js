import React, { useState, useEffect } from 'react';
import { isAdminAuthenticated } from '../../utils/storage';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(isAdminAuthenticated());
    };

    const handleHashChange = () => {
      setShowAdmin(window.location.hash === '#admin');
    };

    checkAuth();
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!showAdmin) {
    return null;
  }

  return (
    <section id="admin" className="card" style={{ marginTop: '18px' }}>
      <h2>Admin panel</h2>
      {!isAuthenticated ? (
        <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
      )}
    </section>
  );
};

export default Admin;

