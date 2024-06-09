document.addEventListener("DOMContentLoaded", () => {
  const cursosContainer = document.getElementById("cursosContainer");
  let cursos = [];

  fetch("/data/course.json")
    .then((response) => response.json())
    .then((data) => {
      cursos = data;
      exibirCursos(cursos);
    })
    .catch((error) => console.error("Erro ao carregar cursos:", error));

  const inputBusca = document.querySelector(".input-busca");
  inputBusca.addEventListener("input", (e) => {
    const busca = e.target.value.toLowerCase();
    const cursosFiltrados = cursos.filter(curso =>
      curso.titulo.toLowerCase().includes(busca) ||
      curso.duracao.toLowerCase().includes(busca) ||
      curso.nivel.toLowerCase().includes(busca) ||
      curso.professor.nome.toLowerCase().includes(busca) ||
      curso.professor.experiencia.toLowerCase().includes(busca) ||
      curso.descricao.toLowerCase().includes(busca)
    );
    exibirCursos(cursosFiltrados);
  });

  function exibirCursos(cursos) {
    cursosContainer.innerHTML = "";
    cursos.forEach((curso) => {
      const card = `
        <div class="col-lg-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${curso.titulo}</h5>
              <p class="card-text">Duração: ${curso.duracao}</p>
              <p class="card-text">Nível: ${curso.nivel}</p>
              <p class="card-text">Professor: ${curso.professor.nome}</p>
              <p class="card-text">Experiência do Professor: ${
                curso.professor.experiencia
              }</p>
              <p class="card-text">Certificado: ${
                curso.certificado ? "Sim" : "Não"
              }</p>
              <p class="card-text">${curso.descricao}</p>
              <button class="btn btn-primary">Comentar</button>
            </div>
          </div>
        </div>
      `;
      cursosContainer.innerHTML += card;
    });
  }
});

const form = document.querySelector("#cursoForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let titulo = document.getElementById("titulo").value;
  let duracao = document.getElementById("duracao").value;
  let nivel = document.getElementById("nivel").value;
  let professor = document.getElementById("professor").value;
  let experiencia = document.getElementById("experiencia").value;
  let certificado = document.getElementById("certificado").checked;
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
  };

  let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  cursos.push(novoCurso);
  localStorage.setItem("cursos", JSON.stringify(cursos));

  window.location.href = "cursos.html";
});
