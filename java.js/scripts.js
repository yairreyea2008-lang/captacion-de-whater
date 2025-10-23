// ===========================
// MENU HAMBURGUESA
// ===========================
const hamburguesa = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');
hamburguesa.addEventListener('click', () => {
  menu.classList.toggle('mostrar');
});

// ===========================
// MAPA INTERACTIVO
// ===========================
const mapa = L.map('mapa-interactivo').setView([19.286, -99.735], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(mapa);
const icono = L.divIcon({ html: '💧', className: 'icono-agua', iconSize: [25,25] });
const zonas = [
  { nombre: "San Cristóbal Tecolitl", coords: [19.278, -99.715] },
  { nombre: "Barrio El Calvario", coords: [19.285, -99.735] },
  { nombre: "Cabecera Municipal", coords: [19.285, -99.740] },
];
zonas.forEach(z => L.marker(z.coords, { icon: icono }).addTo(mapa).bindPopup(`<b>${z.nombre}</b><br>Escasez de agua 💧`));

// ===========================
// BOTÓN SUBIR
// ===========================
window.onscroll = () => {
  const btn = document.getElementById("btnSubir");
  btn.style.display = (window.scrollY > 200) ? "block" : "none";
};
document.getElementById("btnSubir").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// ===========================
// CALCULADORA ROI
// ===========================
const costo = document.getElementById('costo');
const ahorro = document.getElementById('ahorro');
const btnCalcular = document.getElementById('btnCalcular');
const resultado = document.getElementById('resultado');
const estado = document.getElementById('estado');

btnCalcular.addEventListener('click', () => {
  const costoVal = parseFloat(costo.value);
  const ahorroVal = parseFloat(ahorro.value);

  if (costoVal <= 0 || ahorroVal <= 0 || isNaN(costoVal) || isNaN(ahorroVal)) {
    resultado.textContent = "⚠️ Ingresa valores válidos.";
    return;
  }

  estado.innerHTML = '<div class="spinner"></div><p>Calculando...</p>';
  estado.classList.add('mostrando');
  resultado.textContent = "";
  btnCalcular.disabled = true;

  setTimeout(() => {
    const roi = (costoVal / ahorroVal).toFixed(1);
    resultado.innerHTML = `💧 Recuperarás tu inversión en <strong>${roi}</strong> meses.`;
    estado.classList.remove('mostrando');
    btnCalcular.disabled = false;

    const datos = { roi, costo: costoVal, ahorro: ahorroVal };
    localStorage.setItem('resultadoAgua2025', JSON.stringify(datos));
  }, 1500);
});

// ===========================
// MODAL DE EQUIVALENCIAS
// ===========================
const modal = document.getElementById('modal');
const cerrarModal = document.getElementById('cerrarModal');
document.getElementById('btnVerMas').addEventListener('click', () => {
  const guardado = JSON.parse(localStorage.getItem('resultadoAgua2025'));
  if (!guardado) return alert("Calcula primero tu ROI.");
  const litros = guardado.ahorro * 30; // ejemplo de litros ahorrados por mes
  const tinacos = Math.floor(litros / 1100);
  const duchas = Math.floor(litros / 60);
  const lavadoras = Math.floor(litros / 50);
  document.getElementById('equivalencias').innerHTML = `
    <p>💧 ${litros} litros mensuales equivale a:</p>
    <p>🛢️ ${tinacos} tinacos llenos</p>
    <p>🚿 ${duchas} duchas</p>
    <p>🧺 ${lavadoras} lavadoras</p>
  `;
  modal.style.display = "flex";
});
cerrarModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// ===========================
// CARGAR RESULTADO GUARDADO
// ===========================
window.addEventListener("load", () => {
  const guardado = localStorage.getItem('resultadoAgua2025');
  if (guardado) {
    const data = JSON.parse(guardado);
    resultado.innerHTML = `💧 Recuperarás tu inversión en <strong>${data.roi}</strong> meses.`;
  }
});
