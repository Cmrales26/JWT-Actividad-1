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


// FRONTEND SIGN UP
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


const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const contactinfo1 = document.getElementById('NelsonMoralesInfo');
const contactinfo2 = document.getElementById('AndreaDominguezInfo');

item1.addEventListener('click', function() {
    item1.classList.add('selected');
    item2.classList.remove('selected');
    contactinfo1.classList.add('active');
    contactinfo1.classList.remove('unactive');
    contactinfo2.classList.remove('active');
    contactinfo2.classList.add('unactive');
});

item2.addEventListener('click', function() {
    item2.classList.add('selected');
    item1.classList.remove('selected');
    contactinfo2.classList.add('active');
    contactinfo2.classList.remove('unactive');
    contactinfo1.classList.remove('active');
    contactinfo1.classList.add('unactive');

});