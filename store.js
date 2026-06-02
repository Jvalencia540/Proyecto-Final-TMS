(function (global) {
  // Claves de almacenamiento local/sesión del sistema.
  const STORAGE_KEY = "gestion_prestamos_data";
  const SESSION_KEY = "gestion_prestamos_session";
  const USUARIOS_REGISTRADOS_KEY = "gestion_prestamos_usuarios";

  // Usuarios base (demo) del sistema.
  const USUARIOS = {
    estudiante: {
      id: "usr-est-1",
      rol: "estudiante",
      codigo: "20231234",
      nombre: "Juan Pablo Muñoz Alvarez",
      correo: "juanpablo.munoz@utp.edu.co",
      password: "Estudiante2026",
    },
    admin: {
      id: "usr-adm-1",
      rol: "admin",
      nombre: "Juan José Valencia García",
      correo: "juanjose.valencia@utp.edu.co",
      password: "Admin2026",
    },
  };

  // Estructura inicial de datos para primer uso del sistema.
  function datosIniciales() {
    return {
      equipos: [
        { id: "E001", nombre: "Lenovo ThinkPad E14", tipo: "Laptop", descripcion: '14", 16 GB RAM, Windows 11.', estado: "disponible" },
        { id: "E002", nombre: "HP Pavilion 15", tipo: "Laptop", descripcion: "15.6\", 8 GB RAM.", estado: "disponible" },
        { id: "E003", nombre: "Samsung Galaxy Tab S9", tipo: "Tablet", descripcion: "11\", stylus incluido.", estado: "disponible" },
        { id: "E004", nombre: "Epson PowerLite X49", tipo: "Proyector", descripcion: "3600 lúmenes, HDMI.", estado: "disponible" },
      ],
      estudiantes: [
        {
          id: USUARIOS.estudiante.id,
          codigo: USUARIOS.estudiante.codigo,
          nombre: USUARIOS.estudiante.nombre,
          correo: USUARIOS.estudiante.correo,
        },
      ],
      prestamos: [
        {
          id: "P-hist-1",
          estudianteId: USUARIOS.estudiante.id,
          equipoId: "E002",
          fechaPrestamo: "2026-04-20T10:00:00",
          fechaLimite: "2026-04-22T17:00:00",
          fechaDevolucion: "2026-04-22T16:30:00",
          estado: "devuelto",
        },
      ],
    };
  }

  // Carga el estado principal desde localStorage (con recuperación segura).
  function cargarDatos() {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (!guardado) {
      const iniciales = datosIniciales();
      guardarDatos(iniciales);
      return iniciales;
    }
    try {
      return JSON.parse(guardado);
    } catch {
      const iniciales = datosIniciales();
      guardarDatos(iniciales);
      return iniciales;
    }
  }

  function guardarDatos(datos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
  }

  // Utilidad de normalización para comparar correos sin errores de formato.
  function normalizarCorreo(correo) {
    return String(correo || "").trim().toLowerCase();
  }

  // Gestión de cuentas creadas desde el formulario de registro.
  function cargarUsuariosRegistrados() {
    const guardado = localStorage.getItem(USUARIOS_REGISTRADOS_KEY);
    if (!guardado) return [];
    try {
      const lista = JSON.parse(guardado);
      return Array.isArray(lista) ? lista : [];
    } catch {
      return [];
    }
  }

  function guardarUsuariosRegistrados(usuarios) {
    localStorage.setItem(USUARIOS_REGISTRADOS_KEY, JSON.stringify(usuarios));
  }

  // Catálogo total de usuarios que pueden autenticarse.
  function todosLosUsuarios() {
    return [...Object.values(USUARIOS), ...cargarUsuariosRegistrados()];
  }

  // Búsqueda de usuario por correo (usado para validaciones).
  function buscarUsuarioPorCorreo(correo) {
    const c = normalizarCorreo(correo);
    return todosLosUsuarios().find((u) => normalizarCorreo(u.correo) === c) || null;
  }

  // Registro de nuevos estudiantes: valida, crea estudiante y credenciales.
  function registrarUsuario(codigo, nombre, correo, password) {
    const cod = String(codigo || "").trim();
    const nom = String(nombre || "").trim();
    const c = normalizarCorreo(correo);
    const pass = String(password || "");

    if (!cod || !nom || !c || !pass) {
      return { ok: false, mensaje: "Todos los campos son obligatorios." };
    }
    if (!c.endsWith("@utp.edu.co")) {
      return { ok: false, mensaje: "Use un correo institucional @utp.edu.co." };
    }
    if (pass.length < 6) {
      return { ok: false, mensaje: "La contraseña debe tener al menos 6 caracteres." };
    }
    if (buscarUsuarioPorCorreo(c)) {
      return { ok: false, mensaje: "Ya existe una cuenta con ese correo." };
    }

    const datos = cargarDatos();
    if (datos.estudiantes.some((e) => e.codigo === cod)) {
      return { ok: false, mensaje: "Ya existe un estudiante con ese código." };
    }

    const id = siguienteId("EST", datos.estudiantes);
    const estudiante = { id, codigo: cod, nombre: nom, correo: c };
    datos.estudiantes.push(estudiante);
    guardarDatos(datos);

    const usuario = {
      id,
      rol: "estudiante",
      codigo: cod,
      nombre: nom,
      correo: c,
      password: pass,
    };
    const registrados = cargarUsuariosRegistrados();
    registrados.push(usuario);
    guardarUsuariosRegistrados(registrados);

    return { ok: true, mensaje: "Cuenta creada correctamente. Ya puede iniciar sesión.", usuario };
  }

  // Inicio de sesión: valida credenciales y guarda sesión activa.
  function autenticar(correo, password) {
    const c = normalizarCorreo(correo);
    const usuario =
      todosLosUsuarios().find(
        (u) => normalizarCorreo(u.correo) === c && u.password === password
      ) || null;

    if (!usuario) {
      return { ok: false, mensaje: "Correo o contraseña incorrectos." };
    }

    const sesion = {
      id: usuario.id,
      rol: usuario.rol,
      nombre: usuario.nombre,
      correo: usuario.correo,
      codigo: usuario.codigo || null,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sesion));
    return { ok: true, usuario: sesion };
  }

  // Sesión: obtener, cerrar y validar rol para control de acceso.
  function obtenerSesion() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function cerrarSesion() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function requerirRol(rol) {
    const sesion = obtenerSesion();
    if (!sesion) {
      window.location.href = "index.html";
      return null;
    }
    if (sesion.rol !== rol) {
      window.location.href = sesion.rol === "admin" ? "admin.html" : "estudiante.html";
      return null;
    }
    return sesion;
  }

  // Utilidades generales de IDs y formato de fechas.
  function siguienteId(prefijo, items) {
    const nums = items
      .map((i) => i.id)
      .filter((id) => id.startsWith(prefijo))
      .map((id) => parseInt(id.replace(/\D/g, ""), 10) || 0);
    const max = nums.length ? Math.max(...nums) : 0;
    return prefijo + String(max + 1).padStart(3, "0");
  }

  function formatearFecha(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatearFechaCorta(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("es-CO");
  }

  // Préstamos: consulta activos por estudiante y creación de préstamo.
  function prestamosActivosEstudiante(datos, estudianteId) {
    return datos.prestamos.filter(
      (p) => p.estudianteId === estudianteId && p.estado === "activo"
    );
  }

  function solicitarPrestamo(estudianteId, equipoId, fechaLimiteIso) {
    const datos = cargarDatos();
    const equipo = datos.equipos.find((e) => e.id === equipoId);
    if (!equipo) return { ok: false, mensaje: "Equipo no encontrado." };
    if (equipo.estado !== "disponible") {
      return { ok: false, mensaje: "El equipo ya no está disponible." };
    }

    const activos = prestamosActivosEstudiante(datos, estudianteId);
    if (activos.length >= 2) {
      return { ok: false, mensaje: "Ya tiene 2 préstamos activos (máximo permitido)." };
    }

    const limite = new Date(fechaLimiteIso);
    if (Number.isNaN(limite.getTime()) || limite <= new Date()) {
      return { ok: false, mensaje: "La fecha de devolución debe ser futura." };
    }

    const prestamo = {
      id: siguienteId("P", datos.prestamos),
      estudianteId,
      equipoId,
      fechaPrestamo: new Date().toISOString(),
      fechaLimite: limite.toISOString(),
      fechaDevolucion: null,
      estado: "activo",
    };

    datos.prestamos.push(prestamo);
    equipo.estado = "prestado";
    guardarDatos(datos);
    return { ok: true, mensaje: "Préstamo registrado correctamente.", prestamo };
  }

  // Devoluciones: cierra préstamo y libera equipo.
  function registrarDevolucion(prestamoId) {
    const datos = cargarDatos();
    const prestamo = datos.prestamos.find((p) => p.id === prestamoId);
    if (!prestamo || prestamo.estado !== "activo") {
      return { ok: false, mensaje: "Préstamo no válido o ya devuelto." };
    }

    const equipo = datos.equipos.find((e) => e.id === prestamo.equipoId);
    prestamo.estado = "devuelto";
    prestamo.fechaDevolucion = new Date().toISOString();
    if (equipo) equipo.estado = "disponible";

    const mora = new Date() > new Date(prestamo.fechaLimite);
    guardarDatos(datos);
    return {
      ok: true,
      mensaje: mora
        ? "Devolución registrada. Alerta: posible mora por entrega tardía."
        : "Devolución registrada. Equipo disponible nuevamente.",
      mora,
    };
  }

  // CRUD de equipos para panel administrativo.
  function agregarEquipo(nombre, tipo, descripcion) {
    const datos = cargarDatos();
    if (!nombre.trim() || !tipo.trim()) {
      return { ok: false, mensaje: "Nombre y tipo son obligatorios." };
    }
    const equipo = {
      id: siguienteId("E", datos.equipos),
      nombre: nombre.trim(),
      tipo: tipo.trim(),
      descripcion: (descripcion || "").trim(),
      estado: "disponible",
    };
    datos.equipos.push(equipo);
    guardarDatos(datos);
    return { ok: true, mensaje: "Equipo agregado.", equipo };
  }

  function actualizarEquipo(id, nombre, tipo, descripcion) {
    const datos = cargarDatos();
    const equipo = datos.equipos.find((e) => e.id === id);
    if (!equipo) return { ok: false, mensaje: "Equipo no encontrado." };
    equipo.nombre = nombre.trim();
    equipo.tipo = tipo.trim();
    equipo.descripcion = (descripcion || "").trim();
    guardarDatos(datos);
    return { ok: true, mensaje: "Equipo actualizado." };
  }

  function eliminarEquipo(id) {
    const datos = cargarDatos();
    const equipo = datos.equipos.find((e) => e.id === id);
    if (!equipo) return { ok: false, mensaje: "Equipo no encontrado." };
    const tieneActivo = datos.prestamos.some(
      (p) => p.equipoId === id && p.estado === "activo"
    );
    if (tieneActivo) {
      return { ok: false, mensaje: "No se puede eliminar: tiene préstamos activos." };
    }
    datos.equipos = datos.equipos.filter((e) => e.id !== id);
    guardarDatos(datos);
    return { ok: true, mensaje: "Equipo eliminado." };
  }

  // CRUD de estudiantes para panel administrativo.
  function agregarEstudiante(codigo, nombre, correo) {
    const datos = cargarDatos();
    const c = normalizarCorreo(correo);
    if (!codigo.trim() || !nombre.trim() || !c) {
      return { ok: false, mensaje: "Código, nombre y correo son obligatorios." };
    }
    if (datos.estudiantes.some((e) => normalizarCorreo(e.correo) === c)) {
      return { ok: false, mensaje: "Ya existe un estudiante con ese correo." };
    }
    if (datos.estudiantes.some((e) => e.codigo === codigo.trim())) {
      return { ok: false, mensaje: "Ya existe un estudiante con ese código." };
    }
    const est = {
      id: siguienteId("EST", datos.estudiantes),
      codigo: codigo.trim(),
      nombre: nombre.trim(),
      correo: c,
    };
    datos.estudiantes.push(est);
    guardarDatos(datos);
    return { ok: true, mensaje: "Estudiante agregado.", estudiante: est };
  }

  function actualizarEstudiante(id, codigo, nombre, correo) {
    const datos = cargarDatos();
    const est = datos.estudiantes.find((e) => e.id === id);
    if (!est) return { ok: false, mensaje: "Estudiante no encontrado." };
    const c = normalizarCorreo(correo);
    if (datos.estudiantes.some((e) => e.id !== id && normalizarCorreo(e.correo) === c)) {
      return { ok: false, mensaje: "Ese correo ya está en uso." };
    }
    est.codigo = codigo.trim();
    est.nombre = nombre.trim();
    est.correo = c;
    guardarDatos(datos);
    return { ok: true, mensaje: "Estudiante actualizado." };
  }

  function eliminarEstudiante(id) {
    const datos = cargarDatos();
    if (id === USUARIOS.estudiante.id) {
      return { ok: false, mensaje: "No se puede eliminar el usuario principal del sistema." };
    }
    const tieneActivo = datos.prestamos.some(
      (p) => p.estudianteId === id && p.estado === "activo"
    );
    if (tieneActivo) {
      return { ok: false, mensaje: "No se puede eliminar: tiene préstamos activos." };
    }
    datos.estudiantes = datos.estudiantes.filter((e) => e.id !== id);
    guardarDatos(datos);
    return { ok: true, mensaje: "Estudiante eliminado." };
  }

  // Consultas auxiliares por id para vistas y reportes.
  function obtenerEstudiante(datos, id) {
    return datos.estudiantes.find((e) => e.id === id);
  }

  function obtenerEquipo(datos, id) {
    return datos.equipos.find((e) => e.id === id);
  }

  // API pública del módulo Store utilizada por la interfaz.
  global.Store = {
    USUARIOS,
    registrarUsuario,
    autenticar,
    obtenerSesion,
    cerrarSesion,
    requerirRol,
    cargarDatos,
    guardarDatos,
    normalizarCorreo,
    solicitarPrestamo,
    registrarDevolucion,
    agregarEquipo,
    actualizarEquipo,
    eliminarEquipo,
    agregarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
    prestamosActivosEstudiante,
    obtenerEstudiante,
    obtenerEquipo,
    formatearFecha,
    formatearFechaCorta,
  };
})(window);
