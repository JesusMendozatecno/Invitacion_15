/* ============================================================
   INVITACIÓN DIGITAL · JAVASCRIPT
   ------------------------------------------------------------
   ★ PERSONALIZA AQUÍ (único lugar para editar los datos) ★
   ============================================================ */

const INVITACION = {
  /* ---- Datos principales ---- */
  nombreHomenajeada: "Isabella Romero",          // PENDIENTE: nombre real de la homenajeada
  evento: "MIS QUINCE AÑOS",               // PENDIENTE: tipo de evento
  portadaSaludo: "Estás invitado a celebrar",

  /* ---- Fecha y hora ---- */
  // PENDIENTE: confirmar el AÑO del evento. Hoy es 12/09/2026.
  fechaEvento: "2026-10-03T19:00:00",      // formato ISO local: AAAA-MM-DDTHH:MM:SS
  fechaTexto: "3 de Octubre del 2026",     // texto amigable que se muestra
  fechaCorta: "03 de Octubre del 2026",    // texto corto de la portada (con año)
  hora: "7:00 PM",
  notaReserva: "¡Aparta la fecha y ven a la fiesta!",

  /* ---- Anfitriones y concepto ---- */
  padre1: "Karen Romero",
  padre2: "Adrián Guerra",
  concepto: "Con la bendición de mis padres y el cariño de toda la familia, los invito con una enorme alegría a celebrar este día tan especial. Su presencia es el mejor regalo que puedo recibir.",

  /* ---- Lugar ---- */
  // PENDIENTE: confirmar con la abuela los datos. La dirección real se compartirá después.
  lugar: "Club del Señor Nivaldo",
  direccion: "Guasonic · dirección por confirmar",
  maps: "PENDIENTE",                       // PENDIENTE: pegar URL real de Google Maps
  notaLugar: "Preguntándole a la abuela la dirección exacta... en cuanto la confirme les aviso el pin de la ubicación. ¡Los espero!",

  /* ---- Vestimenta ---- */
  vestimenta: "Semi Formal",
  vestimentaDesc: "Quiero compartir contigo una noche elegante y memorable. Llega con tu mejor look semi formal, la comodidad para bailar y la mejor actitud.",
  recomendaciones: [
    "Vestidos o trajes elegantes",
    "Tonos suaves y sobrios",
    "Cómodo para bailar"
  ],
  // Muestra una sugerencia de colores (opcional); borra el arreglo para ocultarla
  colores: ["#C39A5B", "#8C6B4A", "#A65845", "#6B7A54", "#EADCC2"],

  /* ---- Sobres y regalos ---- */
  sobreTitulo: "Sobres y regalos",
  sobreTexto: "El mejor regalo será compartir este día contigo.",
  sobreNota: "Si prefieres enviar un detalle, tendremos un buzón de regalos disponible durante la celebración. ¡Tendrás un sobre con tu nombre!",

  /* ---- Despedida ---- */
  despedida: "Los esperamos!!!",
  mensajeFinal: "Gracias por acompañarme en uno de los días más importantes de mi vida. Los espero con el corazón lleno de alegría, abrazos y mucha pista para bailar.",
  gracias: "¡Gracias por acompañarnos!",
  countSub: "para el gran día",

  /* ---- Recursos ---- */
  musica: "assets/music/cancion.mp3"       // PENDIENTE: colocar el archivo de música
};

/* ============================================================
   CONSTANTES AUXILIARES
   ============================================================ */

const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const DIAS_MIN = ["L", "M", "M", "J", "V", "S", "D"];
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ============================================================
   RELLENO DE TEXTOS (desde INVITACION)
   ============================================================ */

