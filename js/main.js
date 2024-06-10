document.addEventListener("DOMContentLoaded", () => {
  const cursosContainer = document.getElementById("cursosContainer");
  const mensagemContainer = document.getElementById("mensagemContainer");
  let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

  // Verificar se já existem cursos armazenados localmente
  if (cursos.length > 0) {
    exibirCursos(cursos);
  } else {

    fetch("/data/course.json")
      .then((response) => response.json())
      .then((data) => {
        cursos = data;
        localStorage.setItem("cursos", JSON.stringify(cursos));
        exibirCursos(cursos);
      })
      .catch((error) => console.error("Erro ao carregar cursos:", error));
  }

  const inputBusca = document.querySelector(".input-busca");
  inputBusca.addEventListener("input", (e) => {
    const busca = e.target.value.toLowerCase();
    const cursosFiltrados = cursos.filter(
      (curso) =>
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
              <button class="btn btn-primary btn-sm like-btn" data-curso-id="${
                curso.id
              }">
                ${curso.curtido ? "Curtido" : "Curtir"}
              </button>
            </div>
          </div>
        </div>
      `;
      cursosContainer.innerHTML += card;
    });
  }
  function exibirMensagem(mensagem) {
    mensagemContainer.innerText = mensagem;
    mensagemContainer.style.display = "block";
    // Esconder a mensagem após alguns segundos
    setTimeout(() => {
      mensagemContainer.style.display = "none";
    }, 3000); 
  }
  document.querySelectorAll(".like-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
        exibirMensagem("Curso adicionado aos favoritos!");
        const cursoId = event.target.getAttribute("data-curso-id");
        // Encontrar o curso pelo ID
        const cursoIndex = cursos.findIndex((curso) => curso.id === cursoId);
        if (cursoIndex !== -1) {
            // Inverter o status de curtida
            cursos[cursoIndex].curtido = !cursos[cursoIndex].curtido;
            // Atualizar o armazenamento local
            localStorage.setItem("cursos", JSON.stringify(cursos));
            // Atualizar a exibição dos cursos
            exibirCursos(cursos);
        }
    });
});

  const form = document.querySelector("#cursoForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let titulo = document.getElementById("titulo").value;
    let duracao = document.getElementById("duracao").value;
    let nivel = document.getElementById("nivel").value;
    let professor = document.getElementById("professor").value;
    let experiencia = document.getElementById("experiencia").value;
    let certificado = document.getElementById("certificado").value === "true";
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
      // comentarios: [],
      curtido: false, // Adicionar a propriedade de curtido ao novo curso
    };

    cursos.push(novoCurso);
    localStorage.setItem("cursos", JSON.stringify(cursos));

    exibirMensagem("Curso adicionado com sucesso!");
    exibirCursos(cursos);
    form.reset();
  });
});
