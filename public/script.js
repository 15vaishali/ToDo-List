document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoTitle = document.getElementById('todo-title');
    const todoList = document.getElementById('todo-list');
    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);

    // Fetch and display todos
    const fetchTodos = async () => {
        const response = await fetch('http://localhost:5000/api/todos');
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            const todoText = document.createElement('span');
            todoText.innerText = todo.title;

            if (todo.completed) {
                todoItem.classList.add('completed');
                todoText.classList.add('completed-text');
            }
            todoItem.appendChild(todoText);
            todoList.appendChild(todoItem);

            // Add update and delete buttons
            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.classList.add('update-btn');
            updateButton.addEventListener('click', () => updateTodo(todo._id, !todo.completed));
            todoItem.appendChild(updateButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => deleteTodo(todo._id));
            todoItem.appendChild(deleteButton);
        });
    };

    // Add a new todo
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newTodo = {
            title: todoTitle.value
        };
        await fetch('http://localhost:5000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(newTodo)
        });
        todoTitle.value = '';
        fetchTodos();
    });

    // Update a todo
    const updateTodo = async (id, completed) => {
        await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ completed })
        });
        showNotification(completed ? 'Task marked as completed!' : 'Task marked as not completed');
        fetchTodos();
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'DELETE'
        });
        fetchTodos();
    };

    // Show notification
    const showNotification = (message) => {
        notification.innerText = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    };

    // Initial fetch
    fetchTodos();
});
