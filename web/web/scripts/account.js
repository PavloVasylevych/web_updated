const currentUser = JSON.parse(window.localStorage.getItem("loggedUser"));

const logoutLink_button = document.querySelector('.logoutLink_button');


const headers = new Headers();

headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
headers.set('content-type', 'application/json');

fetch('http://localhost:8089/api/v1/user/get/' + currentUser.username, {
    method: 'GET',
    headers: headers
}).then((response) => {
    if (response.status === 200) {
        return response.json();
    }
}).then(data => {
    const user = data.user;
    const name_p = document.getElementById("name");
    name_p.appendChild(
        document.createTextNode(user.name)
    );
    const surname_p = document.getElementById("surname");
    surname_p.appendChild(
        document.createTextNode(user.surname)
    );
    const username_p = document.getElementById("username");
    username_p.appendChild(
        document.createTextNode(user.username)
    );
})

logoutLink_button.onclick = e => {
    e.preventDefault();
    window.localStorage.removeItem("loggedUser");
    window.location.href = '../templates/login.html';
}



