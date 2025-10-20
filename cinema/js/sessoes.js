document.addEventListener('DOMContentLoaded', () => {
    const listaSessoes = document.getElementById('lista-sessoes');

    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const salas = JSON.parse(localStorage.getItem('salas')) || [];

    if (sessoes.length === 0) {
        listaSessoes.innerHTML = '<p class="text-center">Nenhuma sessão disponível no momento.</p>';
        return;
    }

    sessoes.forEach(sessao => {
        // Encontra o filme e a sala correspondentes aos IDs
        const filme = filmes.find(f => f.id === parseInt(sessao.filmeId));
        const sala = salas.find(s => s.id === parseInt(sessao.salaId));

        if (filme && sala) {
            // Formata a data e hora para um formato legível
            const dataHora = new Date(sessao.dataHora).toLocaleString('pt-BR');
            const preco = `R$ ${sessao.preco.toFixed(2).replace('.', ',')}`;

            // Cria o card do Bootstrap para cada sessão
            const cardSessao = `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${filme.titulo}</h5>
                            <p class="card-text"><strong>Sala:</strong> ${sala.nome} (${sala.tipo})</p>
                            <p class="card-text"><strong>Horário:</strong> ${dataHora}</p>
                            <p class="card-text"><strong>Preço:</strong> ${preco}</p>
                            <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-primary mt-auto">Comprar Ingresso</a>
                        </div>
                    </div>
                </div>
            `;
            // Adiciona o card ao container
            listaSessoes.innerHTML += cardSessao;
        }
    });
});