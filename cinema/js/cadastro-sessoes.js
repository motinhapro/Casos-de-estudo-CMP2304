document.addEventListener('DOMContentLoaded', () => {

    const selectFilme = document.getElementById('filme');
    const selectSala = document.getElementById('sala');
    const formSessao = document.getElementById('form-sessao');

    // --- CARREGAMENTO DINÂMICO DOS DADOS ---

    // 1. Carregar Filmes
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    selectFilme.innerHTML = '<option value="">Selecione um filme...</option>'; // Limpa opções padrão
    filmes.forEach(filme => {
        const option = document.createElement('option');
        option.value = filme.id; // Salva o ID do filme no valor da opção
        option.textContent = filme.titulo; // Mostra o título do filme para o usuário
        selectFilme.appendChild(option);
    });

    // 2. Carregar Salas
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    selectSala.innerHTML = '<option value="">Selecione uma sala...</option>'; // Limpa opções padrão
    salas.forEach(sala => {
        const option = document.createElement('option');
        option.value = sala.id; // Salva o ID da sala
        option.textContent = sala.nome; // Mostra o nome da sala
        selectSala.appendChild(option);
    });

    // --- LÓGICA DE SALVAMENTO DA SESSÃO ---

    formSessao.addEventListener('submit', (event) => {
        event.preventDefault();

        // Captura os valores dos campos do formulário
        const filmeId = document.getElementById('filme').value;
        const salaId = document.getElementById('sala').value;
        const dataHora = document.getElementById('data-hora').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const idioma = document.getElementById('idioma').value;
        const formato = document.getElementById('formato').value;

        // Cria um objeto 'sessao' com os dados
        const sessao = {
            id: Date.now(),
            filmeId, // Armazenamos o ID para relacionar os dados
            salaId,  // Armazenamos o ID para relacionar os dados
            dataHora,
            preco,
            idioma,
            formato
        };

        // Pega as sessões já salvas ou cria um array vazio
        const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];

        // Adiciona a nova sessão
        sessoes.push(sessao);

        // Salva a lista atualizada no localStorage na chave 'sessoes'
        localStorage.setItem('sessoes', JSON.stringify(sessoes));

        alert('Sessão salva com sucesso!');
        formSessao.reset();
    });
});