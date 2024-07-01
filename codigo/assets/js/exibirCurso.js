document.addEventListener("DOMContentLoaded", () => {
  const cursosContainer = document.getElementById("cursosContainer");
  const mensagemContainer = document.getElementById("mensagemContainer");
  // const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

  // if (loggedInUser) {
  //   cursos = cursos.filter(curso => curso.autor === loggedInUser.usuario);
  // }

  document.querySelector(".postar-button").addEventListener("click", (e) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('Você precisa estar logado para postar um curso.');
      e.preventDefault();
    } 
  })

  // Verificar se já existem cursos armazenados localmente
  if (cursos.length > 0) {
    exibirCursos(cursos);
  } else {
    fetch("/codigo/data/course.json")
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
    if (busca === "") {
      exibirCursos(cursos);
    } else if (cursosFiltrados.length > 0) {
      exibirCursos(cursosFiltrados);
    } else {
      cursosContainer.innerHTML = ""; 
      exibirMensagem("Nenhum resultado para o curso pesquisado.");
    }
  });
  function exibirCursos(cursos) {
    cursosContainer.innerHTML = "";
    cursos.forEach((curso) => {
      const card = `
       <div class="curso-item">
        <div class="card bg-primary bg-gradient flex-grow-1">
          <img src="/codigo/assets/img/curso-pic.png" style="width: 100%; height: 20vh; border-radius: 10px 10px 0 0" />
          <div class="d-flex flex-column justify-content-center card-body card-curso">
              <h5 class="card-title text-center fs-4">${curso.titulo}</h5>
              <a href="${curso.link}" target="_blank" class="link-curso">Acessar</a>
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
                  ? `<div class="d-flex justify-content-between"> 
                      <button class="btn btn-light btn-sm like-btn" data-curso-id="${
                        curso.id
                      }">
                        ${curso.curtido ? "Curtido" : "Curtir"}
                      </button>
                      <button class="btn btn-danger btn-sm excluir-btn" data-curso-id="${
                        curso.id
                      }">
                        Excluir
                      </button>
                    </div>
                  `
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
          event.target.textContent = cursos[cursoIndex].curtido
            ? "Curtido"
            : "Curtir";
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
});

export default function exibirMensagem(mensagem) {
  mensagemContainer.innerText = mensagem;
  mensagemContainer.style.display = "block";
  // Esconder a mensagem após alguns segundos
  setTimeout(() => {
    mensagemContainer.style.display = "none";
  }, 3000);
}
