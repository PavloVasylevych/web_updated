const signButton = document.querySelector('.sign_button');
const error = document.querySelector('.error');


if (window.localStorage.getItem('loggedUser')) {
    window.location.href = '../templates/acc.html';
}

let loginUser = request_body => {
    return fetch('http://localhost:8089/api/v1/user/login', {
        method: "POST",
        body: JSON.stringify(request_body),
        headers: {'Content-Type': 'application/json'}
    });
}



signButton.onclick = (e) => {
    e.preventDefault();

    const form = document.querySelector('.form');

    if (form.checkValidity()) {
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        let request_body = {
            username: username.value,
            password: password.value,
        };
        loginUser(request_body)
        .then((response) =>
            {
            if (response.status === 200) {
                window.localStorage.setItem('loggedUser', JSON.stringify(request_body));
                window.location.href = '../templates/acc.html';
            }
            else
            {
                response.text().then((data) =>
                {error.innerHTML = data});
            }
        }).catch(() => {error.innerHTML = e;});
       }
    else {error.innerHTML = 'Invalid data. Try again';}


}