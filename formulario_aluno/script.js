// script.js (Versão Final - Exercício 4)

class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    // Método que verifica se o aluno foi aprovado
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Método que retorna uma string formatada com os dados do aluno
    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota: ${this.notaFinal}`;
    }
}

// Aguarda o DOM estar completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do formulário e da tabela
    const studentForm = document.getElementById('student-form');
    const studentsTableBody = document.querySelector('#students-table tbody');

    // Array para armazenar os alunos em memória
    let students = [];
    let editingStudentId = null; // Variável para controlar a edição

    // Função para renderizar a tabela de alunos
    const renderTable = () => {
        // Limpa o corpo da tabela antes de adicionar as novas linhas
        studentsTableBody.innerHTML = '';

        // Itera sobre cada aluno no array e cria uma linha na tabela
        students.forEach((student, index) => {
            const row = document.createElement('tr'); // Cria o <tr>

            // Usamos o método isAprovado() para definir a situação
            const situacao = student.isAprovado() ? 'Aprovado' : 'Reprovado';

            row.innerHTML = `
                <td>${student.nome}</td>
                <td>${student.idade}</td>
                <td>${student.curso}</td>
                <td>${student.notaFinal}</td>
                <td>${situacao}</td>
                <td>
                    <button class="btn-edit" data-index="${index}">Editar</button>
                    <button class="btn-delete" data-index="${index}">Excluir</button>
                </td>
            `;

            // Adiciona uma classe CSS para colorir a linha do aluno aprovado/reprovado
            if (student.isAprovado()) {
                row.style.backgroundColor = '#d4edda'; // Verde claro para aprovados
            } else {
                row.style.backgroundColor = '#f8d7da'; // Vermelho claro para reprovados
            }

            // Adiciona a linha ao corpo da tabela
            studentsTableBody.appendChild(row);
        });
    };

    // Função para adicionar um novo aluno ou atualizar um existente
    studentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o recarregamento da página

        // Pega os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const curso = document.getElementById('curso').value;
        const notaFinal = parseFloat(document.getElementById('nota').value);

        // Cria um objeto para o novo aluno
        const newStudent = new Aluno(nome, idade, curso, notaFinal);

        if (editingStudentId !== null) {
            // Se estiver editando, atualiza o aluno existente
            students[editingStudentId] = newStudent;
            editingStudentId = null; // Reseta o modo de edição
            // Feedback para o usuário ao editar
            alert(`Aluno ${newStudent.nome} foi atualizado com sucesso!`);
        } else {
            // Adiciona o novo aluno ao array
            students.push(newStudent);
            // Feedback para o usuário ao salvar
            alert(`Aluno ${newStudent.nome} foi cadastrado com sucesso!`);
        }

        // Limpa o formulário
        studentForm.reset();
        
        // Renderiza a tabela novamente com os dados atualizados
        renderTable();
    });

    studentsTableBody.addEventListener('click', (event) => {
        // Identifica o alvo do clique
        const target = event.target;

        // Verifica se o botão de editar foi clicado
        if (target.classList.contains('btn-edit')) {
            const index = parseInt(target.dataset.index); // Pega o 'data-index'
            editStudent(index);
        }

        // Verifica se o botão de excluir foi clicado
        if (target.classList.contains('btn-delete')) {
            const index = parseInt(target.dataset.index); // Pega o 'data-index'
            deleteStudent(index);
        }
    });

    const editStudent = (index) => {
        const student = students[index];
        
        // Preenche o formulário com os dados do aluno a ser editado
        document.getElementById('nome').value = student.nome;
        document.getElementById('idade').value = student.idade;
        document.getElementById('curso').value = student.curso;
        document.getElementById('nota').value = student.notaFinal;
        
        editingStudentId = index; // Define o índice do aluno que está sendo editado
    };

    const deleteStudent = (index) => {
        const studentName = students[index].nome;

        // Pede confirmação antes de excluir para uma melhor experiência
        if (confirm(`Você tem certeza que deseja excluir o aluno ${studentName}?`)) {
            // Remove o aluno do array pelo índice
            students.splice(index, 1);
            // Feedback para o usuário ao excluir
            alert(`Aluno ${studentName} foi excluído.`);
            // Renderiza a tabela novamente
            renderTable();
        }
    };
    
    // Seleciona os elementos da nova seção no HTML.
    const reportsOutput = document.getElementById('reports-output');
    
    // Adiciona o evento de clique para o botão 'Listar Aprovados'.
    document.getElementById('btn-aprovados').addEventListener('click', () => {
        // 'filter' cria um novo array contendo apenas os alunos que satisfazem a condição.
        const aprovados = students.filter(student => student.isAprovado());
        // 'map' transforma o array de alunos aprovados em um array contendo apenas os seus nomes.
        const nomesAprovados = aprovados.map(student => student.nome);
        
        reportsOutput.innerHTML = `<strong>Alunos Aprovados (${nomesAprovados.length}):</strong>\n${nomesAprovados.join('\n')}`;
    });

    // Adiciona o evento de clique para o botão 'Média das Notas'.
    document.getElementById('btn-media-notas').addEventListener('click', () => {
        if (students.length === 0) {
            reportsOutput.textContent = 'Não há alunos para calcular a média.';
            return;
        }
        // 'reduce' acumula um valor. Aqui, somamos todas as notas finais.
        const somaDasNotas = students.reduce((soma, student) => soma + student.notaFinal, 0);
        const media = somaDasNotas / students.length;
        
        reportsOutput.textContent = `A média das notas finais é: ${media.toFixed(2)}`;
    });

    // Adiciona o evento de clique para o botão 'Média das Idades'.
    document.getElementById('btn-media-idades').addEventListener('click', () => {
        if (students.length === 0) {
            reportsOutput.textContent = 'Não há alunos para calcular a média.';
            return;
        }
        // Usamos 'reduce' novamente para somar todas as idades.
        const somaDasIdades = students.reduce((soma, student) => soma + student.idade, 0);
        const media = somaDasIdades / students.length;
        
        reportsOutput.textContent = `A média de idade dos alunos é: ${media.toFixed(1)} anos`;
    });

    // Adiciona o evento de clique para o botão 'Ordenar por Nome'.
    document.getElementById('btn-ordenar-nomes').addEventListener('click', () => {
        // Primeiro, extraímos apenas os nomes com 'map'.
        const nomes = students.map(student => student.nome);
        // 'sort' ordena o array de nomes em ordem alfabética.
        nomes.sort();
        
        reportsOutput.innerHTML = `<strong>Nomes em Ordem Alfabética:</strong>\n${nomes.join('\n')}`;
    });

    // Adiciona o evento de clique para o botão 'Alunos por Curso'.
    document.getElementById('btn-alunos-curso').addEventListener('click', () => {
        // 'reduce' é usado para agrupar e contar os alunos por curso.
        const contagemCursos = students.reduce((contador, student) => {
            const curso = student.curso;
            contador[curso] = (contador[curso] || 0) + 1; // Incrementa a contagem para o curso.
            return contador;
        }, {}); // O {} é o objeto inicial que servirá como nosso contador.

        let resultado = '<strong>Alunos por Curso:</strong>\n';
        // Itera sobre o objeto de contagem para formatar a saída.
        for (const curso in contagemCursos) {
            resultado += `${curso}: ${contagemCursos[curso]} aluno(s)\n`;
        }
        
        reportsOutput.innerHTML = resultado;
    });

    // Renderiza a tabela inicialmente (vazia)
    renderTable();
});