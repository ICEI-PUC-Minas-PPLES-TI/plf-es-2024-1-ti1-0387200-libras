let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')


let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let dataNascimento = document.querySelector('#dataNascimento')
let labelDataNascimento = document.querySelector('#labelDataNascimento')
let validDataNascimento = false

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgErro = document.querySelector('#msgError')
let msgSuccesso = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
  if(nome.value.length <= 2){
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

dataNascimento.addEventListener('change', () => {
  if(dataNascimento.value === ""){
    labelDataNascimento.setAttribute('style', 'color: red')
    labelDataNascimento.innerHTML = 'Data de Nascimento *Campo obrigatório'
    dataNascimento.setAttribute('style', 'border-color: red')
    validDataNascimento = false
  } else {
    labelDataNascimento.setAttribute('style', 'color: green')
    labelDataNascimento.innerHTML = 'Data de Nascimento'
    dataNascimento.setAttribute('style', 'border-color: green')
    validDataNascimento = true
  }
})

usuario.addEventListener('keyup', () => {
  if(usuario.value.length <= 4){
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
    usuario.setAttribute('style', 'border-color: red')
    validUsuario = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário'
    usuario.setAttribute('style', 'border-color: green')
    validUsuario = true
  }
})

senha.addEventListener('keyup', () => {
  if(senha.value.length <= 5){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

function cadastrar(){
  if(validNome && validUsuario && validSenha && validConfirmSenha && validDataNascimento){

    var generoSelecionado = obterGeneroSelecionado();
    var nivelSelecionado = obterNivelSelecionadao();
    
    let listaUser = 
    {
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value,
      generoCad: generoSelecionado,
      nivelCad: nivelSelecionado,
      dataNascimentoCad: dataNascimento.value

    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(listaUser);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
    
   
    msgSuccesso.setAttribute('style', 'display: block')
    msgSuccesso.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgErro.setAttribute('style', 'display: none')
    msgErro.innerHTML = ''
    setTimeout(() => {
      window.location.href = '/assets/pages/signin.html';
  }, 3000);
    
  } else {
    msgErro.setAttribute('style', 'display: block')
    msgErro.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccesso.innerHTML = ''
    msgSuccesso.setAttribute('style', 'display: none')
  }
}


function obterGeneroSelecionado() {
  var inputs = document.querySelectorAll('.gender-group input[type="radio"]');
  var generoSelecionado = "";
  inputs.forEach(function(input) {
      if (input.checked) {
          generoSelecionado = input.value;
      }
  });
  return generoSelecionado;
}

function obterNivelSelecionadao() {
  var inputs = document.querySelectorAll('.nivel-group input[type="radio"]');
  var nivelSelecionado = "";
  inputs.forEach(function(input) {
      if (input.checked) {
          nivelSelecionado = input.value;
      }
  });
  return nivelSelecionado;
}

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

btnConfirm.addEventListener('click', ()=>{
  let inputConfirmSenha = document.querySelector('#confirmSenha')
  
  if(inputConfirmSenha.getAttribute('type') == 'password'){
    inputConfirmSenha.setAttribute('type', 'text')
  } else {
    inputConfirmSenha.setAttribute('type', 'password')
  }
})



  
  