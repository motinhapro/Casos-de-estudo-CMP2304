class Funcionario {
    // Construtor para inicializar os atributos
    constructor(nome, idade, cargo, salario) {
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
        this._salario = salario;
    }

    // Métodos de acesso (getters)
    get nome() { return this._nome; }
    get idade() { return this._idade; }
    get cargo() { return this._cargo; }
    get salario() { return this._salario; }

    // Métodos de modificação (setters)
    set nome(novoNome) { this._nome = novoNome; }
    set idade(novaIdade) { this._idade = novaIdade; }
    set cargo(novoCargo) { this._cargo = novoCargo; }
    set salario(novoSalario) { this._salario = novoSalario; }

    // Método para formatar os dados do funcionário como string
    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: R$ ${this.salario.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employee-form');
    const employeeTableBody = document.querySelector('#employee-table tbody');

    // Array para armazenar os funcionários
    const funcionarios = [];
    let editingIndex = null;

    // Função para renderizar a tabela de funcionários
    const renderTable = () => {
        employeeTableBody.innerHTML = ''; // Limpa a tabela antes de redesenhar

        funcionarios.forEach((func, index) => {
            const row = document.createElement('tr');
            // A manipulação de eventos agora é feita inteiramente no JavaScript.
            row.innerHTML = `
                <td>${func.nome}</td>
                <td>${func.idade}</td>
                <td>${func.cargo}</td>
                <td>R$ ${func.salario.toFixed(2)}</td>
                <td>
                    <button class="btn-edit" data-index="${index}">Editar</button>
                    <button class="btn-delete" data-index="${index}">Excluir</button>
                </td>
            `;
            employeeTableBody.appendChild(row);
        });
    };

    // Evento de submit do formulário
    employeeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const cargo = document.getElementById('cargo').value;
        const salario = parseFloat(document.getElementById('salario').value);

        if (editingIndex !== null) {
            const funcionarioParaEditar = funcionarios[editingIndex];
            funcionarioParaEditar.nome = nome;
            funcionarioParaEditar.idade = idade;
            funcionarioParaEditar.cargo = cargo;
            funcionarioParaEditar.salario = salario;
            alert('Funcionário atualizado com sucesso!');
            editingIndex = null;
        } else {
            const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
            funcionarios.push(novoFuncionario);
        }

        employeeForm.reset();
        renderTable();
    });

    // Adicionamos um único event listener ao corpo da tabela.
    employeeTableBody.addEventListener('click', (event) => {
        const target = event.target;

        // Verifica se o botão de editar foi clicado
        if (target.classList.contains('btn-edit')) {
            const index = parseInt(target.dataset.index);
            editEmployee(index);
        }

        // Verifica se o botão de excluir foi clicado
        if (target.classList.contains('btn-delete')) {
            const index = parseInt(target.dataset.index);
            deleteEmployee(index);
        }
    });

    const editEmployee = (index) => {
        const func = funcionarios[index];

        document.getElementById('nome').value = func.nome;
        document.getElementById('idade').value = func.idade;
        document.getElementById('cargo').value = func.cargo;
        document.getElementById('salario').value = func.salario;

        editingIndex = index;
    };

    const deleteEmployee = (index) => {
        const confirmDelete = () => confirm(`Tem certeza que deseja excluir ${funcionarios[index].nome}?`);

        if (confirmDelete()) {
            funcionarios.splice(index, 1);
            renderTable();
        }
    };

    // Seleciona a área de saída e os botões de relatório do HTML.
    const reportsOutput = document.getElementById('reports-output');
    
    // Relatório 1: Listar funcionários com salário maior que R$ 5000.
    document.getElementById('btn-salario-maior-5000').addEventListener('click', () => {
        // Usa 'filter' para criar um novo array apenas com funcionários que atendem à condição. 
        const comSalarioAlto = funcionarios.filter(func => func.salario > 5000);
        let resultado = `<strong>Funcionários com Salário > R$ 5000:</strong>\n\n`;
        if (comSalarioAlto.length === 0) {
            resultado += "Nenhum funcionário encontrado.";
        } else {
            // Usa 'map' para formatar a exibição de cada funcionário encontrado.
            resultado += comSalarioAlto.map(func => `${func.nome} (Salário: R$ ${func.salario.toFixed(2)})`).join('\n');
        }
        reportsOutput.innerHTML = resultado;
    });

    // Relatório 2: Mostrar a média salarial dos funcionários.
    document.getElementById('btn-media-salarial').addEventListener('click', () => {
        if (funcionarios.length === 0) {
            reportsOutput.textContent = "Não há funcionários para calcular a média.";
            return;
        }
        // Usa 'reduce' para somar todos os salários a partir de um valor inicial 0. 
        const somaTotal = funcionarios.reduce((soma, func) => soma + func.salario, 0);
        const media = somaTotal / funcionarios.length;
        reportsOutput.textContent = `A média salarial de todos os funcionários é: R$ ${media.toFixed(2)}`;
    });

    // Relatório 3: Listar apenas os cargos únicos (sem repetição).
    document.getElementById('btn-cargos-unicos').addEventListener('click', () => {
        // Primeiro, usa 'map' para criar um array contendo todos os cargos.
        const todosOsCargos = funcionarios.map(func => func.cargo);
        // Em seguida, 'new Set' remove automaticamente as duplicatas. 
        const cargosUnicos = [...new Set(todosOsCargos)];
        
        reportsOutput.innerHTML = `<strong>Cargos Únicos na Empresa:</strong>\n\n${cargosUnicos.join('\n')}`;
    });

    // Relatório 4: Criar uma lista de nomes em maiúsculo.
    document.getElementById('btn-nomes-maiusculo').addEventListener('click', () => {
        // Usa 'map' para criar um novo array, aplicando a função toUpperCase() em cada nome. 
        const nomesMaiusculos = funcionarios.map(func => func.nome.toUpperCase());

        reportsOutput.innerHTML = `<strong>Nomes dos Funcionários (em maiúsculo):</strong>\n\n${nomesMaiusculos.join('\n')}`;
    });

    // Renderiza a tabela uma vez no início para garantir que a UI esteja pronta
    renderTable();
});