function rellenarCampos() {
  const textos = {
    portadaSaludo: INVITACION.portadaSaludo,
    nombreHomenajeada: INVITACION.nombreHomenajeada,
    portadaEvento: INVITACION.evento,
    hora: INVITACION.hora,
    fechaTexto: INVITACION.fechaTexto,
    fechaCorta: DIAS[new Date(INVITACION.fechaEvento).getDay()] + " " + INVITACION.fechaCorta,
    notaReserva: INVITACION.notaReserva,
    padre1: INVITACION.padre1,
    padre2: INVITACION.padre2,
    concepto: INVITACION.concepto,
    lugar: INVITACION.lugar,
    direccion: INVITACION.direccion,
    notaLugar: INVITACION.notaLugar,
    vestimenta: INVITACION.vestimenta,
    vestimentaDesc: INVITACION.vestimentaDesc,
    sobreTitulo: INVITACION.sobreTitulo,
    sobreTexto: INVITACION.sobreTexto,
    sobreNota: INVITACION.sobreNota,
    despedida: INVITACION.despedida,
    mensajeFinal: INVITACION.mensajeFinal,
    gracias: INVITACION.gracias,
    countSub: INVITACION.countSub
  };

  $$("[data-campo]").forEach((el) => {
    const clave = el.dataset.campo;
    if (textos[clave] !== undefined) el.textContent = textos[clave];
  });

  // Recomendaciones de vestimenta
  const recU = $("#recomendaciones");
  INVITACION.recomendaciones.forEach((rec) => {
    const li = document.createElement("li");
    li.textContent = rec;
    recU.appendChild(li);
  });

  // Paleta de colores sugeridos
  if (Array.isArray(INVITACION.colores) && INVITACION.colores.length) {
    const paleta = $("#paleta");
    INVITACION.colores.forEach((color) => {
      const c = document.createElement("i");
      c.setAttribute("style", "background:" + color);
      paleta.appendChild(c);
    });
  }

  document.title = INVITACION.evento + " · " + INVITACION.nombreHomenajeada;
}

/* ============================================================
   CUENTA REGRESIVA
   ============================================================ */

function pad(n) {
  return String(n).padStart(2, "0");
}

function actualizarCuenta() {
  const hoy = new Date();
  const evento = new Date(INVITACION.fechaEvento);
  const diff = evento - hoy;

  const contenedor = $("#countdown");
  const final = $("#cdFinal");

  if (diff <= 0) {
    contenedor.hidden = true;
    final.hidden = false;
    return;
  }

  const seg = Math.floor(diff / 1000);
  const dias = Math.floor(seg / 86400);
  const horas = Math.floor((seg % 86400) / 3600);
  const min = Math.floor((seg % 3600) / 60);
  const s = seg % 60;

  $("#cdDias").textContent = pad(dias);
  $("#cdHoras").textContent = pad(horas);
  $("#cdMin").textContent = pad(min);
  $("#cdSeg").textContent = pad(s);
}

/* ============================================================
   CALENDARIO
   ============================================================ */

function construirCalendario() {
  const fecha = new Date(INVITACION.fechaEvento);
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth();
  const diaEvento = fecha.getDate();

  const primeros = new Date(anio, mes, 1);
  const offset = (primeros.getDay() + 6) % 7; // la semana inicia en lunes
  const diasDelMes = new Date(anio, mes + 1, 0).getDate();

  const caja = $("#calendario");

  const cabecera = document.createElement("p");
  cabecera.className = "cal-mes";
  cabecera.textContent = MESES[mes] + " " + anio;

  const filaSemana = document.createElement("div");
  filaSemana.className = "cal-semana";
  DIAS_MIN.forEach((d) => {
    const s = document.createElement("span");
    s.textContent = d;
    filaSemana.appendChild(s);
  });

  const grilla = document.createElement("div");
  grilla.className = "cal-dias";

  for (let i = 0; i < offset; i++) {
    const v = document.createElement("span");
    v.className = "d-vacio";
    grilla.appendChild(v);
  }

  for (let d = 1; d <= diasDelMes; d++) {
    const celda = document.createElement("button");
    celda.type = "button";
    celda.textContent = d;
    if (d === diaEvento) {
      celda.classList.add("d-evento");
      celda.setAttribute("aria-label", "Día del evento: " + d + " de " + MESES[mes]);
    }
    grilla.appendChild(celda);
  }

  caja.append(cabecera, filaSemana, grilla);
}

