$(document).ready(function(){
    loadUsers();
        $("#add-user-form").submit(function(event){
            event.preventDefault(); // Evitar la recarga de la página
            $.ajax({
                type: "POST",
                url: "http://localhost:4444/rest/save/"+$('#cedula').val(), // Ruta para insertar un estudiante
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({
                    "nombre": $('#nombre').val(),
                    "apellido": $('#apellido').val(),
                    "direccion": $('#direccion').val(),
                    "telefono": $('#telefono').val()
                }),
                success: function(response) {
                    loadUsers();
                    $('#addNewUser').modal('hide');
                }
            });
        });

        $("#edit-user-form").submit(function(event){
                event.preventDefault(); // Evitar la recarga de la página
                $.ajax({
                    type: "PUT",
                    url: "http://localhost:4444/rest/edit/"+$('#ecedula').val(), // Ruta para editar un estudiante
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "nombre": $('#enombre').val(),
                        "apellido": $('#eapellido').val(),
                        "direccion": $('#edireccion').val(),
                        "telefono": $('#etelefono').val()
                    }),
                    success: function(response) {
                        loadUsers();
                         $('#editNewUser').modal('hide');
                    }
                });
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
                            url: "http://localhost:4444/rest/delete/" + cedula, // Ruta para eliminar un estudiante
                            type: "DELETE",
                            success: function(){
                                loadUsers(); // Actualizar la tabla después de eliminar un estudiante
                            }
                        });
                    });
});

function loadUsers() {
    $.ajax({
        url: "http://localhost:4444/rest/all",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var btnEdit = '<button type="button" class="btn btn-primary btnEdit" data-bs-toggle="modal" data-bs-target="#editNewUser"> Editar</button>';
            var btnDelete = '<button type="button" class="btn btn-primary btn-danger btnDelete" data-bs-toggle="modal" data-bs-target="#editUserModal"> Eliminar</button>';
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
