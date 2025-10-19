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

    // Função para renderizar a tabela de funcionários
    const renderTable = () => {
        employeeTableBody.innerHTML = ''; // Limpa a tabela antes de redesenhar

        funcionarios.forEach(func => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${func.nome}</td>
                <td>${func.idade}</td>
                <td>${func.cargo}</td>
                <td>R$ ${func.salario.toFixed(2)}</td>
            `;
            employeeTableBody.appendChild(row);
        });
    };

    // Evento de submit do formulário para cadastrar funcionário
    employeeForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Captura os valores do formulário
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const cargo = document.getElementById('cargo').value;
        const salario = parseFloat(document.getElementById('salario').value);

        // Cria uma nova instância da classe Funcionario
        const novoFuncionario = new Funcionario(nome, idade, cargo, salario);

        // Adiciona o novo funcionário ao array
        funcionarios.push(novoFuncionario);

        // Limpa o formulário
        employeeForm.reset();

        // Renderiza a tabela com os dados atualizados
        renderTable();
    });
});