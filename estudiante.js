document.addEventListener("DOMContentLoaded", function () {
  // Control de acceso: solo estudiantes pueden entrar a esta vista.
  const sesion = Store.requerirRol("estudiante");
  if (!sesion) return;

  // Inicializa datos visibles del usuario en la barra superior.
  const datos = Store.cargarDatos();
  document.getElementById("topbar-user").textContent =
    sesion.nombre + " · " + sesion.correo;

  // Cierre de sesión.
  document.getElementById("btn-logout").addEventListener("click", function (e) {
    e.preventDefault();
    Store.cerrarSesion();
    window.location.href = "index.html";
  });

  // Manejo visual de estado activo en el menú lateral.
  document.querySelectorAll(".nav-menu__link[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      document.querySelectorAll(".nav-menu__link").forEach(function (l) {
        l.classList.remove("nav-menu__link--active");
      });
      link.classList.add("nav-menu__link--active");
    });
  });

  // Render general del panel de estudiante.
  function render() {
    const d = Store.cargarDatos();
    const activos = Store.prestamosActivosEstudiante(d, sesion.id);
    const historial = d.prestamos
      .filter((p) => p.estudianteId === sesion.id)
      .sort((a, b) => new Date(b.fechaPrestamo) - new Date(a.fechaPrestamo));
    const equiposDisp = d.equipos.filter((e) => e.estado === "disponible");

    // Sección 1: tarjetas/resumen rápido.
    document.getElementById("stat-disponibles").textContent = equiposDisp.length;
    document.getElementById("stat-activos").textContent = activos.length;
    document.getElementById("stat-historial").textContent = historial.length;

    // Sección 2: catálogo de equipos disponibles para solicitar.
    const gridEquipos = document.getElementById("grid-equipos");
    if (equiposDisp.length === 0) {
      gridEquipos.innerHTML =
        '<p class="text-muted">No hay equipos disponibles en este momento.</p>';
    } else {
      gridEquipos.innerHTML = equiposDisp
        .map(function (eq) {
          return (
            '<article class="equipo-card" data-id="' +
            eq.id +
            '">' +
            '<span class="tipo">' +
            eq.tipo +
            "</span>" +
            "<h4>" +
            eq.nombre +
            "</h4>" +
            "<p>" +
            (eq.descripcion || "") +
            "</p>" +
            UI.badgeEstado("disponible") +
            '<div style="margin-top:1rem;">' +
            '<button type="button" class="btn btn--primary btn--sm btn-solicitar" data-id="' +
            eq.id +
            '">Solicitar préstamo</button>' +
            "</div></article>"
          );
        })
        .join("");
    }

    // Sección 3: tabla de préstamos activos del estudiante.
    const tbodyActivos = document.getElementById("tbody-activos");
    if (activos.length === 0) {
      tbodyActivos.innerHTML =
        '<tr><td colspan="4" class="text-muted">No tiene préstamos activos.</td></tr>';
    } else {
      tbodyActivos.innerHTML = activos
        .map(function (p) {
          const eq = Store.obtenerEquipo(d, p.equipoId);
          return (
            "<tr><td>" +
            (eq ? eq.nombre + " (" + eq.tipo + ")" : p.equipoId) +
            "</td><td>" +
            Store.formatearFecha(p.fechaPrestamo) +
            "</td><td>" +
            Store.formatearFecha(p.fechaLimite) +
            "</td><td>" +
            UI.badgeEstado("activo") +
            "</td></tr>"
          );
        })
        .join("");
    }

    // Sección 4: historial completo del estudiante.
    const tbodyHistorial = document.getElementById("tbody-historial");
    if (historial.length === 0) {
      tbodyHistorial.innerHTML =
        '<tr><td colspan="4" class="text-muted">Sin historial de préstamos.</td></tr>';
    } else {
      tbodyHistorial.innerHTML = historial
        .map(function (p) {
          const eq = Store.obtenerEquipo(d, p.equipoId);
          const estado = p.estado === "activo" ? "activo" : "devuelto";
          return (
            "<tr><td>" +
            (eq ? eq.nombre : p.equipoId) +
            "</td><td>" +
            Store.formatearFechaCorta(p.fechaPrestamo) +
            "</td><td>" +
            (p.fechaDevolucion
              ? Store.formatearFechaCorta(p.fechaDevolucion)
              : "—") +
            "</td><td>" +
            UI.badgeEstado(estado) +
            "</td></tr>"
          );
        })
        .join("");
    }

    // Sección 5: selector del formulario de solicitud.
    const selectEquipo = document.getElementById("equipo");
    selectEquipo.innerHTML = equiposDisp.length
      ? equiposDisp
          .map(function (eq) {
            return (
              '<option value="' + eq.id + '">' + eq.nombre + " (" + eq.tipo + ")</option>"
            );
          })
          .join("")
      : '<option value="">— Sin equipos disponibles —</option>';

    document.getElementById("btn-confirmar-prestamo").disabled = equiposDisp.length === 0;
    // Atajos desde tarjetas para preseleccionar equipo en formulario.
    document.querySelectorAll(".btn-solicitar").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-id");
        selectEquipo.value = id;
        document.getElementById("devolucion").focus();
        document.getElementById("solicitar-prestamo").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // Envío del formulario para crear un nuevo préstamo.
  document.getElementById("form-prestamo").addEventListener("submit", function (e) {
    e.preventDefault();
    const equipoId = document.getElementById("equipo").value;
    const fechaLimite = document.getElementById("devolucion").value;
    if (!equipoId) {
      UI.mostrarAlerta("Seleccione un equipo disponible.", "error");
      return;
    }
    const resultado = Store.solicitarPrestamo(sesion.id, equipoId, fechaLimite);
    if (resultado.ok) {
      UI.mostrarAlerta(resultado.mensaje, "success");
      document.getElementById("form-prestamo").reset();
      render();
    } else {
      UI.mostrarAlerta(resultado.mensaje, "error");
    }
  });

  // Primer pintado de la interfaz.
  render();
});
