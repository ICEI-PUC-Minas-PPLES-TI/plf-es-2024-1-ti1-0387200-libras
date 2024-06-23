document.querySelector('.fa-eye').addEventListener('click', function() {
  const senhaInput = document.getElementById('senha');
  if (senhaInput.type === 'password') {
      senhaInput.type = 'text';
      this.classList.remove('fa-eye');
      this.classList.add('fa-eye-slash');
  } else {
      senhaInput.type = 'password';
      this.classList.remove('fa-eye-slash');
      this.classList.add('fa-eye');
  }
});

function entrar() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  const msgError = document.getElementById('msgError');

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
      msgError.innerHTML = "Usuário não encontrado!";
      return;
  }

  if (usuario === user.usuario && senha === user.senha) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = '../pages/perfil.html';
  } else {
      msgError.innerHTML = "Usuário ou senha incorretos!";
  }
}

document.querySelector('button').addEventListener('click', function(event) {
  event.preventDefault();
  entrar();
});