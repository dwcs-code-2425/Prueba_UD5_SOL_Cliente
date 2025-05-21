const URL = "http://127.0.0.1:8000/api/todos";
window.onload = onceLoaded;
function onceLoaded() {
    console.log('cargado');
    let form = document.querySelector("#form");
    form.onsubmit = crearTodo;
}
function crearTodo(event) {
    console.log('cancelando envío');
    event.preventDefault();

    let title = document.querySelector("#title").value;

    console.log(title);

   

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify({ title: title }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json(); // Se creó correctamente
            } else {
                return false;
            };
        }
        )
        .then((json) => {
            if (json) {
                mostrarAlertaBootstrap("<div>Se ha creado correctamente el TODO: </div> "+ JSON.stringify(json), "success");
            }
          
        })
        .catch((err) => {
            console.error("Error:", err);
            mostrarAlertaBootstrap(err.message, "danger");

        });

}

function mostrarAlertaBootstrap(mensaje, tipo = 'primary') {
    // Crear el div del alert
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

    // Insertar la alerta en el div container
    document.querySelector("#container").appendChild(alerta);


}
