$(document).ready(function(){
    loadUsers();

});

function loadUsers() {
    $.ajax({
        url: "https://loginspringboot-vcjl.onrender.com/rest/all",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var html = "";
            for (let i = 0; i < data.length; i++) {
                html += "<tr><td>" + data[i].cedula + "</td><td>" +
                        data[i].nombre + "</td><td>" +
                        data[i].apellido + "</td><td>" +
                        data[i].direccion + "</td><td>" +
                        data[i].telefono + "</td></tr>";
            }

            $('#tblUsers tbody').html(html);
        }
    });

}$(document).ready(function () {
    // Función para manejar el evento de búsqueda
    $("form.d-flex").submit(function (event) {
        event.preventDefault(); // Evitar recargar la página

        const cedula = $('input[name="cedula"]').val(); // Obtener la cédula del input
        if (!cedula) {
            alert("Por favor, ingrese una cédula para buscar.");
            return;
        }

        $.ajax({
            url: "https://loginspringboot-vcjl.onrender.com/rest/find/" + cedula, // Ruta al endpoint
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Actualiza la tabla con el resultado de la búsqueda
                const html = "<tr><td>" + data.cedula + "</td><td>" +
                    data.nombre + "</td><td>" +
                    data.apellido + "</td><td>" +
                    data.direccion + "</td><td>" +
                    data.telefono + "</td><td>";

                $('#tblUsers tbody').html(html); // Reemplazar la tabla con el resultado
            },
            error: function (xhr) {
                if (xhr.status === 404) {
                    alert("Estudiante no encontrado.");
                } else {
                    alert("Ocurrió un error al realizar la búsqueda.");
                }
            }
        });
    });
});



