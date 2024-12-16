
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}


function logout() {
    localStorage.removeItem('currentUser');
    alert("You have been logged out successfully!");
    window.location.href = "LoginSignUp.html";
}

document.querySelector('.dropdown a').addEventListener('click', logout);


const userOnPage = JSON.parse(localStorage.getItem("currentUser"));
if (!userOnPage) {
    window.location.href = "LoginSignUp.html";
}   