$(document).ready(function(){
    loadUsers();

});

function loadUsers() {
    $.ajax({
        url: "https://loginspringboot-vcjl.onrender.com/all",
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
