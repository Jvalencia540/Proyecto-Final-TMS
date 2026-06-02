document.addEventListener("DOMContentLoaded", function () {
  // Control de acceso: solo administradores pueden usar este panel.
  const sesion = Store.requerirRol("admin");
  if (!sesion) return;

  // Datos del usuario logueado en la barra superior.
  document.getElementById("topbar-user").textContent =
    sesion.nombre + " · " + sesion.correo;

  // Cierre de sesión.
  document.getElementById("btn-logout").addEventListener("click", function (e) {
    e.preventDefault();
    Store.cerrarSesion();
    window.location.href = "index.html";
  });

  // Manejo visual del menú lateral (enlace activo).
  document.querySelectorAll(".nav-menu__link[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      document.querySelectorAll(".nav-menu__link").forEach(function (l) {
        l.classList.remove("nav-menu__link--active");
      });
      link.classList.add("nav-menu__link--active");
    });
  });

  // Estado del tipo de reporte mostrado (activos vs historial).
  let reporteModo = "activos";

  // Render general del dashboard administrativo.
  function render() {
    const d = Store.cargarDatos();
    const activos = d.prestamos.filter((p) => p.estado === "activo");
    const historial = d.prestamos;

    // Sección 1: métricas principales.
    document.getElementById("stat-prestamos-activos").textContent = activos.length;
    document.getElementById("stat-equipos").textContent = d.equipos.length;
    document.getElementById("stat-historial-total").textContent = historial.length;

    // Sección 2: tabla de equipos con acciones CRUD.
    document.getElementById("tbody-equipos").innerHTML = d.equipos
      .map(function (eq) {
        const tieneActivo = d.prestamos.some(
          (p) => p.equipoId === eq.id && p.estado === "activo"
        );
        return (
          "<tr><td>" +
          eq.id +
          "</td><td>" +
          eq.nombre +
          "</td><td>" +
          eq.tipo +
          "</td><td>" +
          UI.badgeEstado(eq.estado) +
          '</td><td><button type="button" class="btn btn--outline btn--sm btn-editar-equipo" data-id="' +
          eq.id +
          '">Editar</button> ' +
          '<button type="button" class="btn btn--secondary btn--sm btn-eliminar-equipo" data-id="' +
          eq.id +
          '"' +
          (tieneActivo ? ' disabled title="Tiene préstamo activo"' : "") +
          ">Eliminar</button></td></tr>"
        );
      })
      .join("");

    // Sección 3: tabla de estudiantes con acciones CRUD.
    document.getElementById("tbody-estudiantes").innerHTML = d.estudiantes
      .map(function (est) {
        const esPrincipal = est.id === Store.USUARIOS.estudiante.id;
        return (
          "<tr><td>" +
          est.codigo +
          "</td><td>" +
          est.nombre +
          "</td><td>" +
          est.correo +
          '</td><td><button type="button" class="btn btn--outline btn--sm btn-editar-est" data-id="' +
          est.id +
          '">Editar</button> ' +
          '<button type="button" class="btn btn--secondary btn--sm btn-eliminar-est" data-id="' +
          est.id +
          '"' +
          (esPrincipal ? ' disabled title="Usuario principal"' : "") +
          ">Eliminar</button></td></tr>"
        );
      })
      .join("");

    // Sección 4: selector para registrar devoluciones.
    const selectPrestamo = document.getElementById("prestamo");
    if (activos.length === 0) {
      selectPrestamo.innerHTML =
        '<option value="">— No hay préstamos activos —</option>';
    } else {
      selectPrestamo.innerHTML = activos
        .map(function (p) {
          const est = Store.obtenerEstudiante(d, p.estudianteId);
          const eq = Store.obtenerEquipo(d, p.equipoId);
          const label =
            (eq ? eq.nombre : p.equipoId) +
            " — " +
            (est ? est.nombre : "?") +
            " (" +
            Store.formatearFechaCorta(p.fechaPrestamo) +
            ")";
          return '<option value="' + p.id + '">' + label + "</option>";
        })
        .join("");
    }
    document.getElementById("btn-devolucion").disabled = activos.length === 0;

    // Sección 5: reporte consolidado de préstamos.
    renderReporte(d);
    enlazarEventos(d);
  }

  // Dibuja la tabla de reportes según el modo elegido.
  function renderReporte(d) {
    const lista =
      reporteModo === "activos"
        ? d.prestamos.filter((p) => p.estado === "activo")
        : d.prestamos.slice().sort((a, b) => new Date(b.fechaPrestamo) - new Date(a.fechaPrestamo));

    const tbody = document.getElementById("tbody-reportes");
    if (lista.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="text-muted">Sin registros para mostrar.</td></tr>';
      return;
    }
    tbody.innerHTML = lista
      .map(function (p) {
        const est = Store.obtenerEstudiante(d, p.estudianteId);
        const eq = Store.obtenerEquipo(d, p.equipoId);
        return (
          "<tr><td>" +
          (est ? est.nombre : "?") +
          "</td><td>" +
          (eq ? eq.nombre : p.equipoId) +
          "</td><td>" +
          Store.formatearFechaCorta(p.fechaPrestamo) +
          "</td><td>" +
          Store.formatearFechaCorta(p.fechaLimite) +
          "</td><td>" +
          UI.badgeEstado(p.estado === "activo" ? "activo" : "devuelto") +
          "</td></tr>"
        );
      })
      .join("");
  }

  // Conecta eventos de botones dinámicos dentro de tablas.
  function enlazarEventos(d) {
    document.querySelectorAll(".btn-editar-equipo").forEach(function (btn) {
      btn.onclick = function () {
        const eq = Store.obtenerEquipo(Store.cargarDatos(), btn.getAttribute("data-id"));
        if (!eq) return;
        UI.abrirModal(
          "Editar equipo",
          [
            { id: "nombre", label: "Nombre", value: eq.nombre, required: true },
            {
              id: "tipo",
              label: "Tipo",
              type: "select",
              value: eq.tipo,
              required: true,
              options: [
                { value: "Laptop", text: "Laptop" },
                { value: "Tablet", text: "Tablet" },
                { value: "Proyector", text: "Proyector" },
                { value: "Otro", text: "Otro" },
              ],
            },
            { id: "descripcion", label: "Descripción", type: "textarea", value: eq.descripcion },
          ],
          function (vals, cerrar) {
            const r = Store.actualizarEquipo(eq.id, vals.nombre, vals.tipo, vals.descripcion);
            UI.mostrarAlerta(r.mensaje, r.ok ? "success" : "error");
            if (r.ok) {
              cerrar();
              render();
            }
          }
        );
      };
    });

    document.querySelectorAll(".btn-eliminar-equipo").forEach(function (btn) {
      btn.onclick = function () {
        if (!confirm("¿Eliminar este equipo?")) return;
        const r = Store.eliminarEquipo(btn.getAttribute("data-id"));
        UI.mostrarAlerta(r.mensaje, r.ok ? "success" : "error");
        if (r.ok) render();
      };
    });

    document.querySelectorAll(".btn-editar-est").forEach(function (btn) {
      btn.onclick = function () {
        const est = Store.obtenerEstudiante(Store.cargarDatos(), btn.getAttribute("data-id"));
        if (!est) return;
        UI.abrirModal(
          "Editar estudiante",
          [
            { id: "codigo", label: "Código", value: est.codigo, required: true },
            { id: "nombre", label: "Nombre completo", value: est.nombre, required: true },
            { id: "correo", label: "Correo", value: est.correo, required: true },
          ],
          function (vals, cerrar) {
            const r = Store.actualizarEstudiante(
              est.id,
              vals.codigo,
              vals.nombre,
              vals.correo
            );
            UI.mostrarAlerta(r.mensaje, r.ok ? "success" : "error");
            if (r.ok) {
              cerrar();
              render();
            }
          }
        );
      };
    });

    document.querySelectorAll(".btn-eliminar-est").forEach(function (btn) {
      btn.onclick = function () {
        if (!confirm("¿Eliminar este estudiante?")) return;
        const r = Store.eliminarEstudiante(btn.getAttribute("data-id"));
        UI.mostrarAlerta(r.mensaje, r.ok ? "success" : "error");
        if (r.ok) render();
      };
    });
  }

  // Alta de equipos.
  document.getElementById("btn-agregar-equipo").addEventListener("click", function () {
    UI.abrirModal(
      "Agregar equipo",
      [
        { id: "nombre", label: "Nombre", required: true },
        {
          id: "tipo",
          label: "Tipo",
          type: "select",
          required: true,
          options: [
            { value: "Laptop", text: "Laptop" },
            { value: "Tablet", text: "Tablet" },
            { value: "Proyector", text: "Proyector" },
            { value: "Otro", text: "Otro" },
          ],
        },
        { id: "descripcion", label: "Descripción", type: "textarea" },
      ],
      function (vals, cerrar) {
        const r = Store.agregarEquipo(vals.nombre, vals.tipo, vals.descripcion);
        UI.mostrarAlerta(r.mensaje, r.ok ? "success" : "error");
        if (r.ok) {
          cerrar();
          render();
        }
      }
    );
  });

  // Alta de estudiantes.
  document.getElementById("btn-agregar-estudiante").addEventListener("click", function () {
    UI.abrirModal(
      "Agregar estudiante",
      [
        { id: "codigo", label: "Código", required: true },
        { id: "nombre", label: "Nombre completo", required: true },
        { id: "correo", label: "Correo institucional", required: true },
      ],
      function (vals, cerrar) {
        const r = Store.agregarEstudiante(vals.codigo, vals.nombre, vals.correo);
        UI.mostrarAlerta(r.mensaje, r.ok ? "success" : "error");
        if (r.ok) {
          cerrar();
          render();
        }
      }
    );
  });

  // Registro de devolución de un préstamo activo.
  document.getElementById("btn-devolucion").addEventListener("click", function () {
    const id = document.getElementById("prestamo").value;
    if (!id) {
      UI.mostrarAlerta("Seleccione un préstamo activo.", "error");
      return;
    }
    const r = Store.registrarDevolucion(id);
    UI.mostrarAlerta(r.mensaje, r.ok ? "success" : "error");
    if (r.ok) render();
  });

  // Búsqueda rápida de préstamos activos por estudiante/equipo.
  document.getElementById("buscar").addEventListener("input", function () {
    const q = this.value.trim().toLowerCase();
    const d = Store.cargarDatos();
    const activos = d.prestamos.filter((p) => p.estado === "activo");
    const select = document.getElementById("prestamo");
    const filtrados = activos.filter(function (p) {
      const est = Store.obtenerEstudiante(d, p.estudianteId);
      const eq = Store.obtenerEquipo(d, p.equipoId);
      const texto =
        (est ? est.nombre + " " + est.codigo + " " + est.correo : "") +
        " " +
        (eq ? eq.nombre + " " + eq.id : "");
      return texto.toLowerCase().includes(q);
    });
    if (filtrados.length === 0) {
      select.innerHTML = '<option value="">— Sin coincidencias —</option>';
    } else {
      select.innerHTML = filtrados
        .map(function (p) {
          const est = Store.obtenerEstudiante(d, p.estudianteId);
          const eq = Store.obtenerEquipo(d, p.equipoId);
          const label =
            (eq ? eq.nombre : p.equipoId) +
            " — " +
            (est ? est.nombre : "?");
          return '<option value="' + p.id + '">' + label + "</option>";
        })
        .join("");
    }
  });

  // Cambio de vista de reporte a préstamos activos.
  document.getElementById("btn-reporte-activos").addEventListener("click", function () {
    reporteModo = "activos";
    document.getElementById("btn-reporte-activos").classList.add("btn--primary");
    document.getElementById("btn-reporte-activos").classList.remove("btn--secondary");
    document.getElementById("btn-reporte-historial").classList.remove("btn--primary");
    document.getElementById("btn-reporte-historial").classList.add("btn--secondary");
    renderReporte(Store.cargarDatos());
  });

  // Cambio de vista de reporte a historial completo.
  document.getElementById("btn-reporte-historial").addEventListener("click", function () {
    reporteModo = "historial";
    document.getElementById("btn-reporte-historial").classList.add("btn--primary");
    document.getElementById("btn-reporte-historial").classList.remove("btn--secondary");
    document.getElementById("btn-reporte-activos").classList.remove("btn--primary");
    document.getElementById("btn-reporte-activos").classList.add("btn--secondary");
    renderReporte(Store.cargarDatos());
  });

  // Primer pintado de la interfaz.
  render();
});
