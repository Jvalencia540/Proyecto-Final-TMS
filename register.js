document.addEventListener("DOMContentLoaded", function () {
  // Evita que un usuario autenticado vuelva a la pantalla de registro.
  const sesion = Store.obtenerSesion();
  if (sesion) {
    window.location.href = sesion.rol === "admin" ? "admin.html" : "estudiante.html";
    return;
  }

  // Referencias al formulario de registro y zona de errores.
  const form = document.getElementById("register-form");
  const errorEl = document.getElementById("register-error");

  // Flujo de creación de cuenta de estudiante.
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.hidden = true;

    // Validación local: ambas contraseñas deben coincidir.
    const password = form.password.value;
    const passwordConfirm = form["password-confirm"].value;

    if (password !== passwordConfirm) {
      errorEl.textContent = "Las contraseñas no coinciden.";
      errorEl.hidden = false;
      return;
    }

    // Registro contra Store (validaciones y persistencia).
    const resultado = Store.registrarUsuario(
      form.codigo.value,
      form.nombre.value,
      form.correo.value,
      password
    );

    if (!resultado.ok) {
      errorEl.textContent = resultado.mensaje;
      errorEl.hidden = false;
      return;
    }

    // En caso de éxito, vuelve al login con bandera para mensaje positivo.
    window.location.href = "index.html?registrado=1";
  });
});
