const base_url = 'http://localhost:3000'

$(document).ready(() => {
    auth()
    $('#login').on('click', (e) => {
        e.preventDefault();
        $('#register-form').hide()
        $('#login-form').show()
    })
    $('#register').on('click', (e) => {
        e.preventDefault();
        $('#login-form').hide()
        $('#register-form').show()
    })
    $('#register-form').on('submit', (e) => {
        e.preventDefault();
        register()
    })
    $('#login-form').on('submit', (e) => {
        e.preventDefault();
        login()
    })
    $('#logout').on('click', (e) => {
        e.preventDefault();
        logout()
    })
})

function auth() {
    if (!localStorage.getItem('access_token')) {
        $('#login-form').show()
        $('#register-form').hide()
        $('#card-cat').hide()
        $('#home').hide()
        $('#logout').hide()
        $('#login').show()
        $('#register').show()
    } else {
        $('#login-form').hide()
        $('#register-form').hide()
        $('#card-cat').show()
        $('#home').show()
        $('#logout').show()
        $('#login').hide()
        $('#register').hide()
        getApi()
    }
    $('#loginFail').hide()
}

function register() {
    const name = $('#register-name').val()
    const email = $('#register-email').val()
    const password = $('#register-password').val()
    $.ajax({
        url: base_url + '/register',
        method: 'post',
        data: {
            name,
            email,
            password
        }
    }).done(response => {
        console.log(response)
        auth()
    }).fail((xhr, text) => {
        console.log(xhr, text)
    }).always(_ => {
        console.log('register')
    })
}

function login() {
    const email = $('#login-email').val()
    const password = $('#login-password').val()
    $.ajax({
        url: base_url + '/login',
        method: 'post',
        data: {
            email,
            password
        }
    }).done(response => {
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('name', response.name)
        auth()
        console.log(response)
    }).fail((xhr, text) => {
        $('#loginFail').text(xhr.responseJSON.errors)
        $('#loginFail').show()
        $('#login-email').val('')
        $('#login-password').val('')
        console.log(xhr.responseJSON)
    }).always(_ => {
        console.log('success login')
    })
}

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    auth()
}

function onSignUp(googleUser) {
    console.log('test Masuk')
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token)
    $.ajax({
        url: base_url + '/RegisterGoogle',
        method: 'post',
        data: {
            googleToken: id_token
        }
    }).done(response => {
        console.log('berhasil masuk')
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });

        auth()

    }).fail((xhr, text) => {
        console.log(xhr, text)
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: base_url + '/LoginGoogle',
        method: 'post',
        data: {
            googleToken: id_token
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('nama', response.name)
            $('#login-email').val('')
            $('#login-password').val('')
            auth()
        })
        .fail(err => {
            console.log(err, "ini error")
        })
}

function getApi (){
    $.ajax({
        url : base_url + '/home',
        method : "GET",
        headers : {
            access_token : localStorage.getItem("access_token")
        }
    })
    .done((response) => {
        console.log(response)
        $("#card-cat").empty()
        $("#card-cat").append(
            `<img class="card-img-top" src="${response.data.file}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Cats</h5>
              <p class="card-text"> MEOW MEOW MEOW </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>`
        )
    })
    .fail((xhr, text) => {
        console.log(xhr, text)
    })
    .always(() => {
        console.log('INI DATA KU LHOOOOOO JING')
    })
}