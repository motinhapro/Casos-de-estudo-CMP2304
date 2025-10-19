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

            // Preenche a linha com os dados do aluno
            row.innerHTML = `
                <td>${student.nome}</td>
                <td>${student.idade}</td>
                <td>${student.curso}</td>
                <td>${student.nota}</td>
                <td>
                    <button class="btn-edit" onclick="editStudent(${index})">Editar</button>
                    <button class="btn-delete" onclick="deleteStudent(${index})">Excluir</button>
                </td>
            `;

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
        const nota = parseFloat(document.getElementById('nota').value);

        // Cria um objeto para o novo aluno
        const newStudent = { nome, idade, curso, nota };

        if (editingStudentId !== null) {
            // Se estiver editando, atualiza o aluno existente
            students[editingStudentId] = newStudent;
            editingStudentId = null; // Reseta o modo de edição
        } else {
            // Adiciona o novo aluno ao array
            students.push(newStudent);
        }

        // Limpa o formulário
        studentForm.reset();
        
        // Renderiza a tabela novamente com os dados atualizados
        renderTable();
    });

    // Declara as funções de editar e excluir no escopo global para o `onclick` funcionar
    window.editStudent = (index) => {
        const student = students[index];
        
        // Preenche o formulário com os dados do aluno a ser editado
        document.getElementById('nome').value = student.nome;
        document.getElementById('idade').value = student.idade;
        document.getElementById('curso').value = student.curso;
        document.getElementById('nota').value = student.nota;
        
        editingStudentId = index; // Define o índice do aluno que está sendo editado
    };

    window.deleteStudent = (index) => {
        // Remove o aluno do array pelo índice
        students.splice(index, 1);
        
        // Renderiza a tabela novamente
        renderTable();
    };

    // Renderiza a tabela inicialmente (vazia)
    renderTable();
});