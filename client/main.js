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
    $('#favorite').on('click', (e) => {
        e.preventDefault();
        favorite()
    })
    $('#home').on('click', (e) => {
        e.preventDefault();
        home()
    })
    $("#")
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
        $('#favorite').hide()
    } else {
        $('#login-form').hide()
        $('#register-form').hide()
        $('#card-cat').show()
        $('#home').show()
        $('#logout').show()
        $('#login').hide()
        $('#register').hide()
        $('#favorite').show()
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
    var id_token = googleUser.getAuthResponse().id_token;
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
            localStorage.setItem('id', response.id)
            $('#login-email').val('')
            $('#login-password').val('')
            auth()
        })
        .fail(err => {
            console.log(err, "ini error")
        })
}

function getApi() {
    $.ajax({
        url: base_url + '/home',
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done((response) => {
            console.log(response)
            $("#card-cat").empty()
            $("#card-cat").append(
                `<img class="card-img-top img-thumbnail" src="${response.data}" alt="Card image cap" style="height : 70%">
            <div class="card-body">
              <h1 class="card-title">Cats</h1>
              <h5 class="card-text">${response.result}</h5>
              <a href="#" class="btn btn-info" id="random-pict">Random Pict</a>
              <a href="#" class="btn btn-info" id="add-favorite">Add To Favorite</a>
            </div>`
            )
            $("#background-web").attr("background", response.fact)
            $('#random-pict').on('click', (e) => {
                e.preventDefault()
                random()
            })
            $('#add-favorite').on('click', (e) => {
                e.preventDefault()
                addFav(response.data, response.result, response.fact)
            })
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always(() => {
            console.log('INI DATA KU')
        })
}

function random() {
    console.log('trigger random')
    getApi()
}

function addFav(data, result, fact) {
    $.ajax({
        url: base_url + '/addFav',
        method: 'post',
        data: {
            data,
            result,
            fact,
            UserId: localStorage.getItem('id')
        },
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            console.log(response)
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}

function favorite() {
    // console.log('trigger favorite')
    $.ajax({
        url: base_url + '/findFav',
        method: 'get',
        headers: {
            access_token: localStorage.getItem("access_token"),
            UserId: localStorage.getItem('id')
        }
    })
        .done(response => {
            console.log(response)
            $("#card-cat").empty()
            // for(let i of response){
            //     console.log(i)
            // }
            response.forEach(el => {
                $("#card-cat").append(
                    `<img class="card-img-top img-thumbnail" src="${el.data}" alt="Card image cap" style="height : 70%">
                <div class="card-body" style="background-color:black">
                  <h1 class="card-title">Cats</h1>
                  <h5 class="card-text">${el.result}</h5>
                  <h5 class="card-text">${el.fact}</h5>
                  <a href="#" class="btn btn-info" id="add-favorite" onclick="deleteFav(${el.id})">Delete</a>
                </div><br>`
                )
            })
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}

function home() {
    auth()
}

function deleteFav(id) {
    $.ajax({
        url: base_url + '/deleteFav',
        method: 'delete',
        headers: {
            access_token: localStorage.getItem("access_token"),
            id: id
        }
    })
        .done(response => {
            // console.log(response)
            favorite()
        })
        .fail((xhr, txt) => {
            console.log(xhr, txt)
        })
    console.log('id delete', id)
}