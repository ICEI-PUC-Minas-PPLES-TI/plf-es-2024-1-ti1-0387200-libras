document.getElementById('verSenha').addEventListener('click', function() {
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

document.getElementById('verConfirmSenha').addEventListener('click', function() {
  const confirmSenhaInput = document.getElementById('confirmSenha');
  if (confirmSenhaInput.type === 'password') {
      confirmSenhaInput.type = 'text';
      this.classList.remove('fa-eye');
      this.classList.add('fa-eye-slash');
  } else {
      confirmSenhaInput.type = 'password';
      this.classList.remove('fa-eye-slash');
      this.classList.add('fa-eye');
  }
});

function cadastrar() {
  const nome = document.getElementById('nome').value;
  const genero = document.querySelector('input[name="gender"]:checked').value;
  const nivel = document.querySelector('input[name="nivel"]:checked').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const confirmSenha = document.getElementById('confirmSenha').value;

  const msgError = document.getElementById('msgError');
  const msgSuccess = document.getElementById('msgSuccess');

  if (senha !== confirmSenha) {
      msgError.innerHTML = "As senhas não coincidem!";
      msgSuccess.innerHTML = "";
      return;
  }

  const user = {
      nome,
      genero,
      nivel,
      dataNascimento,
      usuario,
      senha
  };

  localStorage.setItem('user', JSON.stringify(user));
  
  msgSuccess.innerHTML = "Cadastro realizado com sucesso!";
  msgError.innerHTML = "";
  setTimeout(() => {
    window.location.href = '../pages/signin.html';
  }, 1000);
}

document.querySelector('button').addEventListener('click', function(event) {
  event.preventDefault();
  cadastrar();
});