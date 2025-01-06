$(document).ready(function(){
    function validarFormulario(formId) {
        let form = $(formId);
        let cedula = form.find('input[name="cedula"]').val();
        let nombre = form.find('input[name="nombre"]').val();
        let apellido = form.find('input[name="apellido"]').val();
        let direccion = form.find('input[name="direccion"]').val();
        let telefono = form.find('input[name="telefono"]').val();

        // Expresiones regulares para validación
        const regexNumeros = /^[0-9]{10}$/; // Solo números, 10 dígitos
        const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,40}$/; // Letras, máximo 40 caracteres

        // Validar cédula
        if (!regexNumeros.test(cedula)) {
            alert('La cédula debe tener 10 dígitos numéricos.');
            return false;
        }

        // Validar teléfono
        if (!regexNumeros.test(telefono)) {
            alert('El teléfono debe tener 10 dígitos numéricos.');
            return false;
        }

        // Validar nombre
        if (!regexLetras.test(nombre)) {
            alert('El nombre debe contener solo letras y un máximo de 40 caracteres.');
            return false;
        }

        // Validar apellido
        if (!regexLetras.test(apellido)) {
            alert('El apellido debe contener solo letras y un máximo de 40 caracteres.');
            return false;
        }

        // Validar dirección
        if (!regexLetras.test(direccion)) {
            alert('La dirección debe contener solo letras y un máximo de 40 caracteres.');
            return false;
        }

        return true;
    }

    loadUsers();

    $('#btn-add-user').click(function () {
        $('#add-user-form')[0].reset(); // Limpiar el formulario antes de abrir el modal
    });

    $("#add-user-form").submit(function (event) {
        event.preventDefault();
        if (validarFormulario('#add-user-form')) {
            $.ajax({
                type: "POST",
                url: "https://loginspringboot-vcjl.onrender.com/rest/save/" + $('#cedula').val(),
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({
                    "nombre": $('#nombre').val(),
                    "apellido": $('#apellido').val(),
                    "direccion": $('#direccion').val(),
                    "telefono": $('#telefono').val()
                }),
                success: function (response) {
                    loadUsers();
                    $('#addNewUser').modal('hide');
                }
            });
        }
    });

    $("#edit-user-form").submit(function (event) {
        event.preventDefault();
        if (validarFormulario('#edit-user-form')) {
            $.ajax({
                type: "PUT",
                url: "https://loginspringboot-vcjl.onrender.com/rest/edit/" + $('#ecedula').val(),
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({
                    "nombre": $('#enombre').val(),
                    "apellido": $('#eapellido').val(),
                    "direccion": $('#edireccion').val(),
                    "telefono": $('#etelefono').val()
                }),
                success: function (response) {
                    loadUsers();
                    $('#editNewUser').modal('hide');
                }
            });
        }
    });

    $("#tblUsers").on('click', '.btnEdit', function(){
        var currentRow = $(this).closest("tr");
        $('#ecedula').val(currentRow.find("td:eq(0)").text());
        $('#enombre').val(currentRow.find("td:eq(1)").text());
        $('#eapellido').val(currentRow.find("td:eq(2)").text());
        $('#edireccion').val(currentRow.find("td:eq(3)").text());
        $('#etelefono').val(currentRow.find("td:eq(4)").text());
    });

    $("#tblUsers").on('click', '.btnDelete', function(){
        var currentRow = $(this).closest("tr");
        var cedula = currentRow.find("td:eq(0)").text();
        $.ajax({
            url: "https://loginspringboot-vcjl.onrender.com/rest/delete/" + cedula,
            type: "DELETE",
            success: function(){
                loadUsers();
            }
        });
    });

});

function loadUsers() {
    $.ajax({
        url: "https://loginspringboot-vcjl.onrender.com/rest/all",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var btnEdit = '<button type="button" class="btn btn-primary btnEdit" data-bs-toggle="modal" data-bs-target="#editNewUser"> Editar</button>';
            var btnDelete = '<button type="button" class="btn btn-danger btnDelete"> Eliminar</button>';
            var html = "";

            for (let i = 0; i < data.length; i++) {
                html += "<tr><td>" + data[i].cedula + "</td><td>" +
                    data[i].nombre + "</td><td>" +
                    data[i].apellido + "</td><td>" +
                    data[i].direccion + "</td><td>" +
                    data[i].telefono + "</td><td>" +
                    btnEdit + " " + btnDelete + "</td></tr>";
            }

            $('#tblUsers tbody').html(html);
        }
    });
}
$(document).ready(function () {
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
                const btnEdit = '<button type="button" class="btn btn-primary btnEdit" data-bs-toggle="modal" data-bs-target="#editNewUser"> Editar</button>';
                const btnDelete = '<button type="button" class="btn btn-primary btn-danger btnDelete"> Eliminar</button>';
                const html = "<tr><td>" + data.cedula + "</td><td>" +
                    data.nombre + "</td><td>" +
                    data.apellido + "</td><td>" +
                    data.direccion + "</td><td>" +
                    data.telefono + "</td><td>" +
                    btnEdit + " " + btnDelete + "</td></tr>";

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
