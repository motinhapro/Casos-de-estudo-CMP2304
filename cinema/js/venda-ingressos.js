document.addEventListener('DOMContentLoaded', () => {

    const selectSessao = document.getElementById('sessao');
    const formVenda = document.getElementById('form-venda');

    // --- CARREGAMENTO DINÂMICO DAS SESSÕES ---

    // 1. Pega todos os dados necessários do localStorage
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const salas = JSON.parse(localStorage.getItem('salas')) || [];

    selectSessao.innerHTML = '<option value="">Selecione uma sessão...</option>';

    // 2. Combina os dados para criar as opções do select
    sessoes.forEach(sessao => {
        // Encontra o filme e a sala correspondentes aos IDs na sessão
        const filme = filmes.find(f => f.id === parseInt(sessao.filmeId));
        const sala = salas.find(s => s.id === parseInt(sessao.salaId));

        // Formata a data e hora para exibição
        const dataHora = new Date(sessao.dataHora).toLocaleString('pt-BR');

        if (filme && sala) {
            const option = document.createElement('option');
            option.value = sessao.id; // O valor da opção é o ID da sessão
            // O texto da opção é uma combinação dos dados para fácil identificação
            option.textContent = `${filme.titulo} - Sala ${sala.nome} - ${dataHora}`;
            selectSessao.appendChild(option);
        }
    });

    // --- LÓGICA DE SALVAMENTO DA VENDA ---

    formVenda.addEventListener('submit', (event) => {
        event.preventDefault();

        // Captura os valores dos campos do formulário
        const sessaoId = document.getElementById('sessao').value;
        const nomeCliente = document.getElementById('nome-cliente').value;
        const cpf = document.getElementById('cpf').value;
        const assento = document.getElementById('assento').value;
        const tipoPagamento = document.getElementById('tipo-pagamento').value;

        // Cria um objeto 'ingresso' com os dados da venda
        const ingresso = {
            id: Date.now(),
            sessaoId,
            nomeCliente,
            cpf,
            assento,
            tipoPagamento
        };

        // Pega os ingressos já vendidos ou cria um array vazio
        const ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];

        // Adiciona o novo ingresso
        ingressos.push(ingresso);

        // Salva a lista atualizada no localStorage na chave 'ingressos' [cite: 104]
        localStorage.setItem('ingressos', JSON.stringify(ingressos));

        alert('Venda confirmada com sucesso!');
        formVenda.reset();
    });
});