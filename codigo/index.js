function sair() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'pages/signin.html';
}