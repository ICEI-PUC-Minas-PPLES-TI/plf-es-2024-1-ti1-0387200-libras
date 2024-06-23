document.addEventListener("DOMContentLoaded", () => {
    const cursosContainer = document.getElementById("cursosContainer");
  
    fetch("data/curso.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((curso) => {
          const card = `
            <div class="col-md-6 col-lg-4 mb-4">
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
                </div>
              </div>
            </div>
          `;
          cursosContainer.innerHTML += card;
        });
      })
      .catch((error) => console.error("Erro ao carregar cursos:", error));
  })