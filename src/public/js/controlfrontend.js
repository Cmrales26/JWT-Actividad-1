// FRONTEND SIGN IN

$('#login-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/',
        type: 'post',
        data: $('#login-form').serialize(),
        success: function (data) {
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        },
        error: function (error) {
            Toastify({
                text: error.responseJSON.error,
                className: "alertwrongcredentials",
                gravity: "bottom",
                position: "right", 
                style: {
                    background: "white",
                    color:"#f4aa00"
                }
            }).showToast();
        }
    });
});


$('#Signup-form').on('submit', function(e){
    e.preventDefault();
    $.ajax({   
        url: '/i/create',
        type: "post",
        data: $('#Signup-form').serialize(),
        success: function (data) {
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        },
        error: function (error) {
            Toastify({
                text: error.responseJSON.error,
                className: "alertwrongcredentials",
                gravity: "bottom",
                position: "right", 
                style: {
                    background: "white",
                    color:"#f4aa00"
                }
            }).showToast();
        }
    });
});
// FRONTEND SIGN UP