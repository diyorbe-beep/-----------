import React, { useState } from 'react';
import { SERVICES, API_BASE } from '../config/constants';
import { sendAppointmentMessage } from '../utils/helpers';
import { getAppointments, saveAppointments } from '../utils/storage';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'offline_primary',
    time: '',
    notes: '',
    txn: '',
    prepaidAck: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.prepaidAck) {
      alert("Iltimos, oldindan to'lov majburiyatini tasdiqlang yoki avval to'lov qiling.");
      return;
    }

    const service = SERVICES[formData.service];

    // Send WhatsApp/Telegram message
    sendAppointmentMessage(formData, service);

    // Try backend first
    try {
      await fetch(API_BASE + '/api/appts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service_key: formData.service,
          time: formData.time,
          notes: formData.notes,
          txn: formData.txn,
          amount: service.price
        })
      });
    } catch (err) {
      // Fallback to localStorage
      const appts = getAppointments();
      appts.push({
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        serviceLabel: service.label,
        amount: service.price,
        time: formData.time,
        txn: formData.txn,
        notes: formData.notes,
        status: 'pending'
      });
      saveAppointments(appts);
    }

    alert('So\'rov yuborildi. Operator to\'lovni tekshiradi va vaqtni tasdiqlaydi.');
    setFormData({
      name: '',
      phone: '',
      service: 'offline_primary',
      time: '',
      notes: '',
      txn: '',
      prepaidAck: false
    });
  };

  return (
    <section id="appoint" className="card" style={{ marginTop: '18px' }}>
      <h2>Online qabulga yozilish</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <div>
            <label htmlFor="name">Ism Familiya</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masalan: Ali Valiyev"
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Telefon</label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+998 90 123 45 67"
              required
            />
          </div>
        </div>
        <div className="grid-2">
          <div>
            <label htmlFor="service">Yo'nalish</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="offline_primary">Birlamchi ko'rik (Offline)</option>
              <option value="offline_follow">Takroriy qabul (Offline)</option>
              <option value="online_consult">Online konsultatsiya (Video)</option>
            </select>
          </div>
          <div>
            <label htmlFor="time">Qulay sana/vaqt</label>
            <input
              id="time"
              name="time"
              type="text"
              value={formData.time}
              onChange={handleChange}
              placeholder="22.10.2025 15:00"
            />
          </div>
        </div>
        <div className="grid-2">
          <div>
            <label>Oldindan to'lov</label>
            <div className="muted">
              Band qilish uchun oldindan to'lov shart. Avval <a href="#pay">to'lov</a>ni amalga oshiring.
            </div>
          </div>
          <div>
            <label htmlFor="txn">Tranzaksiya № (ixtiyoriy, bo'lsa yozing)</label>
            <input
              id="txn"
              name="txn"
              value={formData.txn}
              onChange={handleChange}
              placeholder="Click/Payme kvitansiya raqami"
            />
          </div>
        </div>
        <div>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="prepaidAck"
              name="prepaidAck"
              checked={formData.prepaidAck}
              onChange={handleChange}
              required
            />
            Oldindan to'lov qilish majburiyatini tasdiqlayman
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn" type="submit">
            Band qilish va xabar yuborish
          </button>
          <a className="btn btn-outline" href="#pay">Avval to'lov qilish</a>
        </div>
        <p className="muted" style={{ fontSize: '12px', margin: '6px 0 0' }}>
          So'rov WhatsApp va Telegram orqali yuboriladi. Administrator to'lovni tekshirgach, vaqtni tasdiqlaydi.
        </p>
      </form>
    </section>
  );
};

export default Appointment;

