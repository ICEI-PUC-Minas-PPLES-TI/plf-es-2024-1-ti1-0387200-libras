document.addEventListener('DOMContentLoaded', () => {
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));

  if (userLogado) {
    document.getElementById('userName').textContent = userLogado.user;
    document.getElementById('nome').textContent = userLogado.nome;
    document.getElementById('usuario').textContent = userLogado.user;
    document.getElementById('dataNascimento').textContent = userLogado.dataNascimento; 
    document.getElementById('nivel').textContent = userLogado.nivel; 
    document.getElementById('genero').textContent = userLogado.genero; 
  } else {
    
    window.location.href = 'signin.html';
  }
});

function editarUsuario() {
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));

  const novoUsuario = prompt('Digite seu novo nome de usuário:');
  
  if (novoUsuario) {
    // Atualiza o nome de usuário no objeto do usuário logado
    userLogado.user = novoUsuario;

    // Atualiza o usuário logado no localStorage
    localStorage.setItem('userLogado', JSON.stringify(userLogado));
    
    // Atualiza a lista de usuários no localStorage
    let listaUser = JSON.parse(localStorage.getItem('usuarios')) || [];
    listaUser = listaUser.map(user => user.id === userLogado.id ? userLogado : user);
    localStorage.setItem('usuarios', JSON.stringify(listaUser));
    
    // Atualiza a interface de usuário
    document.getElementById('usuario').textContent = novoUsuario;
    document.getElementById('userName').textContent = novoUsuario;

    alert('Nome de usuário atualizado com sucesso!');
  } else {
    alert('Nome de usuário não alterado.');
  }
}

function editarSenha() {
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));

  const novaSenha = prompt('Digite sua nova senha:');

  if (novaSenha && novaSenha !== userLogado.senha) {
    
    userLogado.senha = novaSenha;

    localStorage.setItem('userLogado', JSON.stringify(userLogado));

    let listaUser = JSON.parse(localStorage.getItem('usuarios')) || [];
    listaUser = listaUser.map(user => user.id === userLogado.id ? userLogado : user);
    localStorage.setItem('usuarios', JSON.stringify(listaUser));

    alert('Senha atualizada com sucesso!');
  } else if (novaSenha === userLogado.senha) {
    alert('A nova senha não pode ser igual à senha atual.');
  } else {
    alert('Senha não alterada.');
  }
}

function editarNivel() {
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));

  const niveisValidos = ['Avançado', 'Intermediário', 'Iniciante'];
  let novoNivel = prompt('Digite seu novo nível de conhecimento (Avançado, Intermediário, Iniciante):');

  if (novoNivel) {
    novoNivel = novoNivel.charAt(0).toUpperCase() + novoNivel.slice(1).toLowerCase();

    if (!niveisValidos.includes(novoNivel)) {
      alert('Nível inválido. Por favor, insira Avançado, Intermediário ou Iniciante.');
    } else if (novoNivel === userLogado.nivel) {
      alert('Você já possui esse nível.');
    } else {
      // Atualiza o nível de conhecimento no objeto do usuário logado
      userLogado.nivel = novoNivel;

      // Atualiza o usuário logado no localStorage
      localStorage.setItem('userLogado', JSON.stringify(userLogado));

      // Atualiza a lista de usuários no localStorage
      let listaUser = JSON.parse(localStorage.getItem('usuarios')) || [];
      listaUser = listaUser.map(user => user.id === userLogado.id ? userLogado : user);
      localStorage.setItem('usuarios', JSON.stringify(listaUser));

      // Atualiza a interface de usuário
      document.getElementById('nivel').textContent = novoNivel;

      alert('Nível de conhecimento atualizado com sucesso!');
    }
  } else {
    alert('Nível de conhecimento não alterado.');
  }
}