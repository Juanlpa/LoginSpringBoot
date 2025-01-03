$(document).ready(function(){
    loadUsers();

});

function loadUsers() {
    $.ajax({
        url: "http://localhost:4444/rest/all",
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
}
