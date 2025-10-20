document.addEventListener('DOMContentLoaded', () => {

    const formSala = document.getElementById('form-sala');

    formSala.addEventListener('submit', (event) => {
        event.preventDefault();

        // Captura os valores dos campos do formulário
        const nome = document.getElementById('nome-sala').value;
        const capacidade = parseInt(document.getElementById('capacidade').value);
        const tipo = document.getElementById('tipo').value;

        // Cria um objeto 'sala' com os dados
        const sala = {
            id: Date.now(), // ID único para cada sala
            nome,
            capacidade,
            tipo
        };

        // Pega as salas já salvas ou cria um array vazio
        const salas = JSON.parse(localStorage.getItem('salas')) || [];

        // Adiciona a nova sala
        salas.push(sala);

        // Salva a lista atualizada no localStorage na chave 'salas'
        localStorage.setItem('salas', JSON.stringify(salas)); // 

        alert('Sala salva com sucesso!');
        formSala.reset();
    });
});