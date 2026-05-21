/**
 * YourTransport Booking Widget controller
 * Manages tab switching, fare calculation, and interactive confirmation modals.
 */
export function initBookingWidget() {
  const tabBookBtn = document.getElementById('tab-book');
  const tabRouteBtn = document.getElementById('tab-route');
  const formBooking = document.getElementById('form-booking');
  const formRoute = document.getElementById('form-route');

  if (!tabBookBtn || !tabRouteBtn || !formBooking || !formRoute) return;

  // Initialize date fields to tomorrow's date by default for user convenience
  const dateField = document.getElementById('booking-date');
  if (dateField) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateField.value = tomorrow.toISOString().split('T')[0];
  }

  // Initialize time field to current time
  const timeField = document.getElementById('booking-time');
  if (timeField) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeField.value = `${hours}:${minutes}`;
  }

  // 1. Tab Switch Handlers
  tabBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tabBookBtn.classList.add('active');
    tabRouteBtn.classList.remove('active');
    formBooking.classList.remove('hidden');
    formRoute.classList.add('hidden');
  });

  tabRouteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tabRouteBtn.classList.add('active');
    tabBookBtn.classList.remove('active');
    formRoute.classList.remove('hidden');
    formBooking.classList.add('hidden');
  });

  // 2. Booking Submission Handler
  formBooking.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Gather details
    const transitType = document.getElementById('booking-transit').value;
    const origin = document.getElementById('booking-origin').value;
    const dest = document.getElementById('booking-destination').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;

    let transitName = 'Lanzadera de Microtránsito';
    let baseFare = 2.50;
    if (transitType === 'bus') {
      transitName = 'Autobús Expreso Interurbano';
      baseFare = 3.75;
    } else if (transitType === 'train') {
      transitName = 'Metro Hyper-Rail';
      baseFare = 5.50;
    }

    const calculatedFare = `$${baseFare.toFixed(2)}`;
    const ticketId = `YT-${Math.floor(100000 + Math.random() * 900000)}`;

    showTicketConfirmationModal({
      ticketId,
      transitName,
      origin,
      dest,
      date,
      time,
      fare: calculatedFare
    });
  });

  // 3. Route Search Submission Handler
  formRoute.addEventListener('submit', (e) => {
    e.preventDefault();
    const start = document.getElementById('route-origin').value;
    const dest = document.getElementById('route-destination').value;
    const pref = document.getElementById('route-preference').value;

    showRouteResultsModal(start, dest, pref);
  });
}

