if (localStorage.getItem("userLogado") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "./assets/pages/signin.html";
  }
  
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  
  const logado = document.querySelector("#logado");
  logado.innerHTML = `Olá ${userLogado.nome}`;
  
  function sair() {
    localStorage.removeItem("userLogado");
    window.location.href = "./assets/pages/signin.html";
  }