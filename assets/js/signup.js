let validNome = false;
let validDataNascimento = false;
let validUsuario = false;
let validSenha = false;
let validConfirmSenha = false;

const nome = document.getElementById('nome');
const dataNascimento = document.getElementById('dataNascimento');
const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const confirmSenha = document.getElementById('confirmSenha');
const labelNome = document.querySelector('label[for="nome"]');
const labelDataNascimento = document.querySelector('label[for="dataNascimento"]');
const labelUsuario = document.querySelector('label[for="usuario"]');
const labelSenha = document.querySelector('label[for="senha"]');
const labelConfirmSenha = document.querySelector('label[for="confirmSenha"]');
const msgError = document.getElementById('msgError');
const msgSuccess = document.getElementById('msgSuccess');

nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red');
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
    nome.setAttribute('style', 'border-color: red');
    validNome = false;
  } else {
    labelNome.setAttribute('style', 'color: green');
    labelNome.innerHTML = 'Nome';
    nome.setAttribute('style', 'border-color: green');
    validNome = true;
  }
});

dataNascimento.addEventListener('change', () => {
  if (dataNascimento.value === "") {
    labelDataNascimento.setAttribute('style', 'color: red');
    labelDataNascimento.innerHTML = 'Data de Nascimento *Campo obrigatório';
    dataNascimento.setAttribute('style', 'border-color: red');
    validDataNascimento = false;
  } else {
    labelDataNascimento.setAttribute('style', 'color: green');
    labelDataNascimento.innerHTML = 'Data de Nascimento';
    dataNascimento.setAttribute('style', 'border-color: green');
    validDataNascimento = true;
  }
});

usuario.addEventListener('keyup', () => {
  if (usuario.value.length <= 4) {
    labelUsuario.setAttribute('style', 'color: red');
    labelUsuario.innerHTML = 'Usuário *Insira no mínimo 5 caracteres';
    usuario.setAttribute('style', 'border-color: red');
    validUsuario = false;
  } else {
    labelUsuario.setAttribute('style', 'color: green');
    labelUsuario.innerHTML = 'Usuário';
    usuario.setAttribute('style', 'border-color: green');
    validUsuario = true;
  }
});

senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
    senha.setAttribute('style', 'border-color: red');
    validSenha = false;
  } else {
    labelSenha.setAttribute('style', 'color: green');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color: green');
    validSenha = true;
  }
});

confirmSenha.addEventListener('keyup', () => {
  if (senha.value != confirmSenha.value) {
    labelConfirmSenha.setAttribute('style', 'color: red');
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.setAttribute('style', 'border-color: red');
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green');
    labelConfirmSenha.innerHTML = 'Confirmar Senha';
    confirmSenha.setAttribute('style', 'border-color: green');
    validConfirmSenha = true;
  }
});

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
  if (!validNome || !validDataNascimento || !validUsuario || !validSenha || !validConfirmSenha) {
    msgError.innerHTML = "Por favor, preencha todos os campos corretamente.";
    msgSuccess.innerHTML = "";
    return;
  }

  const nome = document.getElementById('nome').value;
  const genero = document.querySelector('input[name="gender"]:checked').value;
  const nivel = document.querySelector('input[name="nivel"]:checked').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

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
