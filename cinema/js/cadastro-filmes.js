document.addEventListener('DOMContentLoaded', () => {

    const formFilme = document.getElementById('form-filme');

    formFilme.addEventListener('submit', (event) => {
        event.preventDefault();

        // Captura os valores dos campos do formulário
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const genero = document.getElementById('genero').value;
        const classificacao = document.getElementById('classificacao').value;
        const duracao = parseInt(document.getElementById('duracao').value);
        const dataEstreia = document.getElementById('data-estreia').value;

        // Cria um objeto 'filme' com os dados
        const filme = {
            id: Date.now(), // ID único para cada filme
            titulo,
            descricao,
            genero,
            classificacao,
            duracao,
            dataEstreia
        };

        // Pega os filmes já salvos ou cria um array vazio
        const filmes = JSON.parse(localStorage.getItem('filmes')) || [];

        // Adiciona o novo filme
        filmes.push(filme);

        // Salva a lista atualizada no localStorage 
        localStorage.setItem('filmes', JSON.stringify(filmes));

        alert('Filme salvo com sucesso!');
        formFilme.reset();
    });
});