/* ============================================================
   MOSTRAR SECCIONES AL HACER SCROLL
   ============================================================ */

function iniciarReveal() {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  $$(".reveal").forEach((el) => observador.observe(el));
}

/* ============================================================
   MÚSICA
   ============================================================ */

const Musica = (() => {
  let audio = null;
  let disponible = true;
  let reproduciendo = false;

  const btn = $("#musicaBtn");

  function crear() {
    if (audio || !INVITACION.musica) return;
    audio = new Audio(INVITACION.musica);
    audio.loop = true;
    audio.preload = "auto";
    audio.addEventListener("error", () => {
      disponible = false;
      reproducir(false);
    });
  }

  function reproducir(valor) {
    if (!audio || !disponible) {
      mostrarToast("La música estará disponible muy pronto.");
      return;
    }
    if (valor) {
      audio.play().catch(() => disponer(false));
    } else {
      audio.pause();
    }
    disponer(valor);
  }

  function disponer(valor) {
    reproduciendo = valor;
    btn.classList.toggle("reproduciendo", valor);
    btn.setAttribute("aria-pressed", String(valor));
    btn.setAttribute("aria-label", valor ? "Pausar música" : "Reproducir música");
  }

  function alternar() {
    if (!audio) {
      crear();
    }
    if (!disponible) {
      mostrarToast("Agrega el archivo de música en assets/music/ para escucharla.");
      return;
    }
    reproducir(!reproduciendo);
  }

  btn.addEventListener("click", alternar);
  // Permitir iniciar con el teclado
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      alternar();
    }
  });

  return { crear, reproducir, alternar };
})();

/* ============================================================
   BOTÓN DE UBICACIÓN
   ============================================================ */

function iniciarUbicacion() {
  $("#botonUbicacion").addEventListener("click", () => {
    if (!INVITACION.maps || !/^https?:\/\//i.test(INVITACION.maps)) {
      mostrarToast("La ubicación exacta se compartirá próximamente.");
      return;
    }
    window.open(INVITACION.maps, "_blank", "noopener,noreferrer");
  });
}

/* ============================================================
   TOAST (aviso no emergente)
   ============================================================ */

let toastTimer = null;
function mostrarToast(mensaje) {
  const toast = $("#toast");
  toast.textContent = mensaje;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("mostrar"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("mostrar");
    setTimeout(() => { toast.hidden = true; }, 400);
  }, 3200);
}

/* ============================================================
   FLOTANTE DE MÚSICA (aparece al hacer scroll)
   ============================================================ */

function iniciarFlotante() {
  const btn = $("#musicaBtn");
  const cover = $("#portada");

  function calcular() {
    btn.classList.toggle("visible", window.scrollY > cover.offsetHeight * 0.55);
  }

  window.addEventListener("scroll", calcular, { passive: true });
  calcular();
}

/* ============================================================
   SOBRE DE APERTURA
   ============================================================ */

function abrirSobre() {
  const apertura = $("#sobreApertura");
  if (!apertura || apertura.classList.contains("abierto")) return;
  apertura.classList.add("abierto");
  Musica.alternar();
  setTimeout(() => {
    apertura.classList.add("oculto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 900);
}

function iniciarSobre() {
  const apertura = $("#sobreApertura");
  if (!apertura) return;
  apertura.addEventListener("click", abrirSobre);
  apertura.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirSobre();
    }
  });
}

/* ============================================================
   BOTÓN DE PORTADA
   ============================================================ */

function iniciarPortada() {
  $("#botonAbrir").addEventListener("click", () => {
    $("#faltan").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ============================================================
   INICIO
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  rellenarCampos();
  actualizarCuenta();
  setInterval(actualizarCuenta, 1000);
  construirCalendario();
  iniciarReveal();
  iniciarUbicacion();
  iniciarFlotante();
  iniciarSobre();
  iniciarPortada();
  Musica.crear();
});