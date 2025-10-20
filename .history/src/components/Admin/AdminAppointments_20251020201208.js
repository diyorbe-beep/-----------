import React, { useState, useEffect } from 'react';
import { API_BASE, SERVICES } from '../../config/constants';
import { getAuthHeaders, getAppointments, saveAppointments } from '../../utils/storage';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    try {
      const response = await fetch(API_BASE + '/api/appts', {
        headers: { ...getAuthHeaders() }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setAppointments(data);
          return;
        }
      }
    } catch (err) {
      // Fallback to localStorage
      const appts = getAppointments().sort((a, b) => b.id - a.id);
      setAppointments(appts);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const markStatus = async (id, status) => {
    try {
      const response = await fetch(API_BASE + '/api/appts/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('patch_fail');
    } catch (err) {
      // Fallback to localStorage
      const appts = getAppointments();
      const idx = appts.findIndex(x => x.id === id);
      if (idx > -1) {
        appts[idx].status = status;
        saveAppointments(appts);
      }
    }

    loadAppointments();
  };

  const deleteAppointment = (id) => {
    const appts = getAppointments().filter(x => x.id !== id);
    saveAppointments(appts);
    loadAppointments();
  };

  if (appointments.length === 0) {
    return <p className="muted">Hozircha so'rov yo'q.</p>;
  }

  return (
    <div id="apptsTable" className="list">
      {appointments.map(a => (
        <div key={a.id} className="card" style={{ padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
            <div>
              <strong>{a.name}</strong> • {a.phone}
              <br />
              <span className="muted">
                {(SERVICES[a.service_key || a.service]?.label) || a.serviceLabel || a.service_key || a.service} — 
                {' '}{(a.amount || 0).toLocaleString('uz-UZ')} so'm • {a.time || '—'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn" onClick={() => markStatus(a.id, 'confirmed')}>
                Tasdiqlash
              </button>
              <button className="btn btn-outline" onClick={() => markStatus(a.id, 'canceled')}>
                Bekor qilish
              </button>
              <button className="btn btn-outline" onClick={() => deleteAppointment(a.id)}>
                O'chirish
              </button>
            </div>
          </div>
          <div className="muted" style={{ marginTop: '6px' }}>
            Txn: {a.txn || '—'} • Holat: <strong>{a.status}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAppointments;

