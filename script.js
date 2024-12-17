// Função para carregar tabelas salvas
function loadTables() {
    const savedTables = JSON.parse(localStorage.getItem('tables')) || [];
    return savedTables;
}

// Função para salvar tabelas
function saveTables(tables) {
    localStorage.setItem('tables', JSON.stringify(tables));
}

// Função para criar uma nova tabela
function createTable() {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    for (let i = 0; i < 3; i++) {
        const th = document.createElement('th');
        th.contentEditable = true;
        th.innerText = `Cabeçalho ${i + 1}`;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            cell.contentEditable = true;
            cell.innerText = `Célula ${i + 1},${j + 1}`;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    tableWrapper.appendChild(table);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Apagar Tabela';
    deleteBtn.addEventListener('click', () => {
        tableWrapper.remove();
        saveCurrentTables();
    });

    tableWrapper.appendChild(deleteBtn);
    document.getElementById('tableContainer').appendChild(tableWrapper);
    saveCurrentTables();
}

// Função para salvar tabelas visíveis
function saveCurrentTables() {
    const tables = [];
    document.querySelectorAll('.table-wrapper').forEach(wrapper => {
        const tableData = [];
        wrapper.querySelectorAll('tr').forEach(row => {
            const rowData = [];
            row.querySelectorAll('th, td').forEach(cell => {
                rowData.push(cell.innerText);
            });
            tableData.push(rowData);
        });
        tables.push(tableData);
    });
    saveTables(tables);
}

// Função para carregar tabelas na interface
function renderTables() {
    const savedTables = loadTables();
    savedTables.forEach(tableData => {
        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper');

        const table = document.createElement('table');
        tableData.forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach(cellData => {
                const cell = document.createElement(rowData.indexOf(cellData) === 0 ? 'th' : 'td');
                cell.contentEditable = true;
                cell.innerText = cellData;
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        tableWrapper.appendChild(table);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Apagar Tabela';
        deleteBtn.addEventListener('click', () => {
            tableWrapper.remove();
            saveCurrentTables();
        });

        tableWrapper.appendChild(deleteBtn);
        document.getElementById('tableContainer').appendChild(tableWrapper);
    });
}

// Botão para criar nova tabela
document.getElementById('createTable').addEventListener('click', createTable);

// Botão para apagar todas as tabelas
document.getElementById('clearAll').addEventListener('click', () => {
    document.getElementById('tableContainer').innerHTML = '';
    localStorage.removeItem('tables');
});

// Renderizar tabelas salvas ao carregar a página
document.addEventListener('DOMContentLoaded', renderTables);
