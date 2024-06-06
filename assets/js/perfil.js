document.addEventListener('DOMContentLoaded', () => {

  const usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));
  
  if (usuarioLogado) {
    document.getElementById('userName').textContent = usuarioLogado.userCad;
    document.getElementById('nome').textContent = usuarioLogado.nomeCad;
    document.getElementById('usuario').textContent = usuarioLogado.userCad;
    document.getElementById('dataNascimento').textContent = usuarioLogado.dataNascimentoCad;
    document.getElementById('nivel').textContent = usuarioLogado.nivelCad;
    document.getElementById('genero').textContent = usuarioLogado.generoCad;
  } else {
    // Se não houver usuário logado, redirecionar para a página de login
    window.location.href = 'signin.html';
  }


});

function editarUsuario() {
  
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarios'));
  
  const novoUsuario = prompt('Digite seu novo nome de usuário:');
  
  if (novoUsuario) {
      
      usuarioLogado.userCad = novoUsuario;
      localStorage.setItem('usuarios', JSON.stringify(usuarioLogado));
      
      document.getElementById('usuario').textContent = novoUsuario;
      document.getElementById('userName').textContent = novoUsuario;

      alert('Nome de usuário atualizado com sucesso!');
  } else {
      alert('Nome de usuário não alterado.');
  }
}

function editarSenha() {
  // Recupere a senha atual do usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));
  const senhaAtual = usuarioLogado.senha;

  // Solicite ao usuário que insira a nova senha
  const novaSenha = prompt('Digite sua nova senha:');

  // Verifique se a nova senha não está vazia e se é diferente da senha atual
  if (novaSenha && novaSenha !== senhaAtual) {
    // Atualize a senha no localStorage
    usuarioLogado.senha = novaSenha;
    localStorage.setItem('userLogado', JSON.stringify(usuarioLogado));
    alert('Senha atualizada com sucesso!');
  } else if (novaSenha === senhaAtual) {
    alert('A nova senha não pode ser igual à senha atual.');
  } else {
    alert('Senha não alterada.');
  }
}