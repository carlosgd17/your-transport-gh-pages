(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){let e=document.getElementById(`tab-book`),r=document.getElementById(`tab-route`),i=document.getElementById(`form-booking`),a=document.getElementById(`form-route`);if(!e||!r||!i||!a)return;let o=document.getElementById(`booking-date`);if(o){let e=new Date;e.setDate(e.getDate()+1),o.value=e.toISOString().split(`T`)[0]}let s=document.getElementById(`booking-time`);if(s){let e=new Date;s.value=`${String(e.getHours()).padStart(2,`0`)}:${String(e.getMinutes()).padStart(2,`0`)}`}e.addEventListener(`click`,t=>{t.preventDefault(),e.classList.add(`active`),r.classList.remove(`active`),i.classList.remove(`hidden`),a.classList.add(`hidden`)}),r.addEventListener(`click`,t=>{t.preventDefault(),r.classList.add(`active`),e.classList.remove(`active`),a.classList.remove(`hidden`),i.classList.add(`hidden`)}),i.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`booking-transit`).value,r=document.getElementById(`booking-origin`).value,i=document.getElementById(`booking-destination`).value,a=document.getElementById(`booking-date`).value,o=document.getElementById(`booking-time`).value,s=`Lanzadera de Microtránsito`,c=2.5;n===`bus`?(s=`Autobús Expreso Interurbano`,c=3.75):n===`train`&&(s=`Metro Hyper-Rail`,c=5.5);let l=`$${c.toFixed(2)}`;t({ticketId:`YT-${Math.floor(1e5+Math.random()*9e5)}`,transitName:s,origin:r,dest:i,date:a,time:o,fare:l})}),a.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`route-origin`).value,r=document.getElementById(`route-destination`).value,i=document.getElementById(`route-preference`).value;n(t,r,i)})}function t(e){let t=document.createElement(`div`);t.style.position=`fixed`,t.style.top=`0`,t.style.left=`0`,t.style.width=`100vw`,t.style.height=`100vh`,t.style.backgroundColor=`rgba(4, 7, 14, 0.85)`,t.style.backdropFilter=`blur(12px)`,t.style.webkitBackdropFilter=`blur(12px)`,t.style.display=`flex`,t.style.justifyContent=`center`,t.style.alignItems=`center`,t.style.zIndex=`1000`,t.style.opacity=`0`,t.style.transition=`opacity 0.3s ease`,t.innerHTML=`
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
          <span style="font-family: var(--font-heading); font-weight: 700; color: var(--accent-cyan); font-size: 0.9rem;">${e.ticketId}</span>
        </div>
        
        <div style="margin-bottom: 0.5rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">SERVICIO DE TRÁNSITO</span>
          <span style="font-weight: 600; font-size: 0.95rem;">${e.transitName}</span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.5rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">DESDE</span>
            <span style="font-weight: 500; font-size: 0.9rem;">${e.origin}</span>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">HACIA</span>
            <span style="font-weight: 500; font-size: 0.9rem;">${e.dest}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 0.75rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">FECHA Y HORA</span>
            <span style="font-weight: 500; font-size: 0.85rem;">${e.date} a las ${e.time}</span>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">TARIFA DE ABORDAJE</span>
            <span style="font-weight: 700; font-size: 1.05rem; color: var(--accent-emerald);">${e.fare}</span>
          </div>
        </div>
      </div>

      <button id="modal-confirm-btn" class="btn btn-primary" style="width: 100%;">Agregar a Wallet y Salir</button>
    </div>
  `,document.body.appendChild(t),setTimeout(()=>{t.style.opacity=`1`,t.querySelector(`.glass-card`).style.transform=`scale(1)`},10);function n(){t.style.opacity=`0`,t.querySelector(`.glass-card`).style.transform=`scale(0.9)`,setTimeout(()=>t.remove(),300)}t.querySelector(`#close-modal-btn`).addEventListener(`click`,n),t.querySelector(`#modal-confirm-btn`).addEventListener(`click`,n),t.addEventListener(`click`,e=>{e.target===t&&n()})}function n(e,t,n){let r=document.createElement(`div`);r.style.position=`fixed`,r.style.top=`0`,r.style.left=`0`,r.style.width=`100vw`,r.style.height=`100vh`,r.style.backgroundColor=`rgba(4, 7, 14, 0.85)`,r.style.backdropFilter=`blur(12px)`,r.style.webkitBackdropFilter=`blur(12px)`,r.style.display=`flex`,r.style.justifyContent=`center`,r.style.alignItems=`center`,r.style.zIndex=`1000`,r.style.opacity=`0`,r.style.transition=`opacity 0.3s ease`;let i=``;i=n===`fastest`?`
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
    `:n===`cheapest`?`
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
    `:`
      <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1rem; position: relative;">
        <span class="badge badge-cyan" style="background: rgba(139, 92, 246, 0.1); color: var(--accent-violet); border-color: rgba(139, 92, 246, 0.2); position: absolute; top: 0.75rem; right: 0.75rem;">Eco-Opción</span>
        <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">Lanzadera Eléctrica Loop</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Cero emisiones, flota 100% alimentada con energía solar.</p>
        <span style="font-weight: 700; color: var(--accent-violet);">$2.50</span>
      </div>
    `,r.innerHTML=`
    <div class="glass-card" style="width: 90%; max-width: 450px; text-align: left; position: relative; transform: scale(0.9); transition: transform 0.3s ease;">
      <button id="close-modal-btn" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer;">&times;</button>
      
      <h3 style="margin-bottom: 0.5rem; font-size: 1.35rem; font-family: var(--font-heading);">Rutas Optimizadas</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Opciones sugeridas desde <strong>${e}</strong> hasta <strong>${t}</strong>.</p>
      
      <div style="margin-bottom: 1.5rem;">
        ${i}
      </div>

      <button id="modal-confirm-btn" class="btn btn-primary" style="width: 100%;">Seleccionar Opción de Ruta</button>
    </div>
  `,document.body.appendChild(r),setTimeout(()=>{r.style.opacity=`1`,r.querySelector(`.glass-card`).style.transform=`scale(1)`},10);function a(){r.style.opacity=`0`,r.querySelector(`.glass-card`).style.transform=`scale(0.9)`,setTimeout(()=>r.remove(),300)}r.querySelector(`#close-modal-btn`).addEventListener(`click`,a),r.querySelector(`#modal-confirm-btn`).addEventListener(`click`,a),r.addEventListener(`click`,e=>{e.target===r&&a()})}function r(){let e=document.getElementById(`calc-direction`),t=document.getElementById(`return-details-container`),n=document.getElementById(`form-fare-calculator`),r=document.getElementById(`calculator-results`);if(!e||!t||!n||!r)return;let i={"central-north":12,"north-central":12,"central-east":18,"east-central":18,"central-south":24,"south-central":24,"central-west":29,"west-central":29,"north-east":22,"east-north":22,"north-south":36,"south-north":36,"north-west":25,"west-north":25,"east-south":16,"south-east":16,"east-west":41,"west-east":41,"south-west":32,"west-south":32};function a(){let e=document.getElementById(`calc-depart-date`),t=document.getElementById(`calc-return-date`),n=document.getElementById(`calc-depart-time`),r=document.getElementById(`calc-return-time`),i=new Date;i.setDate(i.getDate()+1);let a=new Date;a.setDate(a.getDate()+2),e&&(e.value=i.toISOString().split(`T`)[0]),t&&(t.value=a.toISOString().split(`T`)[0]);let o=new Date,s=String(o.getHours()).padStart(2,`0`);String(o.getMinutes()).padStart(2,`0`),n&&(n.value=`${s}:00`),r&&(r.value=`${s}:00`)}a(),e.addEventListener(`change`,()=>{e.value===`round-trip`?(t.classList.remove(`hidden`),document.getElementById(`calc-return-date`).setAttribute(`required`,`true`),document.getElementById(`calc-return-time`).setAttribute(`required`,`true`)):(t.classList.add(`hidden`),document.getElementById(`calc-return-date`).removeAttribute(`required`),document.getElementById(`calc-return-time`).removeAttribute(`required`))}),n.addEventListener(`submit`,t=>{t.preventDefault();let n=e.value,r=document.getElementById(`calc-origin`).value,a=document.getElementById(`calc-destination`).value,c=document.getElementById(`calc-depart-date`).value,l=document.getElementById(`calc-depart-time`).value,u=document.getElementById(`calc-class`).value,d=document.getElementById(`calc-return-date`).value,f=document.getElementById(`calc-return-time`).value;if(r===a){alert(`Las estaciones de origen y destino no pueden ser las mismas. Por favor, selecciona ubicaciones distintas.`);return}let p=new Date(`${c}T${l}`);if(p<new Date){alert(`La fecha y hora de salida no pueden estar en el pasado.`);return}if(n===`round-trip`&&new Date(`${d}T${f}`)<=p){alert(`La fecha y hora de regreso deben ser posteriores a la fecha y hora de salida.`);return}let m=i[`${r}-${a}`]||15,h=2+m*.35,g=`Clase Turista`,_=1;u===`premium`?(g=`Clase Ejecutiva`,_=1.5):u===`first`&&(g=`Primera Clase`,_=2.4);function v(e){let t=parseInt(e.split(`:`)[0],10);return t>=7&&t<=9||t>=16&&t<=19}let y=v(l),b=0;y&&(b=h*.25);let x=h*_+b,S=x,C=0,w=x;if(n===`round-trip`){let e=v(f)?h*.25:0;S=x+(h*_+e),C=S*.15,w=S-C}let T=Math.round(m*1.33),E=Math.floor(T/60),D=T%60,O=E>0?`${E}h ${D}m`:`${D} min`,k=(m*.35*(n===`round-trip`?2:1)).toFixed(1);s({direction:n,originName:o(r),destName:o(a),departDate:c,departTime:l,returnDate:n===`round-trip`?d:null,returnTime:n===`round-trip`?f:null,durationStr:O,carbonSaved:k,classLabel:g,distance:m*(n===`round-trip`?2:1),subtotal:S.toFixed(2),discount:C.toFixed(2),grandTotal:w.toFixed(2)})});function o(e){return{central:`Terminal Central`,north:`Depósito Puerta Norte`,east:`Estación Valle Este`,south:`Puerto Bahía Sur`,west:`Centro Tecnológico Costa Oeste`}[e]||e}function s(e){r.innerHTML=`
      <div class="glass-card floating" style="border-color: var(--accent-cyan); animation-duration: 6s; opacity: 0; transform: translateY(10px); transition: all 0.5s ease;">
        <h3 style="margin-bottom: 1.25rem; font-size: 1.35rem; display: flex; align-items: center; justify-content: space-between;">
          Factura Estimada del Viaje
          <span class="badge badge-cyan">${e.direction===`round-trip`?`Ida y Vuelta`:`Solo Ida`}</span>
        </h3>

        <!-- Ticket Route Detail -->
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; background: rgba(255, 255, 255, 0.02); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent-cyan); box-shadow: var(--glow-cyan);"></div>
            <span style="font-weight: 600; font-size: 0.95rem;">${e.originName}</span>
          </div>
          <div style="border-left: 2px dashed rgba(255,255,255,0.15); height: 18px; margin-left: 4px;"></div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent-violet);"></div>
            <span style="font-weight: 600; font-size: 0.95rem;">${e.destName}</span>
          </div>
        </div>

        <!-- Dates and Times -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem;">
          <div>
            <span style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">SALIDA</span>
            <span style="font-weight: 500;">${e.departDate}</span>
            <span style="color: var(--accent-cyan); font-weight: 600;">@ ${e.departTime}</span>
          </div>
          ${e.returnDate?`
            <div>
              <span style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">REGRESO</span>
              <span style="font-weight: 500;">${e.returnDate}</span>
              <span style="color: var(--accent-cyan); font-weight: 600;">@ ${e.returnTime}</span>
            </div>
          `:`
            <div>
              <span style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">CLASE SELECCIONADA</span>
              <span style="font-weight: 600; color: var(--text-primary);">${e.classLabel}</span>
            </div>
          `}
        </div>

        <!-- Metrics Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 1.25rem;">
          <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 0.75rem; text-align: center;">
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">TIEMPO DE VIAJE</span>
            <span style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary);">${e.durationStr}</span>
          </div>
          <div style="background: rgba(16, 185, 129, 0.03); border: 1px solid rgba(16, 185, 129, 0.1); border-radius: var(--radius-sm); padding: 0.75rem; text-align: center;">
            <span style="font-size: 0.75rem; color: var(--accent-emerald); display: block;">CO2 AHORRADO</span>
            <span style="font-weight: 700; font-size: 1.1rem; color: var(--accent-emerald);">${e.carbonSaved} kg</span>
          </div>
        </div>

        <!-- Price Breakdown -->
        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; margin-bottom: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 1rem;">
          <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
            <span>Subtotal (${e.distance} millas)</span>
            <span>$${e.subtotal}</span>
          </div>
          ${parseFloat(e.discount)>0?`
            <div style="display: flex; justify-content: space-between; color: var(--accent-emerald); font-weight: 500;">
              <span>Descuento por Ida y Vuelta (15%)</span>
              <span>-$${e.discount}</span>
            </div>
          `:``}
          <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.8rem;">
            <span>Clase de Embarque</span>
            <span>${e.classLabel}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 1.35rem; color: var(--text-primary); border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 0.75rem; margin-top: 0.5rem;">
            <span>Tarifa Estimada</span>
            <span style="color: var(--accent-cyan); text-shadow: 0 0 10px rgba(0,242,254,0.25);">$${e.grandTotal}</span>
          </div>
        </div>

        <button class="btn btn-primary" style="width: 100%;" id="btn-calculator-book">
          Reservar Boleto con esta Tarifa
        </button>
      </div>
    `,setTimeout(()=>{let e=r.querySelector(`.glass-card`);e&&(e.style.opacity=`1`,e.style.transform=`translateY(0)`)},50);let t=document.getElementById(`btn-calculator-book`);t&&t.addEventListener(`click`,()=>{alert(`Confirmación de reserva iniciada por un total de: $${e.grandTotal}. Tu boleto de embarque será enviado por correo electrónico.`)})}}document.addEventListener(`DOMContentLoaded`,()=>{e(),r();let t=document.getElementById(`main-header`);t&&window.addEventListener(`scroll`,()=>{window.scrollY>50?t.classList.add(`scrolled`):t.classList.remove(`scrolled`)});let n=document.querySelectorAll(`section, footer`),i=document.querySelectorAll(`.nav-links a`);window.addEventListener(`scroll`,()=>{let e=``,t=window.scrollY+120;n.forEach(n=>{let r=n.offsetTop,i=n.offsetHeight;t>=r&&t<r+i&&(e=n.getAttribute(`id`))}),i.forEach(t=>{t.classList.remove(`active`);let n=t.getAttribute(`href`);n&&(n===`#${e}`||n===`#`&&e===`home`)&&t.classList.add(`active`)})});let a=document.getElementById(`btn-login`);a&&a.addEventListener(`click`,e=>{e.preventDefault(),alert(`Se ha solicitado una conexión segura al Portal de Clientes. Los autenticadores están inicializados en el entorno de desarrollo (Sandbox).`)})});