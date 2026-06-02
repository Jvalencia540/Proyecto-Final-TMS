(function (global) {
  function mostrarAlerta(mensaje, tipo) {
    let contenedor = document.getElementById("alert-container");
    if (!contenedor) {
      contenedor = document.createElement("div");
      contenedor.id = "alert-container";
      contenedor.className = "alert-container";
      document.body.appendChild(contenedor);
    }
    const alerta = document.createElement("div");
    alerta.className = "alert alert--" + (tipo || "info");
    alerta.textContent = mensaje;
    contenedor.appendChild(alerta);
    setTimeout(function () {
      alerta.classList.add("alert--hide");
      setTimeout(function () {
        alerta.remove();
      }, 300);
    }, 4000);
  }

  function abrirModal(titulo, campos, onConfirm) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML =
      '<div class="modal">' +
      '<h3 class="modal__title"></h3>' +
      '<form class="modal__form"></form>' +
      '<div class="modal__actions">' +
      '<button type="button" class="btn btn--outline" data-action="cancel">Cancelar</button>' +
      '<button type="submit" class="btn btn--primary" form="modal-form">Guardar</button>' +
      "</div></div>";

    const modal = overlay.querySelector(".modal");
    modal.querySelector(".modal__title").textContent = titulo;
    const form = modal.querySelector(".modal__form");
    form.id = "modal-form";

    campos.forEach(function (campo) {
      const grupo = document.createElement("div");
      grupo.className = "form-group";
      const label = document.createElement("label");
      label.setAttribute("for", campo.id);
      label.textContent = campo.label;
      let input;
      if (campo.type === "select") {
        input = document.createElement("select");
        campo.options.forEach(function (opt) {
          const o = document.createElement("option");
          o.value = opt.value;
          o.textContent = opt.text;
          if (opt.value === campo.value) o.selected = true;
          input.appendChild(o);
        });
      } else if (campo.type === "textarea") {
        input = document.createElement("textarea");
        input.rows = 3;
      } else {
        input = document.createElement("input");
        input.type = campo.type || "text";
      }
      input.id = campo.id;
      input.name = campo.id;
      input.className = "form-control";
      input.value = campo.value || "";
      if (campo.required) input.required = true;
      grupo.appendChild(label);
      grupo.appendChild(input);
      form.appendChild(grupo);
    });

    function cerrar() {
      overlay.remove();
    }

    overlay.querySelector('[data-action="cancel"]').addEventListener("click", cerrar);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) cerrar();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const valores = {};
      campos.forEach(function (campo) {
        valores[campo.id] = form.elements[campo.id].value;
      });
      onConfirm(valores, cerrar);
    });

    document.body.appendChild(overlay);
    const first = form.querySelector("input, select, textarea");
    if (first) first.focus();
  }

  function badgeEstado(estado) {
    if (estado === "disponible" || estado === "devuelto") {
      return '<span class="badge badge--success">' + estado + "</span>";
    }
    if (estado === "activo") {
      return '<span class="badge badge--info">Activo</span>';
    }
    if (estado === "prestado") {
      return '<span class="badge badge--warning">Prestado</span>';
    }
    return '<span class="badge badge--info">' + estado + "</span>";
  }

  global.UI = {
    mostrarAlerta: mostrarAlerta,
    abrirModal: abrirModal,
    badgeEstado: badgeEstado,
  };
})(window);
