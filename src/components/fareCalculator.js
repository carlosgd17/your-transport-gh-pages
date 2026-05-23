/**
 * YourTransport Trip Fare Calculator
 * Manages form state, validates dates/times, and displays simulated receipts.
 */
export function initFareCalculator() {
  const directionSelect = document.getElementById('calc-direction');
  const returnDetails = document.getElementById('return-details-container');
  const formCalculator = document.getElementById('form-fare-calculator');
  const resultsContainer = document.getElementById('calculator-results');

  if (!directionSelect || !returnDetails || !formCalculator || !resultsContainer) return;

  // Station Distances Matrix (in miles) to make calculations realistic
  const distances = {
    'central-north': 12, 'north-central': 12,
    'central-east': 18, 'east-central': 18,
    'central-south': 24, 'south-central': 24,
    'central-west': 29, 'west-central': 29,
    'north-east': 22, 'east-north': 22,
    'north-south': 36, 'south-north': 36,
    'north-west': 25, 'west-north': 25,
    'east-south': 16, 'south-east': 16,
    'east-west': 41, 'west-east': 41,
    'south-west': 32, 'west-south': 32,
  };

  // Helper to set default dates
  function setInitialDates() {
    const departDateInput = document.getElementById('calc-depart-date');
    const returnDateInput = document.getElementById('calc-return-date');
    const departTimeInput = document.getElementById('calc-depart-time');
    const returnTimeInput = document.getElementById('calc-return-time');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    if (departDateInput) departDateInput.value = tomorrow.toISOString().split('T')[0];
    if (returnDateInput) returnDateInput.value = dayAfter.toISOString().split('T')[0];

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    if (departTimeInput) departTimeInput.value = `${hours}:00`;
    if (returnTimeInput) returnTimeInput.value = `${hours}:00`;
  }

  setInitialDates();

  // 1. Listen to direction select change to hide/show return parameters
  directionSelect.addEventListener('change', () => {
    if (directionSelect.value === 'round-trip') {
      returnDetails.classList.remove('hidden');
      // Set required fields
      document.getElementById('calc-return-date').setAttribute('required', 'true');
      document.getElementById('calc-return-time').setAttribute('required', 'true');
    } else {
      returnDetails.classList.add('hidden');
      // Remove required validation
      document.getElementById('calc-return-date').removeAttribute('required');
      document.getElementById('calc-return-time').removeAttribute('required');
    }
  });

  // 2. Submission calculation handler
  formCalculator.addEventListener('submit', (e) => {
    e.preventDefault();

    const direction = directionSelect.value;
    const origin = document.getElementById('calc-origin').value;
    const destination = document.getElementById('calc-destination').value;
    const departDate = document.getElementById('calc-depart-date').value;
    const departTime = document.getElementById('calc-depart-time').value;
    const cabinClass = document.getElementById('calc-class').value;

    const returnDate = document.getElementById('calc-return-date').value;
    const returnTime = document.getElementById('calc-return-time').value;

    // A. Validation Checks
    if (origin === destination) {
      alert('Las estaciones de origen y destino no pueden ser las mismas. Por favor, selecciona ubicaciones distintas.');
      return;
    }

    const departDateTime = new Date(`${departDate}T${departTime}`);
    const now = new Date();
    
    if (departDateTime < now) {
      alert('La fecha y hora de salida no pueden estar en el pasado.');
      return;
    }

    if (direction === 'round-trip') {
      const returnDateTime = new Date(`${returnDate}T${returnTime}`);
      if (returnDateTime <= departDateTime) {
        alert('La fecha y hora de regreso deben ser posteriores a la fecha y hora de salida.');
        return;
      }
    }

    // B. Calculate Distance & Cost
    const routeKey = `${origin}-${destination}`;
    const distance = distances[routeKey] || 15; // default to 15 if not matching

    // Base fare: $2.00 flat + $0.35 per mile
    let baseRate = 2.00 + (distance * 0.35);

    // Cabin class multiplier
    let classLabel = 'Clase Turista';
    let classMultiplier = 1.0;
    if (cabinClass === 'premium') {
      classLabel = 'Clase Ejecutiva';
      classMultiplier = 1.5;
    } else if (cabinClass === 'first') {
      classLabel = 'Primera Clase';
      classMultiplier = 2.4;
    }

    // Peak hours checker (Peak hours are 07:00 - 09:00 and 16:00 - 19:00)
    function isPeakHour(timeStr) {
      const hour = parseInt(timeStr.split(':')[0], 10);
      return (hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 19);
    }

    let isPeak = isPeakHour(departTime);
    let peakSurcharge = 0;
    if (isPeak) {
      peakSurcharge = baseRate * 0.25; // 25% peak hour fee
    }

    // One Way Totals
    let singleLegFare = (baseRate * classMultiplier) + peakSurcharge;

    let subtotal = singleLegFare;
    let discount = 0;
    let grandTotal = singleLegFare;

    if (direction === 'round-trip') {
      // Calculate return leg (checking if return time is peak)
      let returnPeak = isPeakHour(returnTime);
      let returnPeakSurcharge = returnPeak ? (baseRate * 0.25) : 0;
      let returnLegFare = (baseRate * classMultiplier) + returnPeakSurcharge;

      subtotal = singleLegFare + returnLegFare;
      discount = subtotal * 0.15; // 15% discount for round trip tickets
      grandTotal = subtotal - discount;
    }

    // Trip duration estimation (assuming avg speed 45mph -> 1.33 min per mile)
    const tripDurationMin = Math.round(distance * 1.33);
    const hours = Math.floor(tripDurationMin / 60);
    const mins = tripDurationMin % 60;
    const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;

    // Carbon reduction stats (approx 0.35kg CO2 saved per mile compared to driving a standard car)
    const carbonSaved = (distance * 0.35 * (direction === 'round-trip' ? 2 : 1)).toFixed(1);

    // C. Render Premium Receipt Card
    renderReceipt({
      direction,
      originName: getStationName(origin),
      destName: getStationName(destination),
      departDate,
      departTime,
      returnDate: direction === 'round-trip' ? returnDate : null,
      returnTime: direction === 'round-trip' ? returnTime : null,
      durationStr,
      carbonSaved,
      classLabel,
      distance: distance * (direction === 'round-trip' ? 2 : 1),
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    });
  });

  function getStationName(code) {
    const names = {
      'central': 'Terminal Central',
      'north': 'Depósito Puerta Norte',
      'east': 'Estación Valle Este',
      'south': 'Puerto Bahía Sur',
      'west': 'Centro Tecnológico Costa Oeste'
    };
    return names[code] || code;
  }

  function renderReceipt(details) {
    resultsContainer.innerHTML = `
      <div class="glass-card floating" style="border-color: var(--accent-cyan); animation-duration: 6s; opacity: 0; transform: translateY(10px); transition: all 0.5s ease;">
        <h3 style="margin-bottom: 1.25rem; font-size: 1.35rem; display: flex; align-items: center; justify-content: space-between;">
          Factura Estimada del Viaje
          <span class="badge badge-cyan">${details.direction === 'round-trip' ? 'Ida y Vuelta' : 'Solo Ida'}</span>
        </h3>

        <!-- Ticket Route Detail -->
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; background: color-mix(in srgb, var(--theme-primary) 2%, transparent); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent-cyan); box-shadow: var(--glow-cyan);"></div>
            <span style="font-weight: 600; font-size: 0.95rem;">${details.originName}</span>
          </div>
          <div style="border-left: 2px dashed color-mix(in srgb, var(--theme-primary) 15%, transparent); height: 18px; margin-left: 4px;"></div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent-violet);"></div>
            <span style="font-weight: 600; font-size: 0.95rem;">${details.destName}</span>
          </div>
        </div>

        <!-- Dates and Times -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem;">
          <div>
            <span style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">SALIDA</span>
            <span style="font-weight: 500;">${details.departDate}</span>
            <span style="color: var(--accent-cyan); font-weight: 600;">@ ${details.departTime}</span>
          </div>
          ${details.returnDate ? `
            <div>
              <span style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">REGRESO</span>
              <span style="font-weight: 500;">${details.returnDate}</span>
              <span style="color: var(--accent-cyan); font-weight: 600;">@ ${details.returnTime}</span>
            </div>
          ` : `
            <div>
              <span style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">CLASE SELECCIONADA</span>
              <span style="font-weight: 600; color: var(--text-primary);">${details.classLabel}</span>
            </div>
          `}
        </div>

        <!-- Metrics Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; border-top: 1px solid var(--border-glass); padding-top: 1.25rem;">
          <div style="background: color-mix(in srgb, var(--theme-primary) 2%, transparent); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 0.75rem; text-align: center;">
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">TIEMPO DE VIAJE</span>
            <span style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary);">${details.durationStr}</span>
          </div>
          <div style="background: rgba(16, 185, 129, 0.03); border: 1px solid rgba(16, 185, 129, 0.1); border-radius: var(--radius-sm); padding: 0.75rem; text-align: center;">
            <span style="font-size: 0.75rem; color: var(--accent-emerald); display: block;">CO2 AHORRADO</span>
            <span style="font-weight: 700; font-size: 1.1rem; color: var(--accent-emerald);">${details.carbonSaved} kg</span>
          </div>
        </div>

        <!-- Price Breakdown -->
        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; margin-bottom: 1.5rem; border-top: 1px solid var(--border-glass); padding-top: 1rem;">
          <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
            <span>Subtotal (${details.distance} millas)</span>
            <span>$${details.subtotal}</span>
          </div>
          ${parseFloat(details.discount) > 0 ? `
            <div style="display: flex; justify-content: space-between; color: var(--accent-emerald); font-weight: 500;">
              <span>Descuento por Ida y Vuelta (15%)</span>
              <span>-$${details.discount}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.8rem;">
            <span>Clase de Embarque</span>
            <span>${details.classLabel}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 1.35rem; color: var(--text-primary); border-top: 1px solid var(--border-glass); padding-top: 0.75rem; margin-top: 0.5rem;">
            <span>Tarifa Estimada</span>
            <span style="color: var(--accent-cyan); text-shadow: 0 0 10px color-mix(in srgb, var(--theme-primary) 25%, transparent);">$${details.grandTotal}</span>
          </div>
        </div>

        <button class="btn btn-primary" style="width: 100%;" id="btn-calculator-book">
          Reservar Boleto con esta Tarifa
        </button>
      </div>
    `;

    // Trigger transition
    setTimeout(() => {
      const card = resultsContainer.querySelector('.glass-card');
      if (card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }, 50);

    // Hook book button inside the output card
    const bookBtn = document.getElementById('btn-calculator-book');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        alert(`Confirmación de reserva iniciada por un total de: $${details.grandTotal}. Tu boleto de embarque será enviado por correo electrónico.`);
      });
    }
  }
}
