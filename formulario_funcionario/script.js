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
    // --- NOVO (EX.2): Variável para controlar se estamos editando ou cadastrando ---
    let editingIndex = null;

    // Função para renderizar a tabela de funcionários
    const renderTable = () => {
        employeeTableBody.innerHTML = ''; // Limpa a tabela antes de redesenhar

        funcionarios.forEach((func, index) => {
            const row = document.createElement('tr');
            // --- ALTERAÇÃO (EX.2): Adicionada uma nova célula para os botões de ação ---
            row.innerHTML = `
                <td>${func.nome}</td>
                <td>${func.idade}</td>
                <td>${func.cargo}</td>
                <td>R$ ${func.salario.toFixed(2)}</td>
                <td>
                    <button class="btn-edit" onclick="editEmployee(${index})">Editar</button>
                    <button class="btn-delete" onclick="deleteEmployee(${index})">Excluir</button>
                </td>
            `;
            employeeTableBody.appendChild(row);
        });
    };

    // Evento de submit do formulário para cadastrar ou ATUALIZAR funcionário
    employeeForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Captura os valores do formulário
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const cargo = document.getElementById('cargo').value;
        const salario = parseFloat(document.getElementById('salario').value);

        // --- ALTERAÇÃO (EX.2): Verifica se está em modo de edição ---
        if (editingIndex !== null) {
            // Se estiver editando, atualiza o funcionário existente no array
            const funcionarioParaEditar = funcionarios[editingIndex];
            funcionarioParaEditar.nome = nome; // Utiliza o 'set' da classe
            funcionarioParaEditar.idade = idade;
            funcionarioParaEditar.cargo = cargo;
            funcionarioParaEditar.salario = salario;

            alert('Funcionário atualizado com sucesso!');
            editingIndex = null; // Retorna para o modo de cadastro
        } else {
            // Se não, cria uma nova instância da classe Funcionario
            const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
            // E adiciona o novo funcionário ao array
            funcionarios.push(novoFuncionario);
        }

        // Limpa o formulário
        employeeForm.reset();

        // Renderiza a tabela com os dados atualizados
        renderTable();
    });

    // --- NOVO (EX.2): Função para carregar os dados do funcionário no formulário para edição ---
    // A função é adicionada ao objeto 'window' para se tornar global e ser acessível pelo 'onclick' no HTML
    window.editEmployee = (index) => {
        const func = funcionarios[index];
        
        // Preenche o formulário com os dados do funcionário selecionado
        document.getElementById('nome').value = func.nome;
        document.getElementById('idade').value = func.idade;
        document.getElementById('cargo').value = func.cargo;
        document.getElementById('salario').value = func.salario;

        // Define o índice de edição para que o submit saiba que deve atualizar em vez de criar
        editingIndex = index;
    };

    // --- NOVO (EX.2): Função para excluir um funcionário ---
    window.deleteEmployee = (index) => {
        // Pede confirmação ao usuário antes de excluir
        if (confirm(`Tem certeza que deseja excluir o funcionário ${funcionarios[index].nome}?`)) {
            // Remove o item do array na posição 'index'
            funcionarios.splice(index, 1);
            // Renderiza a tabela novamente para mostrar que o item foi removido
            renderTable();
        }
    };
});