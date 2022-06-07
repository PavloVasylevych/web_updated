const signUpButton = document.querySelector('.signUpButton');
const error = document.querySelector('.error');

if (window.localStorage.getItem('loggedUser')) {
    window.location.href = '../templates/acc.html';
}

let createUser = request_body => {
    return fetch('http://localhost:8089/api/v1/user/create', {
        method: "POST",
        body: JSON.stringify(request_body),
        headers: {'Content-Type': 'application/json'}
    });
}

signUpButton.onclick = (e) => {
    e.preventDefault();
    const form = document.querySelector('.form');

    const repeat_password = document.getElementById('repeat_password');

    if (form.checkValidity()) {
        const name = document.getElementById('name');
        const surname = document.getElementById('surname');
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        let request_body = {
            name: name.value,
            surname: surname.value,
            username: username.value,
            password: password.value,
        };

        if (password.value !== repeat_password.value) {
            error.innerHTML = "Passwords aren't matching. Try again.";
            return
        }

        createUser(request_body)
            .then((response) => {
            if (response.status === 200) {
                window.localStorage.setItem('loggedUser', JSON.stringify(request_body));
                window.location.href = '../templates/acc.html';
            } else {response.text().then((data) =>
            {error.innerHTML = data;});
            }
        }).catch(() => {error.innerHTML = e;});

    } else {
        error.innerHTML = 'All field are filled with invalid data. Try again.';
    }
};
