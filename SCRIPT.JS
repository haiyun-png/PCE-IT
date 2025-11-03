document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoListContainer = document.getElementById('todo-list');
    const searchInput = document.getElementById('search-input');
    const emptyMessage = document.getElementById('empty-message');
    const navButtons = document.querySelectorAll('.nav-btn'); 
    
    
    let todos = []; 

    function switchView(targetViewId) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.add('hidden');
            view.classList.remove('active');
        });
        
        const targetView = document.getElementById(targetViewId);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
        }
        
        if (targetViewId === 'list-view') {
            handleSearch(); 
        }
    }

        function sortTodos(todoArray) {
        return todoArray.sort((a, b) => {
            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);
            return dateA - dateB;
        });
    }

    function renderTodos(currentTodos = todos) {
        
        const sortedTodos = sortTodos([...currentTodos]); 

        todoListContainer.innerHTML = ''; 

        const isSearching = searchInput.value.trim() !== '';
        if (sortedTodos.length === 0) {
            emptyMessage.textContent = isSearching 
                ? '🔍 Tidak ada hasil yang cocok dengan kata kunci Anda.'
                : '🎉 Tidak ada tugas yang ditampilkan. Selamat bersantai!';
            emptyMessage.classList.remove('hidden');
        } else {
            emptyMessage.classList.add('hidden');
        }

        sortedTodos.forEach(todo => {
            const listItem = document.createElement('div'); 
            listItem.className = 'todo-item';
            
            const formattedDeadline = new Date(todo.deadline).toLocaleDateString('id-ID', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            listItem.innerHTML = `
                <div class="todo-info">
                    <h3>${todo.name}</h3>
                    <p>🚨 Deadline: <strong>${formattedDeadline}</strong></p>
                    <p>${todo.description}</p>
                </div>
                <button class="btn delete" data-id="${todo.id}">❌ Hapus</button>
            `;

            const deleteButton = listItem.querySelector('.delete');
            deleteButton.addEventListener('click', deleteTodo);

            todoListContainer.appendChild(listItem);
        });
    }

    
    function addTodo(e) {
        e.preventDefault(); 
        
        const nameInput = document.getElementById('todo-name');
        const descInput = document.getElementById('todo-description');
        const deadlineInput = document.getElementById('todo-deadline');

        const newTodo = {
            id: Date.now(),
            name: nameInput.value.trim(),
            description: descInput.value.trim(),
            deadline: deadlineInput.value 
        };

        if (newTodo.name === '' || newTodo.deadline === '') {
            alert('Nama dan Deadline wajib diisi!');
            return;
        }

        todos.push(newTodo);
        
       
        todoForm.reset();
        
        alert('Tugas berhasil ditambahkan! Anda sekarang akan dialihkan ke Daftar Tugas.');

        
        switchView('list-view');
    }

    
    function deleteTodo(e) {
        const todoId = parseInt(e.target.dataset.id);
        todos = todos.filter(todo => todo.id !== todoId);
        handleSearch();
    }

    
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderTodos(todos); 
        } else {
            const filteredTodos = todos.filter(todo => 
                todo.name.toLowerCase().includes(searchTerm)
            );
            renderTodos(filteredTodos); 
        }
    }

    
    todoForm.addEventListener('submit', addTodo);
    searchInput.addEventListener('input', handleSearch);

    
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetView = e.target.getAttribute('data-view');
            switchView(targetView);
        });
    });   
    switchView('add-task-view'); 
});