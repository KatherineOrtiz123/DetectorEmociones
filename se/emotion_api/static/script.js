$(document).ready(function () {
    $('#image').on('change', function () {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#selected-image').attr('src', e.target.result).show();
                $('#submit-button').show();  // Ensure the submit button is visible
            }
            reader.readAsDataURL(input.files[0]);
        }
    });

    $('#uploadForm').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData();
        var imageFile = $('#image')[0].files[0];
        formData.append('file', imageFile);

        $.ajax({
            url: 'http://127.0.0.1:3001/prediccion/',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                $('#result').html('<h3>Emoción detectada: ' + response.emotion + '</h3>');
            },
            error: function () {
                $('#result').html('<h3>Error al detectar la emoción.</h3>');
            }
        });
    });
});