function showTicketConfirmationModal(data) {
  // Create modal element
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(4, 7, 14, 0.85)';
  modal.style.backdropFilter = 'blur(12px)';
  modal.style.webkitBackdropFilter = 'blur(12px)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.3s ease';

  // Inject content with stylized ticket look
  modal.innerHTML = `
    <div class="glass-card" style="width: 90%; max-width: 450px; text-align: center; border-color: var(--accent-cyan); position: relative; transform: scale(0.9); transition: transform 0.3s ease;">
      <button id="close-modal-btn" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer;">&times;</button>
      
      <!-- Sparkly Success Header -->
      <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(0, 242, 254, 0.1); display: flex; align-items: center; justify-content: center; color: var(--accent-cyan); margin: 0 auto 1.5rem auto;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      
      <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">¡Boleto Asegurado!</h3>
      <p style="font-size: 0.9rem; margin-bottom: 2rem;">Tu boleto de viaje ha sido generado con éxito.</p>
      
      <!-- Ticket Card representation -->
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px dashed rgba(255, 255, 255, 0.1); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 2rem; text-align: left; position: relative;">
        <!-- Left & Right punched holes visual effect -->
        <div style="position: absolute; width: 16px; height: 16px; background: #060913; border-radius: 50%; top: 50%; left: -9px; transform: translateY(-50%); border-right: 1px dashed rgba(255, 255, 255, 0.1);"></div>
        <div style="position: absolute; width: 16px; height: 16px; background: #060913; border-radius: 50%; top: 50%; right: -9px; transform: translateY(-50%); border-left: 1px dashed rgba(255, 255, 255, 0.1);"></div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 0.5rem;">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">ID DE BOLETO</span>
          <span style="font-family: var(--font-heading); font-weight: 700; color: var(--accent-cyan); font-size: 0.9rem;">${data.ticketId}</span>
        </div>
        
        <div style="margin-bottom: 0.5rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">SERVICIO DE TRÁNSITO</span>
          <span style="font-weight: 600; font-size: 0.95rem;">${data.transitName}</span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.5rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">DESDE</span>
            <span style="font-weight: 500; font-size: 0.9rem;">${data.origin}</span>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">HACIA</span>
            <span style="font-weight: 500; font-size: 0.9rem;">${data.dest}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 0.75rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">FECHA Y HORA</span>
            <span style="font-weight: 500; font-size: 0.85rem;">${data.date} a las ${data.time}</span>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">TARIFA DE ABORDAJE</span>
            <span style="font-weight: 700; font-size: 1.05rem; color: var(--accent-emerald);">${data.fare}</span>
          </div>
        </div>
      </div>

      <button id="modal-confirm-btn" class="btn btn-primary" style="width: 100%;">Agregar a Wallet y Salir</button>
    </div>
  `;

  document.body.appendChild(modal);

  // Fade in animation
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.querySelector('.glass-card').style.transform = 'scale(1)';
  }, 10);

  // Close actions
  function closeModal() {
    modal.style.opacity = '0';
    modal.querySelector('.glass-card').style.transform = 'scale(0.9)';
    setTimeout(() => modal.remove(), 300);
  }

  modal.querySelector('#close-modal-btn').addEventListener('click', closeModal);
  modal.querySelector('#modal-confirm-btn').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function showRouteResultsModal(start, dest, preference) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(4, 7, 14, 0.85)';
  modal.style.backdropFilter = 'blur(12px)';
  modal.style.webkitBackdropFilter = 'blur(12px)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.3s ease';

  let routeOptionHTML = '';
  if (preference === 'fastest') {
    routeOptionHTML = `
      <div style="background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1rem; position: relative;">
        <span class="badge badge-cyan" style="position: absolute; top: 0.75rem; right: 0.75rem;">Más Rápido</span>
        <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">Hyper-Rail Línea Roja</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Viaje: 12 minutos (Directo)</p>
        <span style="font-weight: 700; color: var(--accent-cyan);">$5.50</span>
      </div>
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 1rem; opacity: 0.6;">
        <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">Autobús Expreso B-2</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Viaje: 22 minutos (1 transbordo)</p>
      </div>
    `;
  } else if (preference === 'cheapest') {
    routeOptionHTML = `
      <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1rem; position: relative;">
        <span class="badge badge-emerald" style="position: absolute; top: 0.75rem; right: 0.75rem;">Mejor Valor</span>
        <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">Autobús Directo Interurbano</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Viaje: 28 minutos (Directo)</p>
        <span style="font-weight: 700; color: var(--accent-emerald);">$2.25</span>
      </div>
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 1rem; opacity: 0.6;">
        <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">Línea Expresa Hyper-Rail</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Viaje: 10 minutos (Directo) | $5.50</p>
      </div>
    `;
  } else {
    routeOptionHTML = `
      <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1rem; position: relative;">
        <span class="badge badge-cyan" style="background: rgba(139, 92, 246, 0.1); color: var(--accent-violet); border-color: rgba(139, 92, 246, 0.2); position: absolute; top: 0.75rem; right: 0.75rem;">Eco-Opción</span>
        <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">Lanzadera Eléctrica Loop</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Cero emisiones, flota 100% alimentada con energía solar.</p>
        <span style="font-weight: 700; color: var(--accent-violet);">$2.50</span>
      </div>
    `;
  }

  modal.innerHTML = `
    <div class="glass-card" style="width: 90%; max-width: 450px; text-align: left; position: relative; transform: scale(0.9); transition: transform 0.3s ease;">
      <button id="close-modal-btn" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer;">&times;</button>
      
      <h3 style="margin-bottom: 0.5rem; font-size: 1.35rem; font-family: var(--font-heading);">Rutas Optimizadas</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Opciones sugeridas desde <strong>${start}</strong> hasta <strong>${dest}</strong>.</p>
      
      <div style="margin-bottom: 1.5rem;">
        ${routeOptionHTML}
      </div>

      <button id="modal-confirm-btn" class="btn btn-primary" style="width: 100%;">Seleccionar Opción de Ruta</button>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = '1';
    modal.querySelector('.glass-card').style.transform = 'scale(1)';
  }, 10);

  function closeModal() {
    modal.style.opacity = '0';
    modal.querySelector('.glass-card').style.transform = 'scale(0.9)';
    setTimeout(() => modal.remove(), 300);
  }

  modal.querySelector('#close-modal-btn').addEventListener('click', closeModal);
  modal.querySelector('#modal-confirm-btn').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
