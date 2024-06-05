document.addEventListener('DOMContentLoaded', function () {
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    var usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));
  
    if (usuarios && usuarioLogado) {
      var usuario = usuarios.find(function (user) {
        return user.userCad === usuarioLogado.user;
      });
  
      if (usuario) {
        document.getElementById('nomeCompleto').textContent = usuario.nomeCad;
        document.getElementById('userName').textContent = usuario.userCad;
        document.getElementById('genero').textContent = usuario.generoCad;
        document.getElementById('dataNascimento').textContent = usuario.dataNascimentoCad;
        document.getElementById('nivelConhecimento').textContent = usuario.nivelCad;
      }
    }
  });
  
  function editarPerfil() {
    // Redirecionar o usuário para a tela de edição de perfil ou implementar a funcionalidade de edição aqui
    // Por exemplo: window.location.href = 'editarPerfil.html';
  }
  