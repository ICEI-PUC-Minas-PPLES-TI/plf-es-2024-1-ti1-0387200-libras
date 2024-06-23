import exibirMensagem from "./exibirCurso.js";

let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
const form = document.querySelector("#cursoForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let titulo = document.getElementById("titulo").value;
  let duracao = document.getElementById("duracao").value;
  let nivel = document.getElementById("nivel").value;
  let professor = document.getElementById("professor").value;
  let experiencia = document.getElementById("experiencia").value;
  let certificado = document.getElementById("certificado").value === "true";
  let link = document.getElementById("link").value;
  let descricao = document.getElementById("descricao").value;

  function gerarIdUnico() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  let novoCurso = {
    id: gerarIdUnico(),
    titulo: titulo,
    duracao: duracao,
    nivel: nivel,
    professor: {
      nome: professor,
      experiencia: experiencia,
    },
    certificado: certificado,
    descricao: descricao,
    link: link,
    curtido: false, // Adicionar a propriedade de curtido ao novo curso
    novo: true, // Marcar o curso como novo
  };

  cursos.push(novoCurso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
  exibirMensagem("Curso adicionado com sucesso");
  form.reset();
  window.location.href = "cursos.html";
});


