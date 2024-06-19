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
        <div class="col-lg-4 mb-4 curso-item">
          <div class="card bg-primary bg-gradient border border-black">
            <div class="card-body">
              <h5 class="card-title">${curso.titulo}</h5>
              <a href="${curso.link}" class="link-light">Acessar</a>
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
              ${
                curso.novo
                  ? `<button class="btn btn-light btn-sm like-btn" data-curso-id="${
                      curso.id
                    }">
                ${curso.curtido ? "Curtido" : "Curtir"}
              </button>`
                  : ""
              }
              ${
                curso.novo
                  ? `<button class="btn btn-danger btn-sm excluir-btn" data-curso-id="${curso.id}">
                Excluir
              </button>`
                  : ""
              }
            </div>
          </div>
        </div>
      `;
      cursosContainer.innerHTML += card;
    });

    // Registrar eventos de clique nos botões de curtida
    document.querySelectorAll(".like-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const cursoId = event.target.getAttribute("data-curso-id");
        // Encontrar o curso pelo ID
        const cursoIndex = cursos.findIndex((curso) => curso.id === cursoId);
        if (cursoIndex !== -1) {
          // Inverter o status de curtida
          cursos[cursoIndex].curtido = !cursos[cursoIndex].curtido;
          // Atualizar o armazenamento local
          localStorage.setItem("cursos", JSON.stringify(cursos));
          // Atualizar o texto do botão
          event.target.textContent = cursos[cursoIndex].curtido ? "Curtido" : "Curtir";
          exibirMensagem("Status de curtida alterado!");
        }
      });
    });

    // Registrar eventos de clique nos botões de exclusão
    document.querySelectorAll(".excluir-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const cursoId = e.target.getAttribute("data-curso-id");
        excluirCurso(cursoId);
      });
    });
  }

  // Excluir curso
  function excluirCurso(id) {
    const cursoIndex = cursos.findIndex((curso) => curso.id === id);

    if (cursoIndex !== -1) {
      const novosCursos = cursos.filter((_, index) => index !== cursoIndex);

      localStorage.setItem("cursos", JSON.stringify(novosCursos));

      cursos = novosCursos;
      exibirCursos(cursos); // Atualizar a exibição dos cursos
      exibirMensagem("Curso excluído com sucesso!");
    } else {
      console.error("ID do curso inválido");
    }
  }

  function exibirMensagem(mensagem) {
    mensagemContainer.innerText = mensagem;
    mensagemContainer.style.display = "block";
    // Esconder a mensagem após alguns segundos
    setTimeout(() => {
      mensagemContainer.style.display = "none";
    }, 3000);
  }

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

    exibirMensagem("Curso adicionado com sucesso!");
    exibirCursos(cursos); // Atualizar a exibição dos cursos
    form.reset();
  });
});
