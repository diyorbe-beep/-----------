import { PHONE, TG, PAYME_MERCHANT_ID, CLICK_MERCHANT_ID } from '../config/constants';

export const quickCall = () => {
  window.location.href = `tel:+${PHONE}`;
};

export const openJitsi = () => {
  const room = 'dr_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString().slice(-5);
  window.open(`https://meet.jit.si/${room}`, '_blank');
};

export const sendAppointmentMessage = (appointmentData, service) => {
  const { name, phone, time, txn, notes } = appointmentData;
  const text = `Assalomu alaykum, doktor!%0A` +
    `Ism: ${encodeURIComponent(name)}%0A` +
    `Telefon: ${encodeURIComponent(phone)}%0A` +
    `Xizmat: ${encodeURIComponent(service.label)}%0A` +
    `Summa: ${service.price.toLocaleString('uz-UZ')} so'm%0A` +
    `Qulay vaqt: ${encodeURIComponent(time)}%0A` +
    `Tranzaksiya: ${encodeURIComponent(txn || '—')}%0A` +
    `Izoh: ${encodeURIComponent(notes || '')}`;

  const waUrl = `https://wa.me/${PHONE}?text=${text}`;
  const tgUrl = `https://t.me/${TG}`;
  
  window.open(waUrl, '_blank');
  setTimeout(() => window.open(tgUrl, '_blank'), 800);
};

export const startPayment = (provider, serviceKey, service, name, phone) => {
  if (!service) {
    alert('Xizmat topilmadi');
    return;
  }
  if (!name || !phone) {
    alert('Ism va telefon talab qilinadi');
    return;
  }

  const description = encodeURIComponent(`${service.label} — ${name} (${phone})`);
  
  if (provider === 'payme') {
    if (PAYME_MERCHANT_ID === '[PAYME_MERCHANT_ID]') {
      alert('Payme sozlanmagan. Iltimos MERCHANT_ID kiriting.');
      return;
    }
    const url = `https://checkout.payme.uz/${PAYME_MERCHANT_ID}?amount=${service.price * 100}&description=${description}`;
    window.open(url, '_blank');
  } else if (provider === 'click') {
    if (CLICK_MERCHANT_ID === '[CLICK_MERCHANT_ID]') {
      alert('Click sozlanmagan. Iltimos MERCHANT_ID kiriting.');
      return;
    }
    const url = `https://my.click.uz/services/pay?service_id=${CLICK_MERCHANT_ID}&amount=${service.price}&comment=${description}`;
    window.open(url, '_blank');
  } else {
    alert("Ofisda to'lov yoki bank o'tkazma uchun administrator bilan bog'laning.");
    window.location.hash = '#contact';
  }
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const exportCSV = (appointments) => {
  const header = ['id', 'name', 'phone', 'service', 'serviceLabel', 'amount', 'time', 'txn', 'notes', 'status'];
  const rows = [header.join(',')].concat(
    appointments.map(a => [
      a.id || '',
      a.name || '',
      a.phone || '',
      a.service || a.service_key || '',
      a.serviceLabel || '',
      a.amount || 0,
      '"' + (a.time || '') + '"',
      '"' + (a.txn || '') + '"',
      '"' + (a.notes || '') + '"',
      a.status || ''
    ].join(','))
  );
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'appointments.csv';
  a.click();
  URL.revokeObjectURL(url);
};

