function carregarPerfil() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user) {
      window.location.href = '../pages/signin.html';
      return;
  }

  const dataFormatada = formatarData(user.dataNascimento);

  document.getElementById('userName').innerText = user.usuario;
  document.getElementById('nome').innerText = user.nome;
  document.getElementById('usuario').innerText = user.usuario;
  document.getElementById('dataNascimento').innerText = dataFormatada;
  document.getElementById('nivel').innerText = user.nivel;
  document.getElementById('genero').innerText = user.genero;
}

function formatarData(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function editarUsuario() {
  const novoNome = prompt("Digite o novo nome de usuário:");
  if (novoNome) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      user.usuario = novoNome;
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('user', JSON.stringify(user));
      document.getElementById('usuario').innerText = novoNome;
  }
}

function editarNivel() {
  const niveisPermitidos = ["Iniciante", "Intermediário", "Avançado"];
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const nivelAtual = user.nivel;
  
  const novoNivel = prompt(`Digite o novo nível de conhecimento (Iniciante, Intermediário, Avançado). Atual: ${nivelAtual}`);
  
  if (novoNivel && niveisPermitidos.includes(novoNivel)) {
      if (novoNivel === nivelAtual) {
          alert(`Você já está no nível ${nivelAtual}. Por favor, escolha um nível diferente.`);
      } else {
          user.nivel = novoNivel;
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          localStorage.setItem('user', JSON.stringify(user));
          document.getElementById('nivel').innerText = novoNivel;
      }
  } else if (novoNivel) {
      alert("Por favor, insira um nível válido (Iniciante, Intermediário, Avançado).");
  }
}

function home() {
    window.location.href = '../index.html';
}

window.onload = carregarPerfil;