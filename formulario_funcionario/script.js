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
});