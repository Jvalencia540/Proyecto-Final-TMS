document.addEventListener("DOMContentLoaded", function () {
  // Si ya hay sesión activa, redirige al panel correspondiente.
  const sesion = Store.obtenerSesion();
  if (sesion) {
    window.location.href = sesion.rol === "admin" ? "admin.html" : "estudiante.html";
    return;
  }

  // Referencias del formulario de login y contenedor de mensajes.
  const form = document.getElementById("login-form");
  const errorEl = document.getElementById("login-error");

  // Muestra mensaje de éxito cuando viene desde registro exitoso.
  const params = new URLSearchParams(window.location.search);
  if (params.get("registrado") === "1") {
    errorEl.className = "alert alert--success";
    errorEl.textContent = "Cuenta creada. Inicie sesión con su correo y contraseña.";
    errorEl.hidden = false;
  }

  // Flujo principal de autenticación.
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.hidden = true;
    errorEl.className = "alert alert--error";

    const correo = form.correo.value;
    const password = form.password.value;
    const resultado = Store.autenticar(correo, password);

    // Si el login falla, se muestra el motivo al usuario.
    if (!resultado.ok) {
      errorEl.textContent = resultado.mensaje;
      errorEl.hidden = false;
      return;
    }

    // Si el login es correcto, redirige según el rol.
    window.location.href =
      resultado.usuario.rol === "admin" ? "admin.html" : "estudiante.html";
  });

});
